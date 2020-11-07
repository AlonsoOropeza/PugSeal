import { NotificationsService } from './../../services/notifications.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Area, Usuario } from 'app/models/models.model';
import { AreasService } from 'app/services/areas.service';
import { SpinnerService } from 'app/services/spinner.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.css']
})
export class AreasComponent implements OnInit {
  public areas: Area[];
  public area: Area;
  public titulos: string[];
  public modalComponent: BsModalRef;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  public user: Usuario;

  constructor(
    private cookies: CookieService,
    private areasService: AreasService,
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
    this.titulos = ['Nombre', 'Descripcion', 'Estado', 'Editar'];
  }

  public async loadInfo() {
    try {
      this.spinner.showSpinner();
      this.areas = await this.areasService.getAreas();
      this.dtTrigger.next();
    } catch (error) {
      throw new Error(error);
    } finally {
      this.spinner.hideSpinner();
    }
  }

  /**
   * Funcion para desplegar un modal para crear una categoría
   * @param modal
   */
  public addRequest(modal: TemplateRef<any>, area?: Area) {
    this.area = area ? area : new Area();
    this.modalComponent = this.modalService.show(modal, {backdrop : 'static', keyboard: false, class: 'modal-dialog-centered'});
  }

  public async create(form: NgForm) {
    this.spinner.showSpinner();
      (await this.areasService.createArea(this.area)).subscribe(
        async () => {
          this.notificationsService.showNotification('Se ha creado correctamente el área.', true)
          this.areas = await this.areasService.getAreas()
      },
      async error => {
        this.notificationsService.showNotification(error.message, false);
        this.areas = await this.areasService.getAreas()
      }
    );
    this.spinner.hideSpinner();
    this.modalComponent.hide();
  }

  public async update(form: NgForm) {
    this.spinner.showSpinner();
    (await this.areasService.updateArea(this.area)).subscribe(
      async () => {
        this.notificationsService.showNotification('Se ha actualizado correctamente el área.', true)
        this.areas = await this.areasService.getAreas()
    },
      async error => {
        this.notificationsService.showNotification(error.message, false);
        this.areas = await this.areasService.getAreas()
      }
    );
    this.spinner.hideSpinner();
    this.modalComponent.hide();
  }

  public async cancel() {
    this.areas = await this.areasService.getAreas();
    this.modalComponent.hide();
  }

}
