import { NgForm } from '@angular/forms';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Categoria } from 'app/models/models.model';
import { CategoriasService } from 'app/services/categorias.service';
import { SpinnerService } from 'app/services/spinner.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  public categorias:Categoria[];
  public categoria:Categoria;
  public titulos:string[];
  public modalComponent: BsModalRef;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  constructor(
    private categoriaService: CategoriasService, 
    private spinner:SpinnerService,
    private modalService:BsModalService
    ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json'
      }
    };
    this.loadInfo();
    this.titulos = ['Nombre', 'Descripcion', 'Estado', 'Editar'];
  }

  public async loadInfo(){
    try {
      this.spinner.showSpinner();
      this.categorias = await this.categoriaService.getCategorias(); 
      this.dtTrigger.next();
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
  public addRequest(modal: TemplateRef<any>, categoria?:Categoria) {
    this.categoria = categoria ? categoria : new Categoria();
    this.modalComponent = this.modalService.show(modal, {keyboard: true, class: 'modal-dialog-centered'});
  }

  public async create(form:NgForm){
    try {
      this.spinner.showSpinner();
      await this.categoriaService.createCategoria(this.categoria);
    } catch (error) {
      console.log('no se creó');
    } finally {
      this.spinner.hideSpinner();
      window.location.reload();
    }
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  public async update(form:NgForm){
    try {
      this.spinner.showSpinner();
      await this.categoriaService.updateCategoria(this.categoria);
    } catch (error) {
      console.log('no se modificó'+error);
    } finally {
      this.spinner.hideSpinner();
      window.location.reload();
    }
  }

  public cancel() {
    this.modalComponent.hide();
    window.location.reload();
  }

}
