import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PatientHistoryComponent } from 'src/app/patients/patient/patient-history/patient-history.component';
import { Patient } from 'src/app/patients/shared/patient.model';
import { UtilService } from 'src/app/shared/services/util.service';
import { DoctorUnavailabilityComponent } from '../doctor-unavailability/doctor-unavailability.component';
import { Doctor } from '../shared/doctor.model';
import { DoctorService } from '../shared/doctor.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  dataSource?: any;
  appointmentsDataSource?: any;
  id?: number;
  doctor?: Doctor;

  displayedColumns: string[] = ['Name', 'Specialization', 'Gender', 'Number'];
  appointmentColumns: string[] = ['Doctor Name', 'Issue', 'Scheduled Slot', 'Status', 'Prescription', 'Actions'];

  constructor(public utilService: UtilService, private route: ActivatedRoute,
    private doctorService: DoctorService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = Number(params.get('userId'));
      if (this.id) {
        // api call to get doctor by user id
        this.doctorService.getDoctorByUserId(Number(this.id)).subscribe({
          next: ((response: Doctor) => {
            this.doctor = response;
            this.dataSource = [this.doctor];
          }),
          error: (err: HttpErrorResponse) => {
            this.utilService.openErrorSnackbar(err.error.message, 'ok');
          }
        });
      }
    });
  }

  editDoctor(): void {
    this.router.navigate(['edit', this.doctor?.id], { relativeTo: this.route });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DoctorUnavailabilityComponent, {
      width: '100%',
      data: this.doctor,
    });
  }
}
