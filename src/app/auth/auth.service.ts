import { Injectable } from "@nestjs/common";
import { IAuthService } from "./auth";
import { Auth_LoginDetails, Jwt_TokenPayload, Auth_RegisterDetails } from "src/utils/type";

@Injectable()
export class AuthService implements IAuthService {
    handleLogin(data: Auth_LoginDetails): Promise<Jwt_TokenPayload> {
        throw new Error("Method not implemented.");
    }
    handleRegister(data: Auth_RegisterDetails): Promise<Jwt_TokenPayload> {
        throw new Error("Method not implemented.");
    }

}