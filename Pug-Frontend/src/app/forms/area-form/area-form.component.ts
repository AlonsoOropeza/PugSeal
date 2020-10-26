import { Area } from 'app/models/models.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-area-form',
  templateUrl: './area-form.component.html',
  styleUrls: ['./area-form.component.css']
})
export class AreaFormComponent {
  @Input() area: Area;
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
