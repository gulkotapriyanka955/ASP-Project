import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Specialization } from '../models/specialization.model';

@Injectable({
  providedIn: 'root'
})
export class SpecializationService {
  API_URL: string = 'http://localhost:8080/specialization/';

  constructor(private http: HttpClient) { }

  // api call to get all specialization in db from back end(java)
  public getAllSpecializations(): Observable<Specialization[]> {
    return this.http.get<Specialization[]>(this.API_URL + 'all');
  }
}
