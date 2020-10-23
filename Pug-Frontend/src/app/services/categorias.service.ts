import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Categoria } from 'app/models/models.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private http: HttpClient) { }

  public async getCategorias() {
    let response: any;
    try {
      response = this.http.request('GET', environment.url + 'api/categorias/').toPromise();
    } catch (error) {
      console.log('no se encontro la info ' + error);
    }
    return response;
  }

  public async createCategoria(categoria: Categoria) {
    try {
      console.log('se envio');
      const response = this.http.post(environment.url + 'api/categorias/', categoria).subscribe();
      console.log(response);
    } catch (error) {
      console.log('no se pudo crear la categoria ' + error);
      throw new Error('no se pudo crear la categoria');
    }
  }

  public async updateCategoria(categoria: Categoria) {
    try {
      console.log('se envio');
      const response = this.http.patch(environment.url + 'api/categorias/' + categoria.id_categoria + '/', categoria).subscribe();
      console.log(response);
    } catch (error) {
      console.log('no se pudo modificar la categoria ' + error);
      throw new Error('no se pudo modificar la categoria');
    }
  }
}
