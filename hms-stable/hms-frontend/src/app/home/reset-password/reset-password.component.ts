import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import { UtilService } from 'src/app/shared/services/util.service';
import { Validator } from 'src/app/shared/validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  token?: string;
  user?: User;
  // form intialization with validators
  resetPasswordForm = this.fb.group({
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  }, {
    validators: [Validator.passwordValidator()]
  });

  constructor(private userService: UserService, private route: ActivatedRoute,
    private fb: FormBuilder, private utilService: UtilService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.token = params.get('token')?.toString();
      if (this.token) {
        // api call to get user details using the reset password token
        this.userService.getUserByToken(this.token).subscribe({
          next: ((response: User) => {
            this.user = response;
          }),
          error: (err: HttpErrorResponse) => {
            console.log(err.error.message);
          }
        });
      }
    });
  }

  // update password of the user
  resetPassword() {
    const user: User = {};
    user.password = this.resetPasswordForm.get('password')?.value?.toString();
    user.id = this.user?.id;
    user.loginId = this.user?.loginId;
    user.role = this.user?.role;

    this.userService.saveUser(user).subscribe({
      next: ((response: User) => {
        this.utilService.openSnackBar("password reset done successfully", "ok");
        this.router.navigate(['/home']);

      })
    });
  }
}
