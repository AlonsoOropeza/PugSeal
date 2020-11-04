import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { NotificationsService } from './notifications.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private cookies: CookieService,
    private http: HttpClient,
    private notificationsService: NotificationsService
    ) { }

  public async login(username: string, password: string) {
    this.http.post(environment.url + 'auth/login/', { username, password }).subscribe(
          async (response) => {
            console.log(typeof(response));
            await this.setToken(response);
            console.log(this.getToken());
          },
          async (error) => {
              this.notificationsService.showNotification('Las credenciales son incorrectas', true);
          }
      );
  }

  private async setToken(token: any) {
    this.cookies.set('token', token);
  }
  getToken() {
    return this.cookies.get('token');
  }
}
