import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private http: HttpClient) { }

  public async getCategories(){
    return this.http.get('http://127.0.0.1:8000/listar_categorias2/').subscribe(data => {
      console.log(data);
      
    });
     

  }
}
