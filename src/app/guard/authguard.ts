import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import { AuthenticationService } from "../services/authentication.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthenticationService, private cookieService: CookieService, public router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        this.authService.checkAcess(this.cookieService.get("token")).subscribe(data => {
            console.log(data)
        });
        if (!this.authService.isAuthenticated()) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }

}