import { Categoria } from 'app/models/models.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css']
})
export class CategoriaFormComponent {
  @Input() categoria:Categoria;
  @Input() modaladd:BsModalRef;
  @Output() continueparent = new EventEmitter();

  public continue(form: NgForm) {
    this.continueparent.emit(form);
  }

}
