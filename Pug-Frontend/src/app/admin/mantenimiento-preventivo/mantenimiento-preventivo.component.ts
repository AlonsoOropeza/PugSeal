import { ProveedoresService } from './../../services/proveedores.service';
import { EmpleadosService } from './../../services/empleados.service';
import { CategoriasService } from './../../services/categorias.service';
import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MantenimientoPreventivo, Proveedor, Categoria, Usuario } from 'app/models/models.model';
import { MantenimientoPreventivoService } from 'app/services/mantenimiento_preventivo.service';
import { NotificationsService } from 'app/services/notifications.service';
import { SpinnerService } from 'app/services/spinner.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { DataTableDirective } from 'angular-datatables';
import moment = require('moment');
import { Meses } from 'app/shared/diccionarios';
import { getYear } from 'date-fns';


@Component({
  selector: 'app-mantenimiento-preventivo',
  templateUrl: './mantenimiento-preventivo.component.html',
  styleUrls: ['./mantenimiento-preventivo.component.css']
})
export class MantenimientoPreventivoComponent implements OnDestroy, OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  public mantenimiento: MantenimientoPreventivo;
  public mantenimientos: MantenimientoPreventivo[];
  public titulos: string[];
  public modalComponent: BsModalRef;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  public edit = true;
  public proveedores: Proveedor[];
  public empleados: Usuario[];
  public categorias: Categoria[];
  public user: Usuario;
  public isAdmin = false;
  public canDelete = false;
  public nextYear = moment(new Date()).year() + 1;

  constructor(
    private mantenimientoService: MantenimientoPreventivoService,
    private spinner: SpinnerService,
    private modalService: BsModalService,
    private notificationsService: NotificationsService,
    private proveedoresService: ProveedoresService,
    private categoriasService: CategoriasService,
    private empleadosService: EmpleadosService,
    private cookies: CookieService,
    ) { }

  ngOnInit(): void {
    this.user = JSON.parse(this.cookies.get('user'));
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 25,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json'
      }
    };
    this.loadInfo().then(() => {
      this.render();
    });
    this.titulos = ['Actividad', 'Aprobado', 'Mes', 'Semana', 'Ver', 'Editar'];
  }

  public async loadInfo() {
    this.spinner.showSpinner();
    if (this.user.rol === 'Admin') {
      this.isAdmin = true;
    }
    this.canDelete = this.user.rol === 'Admin' || this.user.rol === 'Auditor' ? true : false;
    this.mantenimientos = await this.mantenimientoService.getMantenimientosPreventivos();
    this.mantenimientos.forEach(element => {
      element.mes = element.fecha_inicio ? Meses[moment(element.fecha_inicio).month()] : null;
      element.semana = element.fecha_inicio ? moment(element.fecha_inicio).week() : null;
    });

    this.categorias = await this.categoriasService.getCategorias();
    this.empleados = await this.empleadosService.getEmpleados();
    this.proveedores = await this.proveedoresService.getProveedores();
    this.spinner.hideSpinner();

  }

  public async create(form?: NgForm, fecha?: any) {
    if (form.value.frecuencia_anual < 1 || form.value.frecuencia_anual > 12) {
      this.notificationsService.showNotification('La frecuencia anual debe realizarse entre 1 a 12 veces al año', false);
      throw new Error('Error');
    }
    this.mantenimiento.fecha_inicio = fecha ? fecha : this.mantenimiento.fecha_inicio;
    this.mantenimiento.fecha_inicio = this.mantenimiento.fecha_inicio ? this.mantenimiento.fecha_inicio : null;

    this.spinner.showSpinner();
      (await this.mantenimientoService.createMantenimientoPreventivo(this.mantenimiento)).subscribe(
        async () => {
          this.notificationsService.showNotification('Se ha creado correctamente la solicitud.', true)
          this.loadInfo();
        },
        async error => {
          this.notificationsService.showNotification(error.message, false);
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

  /**
   * Esta función es para recibir un request, ya sea vacío para crearlo o prellenado para editarlo
   * @param modal: TemplateRef
   * @param mantenimiento: MantenimientoPreventivo
   * @param edit: boolean
   */
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

  public async update(form: NgForm) {
    const mant_del = this.mantenimiento;
    if (form.value.frecuencia_anual < 1 || form.value.frecuencia_anual > 12) {
      this.notificationsService.showNotification('La frecuencia anual debe realizarse entre 1 a 12 veces al año', false);
      throw new Error('Error');
    }
    if (form.value.aprobado) {
      this.mantenimiento.id_auditor = this.user.id;
    }

    if (!this.mantenimiento.fecha_inicio && form.value.meses !== [] && form.value.meses !== undefined && this.mantenimiento.aprobado) {
      form.value.meses.forEach(async element => {
        this.mantenimiento.fecha_inicio = await this.selectMonth(element);
        const fecha = this.mantenimiento.fecha_inicio.toISOString().split('T')[0];
        this.mantenimiento.fecha_inicio = fecha;
        setTimeout(async () => {
          await this.create(form, fecha);
      }, 5000);
      });
      this.delete(mant_del);
    } else {
      this.spinner.showSpinner();
        (await this.mantenimientoService.updateMantenimiento(this.mantenimiento)).subscribe(
          async () => {
            this.notificationsService.showNotification('Se ha actualizado correctamente la solicitud.', true),
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
  }

  public async selectMonth(mes: string) {
    switch (mes) {
      case 'Enero':
        return new Date(2021, 0, 1);
      case 'Febrero':
        return new Date(2021, 1, 1);
      case 'Marzo':
        return new Date(2021, 2, 1);
      case 'Abril':
        return new Date(2021, 3, 1);
      case 'Mayo':
        return new Date(2021, 4, 1);
      case 'Junio':
        return new Date(2021, 5, 1);
      case 'Julio':
        return new Date(2021, 6, 1);
      case 'Agosto':
        return new Date(2021, 7, 1);
      case 'Septiembre':
        return new Date(2021, 8, 1);
      case 'Octubre':
        return new Date(2021, 9, 1);
      case 'Noviembre':
        return new Date(2021, 10, 1);
      case 'Diciembre':
        return new Date(2021, 11, 1);
      default:
        return new Date();
    }
  }

  public async delete(mantenimiento?: MantenimientoPreventivo) {
    const mant = mantenimiento ? mantenimiento : this.mantenimiento;
    this.spinner.showSpinner();
    (await this.mantenimientoService.deleteMantenimiento(mant)).subscribe(
      async () => {
        this.notificationsService.showNotification('Se ha eliminado correctamente la solicitud.', true),
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

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  render(): void {
    this.dtTrigger.next();
  }

  async rerender(): Promise<void> {
    this.dtTrigger.unsubscribe();
    this.dtTrigger.next();
  }

}
