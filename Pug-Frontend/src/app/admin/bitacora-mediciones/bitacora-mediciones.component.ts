import { NotificationsService } from './../../services/notifications.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BitacoraMediciones, Usuario } from 'app/models/models.model';
import { BitacoraMedicionesService } from 'app/services/bitacora-mediciones.service';
import { SpinnerService } from 'app/services/spinner.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { kill } from 'process';

@Component({
  selector: 'app-bitacora-mediciones',
  templateUrl: './bitacora-mediciones.component.html',
  styleUrls: ['./bitacora-mediciones.component.css']
})
export class BitacoraMedicionesComponent implements OnInit {
  public bitacoras: BitacoraMediciones[];
  public bitacora: BitacoraMediciones;
  public auditor: Usuario;
  public auditores: Usuario[];
  public auditor_name: any;
  public responsable: Usuario;
  public responsables: Usuario[];
  public modalComponent: BsModalRef;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  public user: Usuario;

  constructor(
    private cookies: CookieService,
    private bitacoraMedicionesService: BitacoraMedicionesService,
    private spinner: SpinnerService,
    private modalService: BsModalService,
    private notificationsService: NotificationsService
    ) { }

  ngOnInit(): void {
    this.user = JSON.parse(this.cookies.get('user'));
    this.loadInfo();
  }
  public async loadInfo() {
    try {
      this.spinner.showSpinner();
      this.bitacoras = await this.bitacoraMedicionesService.getBitacoras();
      this.auditores = await this.bitacoraMedicionesService.getAuditores();
      this.responsables = await this.bitacoraMedicionesService.getResponsables();
      this.bitacoras.forEach(bitacora => {
        this.auditores.forEach(auditor => {
          if (bitacora.auditor_id === auditor.id) {
            bitacora.auditor_name = auditor.first_name + ' ' + auditor.last_name;
          }
        },
        this.responsables.forEach(responsable => {
          if (bitacora.responsable_id === responsable.id) {
            bitacora.responsable_name = responsable.first_name + ' ' + responsable.last_name;
          }
        })
      )})
    } catch (error) {
      throw new Error(error);
    } finally {
      this.spinner.hideSpinner();
    }
  }

  /**
   * addRequest
   */
  public addRequest(modal: TemplateRef<any>, bitacora?: BitacoraMediciones) {
    this.bitacora = bitacora ? bitacora : new BitacoraMediciones();
    this.modalComponent = this.modalService.show(modal, {backdrop : 'static', keyboard: false, class: 'modal-dialog-centered'});
  }

  public async create (form: NgForm) {
    this.spinner.showSpinner();
    console.log(this.bitacora);
    const input = {  
      ...this.bitacora,
      responsable: this.bitacora.responsable_id,
      auditor: this.bitacora.auditor_id
    };
      (await this.bitacoraMedicionesService.createBitacora(input)).subscribe(
        async () => {
          this.notificationsService.showNotification('Se ha creado correctamente la bitácora.', true)
          this.bitacoras = await this.bitacoraMedicionesService.getBitacoras()
      },
      async error => {
        this.notificationsService.showNotification(error.message, false);
        this.bitacoras = await this.bitacoraMedicionesService.getBitacoras()
      }
    );
    console.log(this.bitacora);
    this.spinner.hideSpinner();
    this.modalComponent.hide();
  }

  /**
   * async update
form: NgForm   */
  public async update(form: NgForm) {
    this.spinner.showSpinner();
    (await this.bitacoraMedicionesService.updateArea(this.bitacora)).subscribe(
      async () => {
        this.notificationsService.showNotification('Se ha actualizado correctamente el área.', true)
        this.bitacoras = await this.bitacoraMedicionesService.getBitacoras()
    },
      async error => {
        this.notificationsService.showNotification(error.message, false);
        this.bitacoras = await this.bitacoraMedicionesService.getBitacoras()
      }
    );
    this.spinner.hideSpinner();
    this.modalComponent.hide();
  }

  public async cancel() {
    this.bitacoras = await this.bitacoraMedicionesService.getBitacoras();
    this.modalComponent.hide();
  }

}
