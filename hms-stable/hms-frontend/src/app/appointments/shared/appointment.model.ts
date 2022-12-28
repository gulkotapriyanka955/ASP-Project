import { Doctor } from "src/app/doctors/shared/doctor.model";
import { Patient } from "src/app/patients/shared/patient.model";
import { Issue } from "src/app/shared/models/issue.model";

export interface Appointment {
    id?: number;
    patient?: Patient;
    doctor?: Doctor;
    prescription?: string;
    status?: string;
    issue?: Issue;
    date?: string;
    time?: string;
}