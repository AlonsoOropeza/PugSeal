import { Usuario } from './../../models/models.model';
import { BitacoraMediciones } from 'app/models/models.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-bitacora-mediciones-form',
  templateUrl: './bitacora-mediciones-form.component.html',
  styleUrls: ['./bitacora-mediciones-form.component.css']
})

export class BitacoraMedicionesFormComponent {
  @Input() bitacora: BitacoraMediciones;
  @Input() user: Usuario;
  @Input() modaladd: BsModalRef;
  @Output() continueparent = new EventEmitter();
  @Output() cancelparent = new EventEmitter();

  public continue(form: NgForm) {
    this.continueparent.emit(form);
  }
  public cancel() {
    this.cancelparent.emit();
  }
}
