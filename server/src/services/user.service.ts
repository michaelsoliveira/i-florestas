import bcrypt from "bcrypt"
import { DataStoredInToken } from "src/interfaces/DataStoredInToken"
import { getRepository, Repository, getConnection } from "typeorm"
import { User } from "../entities/User"
import nodemailer from 'nodemailer'
import { Empresa } from "../entities/Empresa"
import { prismaClient } from "../database/prismaClient"
export interface UserRequest {
    username: string,
    email: string,
    password: string
}

class UserService {

    async create(data: any): Promise<User> {
        const userRepository = getRepository(User)
        const userExists = await userRepository.findOne({ where: { email: data?.email } })

        if (userExists) {
            throw new Error("Já existe um usuário cadastrado com este e-mail")
        }

        const passwordHash = await bcrypt.hash(data?.password, 10)

        const preparedData = {
            username: data?.username,
            email: data?.email,
            password: passwordHash,
            image: data?.image,
            provider: data?.provider,
            idProvider: data?.idProvider
        }
        const empresa = data?.empresaId && await getRepository(Empresa).findOne(data?.empresaId)

        const user = userRepository.create(preparedData)
        if (empresa) {
            user.empresas = [empresa]
        }

        await user.save()

        return user
    }

    async update(id: string, data: any): Promise<User> {
        const userRepository = getRepository(User)
        const userExists = await userRepository.findOne({ where: { id } })

        if (!userExists) {
            throw new Error("Usuário não localizado")
        }

        const passwordHash = await bcrypt.hash(data?.password, 10)

        const preparedData = {
            username: data?.username,
            email: data?.email,
            password: passwordHash,
            image: data?.image,
            provider: data?.provider,
            idProvider: data?.idProvider
        }

        await userRepository.update(id, preparedData)

        return this.findOne(id)
    }

    async updatePassword(id: string, oldPassword: string, newPassword: string) {
        const userRepository = getRepository(User)
        const userData = await this.findWithPassword(id)

        if (!userData) {
            throw new Error("Usuário não localizado")
        }
        const validPassword = await bcrypt.compare(oldPassword, userData.password)
        console.log(validPassword)

        if (!validPassword) {
            throw new Error("Senha informada não corresponde com a cadastrada")
        }

        const passwordHash = await bcrypt.hash(newPassword, 10)

        const preparedData = {
            username: userData?.username,
            email: userData?.email,
            password: passwordHash,
            image: userData?.image,
            provider: userData?.provider,
            idProvider: userData?.idProvider
        }

        console.log(preparedData)

        await userRepository.update(id, preparedData)

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

    async findByProvider(provider: string, idProvider: string): Promise<any> {
        const query = await getRepository(User).createQueryBuilder("user")
        const data =
            query.where("user.provider = :provider", { provider })
                .andWhere("user.idProvider = :idProvider", { idProvider })

        return data.getOne()
    }

    async sendMail(data: any) {
        const { email, name, message } = data
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
        from: '"Michael Santos de Oliveira 👻" <michaelsoliveira@gmail.com>', // sender address
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

    
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }

    async findWithPassword(id: string) {
        const userRepository = await getRepository(User).createQueryBuilder("users")
        const user = await userRepository
            .select([
                "users.id",
                "users.username",
                "users.password",
                "users.email",
                "users.provider",
                "users.idProvider"
            ])
            .where("users.id = :id", { id })
            .getOne()
        
        return user
    }
}

export default new UserService()