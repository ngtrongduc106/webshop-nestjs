import { HttpException, HttpStatus } from "@nestjs/common";

export class EmailOrPasswordIncorret extends HttpException {
    constructor(
        msg?: string,
        status?: HttpStatus
    ) {
        super(msg || "Email or Password Incorret", status || HttpStatus.BAD_REQUEST)
    }
}

export class EmailAlreadyExists extends HttpException {
    constructor(
        msg?: string,
        status?: HttpStatus
    ) {
        super(msg || "Email already exist", status || HttpStatus.BAD_REQUEST)
    }
}