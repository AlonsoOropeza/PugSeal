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

// Lista de componentes asociados
@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {

  // Variables y arreglos
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  public solicitudes: MantenimientoPreventivo[];
  public user: Usuario;
  public proveedores: Proveedor[]; // Lista de proveedores
  public empleados: Usuario[]; // Lista de empleados
  public categorias: Categoria[]; // Lista de categorías
  public edit: boolean;
  public mantenimiento: MantenimientoPreventivo;
  public mes: String;
  public modalComponent: BsModalRef;
  public events: any[] = []; // Lista de eventos
  public actividad_semanas: any[] = [];
  public actividad_meses: any[] = [];
  public comentario: string;
  public nuevaSemana: number;
  public semanasDisponibles: number[] = []; // Lista de semanas por mes

  // Constructor
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
    // Carga la información de las tablas Categoría, Empleado, Proveedor
    this.categorias = await this.categoriasService.getCategorias();
    this.empleados = await this.empleadosService.getEmpleados();
    this.proveedores = await this.proveedoresService.getProveedores();

    // Variables para guardar los nombres extraídos de las queries de Categoría, Empleado, Proveedor
    let nombre_categoria: String;
    let nombre_empleado: String;
    let nombre_proveedor: String;
    let nombre_auditor: String;
    let nombre_supervisor: String;

    // Inicializa la lista de eventos
    this.events = [];
    this.actividad_semanas = [];
    this.spinner.showSpinner();
    let mes = 0;

    // Obtén el número de semana en que se realiza cada actividad de mantenimiento preventivo
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
            // Imprime el nombre del encargado de mantenimiento que está asignado a la actividad
            if (solicitud.id_empleado && solicitud.id_empleado === empleado.id) {
              nombre_empleado = empleado.first_name + ' ' + empleado.last_name;
            }
            // Imprime el nombre del auditor que está asignado a la actividad
            if (solicitud.id_auditor && solicitud.id_auditor === empleado.id) {
              nombre_auditor = empleado.first_name + ' ' + empleado.last_name;
            }
            // Imprime el nombre del supervisor que está asignado a la actividad
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

      // Asignar el mes a la semana
      this.mes = Meses[mes];
      if (index === 52) {
        this.mes = 'Diciembre';
      }

      const element = 'Semana ' + index;
      this.actividad_semanas = [
        ...this.actividad_semanas,
        {
          titulo: element,
          mes: this.mes,
          events
        }
      ]

      if (index >= (await this.getFirstWeek(mes + 1)) - 1 ) {
        mes += 1;
      }
      if (mes === 12) {
        mes = 0;
      }
    }
    this.spinner.hideSpinner();
  }

  // Solicita el modal con base en el botón presionado en el sistema
  public addRequest(modal: TemplateRef<any>, mantenimiento: MantenimientoPreventivo) {
    this.mantenimiento = mantenimiento;
    this.modalComponent = this.modalService.show(modal, {backdrop : 'static', keyboard: false, class: 'modal-dialog-centered'});
  }

  public async assignWeek(modal: TemplateRef<any>, mantenimiento: MantenimientoPreventivo) {
    this.semanasDisponibles = [];
    this.mantenimiento = mantenimiento;
    this.mantenimiento.fecha_inicio = new Date(this.mantenimiento.fecha_inicio);
    // Obtén el número de semana
    this.nuevaSemana = moment(this.mantenimiento.fecha_inicio).week();
    // Obtén el mes
    const month = moment(this.mantenimiento.fecha_inicio).month();
    // Obtén el año
    const year = moment(this.mantenimiento.fecha_inicio).year();
    // Obtén la 1° semana
    const firstWeek = moment(new Date(year, month, 1 )).week();
    // Obtén la última semana
    // La última semana se obtiene restando un dia del 1° dia del siguiente mes
    const nuevaFecha = new Date(year, month + 1, 1);
    nuevaFecha.setDate((nuevaFecha.getDate() - 1));
    const lastWeek = moment(nuevaFecha).week();

    for (let index = firstWeek; index <= lastWeek; index++) {
      this.semanasDisponibles.push(index);
    }
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

  public async setWeek() {
    this.spinner.showSpinner();

    if (moment(this.mantenimiento.fecha_inicio).week() === this.nuevaSemana) {
      this.notificationsService.showWarning('No se detectaron cambios')
    } else {
      await this.setNewDate(moment(this.mantenimiento.fecha_inicio).week(), this.nuevaSemana);
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

  /**
   * Parámetros: Número de semana actual, número de semana nuevo
   * Objetivo: Cambiar la fecha de una actividad de mantenimiento preventivo cuando se cambia su semana de realización
   */
  private async setNewDate(currentWeek: number, newWeek: number) {
    const dif = Math.abs(currentWeek - newWeek);
    const days = dif * 7;
    const auxDate = (new Date(this.mantenimiento.fecha_inicio)).getDate();
    const newDate = new Date(this.mantenimiento.fecha_inicio);
    if (currentWeek > newWeek) {
      newDate.setDate(auxDate - days);
    } else {
      newDate.setDate(auxDate + days);
    }
    this.mantenimiento.fecha_inicio = newDate;
    const fecha = this.mantenimiento.fecha_inicio.toISOString().split('T')[0];
    this.mantenimiento.fecha_inicio = fecha;
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

  public async getFirstWeek(mes: number) {
    switch (mes) {
      case 0:
        return moment(new Date(2021, 0, 1)).week();
      case 1:
        return moment(new Date(2021, 1, 1)).week();
      case 2:
        return moment(new Date(2021, 2, 1)).week();
      case 3:
        return moment(new Date(2021, 3, 1)).week();
      case 4:
        return moment(new Date(2021, 4, 1)).week();
      case 5:
        return moment(new Date(2021, 5, 1)).week();
      case 6:
        return moment(new Date(2021, 6, 1)).week();
      case 7:
        return moment(new Date(2021, 7, 1)).week();
      case 8:
        return moment(new Date(2021, 8, 1)).week();
      case 9:
        return moment(new Date(2021, 9, 1)).week();
      case 10:
        return moment(new Date(2021, 10, 1)).week();
      case 11:
        return moment(new Date(2021, 11, 1)).week();
      default:
        return 52;
    }
  }
}

