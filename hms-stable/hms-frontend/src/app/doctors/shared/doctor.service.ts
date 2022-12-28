import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { DoctorUnavailability } from './doctor-unavailability.model';
import { Doctor } from './doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  // api calls to get doctor details
  API_URL: string = 'http://localhost:8080/doctor/';

  constructor(private http: HttpClient) { }

  public saveDoctor(doctor: Doctor): Observable<void> {
    return this.http.post<void>(this.API_URL +'save', doctor);
  }

  public getAllDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.API_URL + 'all');
  }

  public deleteDoctor(id: number): Observable<void> {
    return this.http.delete<void>(this.API_URL + 'delete/' + id);
  }

  public getDoctorByUserId(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(this.API_URL + 'user/' + id);
  }

  public getDoctorsByIssue(issueId: number): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.API_URL + 'issue/' + issueId);
  }

  public getDoctorUnavailabilty(doctorId: number): Observable<DoctorUnavailability[]> {
    return this.http.get<DoctorUnavailability[]>(this.API_URL + 'unavailabilities/' + doctorId);
  }

  public saveUnavailability(unavailability?: DoctorUnavailability): Observable<void> {
    return this.http.post<void>(this.API_URL + 'save-unavailability', unavailability);
  }

  public deleteUnavailability(id: number): Observable<void> {
    return this.http.delete<void>(this.API_URL + 'delete-unavailability/' + id)
  }
}
