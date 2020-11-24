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
    let total = 0;
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
    for (let index = 0; index < 12; index++) {
      total = 0;
      let events = [];
      this.solicitudes.forEach(solicitud => {
        if (moment(solicitud.fecha_inicio).month() === index) {
          total += solicitud.cotizacion;
          events = [
            ...events,
            {
              ...solicitud,
              semana: moment(new Date(solicitud.fecha_inicio)).week(),
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
    console.log(this.actividad_meses);
    this.spinner.hideSpinner();
    this.categorias = await this.categoriasService.getCategorias();
    this.empleados = await this.empleadosService.getEmpleados();
    this.proveedores = await this.proveedoresService.getProveedores();

    const first  =  new Date(new Date().getFullYear(), 0, 1);
    const last  =  new Date(new Date().getFullYear(), 11, 31);
  }
}

