import { async } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from 'app/models/models.model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  constructor(private http: HttpClient) { }

  public async getEmpleados() {
    let response: any;
    response = this.http.request('GET', environment.url + 'api/empleados/').toPromise();
    return response;
  }

  public async getAuditores() {
    let response: any;
    response = this.http.request('GET', environment.url + 'api/auditores/').toPromise();
    return response;
  }

  public async getSolicitantes() {
    let response: any;
    response = this.http.request('GET', environment.url + 'api/solicitantes/').toPromise();
    return response;
  }

  public async getSupervisores() {
    let response: any;
    response = this.http.request('GET', environment.url + 'api/supervisores/').toPromise();
    return response;
  }

  public async createEmpleado(empleado: Usuario) {
    return this.http.post(environment.url + 'api/empleados/', empleado).subscribe();
  }
}
