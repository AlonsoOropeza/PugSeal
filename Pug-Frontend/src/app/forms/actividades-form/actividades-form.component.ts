import { EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MantenimientoPreventivo, Usuario } from 'app/models/models.model';
import { BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-actividades-form',
  templateUrl: './actividades-form.component.html',
  styleUrls: ['./actividades-form.component.css']
})
export class ActividadesFormComponent implements OnInit {

  @Input() mantenimiento: MantenimientoPreventivo;
  @Input() modaladd: BsModalRef;
  @Input() user: Usuario;
  @Output() continueparent = new EventEmitter();
  @Output() cancelparent = new EventEmitter();

  ngOnInit(): void {
  }

  public continue(form: NgForm) {
    this.continueparent.emit(form);
  }

  public cancel() {
    this.cancelparent.emit();
  }

}
