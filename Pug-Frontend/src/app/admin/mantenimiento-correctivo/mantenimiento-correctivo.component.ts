import { ProveedoresService } from './../../services/proveedores.service';
import { EmpleadosService } from './../../services/empleados.service';
import { CategoriasService } from './../../services/categorias.service';
import { HotelService } from './../../services/hotel.service';
import { AreasService } from './../../services/areas.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MantenimientoCorrectivo, Proveedor, Categoria, Usuario, Hotel, Area } from 'app/models/models.model';
import { MantenimientoCorrectivoService } from 'app/services/mantenimiento-correctivo.service';
import { NotificationsService } from 'app/services/notifications.service';
import { SpinnerService } from 'app/services/spinner.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import moment = require('moment');


@Component({
  selector: 'app-mantenimiento-correctivo',
  templateUrl: './mantenimiento-correctivo.component.html',
  styleUrls: ['./mantenimiento-correctivo.component.css']
})
export class MantenimientoCorrectivoComponent implements OnInit {

  public mantenimiento: MantenimientoCorrectivo;
  public mantenimientos: MantenimientoCorrectivo[];
  public titulos: string[];
  public modalComponent: BsModalRef;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  public edit = true;
  public proveedores: Proveedor[];
  public empleados: Usuario[];
  public categorias: Categoria[];
  public hoteles: Hotel[];
  public areas: Area[];
  public user: Usuario;
  public name: String;
  public canDelete = false;
  
  constructor(
    private mantenimientoService: MantenimientoCorrectivoService,
    private spinner: SpinnerService,
    private modalService: BsModalService,
    private notificationsService: NotificationsService,
    private proveedoresService: ProveedoresService,
    private categoriasService: CategoriasService,
    private empleadosService: EmpleadosService,
    private hotelesService: HotelService,
    private areaService: AreasService,
    private cookies: CookieService
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
    this.canDelete = this.user.rol === 'Admin' || this.user.rol === 'Auditor' ? true : false;
    this.mantenimientos = await this.mantenimientoService.getMantenimientosCorrectivos();
    this.categorias = await this.categoriasService.getCategorias();
    this.empleados = await this.empleadosService.getEmpleados();
    this.proveedores = await this.proveedoresService.getProveedores();
    this.hoteles = await this.hotelesService.getHoteles();
    this.areas = await this.areaService.getAreas();
    this.mantenimientos.forEach(mantenimiento => {
      mantenimiento.semana = moment(mantenimiento.fecha_solicitud).week();
    });
    this.dtTrigger.next();
    this.spinner.hideSpinner();
  }

  public async create(form: NgForm) {
    this.mantenimiento.id_solicitante = this.user.id;
    console.log(this.mantenimiento.fecha_solicitud);
    this.spinner.showSpinner();
      (await this.mantenimientoService.createMantenimientoCorrectivo(this.mantenimiento)).subscribe(
        async () => {
          this.notificationsService.showNotification('Se ha creado correctamente la solicitud.', true)
          this.mantenimientos = await this.mantenimientoService.getMantenimientosCorrectivos()
        },
        async error => {
          this.notificationsService.showNotification(error.message, false);
          this.mantenimientos = await this.mantenimientoService.getMantenimientosCorrectivos()
        }
    );
    this.spinner.hideSpinner();
    this.modalComponent.hide();
  }

  public async cancel() {
    this.mantenimientos = await this.mantenimientoService.getMantenimientosCorrectivos();
    this.modalComponent.hide();
  }

  /**
   * Esta función es para recibir un request, ya sea vacío para crearlo o prellenado para editarlo
   * @param modal: TemplateRef
   * @param mantenimiento: MantenimientoCorrectivo
   * @param edit: boolean
   */
  public addRequest(modal: TemplateRef<any>, mantenimiento?: MantenimientoCorrectivo, edit?: boolean) {
    this.edit = edit !== undefined ? edit : true;
    if (this.mantenimiento) {
      this.getNameById(this.mantenimiento.id_solicitante);
    }else{
      this.getNameById(this.user.id);
    }

    if (this.edit) {
      if (mantenimiento && mantenimiento.finalizada && this.user.rol === 'encargadoMantenimiento' ) {
        this.edit = false;
        this.notificationsService.showWarning('La solicitud ya ha sido aprobada, por lo que no puede modificarse.');
      } else {
        this.edit = true;
      }
    }
    this.mantenimiento = mantenimiento ? mantenimiento : new MantenimientoCorrectivo();
    this.modalComponent = this.modalService.show(modal, {backdrop : 'static', keyboard: false, class: 'modal-dialog-centered'});
  }

  public async update(form: NgForm) {
  /*  if (form.value.aprobado) {
      this.mantenimiento.id_auditor = this.user.id;
    }*/

    this.spinner.showSpinner();
    (await this.mantenimientoService.updateMantenimientoCorrectivo(this.mantenimiento)).subscribe(
      async () => {
        this.notificationsService.showNotification('Se ha actualizado correctamente la solicitud.', true),
        this.mantenimientos = await this.mantenimientoService.getMantenimientosCorrectivos()
      },
      async error => {
        this.notificationsService.showNotification(error.message, false),
        this.mantenimientos = await this.mantenimientoService.getMantenimientosCorrectivos()
      }
    );
    this.spinner.hideSpinner();
    this.modalComponent.hide();
  }

  public async delete(mantenimiento: MantenimientoCorrectivo) {
    this.spinner.showSpinner();
    (await this.mantenimientoService.deleteMantenimientoCorrectivo(this.mantenimiento)).subscribe(
      async () => {
        this.notificationsService.showNotification('Se ha eliminado correctamente la solicitud.', true),
        this.mantenimientos = await this.mantenimientoService.getMantenimientosCorrectivos()
      },
      async error => {
        this.notificationsService.showNotification(error.message, false),
        this.mantenimientos = await this.mantenimientoService.getMantenimientosCorrectivos()
      }
    );
    this.spinner.hideSpinner();
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
