import { HotelService } from './../services/hotel.service';
import { Component, OnInit } from '@angular/core';
import { Hotel, Usuario } from 'app/models/models.model';
import { LoginService } from 'app/services/login.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { SpinnerService } from 'app/services/spinner.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: string;
  public password: string;
  public hoteles: Hotel[];

  constructor(
    public loginService: LoginService,
    private cookies: CookieService,
    private router: Router,
    private spinner: SpinnerService,
    private hotelService: HotelService,
    ) { }

  ngOnInit(): void {
    if (this.cookies.check('user')) {
      const user: Usuario = JSON.parse(this.getCookie('user'))
      if (user) {
        this.router.navigateByUrl('/dashboard');
      }
    }
    this.loadInfo();
  }

  public async loadInfo() {
    this.spinner.showSpinner();
    this.hoteles = await this.hotelService.getHoteles();
    this.spinner.hideSpinner();
  }

  public async login() {
    await this.loginService.login(this.email, this.password);
  }

  getCookie(name: string) {
    return this.cookies.get(name);
  }

}
