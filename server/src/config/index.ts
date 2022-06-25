import { config } from 'dotenv';
const dotenv = require('dotenv')

dotenv.config()

const envfile = `.env.${process.env.NODE_ENV}`;
const envdir = process.cwd();

config({ path: `${envdir}/${envfile}` });

export const server = {
    port: process.env.PORT,
    env: process.env.NODE_ENV,
    JWT_SECRET: process.env.ACCESS_TOKEN_SECRET,
    JWT_REFRESH: process.env.REFRESH_TOKEN_SECRET,
    jwtExpiration: 3600,           // 1 hour
    jwtRefreshExpiration: 86400,   // 24 hours
};

// dados de conexão com o banco
export const dbConnections = {
  postgres: {
    name: 'postgres',
    conn: String(process.env.DATABASE_CON),
  },
};

export default server