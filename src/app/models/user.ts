import { GenderEnum } from "./enum/gender.enum";

export interface User {
    id?: string;
    userAuthId?: string;
    firstName: string;
    lastName: string;
    gender: GenderEnum;
    email: string;
    phone: string;
    created_at?: string;
    is_active: boolean;
}
