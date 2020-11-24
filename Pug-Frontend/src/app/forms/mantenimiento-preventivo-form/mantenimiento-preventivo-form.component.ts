import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Categoria, Usuario, MantenimientoPreventivo, Proveedor } from 'app/models/models.model';
import { EventEmitter } from '@angular/core';
import { INgxSelectOption } from 'ngx-select-ex';

@Component({
  selector: 'app-mantenimiento-preventivo-form',
  templateUrl: './mantenimiento-preventivo-form.component.html',
  styleUrls: ['./mantenimiento-preventivo-form.component.css']
})
export class MantenimientoPreventivoFormComponent implements OnInit {

  @Input() mantenimiento: MantenimientoPreventivo;
  @Input() categorias: Categoria[];
  @Input() empleados: Usuario[];
  @Input() supervisores: Usuario[];
  @Input() proveedores: Proveedor[];
  @Input() edit: boolean;
  @Input() admin: boolean;
  @Input() modaladd: BsModalRef;
  @Output() continueparent = new EventEmitter();
  @Output() cancelparent = new EventEmitter();
  public auditor: any;
  @Input() user: Usuario;
  public items: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  public ngxValue: any = [];

  // Para precargar el auditor en la forma
  ngOnInit(): void {
    this.auditor = this.mantenimiento.id_auditor ? this.mantenimiento.id_auditor : 'Aún no cuenta con un auditor';
    this.empleados.forEach(empleado => {
      if (empleado.id === this.auditor ) {
        this.auditor = empleado.first_name + ' ' + empleado.last_name;
      }
    });
  }

  public continue(form: NgForm) {
    this.continueparent.emit(form);
  }

  public cancel() {
    this.cancelparent.emit();
  }
}
