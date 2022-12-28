import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from './patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  // api calls to for retrieving patient data
  API_URL: string = 'http://localhost:8080/patient/';

  constructor(private http: HttpClient) { }

  public savePatient(patient: Patient): Observable<void> {
    return this.http.post<void>(this.API_URL +'save', patient);
  }

  public getAllPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.API_URL + 'all');
  }

  public getPatientByUserId(id: number): Observable<Patient> {
    return this.http.get<Patient>(this.API_URL + 'user/' + id);
  }

  public getPatientById(id: number): Observable<Patient> {
    return this.http.get<Patient>(this.API_URL + id);
  }

  public deletePatient(id: number): Observable<void> {
    return this.http.delete<void>(this.API_URL + 'delete/' + id);
  }
 }
