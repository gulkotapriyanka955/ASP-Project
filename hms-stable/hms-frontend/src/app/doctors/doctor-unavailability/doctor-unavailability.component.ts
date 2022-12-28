import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DateFilterFn } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DoctorUnavailability } from '../shared/doctor-unavailability.model';
import { Doctor } from '../shared/doctor.model';
import { DoctorService } from '../shared/doctor.service';

@Component({
  selector: 'app-doctor-unavailability',
  templateUrl: './doctor-unavailability.component.html',
  styleUrls: ['./doctor-unavailability.component.css']
})
export class DoctorUnavailabilityComponent implements OnInit {
  displayedColumns: string[] = ['id', 'date', 'actions'];
  dataSource: MatTableDataSource<DoctorUnavailability>;
  doctor?: Doctor;

  editId = -1;
  minDate = new Date();
  date = new Date();
  newDate = new Date();
  unavailability?: DoctorUnavailability;

  constructor(private doctorService: DoctorService, private formBuilder: FormBuilder, public dialogRef: MatDialogRef<DoctorUnavailabilityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Doctor) {
    this.dataSource = new MatTableDataSource([{}]);
   }

   doctorForm = this.formBuilder.group({
    id: [''],
    date: ['']
   });

  ngOnInit(): void {
    if (this.data) {
      this.doctor = this.data;
      this.getUnavailabilities();
    }
  }

  getUnavailabilities() {
    this.doctorService.getDoctorUnavailabilty(Number(this.doctor?.id)).subscribe({
      next: ((respose: DoctorUnavailability[]) => {
        this.dataSource.data = respose;
      }),
      error: (err: HttpErrorResponse) => {
        console.log(err.error.message);
      }
    });
  }

  editElement(unavailability: DoctorUnavailability) {
    let date: string[] = [];  //date format change
    date = unavailability.date!.split('/');
    this.date = new Date(Number(date[2]), Number(date[1]) - 1, Number(date[0]));

    this.editId = Number(unavailability.id);
    //this.date = new Date(unavailability.date!);
  }

  cancelEdit() {
    this.editId = -1;
  }

  saveUnavailability(element?: DoctorUnavailability) {
    this.unavailability = {};
    this.unavailability.date = this.newDate.toLocaleDateString();
    this.unavailability.doctor = this.doctor;

    if (element){
      this.unavailability.id = Number(element.id);
      this.unavailability.date = this.date.toLocaleDateString();
    }

    this.doctorService.saveUnavailability(this.unavailability).subscribe({
      next: ((respose: void) => {
        this.editId = -1;
        this.getUnavailabilities();
      }),
      error: (err: HttpErrorResponse) => {
        console.log(err.error.message);
      }
    });
  }

  deleteUnavailability(element?: DoctorUnavailability) {
    this.doctorService.deleteUnavailability(Number(element?.id)).subscribe({
      next: ((respose: void) => {
        this.getUnavailabilities();
      }),
      error: (err: HttpErrorResponse) => {
        console.log(err.error.message);
      }
    });
  }
}
