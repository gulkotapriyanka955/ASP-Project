import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Issue } from '../models/issue.model';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  API_URL: string = 'http://localhost:8080/issue/';

  constructor(private http: HttpClient) { }

    // api call to get all issues in db from back end(java)
  public getAllIssues(): Observable<Issue[]> {
    return this.http.get<Issue[]>(this.API_URL + 'all');
  }
}
