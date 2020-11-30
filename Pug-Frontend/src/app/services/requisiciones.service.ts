import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Requisicion } from 'app/models/models.model';

@Injectable({
  providedIn: 'root'
})
export class RequisicionesService {

  constructor(private http: HttpClient) { }

  public async getRequisiciones() {
    let response: any;
    response = this.http.request('GET', environment.url + 'api/requisiciones/').toPromise();
    return response;
  }

  public async createRequisiciones(requisicion: Requisicion) {
    return this.http.post(environment.url + 'api/requisiciones/', requisicion);
  }

  public async updateRequisiciones(requisicion: Requisicion) {
    return this.http.patch(environment.url + 'api/requisiciones/' + requisicion.id_requisicion + '/', requisicion);
  }
}
