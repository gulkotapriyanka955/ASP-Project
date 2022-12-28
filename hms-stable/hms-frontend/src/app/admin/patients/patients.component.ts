import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from 'src/app/patients/shared/patient.model';
import { PatientService } from 'src/app/patients/shared/patient.service';
import { UserService } from 'src/app/shared/services/user.service';
import { UtilService } from 'src/app/shared/services/util.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'age', 'gender', 'number', 'email', 'action'];
  dataSource: MatTableDataSource<Patient>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private patientService: PatientService, private route: ActivatedRoute,
    private router: Router, public userService: UserService, private utilService: UtilService) {
    this.dataSource = new MatTableDataSource([{}]);
  }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    //api call to get all doctors
    this.patientService.getAllPatients().subscribe({
      next: ((respose: Patient[]) => {
        this.dataSource.data = respose;
      }),
      error: (err: HttpErrorResponse) => {
        console.log(err.error.message);
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // go to edit patient page
  editPatient(patient?: Patient): void {
    this.router.navigate(['edit-patient', patient?.user?.id], { relativeTo: this.route });
  }

  // api call to delete a patient
  deletePatient(id: number) {
    this.patientService.deletePatient(id).subscribe({
      next: (() => {
        this.utilService.openSnackBar("patient deleted successfully", "ok");
        this.refreshPage();
      }),
      error: (err: HttpErrorResponse) => {
        this.utilService.openErrorSnackbar('could nod delete patient', 'ok');
      }
    });
  }

  // reload page after deleting or updating the data 
  refreshPage() {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParamsHandling: 'merge'
      });
  }
}
