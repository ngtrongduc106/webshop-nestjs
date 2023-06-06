import { Auth_LoginDetails, Auth_RegisterDetails, Jwt_TokenPayload } from "src/utils/type"

export interface IAuthService {
    handleLogin(data: Auth_LoginDetails): Promise<Jwt_TokenPayload>

    handleRegister(data: Auth_RegisterDetails): Promise<Jwt_TokenPayload>
}