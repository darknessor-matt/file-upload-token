import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subject } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'file-upload-token-verification-app';
  tokenExists:boolean

  constructor(private cookieService: CookieService, private router: Router, public authService: AuthenticationService) {
    this.tokenExists = authService.isAuthenticated();

  }

  ngOnInit(): void {

  }

  logout() {
    // console.log("boom")
    this.cookieService.delete("token")
    this.authService.checkAuthentication();
    this.router.navigate(['login'])
  }
}
