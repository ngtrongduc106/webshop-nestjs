import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from "dotenv";
dotenv.config();

export const DSOptions: DataSourceOptions = {
    type: "mysql",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    entities: ["dist/database/entities/*.entity.{js,ts}"],
    migrations: ["dist/database/migrations/*.{js,ts}"]
};

const DSource: DataSource = new DataSource(DSOptions);
export default DSource;