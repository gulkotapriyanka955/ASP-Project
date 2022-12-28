import { Doctor } from "./doctor.model";

export interface DoctorUnavailability {
    id?: number;
    date?: string;
    doctor?: Doctor;
}