import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DoctorUnavailability } from 'src/app/doctors/shared/doctor-unavailability.model';
import { Doctor } from 'src/app/doctors/shared/doctor.model';
import { DoctorService } from 'src/app/doctors/shared/doctor.service';
import { Patient } from 'src/app/patients/shared/patient.model';
import { PatientService } from 'src/app/patients/shared/patient.service';
import { Issue } from 'src/app/shared/models/issue.model';
import { IssueService } from 'src/app/shared/services/issue.service';
import { UtilService } from 'src/app/shared/services/util.service';
import { Appointment } from '../shared/appointment.model';
import { AppointmentService } from '../shared/appointment.service';

@Component({
  selector: 'app-save-appointment',
  templateUrl: './save-appointment.component.html',
  styleUrls: ['./save-appointment.component.css']
})
export class SaveAppointmentComponent implements OnInit {
  appointment?: Appointment;
  appointmentId?: number;
  patientId?: number;
  issues?: Issue[] = [];
  doctors?: Doctor[] = [];
  minDate = new Date();
  timeIntervals = ['9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
    '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM'];

    //appointment form intialization
  appointmentForm = this.formBuilder.group({
    id: [''],
    issue: ['' as Issue, Validators.required],
    status: ['BOOKED', Validators.required],
    doctor: ['' as Doctor, Validators.required],
    fee: [0],
    date: ['' as unknown as Date, Validators.required],
    time: ['', Validators.required],
    patient: ['' as Patient, Validators.required],
    prescription: ['']
  });
//payment form intialization
  paymentForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    cardNumber: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16), Validators.pattern('^[0-9]*$')]],
    cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
    expiry: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/?(2[3-9]|[3-9][0-9])$')]]
  });

  unavailableDates: Date[] = [];
  dateFilter = (d: Date | null) => {
    const time=d?.getTime();
    return !this.unavailableDates.find(x=>x.getTime()===time);
  }

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute,
    private appointmentservice: AppointmentService, public utilService: UtilService, private doctorService: DoctorService,
    private issueService: IssueService, private patientService: PatientService) { }

  ngOnInit(): void {
    // load all issues for selection
    this.getAllIssues();
    this.appointmentForm.get('doctor')?.disable();
    this.appointmentForm.get('fee')?.disable();
    this.appointmentForm.get('time')?.disable();
    // load details based to edit already booked appointment or new appointment creation
    if (this.route.routeConfig?.path?.includes('new')) {
      this.getPatientDetails();
    } else if (this.route.routeConfig?.path?.includes('edit') || this.route.routeConfig?.path?.includes('prescribe')) {
      this.getAppointmentDetails();
    }

    // load doctors based on selected issue
    this.appointmentForm.get('issue')?.valueChanges.subscribe((issue) => {
      this.appointmentForm.get('doctor')?.disable();
      if (issue?.id) {
        this.doctorService.getDoctorsByIssue(issue?.id).subscribe({
          next: ((response: Doctor[]) => {
            this.doctors = response;
            this.appointmentForm.get('doctor')?.enable();
          }),
          error: (err: HttpErrorResponse) => {
            console.log(err.error.message);
          }
        });
      }
    });

    // set fee and time to form after doctor selection
    this.appointmentForm.get('doctor')?.valueChanges.subscribe((doctor) => {
      if (doctor?.id) {
        this.appointmentForm.get('fee')?.setValue(Number(doctor?.fee));
        if (this.appointmentForm.get('date')?.value) {
          this.appointmentForm.get('time')?.enable();
        }
        this.getUnavailabilities(doctor?.id);
      }
    });

    // filter available slots for booking based on date selection
    this.appointmentForm.get('date')?.valueChanges.subscribe((date) => {
      if (date) {
        this.filterTimeList(date);
      }
    });
  }

  filterTimeList(date: Date) {
    if (this.appointmentForm.get('doctor')?.value) {
      this.appointmentForm.get('doctor')?.value?.appointments?.forEach((app) => {
        if (new Date(app.date!).toDateString() === date.toDateString()) {
          this.timeIntervals = this.timeIntervals.filter((time) => time !== app.time);
        }
      });
      this.appointmentForm.get('time')?.enable();
    }
  }

  // method to get patient details from an api call to patient 
  getPatientDetails() {
    this.route.queryParams.subscribe(params => {
      this.patientId = params['patientId'];
      if (this.patientId) {
        this.patientService.getPatientById(Number(this.patientId)).subscribe({
          next: ((response: Patient) => {
            this.appointmentForm.get('patient')?.setValue(response);

            // auto fill card details
            this.setCardDetails(response);
          }),
          error: (err: HttpErrorResponse) => {
            console.log(err.error.message);
          }
        });
      }
    });
  }

  getAppointmentDetails() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.appointmentId = Number(params.get('id'));
      if (this.appointmentId) {
        this.appointmentservice.getAppointmentsById(this.appointmentId).subscribe({
          next: ((respose: Appointment) => {
            this.appointment = respose;
            this.updateFormContent(this.appointment);
          }),
          error: (err: HttpErrorResponse) => {
            console.log(err.error.message);
          }
        });
      }
    });
  }

  getUnavailabilities(id: number) {
    this.doctorService.getDoctorUnavailabilty(Number(id)).subscribe({
      next: ((respose: DoctorUnavailability[]) => {
        respose.forEach((unavailability) => {
          let dates: string[] = [], date;  //date format change
          dates = unavailability.date!.split('/');
          date = new Date(Number(dates[2]), Number(dates[1]) - 1, Number(dates[0]));
          this.unavailableDates.push(new Date(date));
        });
      }),
      error: (err: HttpErrorResponse) => {
        console.log(err.error.message);
      }
    });
  }

  // api call to issue to get issues
  getAllIssues() {
    this.issueService.getAllIssues().subscribe({
      next: ((response: Issue[]) => {
        this.issues = response;
      }),
      error: (err: HttpErrorResponse) => {
        console.log(err.error.message);
      }
    });
  }

  // convert form data to an object to feed the object to api for saving it
  saveAppointment() {
    const appointment: Appointment = {};
    appointment.doctor = this.appointmentForm.get('doctor')?.value as Doctor;
    appointment.patient = this.appointmentForm.get('patient')?.value as Patient;

    appointment.status = this.appointmentForm.get('status')?.value || '';
    appointment.issue = this.appointmentForm.get('issue')?.value as Issue;
    appointment.date = this.appointmentForm.get('date')?.value?.toLocaleDateString();
    appointment.time = this.appointmentForm.get('time')?.value || '';

    if (this.appointment && this.appointment?.id) {
      appointment.id = this.appointment?.id;
    }

    this.appointmentservice.saveAppointment(appointment).subscribe({
      next: (() => {
        this.utilService.openSnackBar("appointment booked", "ok");
        this.utilService.back();
      }),
      error: (err: HttpErrorResponse) => {
        this.utilService.openErrorSnackbar(err.error.message, 'ok');
      }
    });
  }

  // set content to form
  updateFormContent(appointment: Appointment) {
    this.appointmentForm.get('id')?.setValue(appointment.id?.toString() || '');
    this.appointmentForm.get('doctor')?.setValue(appointment.doctor!);
    this.appointmentForm.get('patient')?.setValue(appointment.patient!);
    this.appointmentForm.get('issue')?.setValue(appointment.issue!);
    this.appointmentForm.get('status')?.setValue(appointment.status!);
    this.appointmentForm.get('prescription')?.setValue(appointment.prescription!);
    this.appointmentForm.get('date')?.setValue(new Date(appointment.date!));
    this.appointmentForm.get('time')?.setValue(appointment.time!);

    this.setCardDetails(appointment?.patient!);
  }

  setCardDetails(patient: Patient) {
    this.paymentForm.get('firstName')?.setValue(patient?.cardDetails?.firstName as string);
    this.paymentForm.get('lastName')?.setValue(patient?.cardDetails?.lastName as string);
    this.paymentForm.get('cardNumber')?.setValue(patient?.cardDetails?.cardNumber as string);
    this.paymentForm.get('cvv')?.setValue(patient?.cardDetails?.cvv as string);
    this.paymentForm.get('expiry')?.setValue(patient?.cardDetails?.expiry as string);
  }

  //angular utility function for select tags
  compareBy(optionOne: any, optionTwo: any): boolean {
    return optionOne.id === optionTwo.id;
  }
}
