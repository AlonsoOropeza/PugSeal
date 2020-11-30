import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Categoria } from 'app/models/models.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private http: HttpClient) { }

  public async getCategorias() {
    let response: any;
    response = this.http.request('GET', environment.url + 'api/categorias/').toPromise();
    return response;
  }

  public async createCategoria(categoria: Categoria) {
    return this.http.post(environment.url + 'api/categorias/', categoria);
  }

  public async updateCategoria(categoria: Categoria) {
    return this.http.patch(environment.url + 'api/categorias/' + categoria.id_categoria + '/', categoria);
  }
}
