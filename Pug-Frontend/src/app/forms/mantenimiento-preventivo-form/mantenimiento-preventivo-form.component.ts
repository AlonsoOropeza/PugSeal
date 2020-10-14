import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MantenimientoPreventivo } from 'app/models/models.model';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mantenimiento-preventivo-form',
  templateUrl: './mantenimiento-preventivo-form.component.html',
  styleUrls: ['./mantenimiento-preventivo-form.component.css']
})
export class MantenimientoPreventivoFormComponent {
  @Input() solicitud: MantenimientoPreventivo;
  @Input() modaladd: BsModalRef;
  @Output() continueparent = new EventEmitter();


  public continue(form: NgForm) {
    this.continueparent.emit(form);
  }
}
