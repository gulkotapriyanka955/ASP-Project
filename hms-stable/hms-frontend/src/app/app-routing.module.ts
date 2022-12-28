import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { SaveAppointmentComponent } from './appointments/save-appointment/save-appointment.component';
import { DoctorComponent } from './doctors/doctor/doctor.component';
import { SaveDoctorComponent } from './doctors/save-doctor/save-doctor.component';
import { ForgotPasswordComponent } from './home/forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { ResetPasswordComponent } from './home/reset-password/reset-password.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { PatientComponent } from './patients/patient/patient.component';
import { SavePatientComponent } from './patients/save-patient/save-patient.component';
import { UserService } from './shared/services/user.service';

// routes(url paths) for navigation from one component to another
const routes: Routes = [
  { path: '', redirectTo: "/home", pathMatch: "full" },
  {
    path: "home",
    children: [
      // { path: '', redirectTo: 'admin-login', pathMatch: 'prefix' },
      { path: '', component: WelcomeComponent },
      { path: 'doctor-login', component: HomeComponent },
      { path: 'patient-login', component: HomeComponent },
      { path: 'admin-login', component: HomeComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent }
    ]
  },

  { path: 'reset-password/:token', component: ResetPasswordComponent },
  { path: 'add-patient', component: SavePatientComponent },
  { path: 'add-doctor', component: SaveDoctorComponent },

  {
    path: 'admin/:id', children: [

      { path: '', component: AdminComponent },

      { path: 'edit-patient/:userId', component: SavePatientComponent },

      { path: 'edit-doctor/:userId', component: SaveDoctorComponent },

      { path: "appointment/edit/:id", component: SaveAppointmentComponent },

    ], canActivate: [UserService]
  },


  {
    path: 'patient/:userId',
    children: [

      { path: '', component: PatientComponent },

      { path: 'edit/:id', component: SavePatientComponent },

      { path: "appointment/new", component: SaveAppointmentComponent },

      { path: "appointment/edit/:id", component: SaveAppointmentComponent },


    ], canActivate: [UserService]
  },

  {
    path: 'doctor/:userId',
    children: [

      { path: '', component: DoctorComponent },

      { path: 'edit/:id', component: SaveDoctorComponent },

      { path: "appointment/prescribe/:id", component: SaveAppointmentComponent },

    ], canActivate: [UserService]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
