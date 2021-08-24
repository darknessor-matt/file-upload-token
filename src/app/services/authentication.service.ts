import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticated$: BehaviorSubject<boolean>;

  loginURL = "https://05yxuf1hvf.api.quickmocker.com/login"
  testURL = "https://05yxuf1hvf.api.quickmocker.com/test"

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.authenticated$ = new BehaviorSubject<boolean>(false)
    this.authenticated$.next(this.cookieService.check("token"))
  }

  login(email: string, password: string): Observable<any> {
    const body = { "email": email, "password": password }
    return this.http.post<Observable<any>>(this.loginURL, body)
  }

  checkAcess(token: string):Observable<any> {
    var reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    })
    return this.http.get<Observable<any>>(this.testURL, {headers: reqHeader})
  }

  isAuthenticated(): boolean {
    return this.cookieService.check("token");
  }

  checkAuthentication() {
    this.authenticated$.next(this.cookieService.check("token"))
  }

}
