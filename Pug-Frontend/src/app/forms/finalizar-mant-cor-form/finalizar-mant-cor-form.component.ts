import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Area, Categoria, Hotel, MantenimientoCorrectivo, Proveedor, Usuario } from 'app/models/models.model';
import { MantenimientoCorrectivoService } from 'app/services/mantenimiento-correctivo.service';
import { NotificationsService } from 'app/services/notifications.service';
import { SpinnerService } from 'app/services/spinner.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-finalizar-mant-cor-form',
  templateUrl: './finalizar-mant-cor-form.component.html',
  styleUrls: ['./finalizar-mant-cor-form.component.css']
})
export class FinalizarMantCorFormComponent implements OnInit {

  @Input() mantenimiento: MantenimientoCorrectivo;
  @Input() empleados: Usuario[];
  @Input() name: String;
  @Input() edit: boolean;
  @Input() modaladd: BsModalRef;
  @Output() continueparent = new EventEmitter();
  @Output() cancelparent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  public continue(form: NgForm) {
    this.continueparent.emit(form);
  }

  public cancel() {
    this.cancelparent.emit();
  }

}
