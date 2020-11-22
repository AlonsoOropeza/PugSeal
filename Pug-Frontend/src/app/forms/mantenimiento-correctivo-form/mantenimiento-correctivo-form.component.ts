import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, Input, OnChanges, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Categoria, Usuario, MantenimientoCorrectivo, Proveedor , Hotel, Area} from 'app/models/models.model';
import { EventEmitter } from '@angular/core';
import { getWeek } from 'date-fns';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-mantenimiento-correctivo-form',
  templateUrl: './mantenimiento-correctivo-form.component.html',
  styleUrls: ['./mantenimiento-correctivo-form.component.css']
})
export class MantenimientoCorrectivoFormComponent implements OnInit{

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
  public week: any;
  public startDate: any;
  public yearStart: any;

  ngOnInit(): void{
    
    console.log(this.startDate);
    this.getWeek(this.startDate);
  }

  constructor(){
    this.startDate = new Date().toISOString().substring(0, 10);
    console.log(this.startDate);
  }

  public continue(form: NgForm) {
    this.continueparent.emit(form);
  }

  public cancel() {
    this.cancelparent.emit();
  }

  public getWeek(date: any){
    //console.log(this.date);
    date = new Date();
    //console.log(date);
    date = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
    date = new Date();
    //console.log(date);
    date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));

    this.yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));

    this.week = Math.ceil(( ( (date - this.yearStart) / 86400000) + 1) / 7);


  } 

}
