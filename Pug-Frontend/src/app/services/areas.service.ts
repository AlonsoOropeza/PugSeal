import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Area } from 'app/models/models.model';

@Injectable({
  providedIn: 'root'
})
export class AreasService {

  constructor(private http: HttpClient) { }

  public async getAreas() {
    let response: any;
    try {
      response = this.http.request('GET', environment.url + 'api/areas/').toPromise();
    } catch (error) {
      console.log('no se encontro la info ' + error);
    }
    return response;
  }

  public async createArea(area: Area) {
    try {
      console.log('se envio');
      const response = this.http.post(environment.url + 'api/areas/', area).subscribe();
      console.log(response);
    } catch (error) {
      console.log('no se pudo crear el área ' + error);
      throw new Error('no se pudo crear la solicitud');
    }
  }

  public async updateArea(area: Area) {
    try {
      console.log('se envio');
      const response = this.http.patch(environment.url + 'api/areas/' + area.id_area + '/', area).subscribe();
      console.log(response);
    } catch (error) {
      console.log('no se pudo modificar la area ' + error);
      throw new Error('no se pudo modificar el area');
    }
  }
}
