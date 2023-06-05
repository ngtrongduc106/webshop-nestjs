declare namespace NodeJS {
    interface ProcessEnv {
        DB_HOST: string;
        DB_PORT: number;
        DB_NAME: string;
        DB_USER: string;
        DB_PASSWORD: string;
    }
}