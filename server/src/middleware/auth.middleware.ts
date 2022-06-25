import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { User } from "src/entities/User"
import userService from "../services/user.service"
import { getRepository } from "typeorm"
import { DataStoredInToken } from "../interfaces/DataStoredInToken"
import axios from 'axios'
import { getDecodedOAuthJwtGoogle } from "../services/decodeJwtGoogle"
const config = require("../config")

export const Authentication = () => {
    const { TokenExpiredError } = jwt;

    const catchError = (err: any, res: any) => {
    if (err instanceof TokenExpiredError) {
        return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
    }

    return res.sendStatus(401).send({ message: "Unauthorized!" });
    }

    return async (request: Request, response: Response, next: NextFunction) => {
        const { authorization } = request.headers;
        // const { provider } = request.query
        
        if (!authorization) {
            return response.status(401).json({ error: "Token is missing!" })
        }

        const token = authorization.replace('Bearer', '').trim()
        const provider = token.substring(0, 3)
        
        try {
            switch (provider) {
                case 'ya2': {
                    // const url = 'https://www.googleapis.com/oauth2/v2/userinfo'
                    
                    const provider = await getDecodedOAuthJwtGoogle(token)

                    const user = await userService.findByProvider('google', provider.sub)                            
                    
                    request.user = {
                        id: user.id,
                        email: user.email,
                        username: user.username,
                        provider: 'google'
                    }
                        
                    break;
                }
                case 'ghu': {
                    // console.log(token)
                    const url = 'https://api.github.com/user'

                    // const verificationResponse = jwt.verify(token, config.server.JWT_SECRET, { algorithms: ['HS256'] }) as DataStoredInToken
                    // console.log(verificationResponse)

                    await axios.get(url,
                        {
                            headers: { authorization: `token ${token}` }
                        }).then(async(response: any) => {
                            const provider = response.data
                            console.log(provider)
                            const user = await userService.findByProvider('github', provider.id)

                            request.user = {
                                id: user.id,
                                email: user.email,
                                username: user.username,
                                provider: 'github'
                            }
                        })
                    break;
                }
                    case 'EAA': {
                    
                    await axios.get(`https://graph.facebook.com/me?access_token=${token}&fields=id`)
                        .then(async (response: any) => {
                        const provider = response.data

                        const user = await userService.findByProvider('facebook', provider.id)
                            
                        request.user = {
                            id: user.id,
                            email: user.email,
                            username: user.username,
                            provider: user.provider
                        }
                    })
                    break;
                }
                default: {
                    const verificationResponse = jwt.verify(token, config.server.JWT_SECRET) as User

                    const user = await userService.findOne(verificationResponse.id)
                    
                    request.user = {
                        id: user.id,
                        email: user.email,
                        username: user.username,
                        provider: 'local'
                    }    
                }
            }

            return next()
        } catch (error) {
            return response.status(401).json({ 
                error: true, 
                message: error.message, 
                data: null 
            })
        }
    }
}