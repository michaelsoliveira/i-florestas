// import { User } from "../entities/User"
import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";
import {
    CreatePermissionService,
    CreateRoleService,
    CreateRolePermissionService,
    CreateUserACLService
} from "../services/UserAclService";
import userService from "../services/user.service";

export interface BaseUser {
    username: string,
    email: string,
    password: string
}

export class UserController {
    async store(request : Request, response: Response) : Promise<Response> {
        // const { username, email, password, provider, idProvider, image, empresaId } = request.body;

        try {    
            const user = await userService.create(request.body, request.user?.id)
            
            return response.json({
                error: false,
                user,
                message: null
            })

        } catch (error) {
            return response.json({
                error: true,
                user: null,
                message: error.message
            })
        }
    }

    async findByEmail(request: Request, response: Response) : Promise<Response> {
        const { email }: any = request.query
        
        try {
            const user = await prismaClient.user.findFirst({
                where: {
                    AND: {
                        email
                    }
                }
            })

            return response.json({
                error: false,
                user,
                message: null
            })
            
        } catch (error) {
            return response.json({
                error: true,
                user: null,
                message: error.message
            })
        }
    }

    async update(request: Request, response: Response): Promise<Response> {
        const id = request.params?.id

        try {    
            const user = await userService.update(id, request.body)
            
            return response.json({
                error: false,
                user,
                message: 'Usuário atualizado com sucesso!'
            })

        } catch (error) {
            return response.json({
                error: true,
                user: null,
                message: error.message
            })
        }
    }

    async updatePassword(request: Request, response: Response): Promise<Response> {
        const id = request.user?.id

        const { oldPassword, newPassword } = request.body;
        
        try {    
            const user = await userService.updatePassword(id, oldPassword, newPassword)
            
            return response.json({
                error: false,
                user,
                message: 'Senha alterada com sucesso'
            })

        } catch (error) {
            return response.json({
                error: true,
                user: null,
                message: error.message
            })
        }
    }

    async delete(request: Request, response: Response): Promise<any> {
        const { id } = request.params

        try {
            await userService.delete(id)

            return response.status(200).json({
                error: false,
                message: 'Usuário deletada com Sucesso!!!'
            })
        } catch (error) {
            return response.json({
                error: true,
                upa: null,
                message: error.message
            })
        }
    }

    async sendMail(request: Request, response: Response) {
        userService.sendMail(request.body)
    }

    async createPermission(request: Request, response: Response) {
        const { name, description } = request.body;

        const createPermissionService = new CreatePermissionService();

        const result = await createPermissionService.execute({ name, description });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }

    async createRole(request: Request, response: Response) {
        const { name, description } = request.body;

        const createRoleService = new CreateRoleService();

        const result = await createRoleService.execute({ name, description });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }

    async createRolePermission(request: Request, response: Response) {
        const { roleId } = request.params;
        const { permissions } = request.body;

        const createRolePermissionService = new CreateRolePermissionService();

        const result = await createRolePermissionService.execute({
            roleId,
            permissions,
        });

        if (result instanceof Error) {
        return response.status(400).json(result.message);
        }

        return response.json(result);
    }

    async createUserACL(request: Request, response: Response) {
        const { permissions, roles } = request.body;
        const { userId } = request.params;

        const createUserACLService = new CreateUserACLService();

        const result = await createUserACLService.execute({
            id:     userId,
            permissions,
            roles,
        });

        if (result instanceof Error) {
        return response.status(400).json(result.message);
        }

        return response.json(result);
    }

    async findProvider(request: Request, response: Response): Promise<any> {
        const { email }: any = request.query
        
        try {
            const user = await userService.findProvider(email)

            return response.json(user)
        } catch (error) {
            return response.json(error)
        }
    }

    async findAll(request: Request, response: Response) {
        try {
            let users = await userService.getAll()

            return response.json(users)
        } catch(error) {
            return response.json(error.message)
        }
    }

    async findOne(request: Request, response: Response) {
        const { id } = request.params
        try {
            let users = await userService.findOne(id)

            return response.json(users)
        } catch(error) {
            return response.json(error.message)
        }
    }
}