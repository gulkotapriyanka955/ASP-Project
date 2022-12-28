import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { UtilService } from 'src/app/shared/services/util.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  email = new FormControl('');

  constructor(public userService: UserService, private utilService: UtilService,
    private router: Router) { }

  ngOnInit(): void {
    this.email.setValidators(Validators.required);
    this.email.setValidators(Validators.email);
  }

  // api call for sending email of reset link
  sendResetEmail() {
    this.userService.sendResetEmail(this.email.value!).subscribe({
      next: (() => {
        this.utilService.openSnackBar('email sent successfully', "ok");
        this.router.navigate(['/home']);
      }),
      error: (err: HttpErrorResponse) => {
        this.utilService.openErrorSnackbar(err.error.message, "ok");
      }
    });
  }
}
