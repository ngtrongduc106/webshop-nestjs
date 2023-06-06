export interface IBcryptService {
    handleHash(data: string): Promise<string>

    handleCheck(data: string, dataEncoded: string): boolean
}