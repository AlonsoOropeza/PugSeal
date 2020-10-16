import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proveedor } from 'app/models/models.model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  constructor(private http: HttpClient) { }

  public async getProveedores() {
    let response: any;
    try {
      response = this.http.request('GET', environment.url + 'api/proveedores/').toPromise();
    } catch (error) {
      console.log('no se encontro la info ' + error);
    }
    return response;
  }

  public async createProveedor(proveedor: Proveedor) {
    try {
      console.log('se envio');
      const response = this.http.post(environment.url + 'api/proveedores/', proveedor).subscribe();
      console.log(response);
    } catch (error) {
      console.log('no se pudo crear la solicitud ' + error);
      throw new Error('no se pudo crear la solicitud');
    }
  }
}
