import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Meses } from './../../shared/diccionarios';
import { Area, Categoria, Hotel, MantenimientoCorrectivo, Proveedor, Usuario } from 'app/models/models.model';
import { CategoriasService } from 'app/services/categorias.service';
import { EmpleadosService } from 'app/services/empleados.service';
import { MantenimientoCorrectivoService } from 'app/services/mantenimiento-correctivo.service';
import { NotificationsService } from 'app/services/notifications.service';
import { ProveedoresService } from 'app/services/proveedores.service';
import { SpinnerService } from 'app/services/spinner.service';
import moment = require('moment');
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { HotelService } from 'app/services/hotel.service';
import { AreasService } from 'app/services/areas.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-incidencias',
  templateUrl: './incidencias.component.html',
  styleUrls: ['./incidencias.component.css']
})
export class IncidenciasComponent implements OnInit {

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  public solicitudes: MantenimientoCorrectivo[];
  public user: Usuario;
  public proveedores: Proveedor[];
  public empleados: Usuario[];
  public categorias: Categoria[];
  public edit: boolean;
  public mantenimiento: MantenimientoCorrectivo;
  public mes: String;
  public modalComponent: BsModalRef;
  public events: any[] = [];
  public incidencias_semanas: any[] = [];
  public hoteles: Hotel[];
  public areas: Area[];
  public name: String;
  public inconclusas: MantenimientoCorrectivo[];

  constructor(
    private modal: NgbModal,
    private mantenimientoCorrectivoService: MantenimientoCorrectivoService,
    private spinner: SpinnerService,
    private modalService: BsModalService,
    private mantenimientoService: MantenimientoCorrectivoService,
    private notificationsService: NotificationsService,
    private proveedoresService: ProveedoresService,
    private categoriasService: CategoriasService,
    private empleadosService: EmpleadosService,
    private hotelesService: HotelService,
    private areaService: AreasService,
    private cookies: CookieService,
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(this.cookies.get('user'));
    this.loadInfo();
  }

  public async loadInfo() {
    let porcentaje:any;
    let incidecnias_finalizadas = 0;
    let incidencias_totales = 0;
    const mes = moment(new Date()).month();
    this.mes = Meses[mes];
    this.events = [];
    this.spinner.showSpinner();
    this.solicitudes = await this.mantenimientoCorrectivoService.getMantenimientosCorrectivos();
    this.solicitudes.forEach(solicitud => {
      this.events = [
        ...this.events,
        {
          ...solicitud,
          semana: moment(new Date(solicitud.fecha_solicitud)).week()
        },
      ];
    });
    console.log(this.solicitudes);
    //INCONCLUSAS
    this.inconclusas = [];
    this.solicitudes.forEach(solicitud => {
      if (!solicitud.finalizada){
      this.inconclusas = [
        ...this.inconclusas,
        {
          ...solicitud,
          semana: moment(new Date(solicitud.fecha_solicitud)).week()
        },
      ];
    }
    });

    for (let index = 1; index < 53; index++) {
      porcentaje = 0.0;
      incidecnias_finalizadas = 0;
      incidencias_totales = 0;
      let events = [];
      this.solicitudes.forEach(solicitud => {
        if (moment(solicitud.fecha_solicitud).week() === index) {
          incidencias_totales++;
          if(solicitud.finalizada === true){
            incidecnias_finalizadas++;
          }
          events = [
            ...events,
            {
              ...solicitud,
              semana: moment(new Date(solicitud.fecha_solicitud)).week()
            },
          ];
        }
        if(incidencias_totales > 0){
          porcentaje = (incidecnias_finalizadas/incidencias_totales) * 100;
          porcentaje = Math.round(porcentaje) + ' %';
        }else{
          porcentaje = 'NA';
        }
        console.log(porcentaje * 100, incidecnias_finalizadas, incidencias_totales);
      });
      const element = 'Semana ' + index;
      this.incidencias_semanas = [
        ...this.incidencias_semanas,
        {
          titulo: element,
          eventos: {
            events
          },
          porcentaje
        }
      ]
    }
    console.log(this.incidencias_semanas);
    this.spinner.hideSpinner();
    this.categorias = await this.categoriasService.getCategorias();
    this.empleados = await this.empleadosService.getEmpleados();
    this.proveedores = await this.proveedoresService.getProveedores();
    this.hoteles = await this.hotelesService.getHoteles();
    this.areas = await this.areaService.getAreas();
  }

    /**
   * Esta función es para recibir un request, ya sea vacío para crearlo o prellenado para editarlo
   * @param modal: TemplateRef
   * @param mantenimiento: MantenimientoCorrectivo
   * @param edit: boolean
   */
  public addRequest(modal: TemplateRef<any>, mantenimiento?: MantenimientoCorrectivo, edit?: boolean) {
    this.edit = edit !== undefined ? edit : true;
    this.getNameById(mantenimiento.id_solicitante);
    if (this.edit) {
      if (mantenimiento && mantenimiento.finalizada && this.user.rol === 'encargadoMantenimiento' ) {
        this.edit = false;
        this.notificationsService.showWarning('La solicitud ya ha sido aprobada, por lo que no puede modificarse.');
      } else {
        this.edit = true;
      }
    }
    this.mantenimiento = mantenimiento ? mantenimiento : new MantenimientoCorrectivo();
    this.modalComponent = this.modalService.show(modal, {backdrop : 'static', keyboard: false, class: 'modal-dialog-centered'});
  }

    /**
   * Recibe Id del solicitante para obtener el nombre.
   * @param id :Number
   */
  public async getNameById(id: Number) {
    this.name = this.empleados.find(x => x.id === id).first_name;
  }

  public async update(form: NgForm) {
      this.spinner.showSpinner();
      (await this.mantenimientoService.updateMantenimientoCorrectivo(this.mantenimiento)).subscribe(
        async () => {
          this.notificationsService.showNotification('Se ha actualizado correctamente la solicitud.', true),
          this.mantenimiento = await this.mantenimientoService.getMantenimientosCorrectivos()
        },
        async error => {
          this.notificationsService.showNotification(error.message, false),
          this.mantenimiento = await this.mantenimientoService.getMantenimientosCorrectivos()
        }
      );
      this.spinner.hideSpinner();
      this.modalComponent.hide();
    }

    public async cancel() {
      this.mantenimiento = await this.mantenimientoService.getMantenimientosCorrectivos();
      this.modalComponent.hide();
    }
}
