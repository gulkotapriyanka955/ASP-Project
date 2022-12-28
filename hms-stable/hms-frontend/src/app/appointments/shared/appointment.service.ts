import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from './appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  // api calls for appointment related details
  API_URL: string = 'http://localhost:8080/appointment/';

  constructor(private http: HttpClient) { }


  public saveAppointment(appointmet: Appointment): Observable<void> {
    return this.http.post<void>(this.API_URL +'save', appointmet);
  }

  public getAppointmentsByPatientId(id: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.API_URL + 'patient/' + id);
  }

  public getAppointmentsByDoctorId(id: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.API_URL + 'doctor/' + id);
  }

  public getAppointmentsById(id: number): Observable<Appointment> {
    return this.http.get<Appointment>(this.API_URL + id);
  }

  public getAllAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.API_URL + 'all');
  }

  public deleteAppointment(id: number): Observable<void> {
    return this.http.delete<void>(this.API_URL + 'delete/' + id);
  }
}
