import { ProveedoresService } from './../../services/proveedores.service';
import { EmpleadosService } from './../../services/empleados.service';
import { CategoriasService } from './../../services/categorias.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MantenimientoPreventivo, Proveedor, Categoria, Usuario } from 'app/models/models.model';
import { MantenimientoPreventivoService } from 'app/services/mantenimiento_preventivo.service';
import { NotificationsService } from 'app/services/notifications.service';
import { SpinnerService } from 'app/services/spinner.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-mantenimiento-preventivo',
  templateUrl: './mantenimiento-preventivo.component.html',
  styleUrls: ['./mantenimiento-preventivo.component.css']
})
export class MantenimientoPreventivoComponent implements OnInit {

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
      pageLength: 10,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json'
      }
    };
    this.loadInfo();
    this.titulos = ['Actividad', 'Fecha De Inicio', 'Aprobado', 'Ver', 'Editar'];
  }

  public async loadInfo() {
    this.spinner.showSpinner();
    this.mantenimientos = await this.mantenimientoService.getMantenimientosPreventivos();
    this.categorias = await this.categoriasService.getCategorias();
    this.empleados = await this.empleadosService.getEmpleados();
    this.proveedores = await this.proveedoresService.getProveedores();
    this.dtTrigger.next();
    this.spinner.hideSpinner();
  }

  public async create(form: NgForm) {
    if (form.value.frecuencia_anual < 1 || form.value.frecuencia_anual > 12) {
      this.notificationsService.showNotification('La frecuencia anual debe realizarse entre 1 a 12 veces al año', false);
      throw new Error('Error');
    }

    this.spinner.showSpinner();
      (await this.mantenimientoService.createMantenimientoPreventivo(this.mantenimiento)).subscribe(
        async () => {
          this.notificationsService.showNotification('Se ha creado correctamente la solicitud.', true)
          this.mantenimientos = await this.mantenimientoService.getMantenimientosPreventivos()
        },
        async error => {
          this.notificationsService.showNotification(error.message, false);
          this.mantenimientos = await this.mantenimientoService.getMantenimientosPreventivos()
        }
    );
    this.spinner.hideSpinner();
    this.modalComponent.hide();
  }

  public async cancel() {
    this.mantenimientos = await this.mantenimientoService.getMantenimientosPreventivos();
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
        this.mantenimientos = await this.mantenimientoService.getMantenimientosPreventivos()
      },
      async error => {
        this.notificationsService.showNotification(error.message, false),
        this.mantenimientos = await this.mantenimientoService.getMantenimientosPreventivos()
      }
    );
    this.spinner.hideSpinner();
    this.modalComponent.hide();
  }

  public async delete(mantenimiento: MantenimientoPreventivo) {
    this.spinner.showSpinner();
    (await this.mantenimientoService.deleteMantenimiento(this.mantenimiento)).subscribe(
      async () => {
        this.notificationsService.showNotification('Se ha eliminado correctamente la solicitud.', true),
        this.mantenimientos = await this.mantenimientoService.getMantenimientosPreventivos()
      },
      async error => {
        this.notificationsService.showNotification(error.message, false),
        this.mantenimientos = await this.mantenimientoService.getMantenimientosPreventivos()
      }
    );
    this.spinner.hideSpinner();
    this.modalComponent.hide();
  }

}
