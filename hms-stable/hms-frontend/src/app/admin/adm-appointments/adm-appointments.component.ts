import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from 'src/app/appointments/shared/appointment.model';
import { AppointmentService } from 'src/app/appointments/shared/appointment.service';
import { UserService } from 'src/app/shared/services/user.service';
import { UtilService } from 'src/app/shared/services/util.service';

@Component({
  selector: 'app-adm-appointments',
  templateUrl: './adm-appointments.component.html',
  styleUrls: ['./adm-appointments.component.css']
})
export class AdmAppointmentsComponent implements OnInit {
  displayedColumns: string[] = ['Doctor', 'Patient', 'Issue', 'Fee', 'Scheduled Slot', 'Status', 'Action'];
  dataSource: MatTableDataSource<Appointment>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private appointmentService: AppointmentService,
    private router: Router, public userService: UserService, private route: ActivatedRoute,
    private utilService: UtilService) {
    this.dataSource = new MatTableDataSource([{}]);
  }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    // api all to get all appointments 
    this.appointmentService.getAllAppointments().subscribe({
      next: ((respose: Appointment[]) => {
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
  editAppointment(appointment?: Appointment): void {
    this.router.navigate(['appointment/edit', appointment?.id], { relativeTo: this.route });
  }

  // api call to delete a doctor 
  deleteAppointment(id: number) {
    this.appointmentService.deleteAppointment(id).subscribe({
      next: (() => {
        this.utilService.openSnackBar("appointment deleted successfully", "ok");
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