import { Component, EventEmitter, Input, Output  } from '@angular/core';
import { Usuario, Hotel } from './../../models/models.model';
import { NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-hotel-form',
  templateUrl: './hotel-form.component.html',
  styleUrls: ['./hotel-form.component.css']
})
export class HotelFormComponent {
  @Input() hotel: Hotel;
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
