import bcrypt from "bcryptjs"
import nodemailer from 'nodemailer'
import { prismaClient } from "../database/prismaClient"
import { prisma, Prisma, User as UserPrisma } from "@prisma/client"
export interface UserRequest {
    username: string,
    email: string,
    password: string
}
import { google } from 'googleapis'

const client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET)
client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN })

class UserService {

    async create(data: any): Promise<UserPrisma> {
        const where =  data?.id_projeto ? {
            AND: [
                {
                    email: data?.email
                },
                {
                users_roles: {
                    some: {
                        id_projeto: data?.id_projeto
                    }
                }
            }]
        } : {
            email: data?.email
        }
        const userExists = await prismaClient.user.findFirst({
            where
        })

        if (userExists) {
            throw new Error("Já existe um usuário com este email cadastrado")
        }

        const passwordHash = await bcrypt.hash(data?.password, 10)

        const roleAdmin = await prismaClient.role.findFirst({
            where: {
                name: { equals: 'Admin' }
            }
        })

        const projeto = await prismaClient.projeto.create({
            data: {
                nome: data?.projeto ? data?.projeto : 'Projeto Inicial',
            }
        })

        const dataRequest = {
            username: data?.username,
            email: data?.email,
            password: passwordHash,
            image: data?.image,
            provider: data?.provider ? data?.provider : 'local',
            id_provider: data?.id_provider ? data?.id_provider : '',
            id_projeto_active: projeto?.id
        }

        if (!data?.id_projeto) {
            const user = await prismaClient.user.create({
                data: { 
                    ...dataRequest,
                    users_roles: {
                        create: {
                            role_id: roleAdmin ? roleAdmin?.id : '',
                            id_projeto: projeto?.id
                        }
                    }
                }
            })            

            return user
        }

        const userRoles = data.roles?.map((role: any) => {
            return {
                role_id: role.value,
                id_projeto: data?.id_projeto
            }
        })

        const user = data?.option === 0 ? await prismaClient.user.create({
            data: {
                ...dataRequest,
                users_roles: {
                    createMany: {
                        data: userRoles
                    }
                }
            }
        }) : await prismaClient.user.update({
            include: {
                users_roles: true,
            },
            where: {
                id: data?.id_user
            },
            data: {
                users_roles: {
                    createMany: {
                        data: userRoles.map((role: any) => { 
                            return { 
                                id_projeto: role.id_projeto, 
                                role_id: role?.role_id
                            } 
                        })
                    }
                }
            }
        })

        return user
    }

    async update(id: string, data: any): Promise<UserPrisma> {
        const userExists = await prismaClient.user.findFirst({
            where: {
                id
            }
        })

        if (!userExists) {
            throw new Error("Usuário não localizado")
        }

        const basicData = {
            username: data?.username,
            email: data?.email,
            image: data?.image ? data?.image : userExists?.image,
            provider: data?.provider && data?.provider,
            id_provider: data?.id_provider && data?.id_provider
        }

        const roles = data?.roles && data?.roles.map((role: any) => {
            return {
                role_id: role.id ? role.id : role.value,
                id_projeto: data?.id_projeto
            }
        })

        const user = await prismaClient.user.update({
            where: 
            {
                id
            },
            data: basicData
        })
    
        const [deleted, userRole] = await prismaClient.$transaction([
            prismaClient.userRole.deleteMany({
                where: {
                    AND: [
                        { user_id: id },
                        { id_projeto: data?.id_projeto }
                    ]
                }
            }),
            prismaClient.userRole.createMany({
                data: roles.map((role: any) => {
                    return {
                        user_id: data?.id_user,
                        role_id: role?.role_id,
                        id_projeto: role?.id_projeto
                    }
                })
            })
        ])

        return userExists
        
    }

    async delete(id: string) {
        await prismaClient.user.delete({
            where: {
                id
            },
        })
    }

    async updatePassword(id: string, oldPassword: string, newPassword: string) {
        const userData = await this.findWithPassword(id)

        if (!userData) {
            throw new Error("Usuário não localizado")
        }
        const validPassword = await bcrypt.compare(oldPassword, userData.password)

        if (!validPassword) {
            throw new Error("Senha informada não corresponde com a cadastrada")
        }

        const passwordHash = await bcrypt.hash(newPassword, 10)

        await prismaClient.user.update({ 
            where: {
                id
            },
            data: {
                password: passwordHash 
            }
        })

        return this.findOne(id)
    }

    async getAllByProjeto(userId: string): Promise<any[]> {
        const user = await prismaClient.user.findUnique({
            where: {
                id: userId
            }
        })
        const projeto = await prismaClient.projeto.findMany({
            include: {
                users: true
            },
            where: {
                id: user?.id_projeto_active
            }
        }) as any
 
        return projeto?.users;
    };

    async getAll(): Promise<any[]> {
        const users = await prismaClient.user.findMany()

        return users
    }

    async findOne(id: string, projetoId?: string | undefined): Promise<any> {
        const where = {
            AND: [
                {
                    users: {
                        id
                    },
                },
                {
                    projeto: {
                        id: projetoId
                    }
                }
            ]
        }

        const userRole = await prismaClient.userRole.findFirst({ 
            where,
            include: {
                users: true,
                roles: {
                    select: {
                        id: true,
                        name: true
                    }    
                }
                    
            },
        })

        const data = {
            id: userRole?.users?.id,
            email: userRole?.users?.email,
            username: userRole?.users?.username,
            roles: [userRole?.roles]
        }

        if (!userRole?.users) throw new Error("User not Found 0")

        return data
    }

    async findProvider(provider?: any): Promise<any> {
        const { email, id } = provider
        const user = await prismaClient.user.findFirst({
            where: {
                OR: [
                    { email },
                    { id_provider: String(id) }
                ]
            },
            select: {
                id: true,
                username: true,
                email: true,
                provider: true,
                id_provider: true,
                users_roles: {
                    select: {
                        roles: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        })
        
        return user
    }

    async sendMail(data: any) {
        const accessToken = client.getAccessToken() as any
        const { email, name, message } = data
        
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            //host: process.env.SMTP_HOST || 'smtp.gmail.com',
            //secure: true,
            port: 587,
            auth: {
                type: 'OAuth2',
                user: process.env.GMAIL_USER,
                //pass: process.env.GMAIL_PWD,
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
                accessToken: accessToken
            },
            tls: {
                // do not fail on invalid certs
                rejectUnauthorized: false,
            },
        });

        transporter.verify(function(error, success) {
            if (error) {
                    console.log(error);
            } else {
                    console.log('Server is ready to take our messages');
            }
        });

        const escapedEmail = `${email.replace(/\./g, "&#8203;.")}`
        const escapedName = `${name.replace(/\./g, "&#8203;.")}`

        // Some simple styling options
        const backgroundColor = "#f9f9f9"
        const textColor = "#444444"
        const mainBackgroundColor = "#ffffff"
        const buttonBackgroundColor = "#346df1"
        const buttonBorderColor = "#346df1"
        const buttonTextColor = "#444444"
        const url = 'https://bomanejo.online/login'

        const linkLogin = `
            <a href="${url}" target="_blank" style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${buttonTextColor}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${buttonBorderColor}; display: inline-block; font-weight: bold;">
                Login
            </a>
        `

        // send mail with defined transport object
        transporter.sendMail({
            from: '"Michael Santos de Oliveira" <michaelsoliveira@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Acesso ao Software BOManejo Web", // Subject line
            text: `Usuário ${name} foi cadastrado com Sucesso!`, // plain text body
            html: `
                <body style="background: ${backgroundColor};">
                    <table style="padding: 10px 0px 0px 10px;" width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                        <td align="center" style="padding: 10px 0px 20px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
                            <strong>Seja bem vindo ${escapedName}</strong>
                        </td>
                        </tr>
                    </table>
                    <table width="100%" border="0" cellspacing="20" cellpadding="0" style="background: ${mainBackgroundColor}; max-width: 600px; margin: auto; border-radius: 10px;">
                        <tr>
                        <td align="center" style="padding: 10px 0px 0px 0px; font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
                            Você pode realizar o login utilizando seu email: <strong>${escapedEmail}</strong>
                        </td>
                        </tr>
                        <tr>
                        <td align="center" style="padding: 20px 0;">
                            <table border="0" cellspacing="0" cellpadding="0">
                            <tr>
                                <td align="center" style="border-radius: 5px; padding: 10px 20px; font-size: 18px; color: #ffffff;" bgcolor="${buttonBackgroundColor}">
                                    ${message}
                                </td>
                            </tr>
                            </table>
                        </td>
                        </tr>
                        <tr>
                        <td align="center" style="padding: 0px 0px 10px 0px; font-size: 14px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
                            Você não precisa retornar este email
                        </td>
                        </tr>
                    </table>
                </body>`, // html body
        }, (error, data) => {
            if (error) {
                console.log('Error: ', error)
            } else {
                console.log("Message sent: %s", data.response);
            }
        });

    }

    async search(text: any) {
        const users = await prismaClient.user.findMany({
            where: {

                    OR: [{username: { mode: Prisma.QueryMode.insensitive, contains: text }}, {email: { mode: Prisma.QueryMode.insensitive, contains: text }}],  
            },
            orderBy: {
                username:   'asc'
            },
        })

        return users
    }

    async findWithPassword(id: string) {
        const user = await prismaClient.user.findFirst({
            where: {
                id
            },
            select: {
                id: true,
                password: true
            }
        })
        
        return user
    }
}

export default new UserService()