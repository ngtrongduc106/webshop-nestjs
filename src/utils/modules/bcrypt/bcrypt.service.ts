import { Injectable } from "@nestjs/common";
import { IBcryptService } from "./bcrypt";
import { compareSync, genSalt, hashSync } from "bcrypt";

@Injectable()
export class BcryptService implements IBcryptService {
    async handleHash(data: string): Promise<string> {
        const saltRound = 10;
        const salt = await genSalt(saltRound);

        const result = hashSync(data, salt);

        return result;
    }

    handleCheck(data: string, dataEncoded: string): boolean {
        return compareSync(data, dataEncoded)
    }
}