import { BloodGroup } from "src/app/shared/constants/blood-group.enum";
import { Gender } from "src/app/shared/constants/gender.enum";
import { CardDetails } from "src/app/shared/models/card-details.model";
import { User } from "src/app/shared/models/user.model";

export interface Patient {
    id?: number;
    name?: string;
    age?: number;
    bloodGroup?: string;
    gender?: string;
    email?: string;
    number?: string;
    user?: User;
    cardDetails?: CardDetails;
}