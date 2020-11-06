import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { NotificationsService } from './notifications.service';
import { Usuario } from 'app/models/models.model';

interface Token {
  auth_token: string
}

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
    this.http.post<Token>(environment.url + 'auth/login/', { username, password }).subscribe(
          async (response) => {
            await this.setCookie('token', 'Token' + response.auth_token);
            await this.setUser('Token ' + response.auth_token);
            window.location.reload();
          },
          async (error) => {
              this.notificationsService.showNotification('Las credenciales son incorrectas', true);
          }
      );
  }

  // tslint:disable-next-line: no-shadowed-variable
  public async setUser(token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token
      })
    };
    this.http.get<Usuario>(environment.url + 'users/me', httpOptions).subscribe(
          async (response) => {
            await this.setCookie('user', JSON.stringify(response));
            console.log(JSON.parse(this.getCookie('user')));
          },
          async (error) => {
              this.notificationsService.showNotification('Las credenciales son incorrectas', true);
          }
      );
  }

  private async setCookie(name: string, value: any) {
    this.cookies.set(name, value);
  }

  private async setLocalStorage(name: string, value: any) {
    window.localStorage.setItem(name, value);
  }
  getCookie(name: string) {
    return this.cookies.get(name);
  }
}
