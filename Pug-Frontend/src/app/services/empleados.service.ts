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
    try {
      response = this.http.request('GET', environment.url + 'api/empleados/').toPromise();
    } catch (error) {
      console.log('no se encontro la info ' + error);
    }
    return response;
  }

  public async getSolicitantes() {
    let response: any;
    try {
      response = this.http.request('GET', environment.url + 'api/solicitantes/').toPromise();
    } catch (error) {
      console.log('no se encontro la info ' + error);
    }
    return response;
  }

  public async getSupervisores() {
    let response: any;
    try {
      response = this.http.request('GET', environment.url + 'api/supervisores/').toPromise();
    } catch (error) {
      console.log('no se encontro la info ' + error);
    }
    return response;
  }

  public async createEmpleado(empleado: Usuario) {
    try {
      console.log('se envio');
      const response = this.http.post(environment.url + 'api/empleados/', empleado).subscribe();
      console.log(response);
    } catch (error) {
      console.log('no se pudo crear la solicitud ' + error);
      throw new Error('no se pudo crear la solicitud');
    }
  }
}
