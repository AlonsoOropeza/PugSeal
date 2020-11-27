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
  selector: 'app-presupuesto',
  templateUrl: './presupuesto.component.html',
  styleUrls: ['./presupuesto.component.css']
})
export class PresupuestoComponent implements OnInit {
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
  public actividad_meses: any[] = [];
  public items: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  public ngxValue: any;
  public nextYear = moment(new Date()).year() + 1;
  public totalAnual = 0;

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
    let total = 0;
    this.events = [];
    this.actividad_meses = [];
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
    for (let index = 0; index < 12; index++) {
      total = 0;
      let events = [];
      this.solicitudes.forEach(solicitud => {
        if (moment(solicitud.fecha_inicio).month() === index) {
          this.categorias.forEach(categoria => {
            if (solicitud.id_categoria === categoria.id_categoria) {
              nombre_categoria = categoria.nombre;
            }
          })
          this.empleados.forEach(empleado => {
            if (solicitud.id_empleado === empleado.id) {
              nombre_empleado = empleado.first_name + ' ' + empleado.last_name;
            }
          })
          this.proveedores.forEach(proveedor => {
            if (solicitud.id_proveedor === proveedor.id_proveedor) {
              nombre_proveedor = proveedor.nombre_empresa;
            }
          })
          total += solicitud.cotizacion;
          events = [
            ...events,
            {
              ...solicitud,
              semana: moment(new Date(solicitud.fecha_inicio)).week(),
              nombre_categoria,
              nombre_empleado,
              nombre_proveedor
            },
          ];
        }
      });
      const element = Meses[index];
      this.actividad_meses = [
        ...this.actividad_meses,
        {
          titulo: element,
          eventos: {
            events
          },
          total
        }
      ]
    }
    this.actividad_meses.forEach(element => {
      this.totalAnual += element.total;
    });
    this.spinner.hideSpinner();
  }

  public addRequest(modal: TemplateRef<any>, mantenimiento: MantenimientoPreventivo) {
    this.mantenimiento = mantenimiento;
    this.modalComponent = this.modalService.show(modal, {backdrop : 'static', keyboard: false, class: 'modal-dialog-centered'});
  }

  public async update(form: NgForm) {
    this.spinner.showSpinner();
    this.mantenimiento.fecha_inicio = await this.selectMonth(this.ngxValue);
    const fecha = this.mantenimiento.fecha_inicio.toISOString().split('T')[0];
    this.mantenimiento.fecha_inicio = fecha;
      (await this.mantenimientoService.updateMantenimiento(this.mantenimiento)).subscribe(
        async () => {
          this.notificationsService.showNotification('Se ha actualizado correctamente el mantenimiento.', true),
          this.loadInfo();
        },
        async error => {
          this.notificationsService.showNotification(error.message, false),
          this.loadInfo();
        }
      );
      this.spinner.hideSpinner();
      this.modalComponent.hide();
  }

  public async cancel() {
    this.loadInfo();
    this.modalComponent.hide();
  }

  public async selectMonth(mes: string) {
    switch (mes) {
      case 'Enero':
        return new Date(2021, 0, 15);
      case 'Febrero':
        return new Date(2021, 1, 15);
      case 'Marzo':
        return new Date(2021, 2, 15);
      case 'Abril':
        return new Date(2021, 3, 15);
      case 'Mayo':
        return new Date(2021, 4, 15);
      case 'Junio':
        return new Date(2021, 5, 15);
      case 'Julio':
        return new Date(2021, 6, 15);
      case 'Agosto':
        return new Date(2021, 7, 15);
      case 'Septiembre':
        return new Date(2021, 8, 15);
      case 'Octubre':
        return new Date(2021, 9, 15);
      case 'Noviembre':
        return new Date(2021, 10, 15);
      case 'Diciembre':
        return new Date(2021, 11, 15);
      default:
        return new Date();
    }
  }

}

