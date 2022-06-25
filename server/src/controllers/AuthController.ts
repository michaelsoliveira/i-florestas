import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "src/entities/User";
import { getRepository } from "typeorm";
import authService from "../services/auth.service"
const { OAuth2Client } = require('google-auth-library');
const http = require('http');
const url = require('url');
import axios from 'axios'
import { getDecodedOAuthJwtGoogle } from "../services/decodeJwtGoogle";
// const open = require('open');
// const destroyer = require('server-destroy');
export interface BaseUser {
    email: string,
    password: string
}

let refreshTokens: string[] = []

export class AuthController {
    
    async login(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;
        
        try {
            const user = await authService.execute({ email, password })
            
            response.setHeader('Set-Cookie', [authService.createCookie(user)]);
            
            return response.json({
                error: false,
                errorMessage: null,
                ...user
            })

        } catch (error) {
            return response.status(403).json({
                error: true,
                errorMessage: error.message,
                user: null
            })
        }
    }

    async signInCallback(request: Request, response: Response) {
        return response.json(request)
    }

    async googleAuth(request: Request, response: Response) {
        const { authorization } = request.headers
        const token = authorization?.replace('Bearer', '').trim()

        const userInfo = await getDecodedOAuthJwtGoogle(token)
        
        return response.json(userInfo)
    }

    async getUserByToken(request: Request, response: Response): Promise<Response> {
        const user = request.user

        return response.status(200).json(request.user)
    }

    async refreshToken(request: Request, response: Response): Promise<Response> {
        const refreshToken = request.body.token

        if (!refreshToken) return response.status(401).json('You are not Authenticated')
        try {
            const newToken = await authService.handleRefreshToken(refreshToken)   
            
            return response.json(newToken)
        } catch (error) {
            return response.status(401).json(error.message)
        }
    }
}