import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = "";
  password = "";

  constructor(private auth: AuthenticationService, private router: Router, 
    private cookieService: CookieService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.auth.login(this.email, this.password).subscribe(data =>{
      console.log(data);
      this.cookieService.set('token', data.token)
      this.auth.checkAuthentication()
      this.router.navigate(['file-upload'])
    })
  }

}
