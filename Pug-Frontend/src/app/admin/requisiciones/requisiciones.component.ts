import { HotelService } from './../../services/hotel.service';
import { Usuario, Hotel } from './../../models/models.model';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NotificationsService } from './../../services/notifications.service';
import { NgForm } from '@angular/forms';
import { Proveedor, Requisicion, Categoria, Empleado } from 'app/models/models.model';
import { RequisicionesService } from 'app/services/requisiciones.service';
import { SpinnerService } from 'app/services/spinner.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { ProveedoresService } from 'app/services/proveedores.service';
import { EmpleadosService } from 'app/services/empleados.service';

@Component({
  selector: 'app-requisiciones',
  templateUrl: './requisiciones.component.html',
  styleUrls: ['./requisiciones.component.css']
})
export class RequisicionesComponent implements OnInit {
  public requisiciones: Requisicion[];
  public requisicion: Requisicion;
  public titulos: string[];
  public modalComponent: BsModalRef;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  public edit = true;
  public proveedores: Proveedor[];
  public user: Usuario;
  public hoteles: Hotel[];
  public empleados: Usuario[];
  public solicitante: Usuario;
  public name: String;

  constructor(
    private cookies: CookieService,
    private requisicionesService: RequisicionesService,
    private spinner: SpinnerService,
    private modalService: BsModalService,
    private notificationsService: NotificationsService,
    private proveedoresService: ProveedoresService,
    private empleadosService: EmpleadosService,
    private hotelService: HotelService
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
    this.titulos = ['Concepto', 'Cantidad', 'Costo', 'Finalizado', 'Editar'];
  }

  public async loadInfo() {
    this.spinner.showSpinner();
    this.requisiciones = await this.requisicionesService.getRequisiciones();
    this.hoteles = await this.hotelService.getHoteles();
    this.empleados = await this.empleadosService.getEmpleados();
    this.proveedores = await this.proveedoresService.getProveedores();
    this.dtTrigger.next();
    this.spinner.hideSpinner();
  }
  /**
   * Funcion para desplegar un modal para crear una requisición
   * @param modal: TemplateRef
   * @param requisicion: Requisicion
   * @param edit: boolean
   */
  public addRequest(modal: TemplateRef<any>, requisicion?: Requisicion, edit?: boolean) {
    this.edit = edit ? edit : false;
    if (this.requisicion) {
      this.getNameById(this.requisicion.id_solicitante);
    }
    this.requisicion = requisicion ? requisicion : new Requisicion();
    this.modalComponent = this.modalService.show(modal, { backdrop: 'static', keyboard: false, class: 'modal-dialog-centered' });
  }
  public async create(form: NgForm) {
    if (form.value.costo < 2000 && form.value.costo > 0) {
      this.requisicion.aprobacion_director_gral = true;
    }
    this.requisicion.id_solicitante = this.user.id;
    this.spinner.showSpinner();
    (await this.requisicionesService.createRequisiciones(this.requisicion)).subscribe(
      async () => {
        this.notificationsService.showNotification('Se ha creado correctamente la solicitud.', true)
        this.requisiciones = await this.requisicionesService.getRequisiciones()
      },
      async error => {
        this.notificationsService.showNotification(error.message, false);
        this.requisiciones = await this.requisicionesService.getRequisiciones()
      }
    );
    this.spinner.hideSpinner();
    this.modalComponent.hide();
  }

  public async update(form: NgForm) {
    this.spinner.showSpinner();
    (await this.requisicionesService.updateRequisiciones(this.requisicion)).subscribe(
      async () => {
        this.notificationsService.showNotification('Se ha actualizado correctamente la solicitud.', true)
        this.requisiciones = await this.requisicionesService.getRequisiciones()
      },
      async error => {
        this.notificationsService.showNotification(error.message, false);
        this.requisiciones = await this.requisicionesService.getRequisiciones()
      }
    );
    this.spinner.hideSpinner();
    this.modalComponent.hide();
  }

  public async cancel() {
    this.requisiciones = await this.requisicionesService.getRequisiciones();
    this.modalComponent.hide();
  }

  /**
   * Recibe Id del solicitante para obtener el nombre.
   * @param id :Number
   */
  public async getNameById(id: Number) {
    this.name = this.empleados.find(x => x.id === id).first_name;
  }

}
