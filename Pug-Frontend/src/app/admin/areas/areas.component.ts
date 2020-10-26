import { NotificationsService } from './../../services/notifications.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Area } from 'app/models/models.model';
import { AreasService } from 'app/services/areas.service';
import { SpinnerService } from 'app/services/spinner.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

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

  constructor(
    private areasService: AreasService,
    private spinner: SpinnerService,
    private modalService: BsModalService,
    private notificationsService: NotificationsService
    ) { }

  ngOnInit(): void {
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
    this.modalComponent = this.modalService.show(modal, {keyboard: true, class: 'modal-dialog-centered'});
  }

  public async create(form: NgForm) {
    try {
      this.spinner.showSpinner();
      await this.areasService.createArea(this.area);
      this.notificationsService.showNotification('Se ha creado correctamente la área.', true);
      this.areas = await this.areasService.getAreas();
    } catch (error) {
      console.log('no se creó');
      this.notificationsService.showNotification('No se ha podido crear la área.', false);

    } finally {
      this.spinner.hideSpinner();
      this.modalComponent.hide();
    }
  }

  public async update(form: NgForm) {
    try {
      this.spinner.showSpinner();
      await this.areasService.updateArea(this.area);
      this.areas = await this.areasService.getAreas();
    } catch (error) {
      console.log('no se modificó' + error);
    } finally {
      this.spinner.hideSpinner();
      this.modalComponent.hide();
    }
  }

  public async cancel() {
    this.areas = await this.areasService.getAreas();
    this.modalComponent.hide();
  }
}
