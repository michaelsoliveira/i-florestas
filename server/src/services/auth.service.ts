import jwt from "jsonwebtoken"
import { User } from "@prisma/client"
import bcrypt from "bcryptjs"
import { DataStoredInToken } from "../interfaces/DataStoredInToken"
import dayjs from "dayjs"
import { prismaClient } from "../database/prismaClient"
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
        
        const user = await prismaClient.user.findUnique({
            include: {
                users_roles: true
            },
            where: {
                email: email
            }
        })

        if (!user) throw new Error("Usuário informado não existe na base de dados")

        const passwordMatch = await bcrypt.compareSync(password, user?.password)

        if (!passwordMatch) {
            throw new Error("A senha informada está incorreta")
        }

        const token = this.createToken(user)
        const refresh_token = this.createRefreshToken(user)

        const { access_token, expires_in } = token

        const refreshToken = await prismaClient.refreshToken.create({
            data: {
                expires_in: dayjs().add(config.server.jwtRefreshExpiration, "seconds").unix(),
                token: refresh_token,
                users: {
                    connect: {
                        id: user?.id
                    }
                }
            },
            
        })

        return {
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                image: user.image,
                roles: user.users_roles,
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
        
        const refreshTokenExists = await prismaClient.refreshToken.findFirst({
            include: {
                users: true
            },
            where: {
                token: refreshToken
            }
        })

        const secret = config.server.JWT_REFRESH
        const expiresIn = dayjs().add(config.server.jwtRefreshExpiration, "second").unix()

        if (!refreshTokenExists) {
            throw new Error('Refresh token is not valid')
        }
        
        try {    
            // const user = jwt.verify(refreshToken, secret) as User   
            
            if (!refreshTokenExists?.users) {
                throw new Error("User is not Authenticated")    
            }

            const newAccessToken = this.createToken(refreshTokenExists.users)
            const tokenExpired = this.verifyExpiration(refreshTokenExists)

            if (tokenExpired) {
                console.log('Refresh Token Expirou')
                const newRefreshToken = this.createRefreshToken(refreshTokenExists.users)
                await prismaClient.refreshToken.delete({
                    where: {
                        id: refreshTokenExists.id
                    }
                })
                
                await prismaClient.refreshToken.create({
                    data: {
                        users: {
                            connect: {
                                id: refreshTokenExists.users?.id
                            }
                        },
                        expires_in: expiresIn,
                        token: newRefreshToken
                    }
                })
                console.log('Novo Refresh Token ', newRefreshToken)

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


    verifyExpiration(token: any) {
        
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