import jwt from "jsonwebtoken"
import { getRepository } from "typeorm"
import { User } from "../entities/User"
import bcrypt from "bcrypt"
import { response } from "express"
import { DataStoredInToken } from "src/interfaces/DataStoredInToken"
import { RefreshToken } from "../entities/RefreshToken"
import dayjs from "dayjs"
const config = require("../config")


export interface UserRequest {
    email: string,
    password: string
}

interface TokenData {
    access_token: string;
    expires_in: number;
}
const { TokenExpiredError } = jwt;

class AuthService {
    public refreshTokens: string[]
    
    async execute({ email, password }: UserRequest) {
        const userRepository = await getRepository(User).createQueryBuilder("users")
        const user = await userRepository
            .select([
                "users.id",
                "users.username",
                "users.password",
                "users.email",
                "users.image"
            ])
            .where("users.email = :email", { email })
            .getOne()

        if (!user) throw new Error("Usuário informado não existe na base de dados")

        const passwordMatch = await bcrypt.compareSync(password, user.password)

        if (!passwordMatch) {
            throw new Error("A senha informada está incorreta")
        }

        const token = this.createToken(user)
        const refresh_token = this.createRefreshToken(user)

        const { access_token, expires_in } = token

        const refreshToken = getRepository(RefreshToken).create({
            user,
            expiresIn: dayjs().add(config.server.jwtRefreshExpiration, "seconds").unix(),
            token: refresh_token
        })

        await refreshToken.save()

        return {
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                image: user.image,
                access_token,
                expires_in,
                refresh_token
            },
        }
    }

    private createToken(user: User): TokenData {
        const expiresIn = config.server.jwtExpiration
        const secret = config.server.JWT_SECRET
        const DataStoredInToken: DataStoredInToken = {
            id: user.id,
            email: user.email,
            username: user.username
        }
        const token = jwt.sign(DataStoredInToken, secret, { expiresIn })
        
        return {
            expires_in: expiresIn,
            access_token: token
        }
    }

    async getUserByJWT(token: string) {
        const secret = config.server.JWT_SECRET
        return jwt.verify(token, secret)
    }

    createRefreshToken(user: User) {
        const expiresIn = config.server.jwtRefreshExpiration

        const secret = config.server.JWT_REFRESH
        const DataStoredInToken: DataStoredInToken = {
            id: user.id,
            email: user.email,
            username: user.username
        }
        return jwt.sign(DataStoredInToken, secret , { expiresIn })
    }

    async handleRefreshToken(refreshToken: string) {
        
        const query = getRepository(RefreshToken).createQueryBuilder('refreshToken')
                .innerJoinAndSelect('refreshToken.user', 'user')
                .where('refreshToken.token = :token', { token: refreshToken })
        const refreshTokenExists = await query.getOne()

        const secret = config.server.JWT_REFRESH
        const expiresIn = dayjs().add(config.server.jwtRefreshExpiration, "second").unix()

        if (!refreshTokenExists) {
            throw new Error('Refresh token is not valid')
        }
        
        try {    
            // const user = jwt.verify(refreshToken, secret) as User   
            
            if (!refreshTokenExists.user) {
                throw new Error("User is not Authenticated")    
            }

            const newAccessToken = this.createToken(refreshTokenExists.user)
            const tokenExpired = this.verifyExpiration(refreshTokenExists)

            if (tokenExpired) {
                console.log('Refresh Token Expirou')
                const newRefreshToken = this.createRefreshToken(refreshTokenExists.user)
                await getRepository(RefreshToken).delete(refreshTokenExists.id)
                
                const refreshTokenData = getRepository(RefreshToken).create({
                    user: refreshTokenExists.user,
                    expiresIn,
                    token: newRefreshToken
                })

                await refreshTokenData.save()

                return {
                    ...newAccessToken,
                    refresh_token: newRefreshToken
                }
            }
        
            return {
                ...newAccessToken
            }
        } catch (error) {
            throw new Error('Error: ' + error.message)
        }
    }


    verifyExpiration(token: RefreshToken) {
        
        const expiredToken = dayjs().isAfter(dayjs.unix(token.expiresIn))
        return expiredToken
    }

    createCookie(tokenData: any) {
        return `Authorization=Bearer ${tokenData.access_token}; HttpOnly; Max-Age=${tokenData.expires_in}`;
    }

    getExpiredIn() {
        let expiredAt = new Date();
        expiredAt.setSeconds(expiredAt.getSeconds() + config.server.jwtRefreshExpiration)
        return expiredAt.getTime()
    }
}

export default new AuthService()