import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MantenimientoCorrectivo, Usuario } from 'app/models/models.model';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-calificar-mant-cor-form',
  templateUrl: './calificar-mant-cor-form.component.html',
  styleUrls: ['./calificar-mant-cor-form.component.css']
})
export class CalificarMantCorFormComponent implements OnInit {

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

  public continue(form: NgForm){
    this.continueparent.emit(form);
  }

  public cancel() {
    this.cancelparent.emit();
  }

}
