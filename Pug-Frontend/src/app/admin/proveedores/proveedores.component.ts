import { NotificationsService } from './../../services/notifications.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Proveedor } from 'app/models/models.model';
import { SpinnerService } from 'app/services/spinner.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { ProveedoresService } from 'app/services/proveedores.service';


@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  public proveedores: Proveedor[];
  public proveedor: Proveedor;
  public titulos: string[];
  public modalComponent: BsModalRef;
  public edit = true;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  constructor(
    private proveedoresService: ProveedoresService,
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
    this.titulos = ['Empresa', 'Contacto', 'Teléfono', 'Estado', 'Editar', 'Ver'];
  }

  public async loadInfo() {
    this.spinner.showSpinner();
    this.proveedores = await this.proveedoresService.getProveedores();
    this.dtTrigger.next();
    this.spinner.hideSpinner();
  }

  public async create(form: NgForm) {
    this.spinner.showSpinner();
      (await this.proveedoresService.createProveedor(this.proveedor)).subscribe(
        async () => {
          this.notificationsService.showNotification('Se ha creado correctamente el proveedor.', true)
          this.proveedores = await this.proveedoresService.getProveedores()
        },
        async error => {
          this.notificationsService.showNotification(error.message, false);
          this.proveedores = await this.proveedoresService.getProveedores()
        }
    );
    this.spinner.hideSpinner();
    this.modalComponent.hide();
  }

  public async cancel() {
    this.proveedores = await this.proveedoresService.getProveedores();
    this.modalComponent.hide();
  }

  public async update(form: NgForm) {
    this.spinner.showSpinner();
    (await this.proveedoresService.updateProveedor(this.proveedor)).subscribe(
      async () => {
        this.notificationsService.showNotification('Se ha actualizado correctamente el proveedor.', true),
        this.proveedores = await this.proveedoresService.getProveedores()
      },
      async error => {
        this.notificationsService.showNotification(error.message, false),
        this.proveedores = await this.proveedoresService.getProveedores()
      }
    );
    this.spinner.hideSpinner();
    this.modalComponent.hide();
  }

   /**
   * Funcion para desplegar un modal para crear un proveedor
   * @param modal
   */
  public addRequest(modal: TemplateRef<any>, proveedor?: Proveedor, edit?: boolean) {
    this.edit = edit ? edit : false;
    this.proveedor = proveedor ? proveedor : new Proveedor();
    this.modalComponent = this.modalService.show(modal, {backdrop : 'static', keyboard: false, class: 'modal-dialog-centered'});
  }

}
