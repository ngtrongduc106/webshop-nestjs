import { Injectable } from "@nestjs/common";
import { compareSync, genSalt, hash, hashSync } from "bcrypt";

@Injectable()
export class BcryptService {
    async handleEncrypt(payLoad: string) {
        const salt = await genSalt(10);

        const result = hashSync(payLoad, salt);

        return result
    }

    handleCheck(encrypted: string, data: string): boolean {
        const result = compareSync(data, encrypted);

        return result
    }
}