import { Meses } from './../../shared/diccionarios';
import { MantenimientoPreventivoService } from 'app/services/mantenimiento_preventivo.service';
import { Component, OnInit } from '@angular/core';
import { ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth,  isSameDay,  isSameMonth,  addHours } from 'date-fns';
import { Subject } from 'rxjs';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Categoria, MantenimientoPreventivo, Proveedor, Usuario } from 'app/models/models.model';
import { SpinnerService } from 'app/services/spinner.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NotificationsService } from 'app/services/notifications.service';
import { CookieService } from 'ngx-cookie-service';
import { ProveedoresService } from 'app/services/proveedores.service';
import { EmpleadosService } from 'app/services/empleados.service';
import { CategoriasService } from 'app/services/categorias.service';
import { NgForm } from '@angular/forms';
import moment = require('moment');

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarioComponent implements OnInit {

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  public solicitudes: MantenimientoPreventivo[];
  public view: CalendarView = CalendarView.Month;
  public CalendarView = CalendarView;
  public viewDate: Date = new Date();
  public loaded = false;
  public edit = true;
  public user: Usuario;
  public proveedores: Proveedor[];
  public empleados: Usuario[];
  public categorias: Categoria[];
  public mantenimiento: MantenimientoPreventivo;
  public mes: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  public modalData: {
    action: string;
    event: CalendarEvent;
  };
  public modalComponent: BsModalRef;
  public titulos: string[];
  public actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];
  public refresh: Subject<any> = new Subject();
  public events: any[] = [];
  public activeDayIsOpen = false;

  constructor(
    private modal: NgbModal,
    private mantenimientoPreventivoService: MantenimientoPreventivoService,
    private spinner: SpinnerService,
    private modalService: BsModalService,
    private mantenimientoService: MantenimientoPreventivoService,
    private notificationsService: NotificationsService,
    private proveedoresService: ProveedoresService,
    private categoriasService: CategoriasService,
    private empleadosService: EmpleadosService,
    private cookies: CookieService,
    ) {}

  ngOnInit() {
    this.user = JSON.parse(this.cookies.get('user'));
    this.loadInfo();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json'
      }
    };
    this.titulos = ['Actividad', 'Fecha De Inicio', 'Aprobado', 'Ver', 'Editar'];
  }

  public async loadInfo() {
    this.mes = moment(new Date()).month();
    console.log(this.mes);
    this.mes = Meses[this.mes];
    console.log(this.mes);

    this.events = [];
    this.spinner.showSpinner();
    this.solicitudes = await this.mantenimientoPreventivoService.getMantenimientosPreventivos();
    console.log(this.solicitudes);
    this.solicitudes.forEach(solicitud => {
      if(solicitud.id_empleado === this.user.id){
          this.events = [
          ...this.events,
          {
            ...solicitud,
            actions: this.actions,
            title: solicitud.actividad,
            start: new Date(solicitud.fecha_inicio),
            end: new Date(solicitud.fecha_inicio),
            color: colors.yellow,
            allDay: true,
            semana: moment(new Date(solicitud.fecha_inicio)).week()
          },
        ];
      }
    });
    console.log(this.events);
    this.refresh.next();
    this.dtTrigger.next();
    this.spinner.hideSpinner();
    this.categorias = await this.categoriasService.getCategorias();
    this.empleados = await this.empleadosService.getEmpleados();
    this.proveedores = await this.proveedoresService.getProveedores();
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  public addRequest(modal: TemplateRef<any>, mantenimiento?: MantenimientoPreventivo, edit?: boolean) {
    this.edit = edit !== undefined ? edit : true;
    if (this.edit) {
      if (mantenimiento && mantenimiento.aprobado && this.user.rol === 'Encargado_Mantenimiento' ) {
        this.edit = false;
        this.notificationsService.showWarning('La solicitud ya ha sido aprobada, por lo que no puede modificarse.');
      } else {
        this.edit = true;
      }
    }
    this.mantenimiento = mantenimiento ? mantenimiento : new MantenimientoPreventivo();
    this.modalComponent = this.modalService.show(modal, {backdrop : 'static', keyboard: false, class: 'modal-dialog-centered'});
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  public async cancel() {
    this.modalComponent.hide();
  }

  public async update(form: NgForm) {
    if (form.value.frecuencia_anual < 1 || form.value.frecuencia_anual > 12) {
      this.notificationsService.showNotification('La frecuencia anual debe realizarse entre 1 a 12 veces al año', false);
      throw new Error('Error');
    }
    if (form.value.aprobado) {
      this.mantenimiento.id_auditor = this.user.id;
    }

    this.spinner.showSpinner();
    (await this.mantenimientoService.updateMantenimiento(this.mantenimiento)).subscribe(
      async () => {
        this.notificationsService.showNotification('Se ha actualizado correctamente la solicitud.', true),
        await this.loadInfo();
      },
      async error => {
        this.notificationsService.showNotification(error.message, false)
      }
    );
    this.spinner.hideSpinner();
    this.modalComponent.hide();
  }
}

