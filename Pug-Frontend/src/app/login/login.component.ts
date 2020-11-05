import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: string;
  public password: string;
  constructor(public loginService: LoginService) { }

  ngOnInit(): void {
  }

  public async login(){
    await this.loginService.login(this.email, this.password);
  }

}
