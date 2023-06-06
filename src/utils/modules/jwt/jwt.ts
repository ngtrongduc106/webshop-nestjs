import { Jwt_TokenPayload, Jwt_UserPayload } from "src/utils/type";

export interface IJwtCustomService {
    handleEncodeAuthToken(payLoad: Jwt_UserPayload): Jwt_TokenPayload

    handleDecodeAuthToken(token: string): Jwt_UserPayload
}