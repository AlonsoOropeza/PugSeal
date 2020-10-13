import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

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
    let response;
    try {
      response = this.http.request('GET', environment.url + 'api/solicitudes/mantenimiento/').toPromise();
    } catch (error) {
      console.log('no se encontro la info ' + error);
    }
    return response;
  }
}
