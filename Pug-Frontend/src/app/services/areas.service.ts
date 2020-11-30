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
    response = this.http.request('GET', environment.url + 'api/areas/').toPromise();
    return response;
  }

  public async createArea(area: Area) {
    return this.http.post(environment.url + 'api/areas/', area);
  }

  public async updateArea(area: Area) {
    return this.http.patch(environment.url + 'api/areas/' + area.id_area + '/', area);
  }
}
