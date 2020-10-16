import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MantenimientoPreventivo } from 'app/models/models.model';
import { MantenimientoService } from 'app/services/mantenimiento.service';
import { SpinnerService } from 'app/services/spinner.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

declare interface TableData {
  headerRow: string[];
}

@Component({
  selector: 'app-mantenimiento-preventivo',
  templateUrl: './mantenimiento-preventivo.component.html',
  styleUrls: ['./mantenimiento-preventivo.component.css']
})
export class MantenimientoPreventivoComponent implements OnInit {
  public tableData1: TableData;
  public titulos: string[];
  public solicitudes: MantenimientoPreventivo[];
  public solicitud: MantenimientoPreventivo;
  public modalAdd: BsModalRef;

  constructor(
    private mantenimientoService: MantenimientoService,
    private modalService: BsModalService,
    private spinner: SpinnerService
    ) { }
  ngOnInit() {
    try {
      this.spinner.showSpinner();
      this.loadInfo();
      this.titulos = ['Actividad', 'Referencia', 'Frecuencia', 'Presupuesto', 'Duracion'];
    } catch (error) {
      console.log('error al cargar');
    } finally {
      this.spinner.hideSpinner();
    }
  }

  private async loadInfo() {
      this.solicitudes = await this.mantenimientoService.getSolicitudesMantenimientoPreventivo();
      console.log(this.solicitudes);
  }

  public viewRequest(modal: TemplateRef<any>, solicitud: any, edit: boolean) {

  }

  /**
   * Funcion para desplegar un modal para crear una solicitud de mantenimiento preventivo
   * @param modal
   */
  public addRequest(modal: TemplateRef<any>) {
    const s1 = {
      actividad: '',
      comentarios_supervisor: '5mentarios',
      duracion_horas: 0,
      fecha_creacion: new Date(),
      frecuencia: 0,
      id_categoria: 1,
      id_empleado: 1,
      id_mantprev: 1,
      id_proveedor: 1,
      id_supervisor: 1,
      monto_total: 0,
      referencia: 'lel'
    }
    this.solicitud = new MantenimientoPreventivo(s1);
    this.modalAdd = this.modalService.show(modal, {keyboard: true, class: 'modal-dialog-centered'})
  }

  public async create(form: NgForm) {
    try {
      this.spinner.showSpinner();
      await this.mantenimientoService.createSolicitudMantenimientoPreventivo(this.solicitud);
      await this.loadInfo();
    } catch (error) {
      console.log('no se creó');
    } finally {
      this.spinner.hideSpinner();
      window.location.reload();
    }
  }


}
