import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientHistoryComponent } from '../patients/patient/patient-history/patient-history.component';
import { Patient } from '../patients/shared/patient.model';
import { UserService } from '../shared/services/user.service';
import { UtilService } from '../shared/services/util.service';
import { Appointment } from './shared/appointment.model';
import { AppointmentService } from './shared/appointment.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit, OnChanges {
  @Input() patientId?: any;
  @Input() doctorId?: any;
  appointmentsDataSource?: any;
  prescription = '';
  editPrescription = false;
  editId = -1;
  appointmentColumns: string[] = ['Doctor Name', 'Issue', 'Scheduled Slot', 'Status', 'Prescription', 'Actions'];


  constructor(private appointmentService: AppointmentService, private router: Router, private dialog: MatDialog,
    private route: ActivatedRoute, public userService: UserService, private utilService: UtilService) { }

  ngOnChanges() {
    this.getAppointments();
  }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.getAppointments();
  }

  // get list of appointments based on logged in user
  getAppointments() {
    if (this.patientId) {
      this.appointmentService.getAppointmentsByPatientId(this.patientId).subscribe({
        next: ((respose: Appointment[]) => {
          this.appointmentsDataSource = respose;
        }),
        error: (err: HttpErrorResponse) => {
          console.log(err.error.message);
        }
      });
    }
    if (this.doctorId) {
      this.appointmentService.getAppointmentsByDoctorId(this.doctorId).subscribe({
        next: ((respose: Appointment[]) => {
          this.appointmentsDataSource = respose.filter(a =>  a.status !== "CANCELLED");
        }),
        error: (err: HttpErrorResponse) => {
          console.log(err.error.message);
        }
      });
    }
  }

  // enable prescrition input field for doctor to add his comments
  enablePrescription(appointment: Appointment) {
    this.editPrescription = true;
    this.editId = Number(appointment.id);
    this.prescription = appointment?.prescription || '';
  }

  // save the edited/added prescription by doctor
  savePrescription(appointment: Appointment) {
    appointment.prescription = this.prescription;
    this.appointmentService.saveAppointment(appointment).subscribe({
      next: (() => {
        this.utilService.openSnackBar("prescription added", "ok");
        this.router.navigate(
          [],
          {
            relativeTo: this.route,
            queryParamsHandling: 'merge'
          });
      }),
      error: (err: HttpErrorResponse) => {
        console.log(err.error.message);
      }
    });
  }

  //cancel edit mode of prescription
  cancelPrescription() {
    this.editPrescription = false;
    this.editId = -1;
  }

  // cancel an appointmen booked by a patient
  cancelAppointment(appointment: Appointment) {
    appointment.status = "CANCELLED"
    this.appointmentService.saveAppointment(appointment).subscribe({
      next: (() => {
        this.utilService.openSnackBar("appointment cancelled", "ok");
        this.router.navigate(
          [],
          {
            relativeTo: this.route,
            queryParamsHandling: 'merge'
          });
      }),
      error: (err: HttpErrorResponse) => {
        this.utilService.openErrorSnackbar(err.error.message, 'ok');
      }
    });
  }

  // close aappointment after completion of consulting
  completeAppointment(appointment: Appointment) {
    appointment.status = "COMPLETED"
    this.appointmentService.saveAppointment(appointment).subscribe({
      next: (() => {
        this.utilService.openSnackBar("appointment closed", "ok");
        this.router.navigate(
          [],
          {
            relativeTo: this.route,
            queryParamsHandling: 'merge'
          });
      }),
      error: (err: HttpErrorResponse) => {
        this.utilService.openErrorSnackbar(err.error.message, 'ok');
      }
    });
  }

  openPatientHistory(patient: Patient) {
    const dialogRef = this.dialog.open(PatientHistoryComponent, {
      width: '100%',
      data: patient,
    });
  }
}
