import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Hotel, Usuario } from './../../models/models.model';
import { Requisicion } from 'app/models/models.model';

@Component({
  selector: 'app-requisicion-form',
  templateUrl: './requisicion-form.component.html',
  styleUrls: ['./requisicion-form.component.css']
})

export class RequisicionFormComponent {

  @Input() requisicion: Requisicion;
  @Input() edit: boolean;
  @Input() modaladd: BsModalRef;
  @Input() hoteles: Hotel[];
  @Output() continueparent = new EventEmitter();
  @Output() cancelparent = new EventEmitter();
  private user: Usuario;

  public continue(form: NgForm) {
    this.continueparent.emit(form);
  }

  public cancel() {
    this.cancelparent.emit();
  }

}
