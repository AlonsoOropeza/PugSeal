import { Component, OnInit, TemplateRef } from '@angular/core';
import { Categoria } from 'app/models/models.model';
import { CategoriasService } from 'app/services/categorias.service';
import { SpinnerService } from 'app/services/spinner.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  public categorias:Categoria[];
  public categoria:Categoria;
  public titulos:string[];
  public modalAdd: BsModalRef;

  constructor(
    private categoriaService: CategoriasService, 
    private spinner:SpinnerService,
    private modalService:BsModalService
    ) { }

  ngOnInit(): void {
    this.loadInfo();
    this.titulos = ['Nombre', 'Descripcion'];
  }

  public async loadInfo(){
    try {
      this.spinner.showSpinner();
      this.categorias = await this.categoriaService.getCategorias(); 
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
  public addRequest(modal: TemplateRef<any>) {
    this.categoria = new Categoria({nombre:'aa', descripcion:'aa'});
    this.modalAdd = this.modalService.show(modal, {keyboard: true, class: 'modal-dialog-centered'});
  }

  public async createCategoria(){

  }

}
