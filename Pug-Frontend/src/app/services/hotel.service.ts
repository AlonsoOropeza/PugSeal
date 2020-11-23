import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(private http: HttpClient) { }

  public async getHoteles() {
    let response: any;
    response = this.http.request('GET', environment.url + 'api/hoteles/').toPromise();
    return response;
  }
}
