import { Meses } from './../../shared/diccionarios';
import { MantenimientoPreventivoService } from 'app/services/mantenimiento_preventivo.service';
import { Component, OnInit } from '@angular/core';
import { ViewChild, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Categoria, MantenimientoPreventivo, Proveedor, Usuario } from 'app/models/models.model';
import { SpinnerService } from 'app/services/spinner.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NotificationsService } from 'app/services/notifications.service';
import { CookieService } from 'ngx-cookie-service';
import { ProveedoresService } from 'app/services/proveedores.service';
import { EmpleadosService } from 'app/services/empleados.service';
import { CategoriasService } from 'app/services/categorias.service';
import { NgForm } from '@angular/forms';
import moment = require('moment');

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  public solicitudes: MantenimientoPreventivo[];
  public user: Usuario;
  public proveedores: Proveedor[];
  public empleados: Usuario[];
  public categorias: Categoria[];
  public edit: boolean;
  public mantenimiento: MantenimientoPreventivo;
  public mes: String;
  public modalComponent: BsModalRef;
  public events: any[] = [];

  constructor(
    private modal: NgbModal,
    private mantenimientoPreventivoService: MantenimientoPreventivoService,
    private spinner: SpinnerService,
    private modalService: BsModalService,
    private mantenimientoService: MantenimientoPreventivoService,
    private notificationsService: NotificationsService,
    private proveedoresService: ProveedoresService,
    private categoriasService: CategoriasService,
    private empleadosService: EmpleadosService,
    private cookies: CookieService,
    ) {}

  ngOnInit() {
    this.user = JSON.parse(this.cookies.get('user'));
    this.loadInfo();
  }

  public async loadInfo() {
    const mes = moment(new Date()).month();
    this.mes = Meses[mes];
    this.events = [];
    this.spinner.showSpinner();
    this.solicitudes = await this.mantenimientoPreventivoService.getMantenimientosPreventivos();
    this.solicitudes.forEach(solicitud => {
      if (solicitud.id_empleado === this.user.id) {
          this.events = [
          ...this.events,
          {
            ...solicitud,
            semana: moment(new Date(solicitud.fecha_inicio)).week()
          },
        ];
      }
    });
    this.spinner.hideSpinner();
    this.categorias = await this.categoriasService.getCategorias();
    this.empleados = await this.empleadosService.getEmpleados();
    this.proveedores = await this.proveedoresService.getProveedores();

    const first  =  new Date(new Date().getFullYear(), 0, 1);
    const last  =  new Date(new Date().getFullYear(), 11, 31);
    for (const i = first; i <= last; i.setDate(i.getDate() + 7)) {
      console.log(moment(i).week(), i);
    }
  }

  public addRequest(modal: TemplateRef<any>, mantenimiento?: MantenimientoPreventivo, edit?: boolean) {
    this.edit = edit !== undefined ? edit : true;
    if (this.edit) {
      if (mantenimiento && mantenimiento.aprobado && this.user.rol === 'Encargado_Mantenimiento' ) {
        this.edit = false;
        this.notificationsService.showWarning('La solicitud ya ha sido aprobada, por lo que no puede modificarse.');
      } else {
        this.edit = true;
      }
    }
    this.mantenimiento = mantenimiento ? mantenimiento : new MantenimientoPreventivo();
    this.modalComponent = this.modalService.show(modal, {backdrop : 'static', keyboard: false, class: 'modal-dialog-centered'});
  }

  public async cancel() {
    this.modalComponent.hide();
  }

  public async update(form: NgForm) {
    if (form.value.frecuencia_anual < 1 || form.value.frecuencia_anual > 12) {
      this.notificationsService.showNotification('La frecuencia anual debe realizarse entre 1 a 12 veces al año', false);
      throw new Error('Error');
    }
    if (form.value.aprobado) {
      this.mantenimiento.id_auditor = this.user.id;
    }

    this.spinner.showSpinner();
    (await this.mantenimientoService.updateMantenimiento(this.mantenimiento)).subscribe(
      async () => {
        this.notificationsService.showNotification('Se ha actualizado correctamente la solicitud.', true),
        await this.loadInfo();
      },
      async error => {
        this.notificationsService.showNotification(error.message, false)
      }
    );
    this.spinner.hideSpinner();
    this.modalComponent.hide();
  }
}

