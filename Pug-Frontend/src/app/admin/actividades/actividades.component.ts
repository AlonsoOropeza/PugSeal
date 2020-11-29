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
import { data } from 'jquery';

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
  public comentario: string;

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
    this.categorias = await this.categoriasService.getCategorias();
    this.empleados = await this.empleadosService.getEmpleados();
    this.proveedores = await this.proveedoresService.getProveedores();

    let nombre_categoria: String;
    let nombre_empleado: String;
    let nombre_proveedor: String;
    let nombre_auditor: String;
    let nombre_supervisor: String;
    const mes = moment(new Date()).month();
    this.mes = Meses[mes];
    this.events = [];
    this.actividad_semanas = [];
    this.spinner.showSpinner();
    this.solicitudes = await this.mantenimientoPreventivoService.getMantenimientosPreventivos();
    this.solicitudes.forEach(solicitud => {
      this.events = [
        ...this.events,
        {
          ...solicitud,
          semana: moment(new Date(solicitud.fecha_inicio)).week()
        },
        ];
    });
    for (let index = 1; index < 53; index++) {
      let events = [];
      this.solicitudes.forEach(solicitud => {
        nombre_empleado = 'N/A';
        nombre_supervisor = 'N/A';
        nombre_auditor = 'N/A';
        if (moment(solicitud.fecha_inicio).week() === index && solicitud.aprobado) {
          this.categorias.forEach(categoria => {
            if (solicitud.id_categoria === categoria.id_categoria) {
              nombre_categoria = categoria.nombre;
            }
          })
          this.empleados.forEach(empleado => {
            if (solicitud.id_empleado && solicitud.id_empleado === empleado.id) {
              nombre_empleado = empleado.first_name + ' ' + empleado.last_name;
            }
            if (solicitud.id_auditor && solicitud.id_auditor === empleado.id) {
              nombre_auditor = empleado.first_name + ' ' + empleado.last_name;
            }
            if (solicitud.id_supervisor && solicitud.id_supervisor === empleado.id) {
              nombre_supervisor = empleado.first_name + ' ' + empleado.last_name;
            }
          })
          this.proveedores.forEach(proveedor => {
              nombre_proveedor = proveedor.nombre_empresa;
          })
          events = [
            ...events,
            {
              ...solicitud,
              semana: moment(new Date(solicitud.fecha_inicio)).week(),
              nombre_categoria,
              nombre_empleado,
              nombre_proveedor,
              nombre_auditor,
              nombre_supervisor
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

    const first  =  new Date(new Date().getFullYear(), 0, 1);
    const last  =  new Date(new Date().getFullYear(), 11, 31);
  }

  public addRequest(modal: TemplateRef<any>, mantenimiento: MantenimientoPreventivo) {
    this.mantenimiento = mantenimiento;
    this.modalComponent = this.modalService.show(modal, {backdrop : 'static', keyboard: false, class: 'modal-dialog-centered'});
  }

  public showComment(modal: TemplateRef<any>, comentario: string) {
    this.comentario = comentario;
    this.modalComponent = this.modalService.show(modal, {backdrop : 'static', keyboard: false, class: 'modal-dialog-centered'});
  }

  public async cancel() {
    this.modalComponent.hide();
  }

  public async terminarActividad(form: NgForm) {
    this.spinner.showSpinner();
      this.mantenimiento.id_empleado = this.user.id;
      this.mantenimiento.fecha_terminacion = new Date().toISOString().split('T')[0];
      (await this.mantenimientoService.updateMantenimiento(this.mantenimiento)).subscribe(
        async () => {
          this.notificationsService.showNotification('Se ha actualizado correctamente el mantenimiento.', true),
          await this.loadInfo();
        },
        async error => {
          this.notificationsService.showNotification(error.message, false)
        }
      );
    this.spinner.hideSpinner();
    this.modalComponent.hide();
  }

  public async update() {
    this.spinner.showSpinner();
    if (this.user.rol === 'Supervisor' && this.mantenimiento.comentarios_supervisor) {
      this.mantenimiento.id_supervisor = this.user.id;
    }
    if (this.user.rol === 'Auditor' && this.mantenimiento.comentarios_auditor) {
      this.mantenimiento.id_auditor = this.user.id;
    }
    (await this.mantenimientoService.updateMantenimiento(this.mantenimiento)).subscribe(
      async () => {
        this.notificationsService.showNotification('Se ha actualizado correctamente el mantenimiento.', true),
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

