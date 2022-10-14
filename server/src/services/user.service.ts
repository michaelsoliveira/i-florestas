import bcrypt from "bcryptjs"
import { DataStoredInToken } from "src/interfaces/DataStoredInToken"
import { getRepository, Repository, getConnection } from "typeorm"
import { User } from "../entities/User"
import nodemailer from 'nodemailer'
import { Empresa } from "../entities/Empresa"
import { prismaClient } from "../database/prismaClient"
import { User as UserPrisma } from "@prisma/client"
export interface UserRequest {
    username: string,
    email: string,
    password: string
}

class UserService {

    async create(data: any): Promise<UserPrisma> {
        const userExists = await prismaClient.user.findFirst({
            where: {
                email: data?.email
            }
        })

        if (userExists) {
            throw new Error("Usuário já cadastrado")
        }

        const passwordHash = await bcrypt.hash(data?.password, 10)

        const dataRequest = {
            username: data?.username,
            email: data?.email,
            password: passwordHash,
            image: data?.image,
            provider: data?.provider,
            id_provider: data?.id_provider
        }

        const preparedData = (data?.empresaId) ? 
        { ...data, empresa_users: { create: { id_empresa: data.empresaId } } } : { ...dataRequest }

        const user = await prismaClient.user.create({
            data: {
                ...preparedData
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

        const preparedData = {
            image: data?.image,
            provider: data?.provider,
            id_provider: data?.idProvider
        }

        const user = await prismaClient.user.update({
            where: {
                id
            },
            data: { ...preparedData }
        })

        return user
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

    async getAll(): Promise<User[]> {
        const userRepository = getRepository(User);
        return userRepository.find();
    };

    async findOne(requestId: string): Promise<User> {
        const user = await getRepository(User).findOne({ where: { id: requestId } });
        if (!user) throw new Error("User not Found"); 

        return user
    }

    async findByKey(key: string, value: string): Promise<User> {
        const result = await getRepository(User).findOne({ where: { [key]: value } })

        if (!result) throw new Error("User not found")

        return result
    }

    async findProvider(provider?: any): Promise<any> {
        const { email, id } = provider
        const user = await prismaClient.user.findFirst({
            where: {
                AND: [
                    { email },
                    { id_provider: String(id) }
                ]
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