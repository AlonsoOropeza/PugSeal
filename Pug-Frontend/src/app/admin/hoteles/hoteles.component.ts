import { Component, OnInit } from '@angular/core';
import { Hotel, Usuario } from 'app/models/models.model';
import { HotelService } from 'app/services/hotel.service';
import { NotificationsService } from 'app/services/notifications.service';
import { SpinnerService } from 'app/services/spinner.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-hoteles',
  templateUrl: './hoteles.component.html',
  styleUrls: ['./hoteles.component.css']
})
export class HotelesComponent implements OnInit {

  public hoteles: Hotel[];
  public hotel: Hotel;
  public titulos: string[];
  public edit: boolean;
  public modalComponent: BsModalRef;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  public user: Usuario;

  constructor(
    private cookies: CookieService,
    private hotelService: HotelService,
    private spinner: SpinnerService,
    private modalService: BsModalService,
    private notificationsService: NotificationsService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(this.cookies.get('user'));
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json'
      }
    };
    this.loadInfo();
    this.titulos = ['Hotel', 'Dirección', 'Activo', 'Modificar', 'Eliminar'];
  }
  public async loadInfo() {
    try {
      this.spinner.showSpinner();
      this.hoteles = await this.hotelService.getHoteles();
      this.dtTrigger.next();
    } catch (error) {
      throw new Error(error);
    } finally {
      this.spinner.hideSpinner();
    }
  }
}
