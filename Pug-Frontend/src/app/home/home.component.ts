import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { LegendItem, ChartType } from '../lbd/lbd-chart/lbd-chart.component';
import * as Chartist from 'chartist';
import { MantenimientoCorrectivo } from 'app/models/models.model';
import { MantenimientoCorrectivoService } from 'app/services/mantenimiento-correctivo.service';
import { SpinnerService } from 'app/services/spinner.service';
import moment = require('moment');
import { Meses } from 'app/shared/diccionarios';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    public emailChartType: ChartType;
    public emailChartData: any;
    public emailChartLegendItems: LegendItem[];

    public hoursChartType: ChartType;
    public hoursChartData: any;
    public hoursChartOptions: any;
    public hoursChartResponsive: any[];
    public hoursChartLegendItems: LegendItem[];

    public activityChartType: ChartType;
    public activityChartData: any;
    public activityChartOptions: any;
    public activityChartResponsive: any[];
    public activityChartLegendItems: LegendItem[];

    public mantenimientos: MantenimientoCorrectivo[];
    public solicitudes: MantenimientoCorrectivo[];
    public inconclusas: MantenimientoCorrectivo[];
    public mes: String;
    public events: any[] = [];
    public mesSeleccionado: number;
    public porcentajeFinalizadas: number;
    public porcentajeNoFinalizadas: number;
    public incidecnias_finalizadas = 0;
    public incidencias_totales = 0;
    public loaded = false;

  constructor(
    private spinner: SpinnerService,
    private mantenimientoService: MantenimientoCorrectivoService
  ) { }



  ngOnInit() {
      this.loadInfo();
      this.emailChartType = ChartType.Pie;
      this.emailChartData = {
        labels: ['Finalizadas', 'No Finalizadas'],
        series: [10, 90]
      };

      this.emailChartLegendItems = [
        { title: 'Open', imageClass: 'fa fa-circle text-info' },
        { title: 'Bounce', imageClass: 'fa fa-circle text-danger' },
        { title: 'Unsubscribe', imageClass: 'fa fa-circle text-warning' }
      ];


      this.hoursChartType = ChartType.Line;
      this.hoursChartData = {
        labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
        series: [
          [287, 385, 490, 492, 554, 586, 698, 695, 752, 788, 846, 944],
          [67, 152, 143, 240, 287, 335, 435, 437, 539, 542, 544, 647],
          [23, 113, 67, 108, 190, 239, 307, 308, 439, 410, 410, 509]
        ]
      };
      this.hoursChartOptions = {
        low: 0,
        high: 800,
        showArea: true,
        height: '245px',
        axisX: {
          showGrid: false,
        },
        lineSmooth: Chartist.Interpolation.simple({
          divisor: 3
        }),
        showLine: false,
        showPoint: false,
      };
      this.hoursChartResponsive = [
        ['screen and (max-width: 640px)', {
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
      this.hoursChartLegendItems = [
        { title: 'Open', imageClass: 'fa fa-circle text-info' },
        { title: 'Click', imageClass: 'fa fa-circle text-danger' },
        { title: 'Click Second Time', imageClass: 'fa fa-circle text-warning' }
      ];

      this.activityChartType = ChartType.Bar;
      this.activityChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        series: [
          [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
          [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695]
        ]
      };
      this.activityChartOptions = {
        seriesBarDistance: 10,
        axisX: {
          showGrid: false
        },
        height: '245px'
      };
      this.activityChartResponsive = [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
      this.activityChartLegendItems = [
        { title: 'Tesla Model S', imageClass: 'fa fa-circle text-info' },
        { title: 'BMW 5 Series', imageClass: 'fa fa-circle text-danger' }
      ];


    }

    public async loadInfo() {
      this.mesSeleccionado = new Date().getMonth();
      this.porcentajeFinalizadas = 0;
      this.porcentajeNoFinalizadas = 0;
      this.incidecnias_finalizadas = 0;
      this.incidencias_totales = 0;
      this.spinner.showSpinner();
      const mes = moment(new Date()).month();
      this.mes = Meses[mes];
      this.events = [];
      this.solicitudes = await this.mantenimientoService.getMantenimientosCorrectivos();
      this.solicitudes.forEach(solicitud => {
        console.log(moment(new Date(solicitud.fecha_solicitud)).month(), this.mesSeleccionado - 1);
        if (moment(new Date(solicitud.fecha_solicitud)).month() ===  this.mesSeleccionado - 1) {
          this.incidencias_totales++;
          if (solicitud.finalizada === true) {
            this.incidecnias_finalizadas++;
          }
          this.events = [
            ...this.events,
            {
              ...solicitud
              // semana: moment(new Date(solicitud.fecha_solicitud)).week()
            },
          ];
        }
      });
      this.porcentajeFinalizadas = Math.round((this.incidecnias_finalizadas / this.incidencias_totales)  * 100);
      this.porcentajeNoFinalizadas = 100  - this.porcentajeFinalizadas;
      console.log(this.porcentajeFinalizadas, this.porcentajeNoFinalizadas);
      this.emailChartData.labels =  ['Finalizadas ' + this.porcentajeFinalizadas + '%', 'No Finalizadas ' + this.porcentajeNoFinalizadas + '%'],
      this.emailChartData.series = [this.porcentajeFinalizadas, this.porcentajeNoFinalizadas]
      this.loaded = true;
      this.spinner.hideSpinner();

    }

}
