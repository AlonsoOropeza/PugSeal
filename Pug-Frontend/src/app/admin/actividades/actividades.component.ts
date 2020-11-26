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
  public actividad_semanas: any[] = [];

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
    this.actividad_semanas = [];
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
    for (let index = 1; index < 53; index++) {
      let events = [];
      this.solicitudes.forEach(solicitud => {
        if (moment(solicitud.fecha_inicio).week() === index && solicitud.id_empleado === this.user.id && solicitud.aprobado) {
          events = [
            ...events,
            {
              ...solicitud,
              semana: moment(new Date(solicitud.fecha_inicio)).week()
            },
          ];
        }
      });
      const element = 'Semana ' + index;
      this.actividad_semanas = [
        ...this.actividad_semanas,
        {
          titulo: element,
          eventos: {
            events
          }
        }
      ]
    }
    console.log(this.actividad_semanas);
    this.spinner.hideSpinner();
    this.categorias = await this.categoriasService.getCategorias();
    this.empleados = await this.empleadosService.getEmpleados();
    this.proveedores = await this.proveedoresService.getProveedores();

    const first  =  new Date(new Date().getFullYear(), 0, 1);
    const last  =  new Date(new Date().getFullYear(), 11, 31);
  }

  public addRequest(modal: TemplateRef<any>, mantenimiento: MantenimientoPreventivo) {
    this.mantenimiento = mantenimiento;
    this.modalComponent = this.modalService.show(modal, {backdrop : 'static', keyboard: false, class: 'modal-dialog-centered'});
  }

  public async cancel() {
    this.modalComponent.hide();
  }

  public async update(form: NgForm) {
    this.spinner.showSpinner();
    if (this.mantenimiento.terminado) {
      this.notificationsService.showWarning('No puedes modificar un mantenimiento que ha sido finalizado');
      await this.loadInfo();
    } else {
      (await this.mantenimientoService.updateMantenimiento(this.mantenimiento)).subscribe(
        async () => {
          this.notificationsService.showNotification('Se ha actualizado correctamente el mantenimiento.', true),
          await this.loadInfo();
        },
        async error => {
          this.notificationsService.showNotification(error.message, false)
        }
      );
    }
    this.spinner.hideSpinner();
    this.modalComponent.hide();
  }
}

