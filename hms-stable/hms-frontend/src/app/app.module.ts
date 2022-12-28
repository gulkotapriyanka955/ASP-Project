import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { PatientsComponent } from './admin/patients/patients.component';
import { DoctorsComponent } from './admin/doctors/doctors.component';
import { SavePatientComponent } from './patients/save-patient/save-patient.component';
import { SaveDoctorComponent } from './doctors/save-doctor/save-doctor.component';
import { MatStepperModule } from '@angular/material/stepper';
import { PatientComponent } from './patients/patient/patient.component';
import { DoctorComponent } from './doctors/doctor/doctor.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { SaveAppointmentComponent } from './appointments/save-appointment/save-appointment.component';
import { MatNativeDateModule } from '@angular/material/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ForgotPasswordComponent } from './home/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './home/reset-password/reset-password.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { AdmAppointmentsComponent } from './admin/adm-appointments/adm-appointments.component';
import { DoctorUnavailabilityComponent } from './doctors/doctor-unavailability/doctor-unavailability.component';
import { PatientHistoryComponent } from './patients/patient/patient-history/patient-history.component';


@NgModule({
  declarations: [
    AppComponent,
    PatientsComponent,
    DoctorsComponent,
    HomeComponent,
    AdminComponent,
    SavePatientComponent,
    SaveDoctorComponent,
    PatientComponent,
    DoctorComponent,
    AppointmentsComponent,
    SaveAppointmentComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    WelcomeComponent,
    AdmAppointmentsComponent,
    DoctorUnavailabilityComponent,
    PatientHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    MatCardModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTabsModule,
    MatSnackBarModule,
    MatStepperModule, 
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule
  ],
  providers: [MatSnackBar],
  bootstrap: [AppComponent]
})
export class AppModule { }
