import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Proveedor } from 'app/models/models.model';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-proveedor-form',
  templateUrl: './proveedor-form.component.html',
  styleUrls: ['./proveedor-form.component.css']
})
export class ProveedorFormComponent {
  @Input() proveedor: Proveedor;
  @Input() modaladd: BsModalRef;
  @Input() edit: boolean;
  @Output() continueparent = new EventEmitter();
  @Output() cancelparent = new EventEmitter();

  public continue(form: NgForm) {
    this.continueparent.emit(form);
  }

  public cancel() {
    this.cancelparent.emit();
  }

}
