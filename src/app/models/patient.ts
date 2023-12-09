import { GenderEnum } from "./enum/gender.enum";

export interface Patient {
    id?: string;
    identification: string;
    name: string;
    lastname: string;
    age: number;
    gender: GenderEnum;
    email?: string;
    phone?: string;
    address?: string;
    photo?: string;
    created_at?: string;
    is_delete: boolean;
}
