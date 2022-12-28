import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Gender } from 'src/app/shared/constants/gender.enum';
import { Specialization } from 'src/app/shared/models/specialization.model';
import { User } from 'src/app/shared/models/user.model';
import { SpecializationService } from 'src/app/shared/services/specialization.service';
import { UtilService } from 'src/app/shared/services/util.service';
import { Validator } from 'src/app/shared/validator';
import { Doctor } from '../shared/doctor.model';
import { DoctorService } from '../shared/doctor.service';

@Component({
  selector: 'app-save-doctor',
  templateUrl: './save-doctor.component.html',
  styleUrls: ['./save-doctor.component.css']
})
export class SaveDoctorComponent implements OnInit {

  genders = Object.keys(Gender).filter(key => isNaN(Number(key)));
  doctor?: Doctor;
  userId?: number;
  specializations?: Specialization[] = [];

  //doctor form intialization
  doctorForm = this.formBuilder.group({
    id: [''],
    name: ['', Validators.required],
    age: ['', [Validators.required, Validators.min(18)]],
    gender: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    number: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')]],
    fee: [0, Validators.required],
    specialization: ['', Validators.required],
    password: ['', [Validators.required, Validator.createPasswordStrengthValidator()]],
    confirmPassword: ['', [Validators.required, Validator.createPasswordStrengthValidator()]]
  }, {
    validators:
      [Validator.passwordValidator()]
  });

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute,
    private doctorService: DoctorService, public utilService: UtilService,
    private specializationService: SpecializationService) { }

  ngOnInit(): void {
    //api call to load all specializations to the form
    this.specializationService.getAllSpecializations().subscribe({
      next: ((respose: Specialization[]) => {
        this.specializations = respose;
      }),
      error: (err: HttpErrorResponse) => {
        console.log(err.error.message);
      }
    });
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.userId = Number(params.get('userId'));
      if (this.userId) {
        // api call to get doctor details for editing his details
        this.doctorService.getDoctorByUserId(this.userId).subscribe({
          next: ((respose: Doctor) => {
            this.doctor = respose;
            this.updateFormContent(this.doctor);
          }),
          error: (err: HttpErrorResponse) => {
            console.log(err.error.message);
          }
        });
      }
    });
  }

  //  doctor details from the form to objcet and then do an api call to save 
  saveDoctor() {
    const doctor: Doctor = {};
    doctor.gender = this.doctorForm.get('gender')?.value || '';
    doctor.age = Number(this.doctorForm.get('age')?.value);
    doctor.email = this.doctorForm.get('email')?.value || '';
    doctor.number = this.doctorForm.get('number')?.value?.toString() || '';
    doctor.name = this.doctorForm.get('name')?.value || '';
    doctor.fee = this.doctorForm.get('fee')?.value || 0;
    doctor.specialization = this.doctorForm.get('specialization')?.value as Specialization;
    const user: User = { role: 'DOCTOR' };
    user.loginId = this.doctorForm.get('email')?.value || '';
    user.password = this.doctorForm.get('password')?.value || '';

    if (this.doctor?.id) {
      doctor.id = this.doctor?.id;
      user.id = this.doctor?.user?.id;
    }
    doctor.user = user;

    this.doctorService.saveDoctor(doctor).subscribe({
      next: (() => {
        if (this.doctor?.id) {
          this.utilService.openSnackBar("doctor updated", "ok");
        } else {
          this.utilService.openSnackBar("doctor created", "ok");
        }
        this.router.navigate(['home/doctor-login']);
      }),
      error: (err: HttpErrorResponse) => {
        console.log(err.error.message);
      }
    });
  }

  // set doctor content to form for editing his details
  updateFormContent(doctor: Doctor) {
    this.doctorForm.get('id')?.setValue(doctor.id as unknown as string);
    this.doctorForm.get('name')?.setValue(doctor.name!);
    this.doctorForm.get('gender')?.setValue(doctor.gender!);
    this.doctorForm.get('specialization')?.setValue(doctor.specialization as string);
    this.doctorForm.get('age')?.setValue(doctor.age?.toString() as string);
    this.doctorForm.get('email')?.setValue(doctor.email as string);
    this.doctorForm.get('number')?.setValue(doctor.number?.toString() as string);
    this.doctorForm.get('fee')?.setValue(Number(doctor.fee));
    this.doctorForm.get('password')?.setValue(doctor?.user?.password as string);
    this.doctorForm.get('confirmPassword')?.setValue(doctor?.user?.password as string);
    this.doctorForm?.markAllAsTouched();
  }

  matchPasswords(control: AbstractControl) {
    const pass = control.value.password;
    const confirmPass = control.value.confirmPassword;
    return pass === confirmPass ? true : false;
  }

  compareBy(optionOne: any, optionTwo: any): boolean {
    return optionOne.id === optionTwo.id;
  }

  compareGenderBy(optionOne: any, optionTwo: any): boolean {
    return optionOne === optionTwo;
  }
}
