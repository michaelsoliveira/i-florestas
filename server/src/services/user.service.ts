import bcrypt from "bcryptjs"
import { getRepository, UsingJoinColumnIsNotAllowedError } from "typeorm"
import { User } from "../entities/User"
import nodemailer from 'nodemailer'
import { prismaClient } from "../database/prismaClient"
import { prisma, Prisma, User as UserPrisma } from "@prisma/client"
export interface UserRequest {
    username: string,
    email: string,
    password: string
}

class UserService {

    async create(data: any): Promise<UserPrisma> {
        const userExists = await prismaClient.user.findFirst({
            where: {
                email: data?.email,
            }
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

        const dataRequest = {
            username: data?.username,
            email: data?.email,
            password: passwordHash,
            image: data?.image,
            provider: data?.provider ? data?.provider : 'local',
            id_provider: data?.id_provider ? data?.id_provider : ''
        }
        if (!data?.id_projeto) {
            const user = await prismaClient.user.create({
                data: { 
                    ...dataRequest,
                    users_roles: {
                        create: {
                            role_id: roleAdmin ? roleAdmin?.id : ''
                        }
                    }
                }
            })            

            return user
        }

        const roles = data.roles?.map((role: any) => {
            return {
                role_id: role.value
            }
        })

        const user = data?.option === 0 ? await prismaClient.user.create({
            data: {
                ...dataRequest,
                projeto_users: {
                    create: {
                        id_projeto: data?.id_projeto
                    }
                },
                users_roles: {
                    createMany: {
                        data: roles
                    }
                }
            }
        }) : await prismaClient.user.update({
            where: {
                id: data?.id_user
            },
            data: {
                projeto_users: {
                    create: {
                        id_projeto: data?.id_projeto
                    }
                },
                users_roles: {
                    createMany: {
                        data: roles
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
                role_id: role.value
            }
        })

        if (data?.by_provider) {
            const user = prismaClient.user.update({
                where: 
                {
                    id
                },
                data: basicData
            })

            return user
        } else {
            const [deleted, user] = await prismaClient.$transaction([
                prismaClient.userRole.deleteMany({
                    where: {
                        user_id: id
                    }
                }),
                prismaClient.user.update({
                    where: 
                    {
                        id
                    },
                    data: data?.roles ? {
                        ...basicData,
                        users_roles: {
                            createMany: {
                                data: roles
                            }
                        }
                    } : basicData
                })
            ])
    
            return user
        }
    }

    async delete(id: string) {
        await prismaClient.user.delete({
            where: {
                id
            },
        })
    }

    async updatePassword(id: string, oldPassword: string, newPassword: string) {
        const userRepository = getRepository(User)
        const userData = await this.findWithPassword(id)

        if (!userData) {
            throw new Error("Usuário não localizado")
        }
        const validPassword = await bcrypt.compare(oldPassword, userData.password)

        if (!validPassword) {
            throw new Error("Senha informada não corresponde com a cadastrada")
        }

        const passwordHash = await bcrypt.hash(newPassword, 10)

        await userRepository.update(id, { password: passwordHash })

        return this.findOne(id)
    }

    async getAllByProjeto(): Promise<any[]> {
        const users = await prismaClient.user.findMany({
            where: {
                projeto_users: {
                    some: {
                        active: true
                    }
                }
            }
        })
 
        return users;
    };

    async getAll(): Promise<any[]> {
        const users = await prismaClient.user.findMany()

        return users
    }

    async findOne(id: string, projetoId?: string | undefined): Promise<any> {

        const user = await prismaClient.user.findFirst({ 
            where: { 
                AND: {
                    id,
                    projeto_users: {
                        some: {
                            projeto: {
                                id: projetoId
                            }
                        }
                    },
                    users_roles: {
                        some: {
                            user_id: id
                        }
                    } 
                }
            } ,
            include: {
                users_roles: {
                    include: {
                        roles: {
                            select: {
                                id: true,
                                name: true
                            }    
                        }
                    }
                },
            },
        })

        const data = {
            id: user?.id,
            email: user?.email,
            username: user?.username,
            roles: user?.users_roles.map((user_roles: any) => {
                return {
                    ...user_roles.roles
                }
            })
        }

        if (!user) throw new Error("User not Found 0")

        return data
    }

    async findByKey(key: string, value: string): Promise<User> {
        const result = await getRepository(User).findOne({ where: { [key]: value } })

        if (!result) throw new Error("User not found 1")

        return result
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
        const { email, name, message } = data
        console.log(process.env.GMAIL_USER, process.env.GMAIL_PWD)
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PWD
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
        const buttonTextColor = "#ffffff"
        const url = 'http://bomanejo.com'

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