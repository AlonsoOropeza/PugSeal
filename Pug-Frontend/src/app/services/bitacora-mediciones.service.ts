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
    } catch (error) {
      throw new Error('Ocurrió un error');
    }
    return response;
  }

  public async getAuditores() {
    let response: any;
    response = this.http.request('GET', environment.url + 'api/auditores/').toPromise();
    return response;
  }

  public async getResponsables() {
    let response: any;
    response = this.http.request('GET', environment.url + 'api/responsables').toPromise();
    return response;
  }

  public async createBitacora(bitacora: BitacoraMediciones) {
    return this.http.post(environment.url + 'api/bitacora/mediciones/', bitacora);
  }

  public async updateBitacora(bitacora: BitacoraMediciones) {
    return this.http.patch(environment.url + 'api/bitacora/mediciones/' + bitacora.id_medicion + '/', bitacora);
  }

  public async deleteBitacora(bitacora: BitacoraMediciones) {
    return this.http.delete(environment.url + 'api/bitacora/mediciones/' + bitacora.id_medicion + '/');
  }
}
