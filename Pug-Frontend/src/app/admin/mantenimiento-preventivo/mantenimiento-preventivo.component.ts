import { Component, OnInit } from '@angular/core';
import { MantenimientoPreventivo } from 'app/models/models.model';
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

  constructor(
    private mantenimientoService: MantenimientoPreventivoService,
    private spinner: SpinnerService,
    private modalService: BsModalService,
    private notificationsService: NotificationsService
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
    this.titulos = ['Actividad', 'Fecha Planeada', 'Categoria', 'Presupuesto', 'Frecuencia Anual'];
  }

  public async loadInfo() {
    this.spinner.showSpinner();
    this.mantenimientos = await this.mantenimientoService.getMantenimientosPreventivos();
    this.dtTrigger.next();
    this.spinner.hideSpinner();
  }


}
