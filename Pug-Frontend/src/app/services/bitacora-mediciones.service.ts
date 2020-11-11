import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { BitacoraMediciones} from 'app/models/models.model';

@Injectable({
  providedIn: 'root'
})
export class BitacoraMedicionesService {

  constructor(private http: HttpClient) { }

  public async getBitacoras() {
    let response: any;
    try {
      response = this.http.request('GET', environment.url + 'api/bitacora/mediciones/').toPromise();
    } catch(error) {
      console.log('no se encontro la info' + error);
    }
    return response;
  }

  public async createBitacora(bitacora: BitacoraMediciones) {
    return this.http.post(environment.url + 'api/bitacora/mediciones/', bitacora);
  }

  public async updateArea(bitacora: BitacoraMediciones) {
    return this.http.patch(environment.url + 'api/bitacora/mediciones/' + bitacora.id_medicion + '/', bitacora);
  }
}
