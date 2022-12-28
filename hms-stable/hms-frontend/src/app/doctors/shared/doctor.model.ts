import { Appointment } from "src/app/appointments/shared/appointment.model";
import { Gender } from "src/app/shared/constants/gender.enum";
import { Specialization } from "src/app/shared/models/specialization.model";
import { User } from "src/app/shared/models/user.model";
import { DoctorUnavailability } from "./doctor-unavailability.model";

export interface Doctor {
  id?: number;
  name?: string;
  age?: number;
  gender?: string;
  email?: string;
  number?: string;
  user?: User;
  fee?: number;
  specialization?: Specialization;
  appointments?: Appointment[];
  unavailabilities?: DoctorUnavailability[];
}