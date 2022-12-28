import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor } from 'src/app/doctors/shared/doctor.model';
import { DoctorService } from 'src/app/doctors/shared/doctor.service';
import { UserService } from 'src/app/shared/services/user.service';
import { UtilService } from 'src/app/shared/services/util.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'age', 'specialization', 'fee', 'number', 'email', 'action'];
  dataSource: MatTableDataSource<Doctor>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private doctorService: DoctorService,
    private router: Router, public userService: UserService, private route: ActivatedRoute,
    private utilService: UtilService) {
    this.dataSource = new MatTableDataSource([{}]);
  }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    // api all to get all doctors 
    this.doctorService.getAllDoctors().subscribe({
      next: ((respose: Doctor[]) => {
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

  // go to dotor page for editing
  editDoctor(doctor?: Doctor): void {
    this.router.navigate(['edit-doctor', doctor?.user?.id], { relativeTo: this.route });
  }

  // api call to delete a doctor 
  deleteDoctor(id: number) {
    this.doctorService.deleteDoctor(id).subscribe({
      next: (() => {
        this.utilService.openSnackBar("doctor deleted successfully", "ok");
        this.refreshPage();
      }),
      error: (err: HttpErrorResponse) => {
        this.utilService.openErrorSnackbar(err.error.message, 'ok');
      }
    });
  }

  //reload the page to update the details
  refreshPage() {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParamsHandling: 'merge'
      }
    );
  }
}
