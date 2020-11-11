import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Categoria, Usuario, MantenimientoPreventivo, Proveedor } from 'app/models/models.model';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mantenimiento-preventivo-form',
  templateUrl: './mantenimiento-preventivo-form.component.html',
  styleUrls: ['./mantenimiento-preventivo-form.component.css']
})
export class MantenimientoPreventivoFormComponent {
  @Input() mantenimiento: MantenimientoPreventivo;
  @Input() categorias: Categoria[];
  @Input() encargados: Usuario[];
  @Input() supervisores: Usuario[];
  @Input() proveedores: Proveedor[];
  @Input() edit: boolean;
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
