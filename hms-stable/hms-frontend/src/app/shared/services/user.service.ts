import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService implements CanActivate {
  API_URL: string = 'http://localhost:8080/user/';

  isLoggedIn?: boolean;
  constructor(private http: HttpClient, private router: Router) {
    this.isLoggedIn = false;
  }

    // authentication guard for unauthorized access of links
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.isUserLoggedIn()) {
      return true;
    }
    this.router.navigate(['/home']);
    return false;

  }

  public login(user: User): Observable<User> {
    return this.http.post<User>(this.API_URL + 'login', user);
  }

  public sendResetEmail(email: string): Observable<void> {
    return this.http.post<void>(this.API_URL + 'forgot-password', email);
  }

  public getUserByToken(token: string): Observable<User> {
    return this.http.get<User>(this.API_URL + 'reset-token/' + token);
  }

  public saveUser(user: User): Observable<User> {
    return this.http.post<User>(this.API_URL + 'save/', user);
  }

  public isUserLoggedIn() {
    let user = sessionStorage.getItem('user');
    if ((user !== null)) {
      return true;
    }
    return false;
  }

  public isAdminLoggedIn() {
    let role = sessionStorage.getItem('role')!;
    if (role && role === 'ADMIN') {
      return true;
    }

    return false;
  }

  public isDoctorLoggedIn() {
    let role = sessionStorage.getItem('role');
    if (role && role === 'DOCTOR') {
      return true;
    }

    return false;
  }

  public isPatientLoggedIn() {
    let role = sessionStorage.getItem('role');
    if (role && role === 'PATIENT') {
      return true;
    }

    return false;
  }

  public logOut() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('role');
    this.router.navigate(['/home']);
  }
}
