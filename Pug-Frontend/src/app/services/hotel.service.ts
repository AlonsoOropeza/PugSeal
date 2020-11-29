import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Hotel } from 'app/models/models.model';

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

  public async createHotel(hotel: Hotel) {
    return this.http.post(environment.url + 'api/hoteles/', hotel);
  }

  public async updateHotel(hotel: Hotel) {
    return this.http.patch(environment.url + 'api/hoteles/' + hotel.id_hotel + '/', hotel);
  }

}
