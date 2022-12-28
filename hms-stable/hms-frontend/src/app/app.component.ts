import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'hms-frontend';

  constructor(public dialog: MatDialog, public userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
  }

  //go to doctor registration page
  openDoctorRegisterForm(): void {
    this.router.navigate(['add-doctor']);
  }

  //go to patient registration page
  openPatientRegisterForm(): void {
    this.router.navigate(['add-patient']);
  }
}
