import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { NotificationsService } from './notifications.service';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { Usuario } from 'app/models/models.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(
    private cookies: CookieService,
    private http: HttpClient,
    private notificationsService: NotificationsService
    ) { }
  async canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
    ): Promise<boolean | UrlTree> {
      if (this.cookies.check('user')) {
        const user: Usuario = JSON.parse(this.getCookie('user'))
        if (user) {
          return true;
        }
        return false;
      }
      return false;
  }

  getCookie(name: string) {
    return this.cookies.get(name);
  }

}
