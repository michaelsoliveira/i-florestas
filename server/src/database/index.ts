import { Permission } from "../entities/Permission"
import { Role } from "../entities/Role"
import { User } from "../entities/User"
import { createConnection } from "typeorm"
import { Empresa } from "../entities/Empresa"
import { Umf } from "../entities/Umf"
import { Estado } from "../entities/Estado"
import { Upa } from "../entities/Upa"
import { Ut } from "../entities/Ut"
import { CategoriaEspecie } from "../entities/CategoriaEspecie"
import { Especie } from "../entities/Especie"
import { Poa } from "../entities/Poa"
import { SituacaoPoa } from "../entities/SituacaoPoa"
import { TipoMotorista } from "../entities/TipoMotorista"
import { Projeto } from "../entities/Projeto"
import { RefreshToken } from "../entities/RefreshToken"
import { Endereco } from "../entities/Endereco"
import { SpatialRefSys } from "../entities/SpatialRefSys"
import { EquacaoVolume } from "../entities/EquacaoVolume"

const dotenv = require('dotenv');
// config() will read your .env file, parse the contents, assign it to process.env.
dotenv.config();

const main = async () => {
    try {
        const connection = await createConnection({
            type: "postgres",
            host: process.env.HOST,
            port: 5432,
            username: process.env.USERNAME,
            password: process.env.PASSWORD,
            database: process.env.DATABASE_NAME,
            entities: [
                Permission, 
                Role, 
                User, 
                Empresa, 
                Projeto, 
                SpatialRefSys,
                EquacaoVolume,
                Upa, 
                Ut, 
                Estado,
                Umf, 
                CategoriaEspecie, 
                Especie, 
                RefreshToken,
                Endereco
            ],
            synchronize: false
        })
        console.log('Connected to Postgres')
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}

main()