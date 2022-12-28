import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BloodGroup } from 'src/app/shared/constants/blood-group.enum';
import { Gender } from 'src/app/shared/constants/gender.enum';
import { CardDetails } from 'src/app/shared/models/card-details.model';
import { User } from 'src/app/shared/models/user.model';
import { UtilService } from 'src/app/shared/services/util.service';
import { Validator } from 'src/app/shared/validator';
import { Patient } from '../shared/patient.model';
import { PatientService } from '../shared/patient.service';

@Component({
  selector: 'app-save-patient',
  templateUrl: './save-patient.component.html',
  styleUrls: ['./save-patient.component.css']
})
export class SavePatientComponent implements OnInit {
  genders = Object.keys(Gender).filter(key => isNaN(Number(key)));
  bloodGroups = Object.keys(BloodGroup).filter(key => isNaN(Number(key)));
  patient?: Patient;
  userId?: number;

  // patient form with validators initialization (used in html)
  patientForm = this.formBuilder.group({
    id: [''],
    name: ['', Validators.required],
    age: ['', [Validators.required, Validators.min(1)]],
    bloodGroup: ['', Validators.required],
    gender: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    contactNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')]],
    password: ['', [Validators.required, Validator.createPasswordStrengthValidator()]],
    confirmPassword: ['', [Validators.required, Validator.createPasswordStrengthValidator()]]
  }, {
    validators:
      [Validator.passwordValidator()]
  });

  paymentForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    cardNumber: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16), Validators.pattern('^[0-9]*$')]],
    cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
    expiry: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/?(2[3-9]|[3-9][0-9])$')]]
  });

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute,
    private patientService: PatientService, public utilService: UtilService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.userId = Number(params.get('userId'));
      // get patient details to edit i.e when user id is present in url
      if (this.userId) {
        this.patientService.getPatientByUserId(this.userId).subscribe({
          next: ((respose: Patient) => {
            this.patient = respose;
            this.updateFormContent(this.patient);
          }),
          error: (err: HttpErrorResponse) => {
            console.log(err.error.message);
          }
        });
      }
    });
  }

  // save patient details from form
  savePatient() {
    const patient: Patient = {};
    patient.gender = this.patientForm.get('gender')?.value || '';
    patient.age = Number(this.patientForm.get('age')?.value);
    patient.bloodGroup = this.patientForm.get('bloodGroup')?.value || '';
    patient.email = this.patientForm.get('email')?.value || '';
    patient.number = this.patientForm.get('contactNumber')?.value?.toString() || '';
    patient.name = this.patientForm.get('name')?.value || '';
    const user: User = { role: 'PATIENT' };
    user.loginId = this.patientForm.get('email')?.value || '';
    user.password = this.patientForm.get('password')?.value || '';

    const cardDetails: CardDetails = {};
    cardDetails.firstName = this.paymentForm.get('firstName')?.value || '';
    cardDetails.lastName = this.paymentForm.get('lastName')?.value || '';
    cardDetails.cardNumber = this.paymentForm.get('cardNumber')?.value || '';
    cardDetails.cvv = this.paymentForm.get('cvv')?.value || '';
    cardDetails.expiry = this.paymentForm.get('expiry')?.value || '';

    if (this.patient?.id) {
      patient.id = this.patient?.id;
      user.id = this.patient?.user?.id;

      if (this.patient?.cardDetails?.id) {
        cardDetails.id = this.patient?.cardDetails?.id;
      }
    }
    patient.user = user;
    patient.cardDetails = cardDetails;

    //service call to patient api
    this.patientService.savePatient(patient).subscribe({
      next: (() => {
        if (this.patient?.id) {
          this.utilService.openSnackBar("patient updated", "ok");
        } else {
          this.utilService.openSnackBar("patient created", "ok");
        }
        this.router.navigate(['home/patient-login']);
      }),
      error: (err: HttpErrorResponse) => {
        this.utilService.openErrorSnackbar(err.error.message, 'ok');
      }
    });
  }

  // set the data to form for editing
  updateFormContent(patient: Patient) {
    this.patientForm.get('id')?.setValue(patient.id as unknown as string);
    this.patientForm.get('name')?.setValue(patient.name!);
    this.patientForm.get('gender')?.setValue(patient.gender!);
    this.patientForm.get('age')?.setValue(patient.age as unknown as string);
    this.patientForm.get('email')?.setValue(patient.email!);
    this.patientForm.get('contactNumber')?.setValue(patient.number!);
    this.patientForm.get('bloodGroup')?.setValue(patient.bloodGroup!);
    this.patientForm.get('password')?.setValue(patient?.user?.password!);
    this.patientForm.get('confirmPassword')?.setValue(patient?.user?.password!);

    this.paymentForm.get('firstName')?.setValue(patient.cardDetails?.firstName as string);
    this.paymentForm.get('lastName')?.setValue(patient.cardDetails?.lastName as string);
    this.paymentForm.get('cardNumber')?.setValue(patient.cardDetails?.cardNumber as string);
    this.paymentForm.get('cvv')?.setValue(patient.cardDetails?.cvv as string);
    this.paymentForm.get('expiry')?.setValue(patient.cardDetails?.expiry as string);
    this.patientForm?.markAllAsTouched();
  }

  // angular utility used for select tags
  compareBy(optionOne: any, optionTwo: any): boolean {
    return optionOne === optionTwo;
  }
}
