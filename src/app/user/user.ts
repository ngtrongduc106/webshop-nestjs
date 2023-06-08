import { User_GetProfile_Details, User_GetProfile_Result } from "src/utils/type";

export interface IUserService {
    handleGetProfile(data: User_GetProfile_Details): Promise<User_GetProfile_Result>
}