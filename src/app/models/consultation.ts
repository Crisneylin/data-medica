import { Conditions } from "./conditions";

export interface Consultation {
    id?: string;
    date: string;
    diagnostic?: Conditions[];
    comment?: string;
    patientId: string;
    is_delete: boolean;
}
