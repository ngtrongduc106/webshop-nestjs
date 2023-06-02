import { TokenDTO } from "./dtos/Token.dto";

export interface iUserService {
    handleProfile(data: TokenDTO)
}