import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from "dotenv";
dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    migrations: ['dist/database/migrations/*.{ts,js}'],
    entities: ['dist/database/entities/*.entity.{ts,js}'],
    type: "mysql"
}

const dataSource: DataSource = new DataSource(dataSourceOptions);
export default dataSource;