import { Component, OnInit } from '@angular/core';
import { Usuario } from 'app/models/models.model';
import { LoginService } from 'app/services/login.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: string;
  public password: string;

  constructor(
    public loginService: LoginService,
    private cookies: CookieService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    if (this.cookies.check('user')) {
      const user: Usuario = JSON.parse(this.getCookie('user'))
      if (user) {
        this.router.navigateByUrl('/dashboard');
      }
    }
  }

  public async login() {
    await this.loginService.login(this.email, this.password);
  }

  getCookie(name: string) {
    return this.cookies.get(name);
  }

}
