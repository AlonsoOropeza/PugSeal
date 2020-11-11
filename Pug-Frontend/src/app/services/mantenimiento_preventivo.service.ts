import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { MantenimientoPreventivo } from 'app/models/models.model';

@Injectable({
  providedIn: 'root'
})

export class MantenimientoPreventivoService {

  constructor(private http: HttpClient) { }

  public async getMantenimientosPreventivos() {
    let response: any;
    response = this.http.request('GET', environment.url + 'api/mantenimiento/preventivo/').toPromise();
    return response;
  }

  public async createMantenimientoPreventivo(mantenimiento: MantenimientoPreventivo) {
    return this.http.post(environment.url + 'api/mantenimiento/preventivo/', mantenimiento);
  }
}
