import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../shared/models/user.model';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  invalidDetails?: boolean;
  user?: User;
  // login form intialization
  loginForm = this.fb.group({
    loginId: ['', Validators.required],
    password: ['', Validators.required]
  });
  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router,
    public userService: UserService) { }

  ngOnInit(): void {
    if (this.userService.isUserLoggedIn()) {
      this.navigateToRespectivePath();
    }
    this.user = {};
    // set the user role based on the url (login button click)
    if (this.activatedRoute.routeConfig?.path === 'patient-login') {
      this.user.role = 'PATIENT';
    } else if (this.activatedRoute.routeConfig?.path === 'doctor-login') {
      this.user.role = 'DOCTOR';
    } else if (this.activatedRoute.routeConfig?.path === 'admin-login') {
      this.user.role = 'ADMIN';
    }
  }

  //service to user api
  login() {
    this.invalidDetails = false;
    this.user!.loginId = this.loginForm.get('loginId')?.value || '';
    this.user!.password = this.loginForm.get('password')?.value || '';
    this.userService.login(this.user!).subscribe({
      next: ((response: User) => {
        if (response === null) {
          this.invalidDetails = true;
        } else {
          this.user = response;
          sessionStorage.setItem('user', response.id!.toString());
          sessionStorage.setItem('role', response.role!);
          this.navigateToRespectivePath();
        }
      }),
      error: (err: HttpErrorResponse) => {
        this.invalidDetails = true;
      }
    });
  }

  // go to the respective page of the logged in user i.e admin or patient or doctor
  navigateToRespectivePath() {
    const user = Number(sessionStorage.getItem('user') || '');
    const role = sessionStorage.getItem('role');
    if (role === 'PATIENT') {
      this.router.navigate([`/patient/${user}`], { relativeTo: this.activatedRoute });
    } else if (role === 'DOCTOR') {
      this.router.navigate([`/doctor/${user}`], { relativeTo: this.activatedRoute });
    } else if (role === 'ADMIN') {
      this.router.navigate([`admin/${user}`]);
    }
  }
}
