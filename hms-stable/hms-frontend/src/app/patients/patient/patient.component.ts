import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UtilService } from 'src/app/shared/services/util.service';
import { Patient } from '../shared/patient.model';
import { PatientService } from '../shared/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  dataSource?: any;
  id?: number;
  patient?: Patient;
  patientForm = new FormControl();
  displayedColumns: string[] = ['Name', 'Age', 'Gender', 'Number'];

  constructor(public utilService: UtilService, private route: ActivatedRoute,
    private patientService: PatientService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = Number(params.get('userId'));
      if (this.id) {
        // load patient details by id
        this.patientService.getPatientByUserId(Number(this.id)).subscribe({
          next: ((response: Patient) => {
            this.patient = response;
            this.patientForm.setValue(response);
            this.dataSource = [this.patient];
          }),
          error: (err: HttpErrorResponse) => {
            console.log(err.error.message);
          }
        });
      }
    });
  }

  // go to appointment page
  addAppointment() {
    this.router.navigate([`appointment/new`], { relativeTo: this.route, queryParams: { patientId: this.patient?.id } });
  }

  // go to patient page for editing the patient details
  editPatient() {
    this.router.navigate(['edit', this.patient?.id], { relativeTo: this.route });

  }
}
