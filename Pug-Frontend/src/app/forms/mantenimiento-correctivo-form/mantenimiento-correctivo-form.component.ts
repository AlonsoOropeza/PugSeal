import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, Input, OnChanges, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Categoria, Usuario, MantenimientoCorrectivo, Proveedor , Hotel, Area} from 'app/models/models.model';
import { EventEmitter } from '@angular/core';
import { getWeek } from 'date-fns';
import { DatePipe, formatDate } from '@angular/common';
import moment = require('moment');
@Component({
  selector: 'app-mantenimiento-correctivo-form',
  templateUrl: './mantenimiento-correctivo-form.component.html',
  styleUrls: ['./mantenimiento-correctivo-form.component.css']
})
export class MantenimientoCorrectivoFormComponent {

  @Input() mantenimiento: MantenimientoCorrectivo;
  @Input() categorias: Categoria[];
  @Input() empleados: Usuario[];
  @Input() supervisores: Usuario[];
  @Input() proveedores: Proveedor[];
  @Input() hoteles: Hotel[];
  @Input() areas: Area[];
  @Input() name: String;
  @Input() edit: boolean;
  @Input() modaladd: BsModalRef;
  @Output() continueparent = new EventEmitter();
  @Output() cancelparent = new EventEmitter();
  public auditor: any;
  @Input() user: Usuario;
  public startDate: any;
  public yearStart: any;


  public continue(form: NgForm) {
    this.continueparent.emit(form);
  }

  public cancel() {
    this.cancelparent.emit();
  }

  updateWeek(value: number) {
    this.mantenimiento.semana = value;
  }

  changeDate() {
    this.mantenimiento.semana = moment(this.mantenimiento.fecha_solicitud).week();
  }

}
