import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Appointment } from 'src/app/appointments/shared/appointment.model';
import { AppointmentService } from 'src/app/appointments/shared/appointment.service';
import { Patient } from '../../shared/patient.model';

@Component({
  selector: 'app-patient-history',
  templateUrl: './patient-history.component.html',
  styleUrls: ['./patient-history.component.css']
})
export class PatientHistoryComponent implements OnInit {

  displayedColumns: string[] = ['Doctor Name', 'Issue', 'Date', 'Prescription'];
  dataSource: MatTableDataSource<Appointment>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Patient, private appointmentService: AppointmentService) { 
    this.dataSource = new MatTableDataSource([{}]);

  }

  ngOnInit(): void {
    if (this.data) {
      this.appointmentService.getAppointmentsByPatientId(this.data?.id!).subscribe({
        next: ((respose: Appointment[]) => {
          this.dataSource.data = respose;
        }),
        error: (err: HttpErrorResponse) => {
          console.log(err.error.message);
        }
      });
    }
  }

}
