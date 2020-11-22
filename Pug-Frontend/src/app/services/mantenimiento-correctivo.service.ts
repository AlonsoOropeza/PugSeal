import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { MantenimientoCorrectivo } from 'app/models/models.model';

@Injectable({
  providedIn: 'root'
})

export class MantenimientoCorrectivoService {

  constructor(private http: HttpClient) { }

  public async getMantenimientosCorrectivos() {
    let response: any;
    response = this.http.request('GET', environment.url + 'api/mantenimiento/correctivo/').toPromise();
    return response;
  }

  public async createMantenimientoCorrectivo(mantenimiento: MantenimientoCorrectivo) {
    return this.http.post(environment.url + 'api/mantenimiento/correctivo/', mantenimiento);
  }

  public async updateMantenimientoCorrectivo(mantenimiento: MantenimientoCorrectivo) {
    return this.http.patch(environment.url + 'api/mantenimiento/correctivo/' + mantenimiento.id_mantcor + '/', mantenimiento);
  }

  public async deleteMantenimientoCorrectivo(mantenimiento: MantenimientoCorrectivo) {
    return this.http.delete(environment.url + 'api/mantenimiento/correctivo/' + mantenimiento.id_mantcor + '/');
  }

}
