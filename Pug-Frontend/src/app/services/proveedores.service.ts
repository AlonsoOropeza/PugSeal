import { Proveedor } from './../models/models.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  constructor(private http: HttpClient) { }

  public async getProveedores() {
    let response: any;
    response = this.http.request('GET', environment.url + 'api/proveedores/').toPromise();
    return response;
  }

  public async createProveedor(proveedor: Proveedor) {
    return this.http.post(environment.url + 'api/proveedores/', proveedor);
  }

  public async updateProveedor(proveedor: Proveedor) {
    return this.http.patch(environment.url + 'api/proveedores/' + proveedor.id_proveedor + '/', proveedor);
  }
}
