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
  public encargados: Usuario[];
  public categorias: Categoria[];

  constructor(
    private mantenimientoService: MantenimientoPreventivoService,
    private spinner: SpinnerService,
    private modalService: BsModalService,
    private notificationsService: NotificationsService,
    private proveedoresService: ProveedoresService,
    private categoriasService: CategoriasService,
    private encargadosService: EmpleadosService
    ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json'
      }
    };
    this.loadInfo();
    this.titulos = ['Actividad', 'Categoria', 'Fecha Planeada', 'Finalizado', 'Editar', 'Ver'];
  }

  public async loadInfo() {
    this.spinner.showSpinner();
    this.mantenimientos = await this.mantenimientoService.getMantenimientosPreventivos();
    this.categorias = await this.categoriasService.getCategorias();
    this.encargados = await this.encargadosService.getEmpleados();
    this.proveedores = await this.proveedoresService.getProveedores();
    this.dtTrigger.next();
    this.spinner.hideSpinner();
  }

  public async create(form: NgForm) {
    if (form.value.frecuencia_anual < 1 || form.value.frecuencia_anual > 12) {
      this.notificationsService.showNotification('La frecuencia anual debe realizarse entre 1 a 12 veces al año', false);
      throw new Error('Error');
    }
    if (form.value.presupuesto < 0) {
      this.notificationsService.showNotification('El presupuesto no puede ser menor a 0', false);
      throw new Error('Error');
    }

    this.spinner.showSpinner();
    do {
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
      this.mantenimiento.fecha_real.setMonth( this.mantenimiento.fecha_real.getMonth() + this.mantenimiento.frecuencia_anual );
    } while (this.mantenimiento.fecha_real < this.mantenimiento.fecha_planeada);

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
    this.edit = edit ? edit : false;
    this.mantenimiento = mantenimiento ? mantenimiento : new MantenimientoPreventivo();
    this.modalComponent = this.modalService.show(modal, {backdrop : 'static', keyboard: false, class: 'modal-dialog-centered'});
  }
}
