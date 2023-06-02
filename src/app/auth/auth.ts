import { AuthLoginDetail, AuthRegisterDetail, AuthResult } from "src/utils/type";

export interface iAuthService {
    handleLogin(data: AuthLoginDetail): Promise<AuthResult>;

    handleRegister(data: AuthRegisterDetail): Promise<AuthResult>;
}