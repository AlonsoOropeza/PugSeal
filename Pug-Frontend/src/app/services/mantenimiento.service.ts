import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { MantenimientoPreventivo } from 'app/models/models.model';

export interface Config {
  heroesUrl: string;
  textfile: string;
}

@Injectable({
  providedIn: 'root'
})

export class MantenimientoService {

  constructor(private http: HttpClient) { }

  public async getSolicitudesMantenimientoPreventivo() {
    let response: any;
    try {
      response = this.http.request('GET', environment.url + 'api/solicitudes/mantenimiento/').toPromise();
    } catch (error) {
      console.log('no se encontro la info ' + error);
    }
    return response;
  }

  public async createSolicitudMantenimientoPreventivo(solicitud: MantenimientoPreventivo) {
    try {
      console.log('se envio');
      const response = this.http.post(environment.url + 'api/solicitudes/mantenimiento/', solicitud).subscribe();
      console.log(response);
    } catch (error) {
      console.log('no se pudo crear la solicitud ' + error);
      throw new Error('no se pudo crear la solicitud');
    }
  }
}
