import { NgForm } from '@angular/forms';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Area } from 'app/models/models.model';
import { AreasService } from 'app/services/areas.service';
import { SpinnerService } from 'app/services/spinner.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.css']
})
export class AreasComponent implements OnInit {
  public areas: Area[];
  public area: Area;
  public titulos: string[];
  public modalAdd: BsModalRef;

  constructor(
    private areasService: AreasService,
    private spinner: SpinnerService,
    private modalService: BsModalService
    ) { }

  ngOnInit(): void {
    this.loadInfo();
    this.titulos = ['Nombre', 'Descripcion'];
  }

  public async loadInfo() {
    try {
      this.spinner.showSpinner();
      this.areas = await this.areasService.getAreas();
    } catch (error) {
      throw new Error(error);
    } finally {
      this.spinner.hideSpinner();
    }
  }

  /**
   * Funcion para desplegar un modal para crear una categoría
   * @param modal
   */
  public addRequest(modaladd: TemplateRef<any>) {
    this.area = new Area();
    this.modalAdd = this.modalService.show(modaladd, {keyboard: true, class: 'modal-dialog-centered'});
  }

  public async create(form: NgForm) {
    try {
      this.spinner.showSpinner();
      await this.areasService.createArea(this.area);
    } catch (error) {
      console.log('no se creó');
    } finally {
      this.spinner.hideSpinner();
      window.location.reload();
    }
  }

}
