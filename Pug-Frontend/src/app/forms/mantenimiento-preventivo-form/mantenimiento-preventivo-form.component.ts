import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Categoria, Empleado, MantenimientoPreventivo, Proveedor } from 'app/models/models.model';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mantenimiento-preventivo-form',
  templateUrl: './mantenimiento-preventivo-form.component.html',
  styleUrls: ['./mantenimiento-preventivo-form.component.css']
})
export class MantenimientoPreventivoFormComponent {
  @Input() solicitud: MantenimientoPreventivo;
  @Input() categorias: Categoria[];
  @Input() solicitantes: Empleado[];
  @Input() supervisores: Empleado[];
  @Input() proveedores: Proveedor[];
  @Input() modaladd: BsModalRef;
  @Output() continueparent = new EventEmitter();

  public continue(form: NgForm) {
    this.continueparent.emit(form);
  }
}
