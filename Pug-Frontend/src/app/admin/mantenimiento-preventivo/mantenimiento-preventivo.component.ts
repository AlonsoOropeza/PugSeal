import { TryCatchStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MantenimientoService } from 'app/services/mantenimiento.service';
import { tryCatch } from 'rxjs/internal/util/tryCatch';

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-mantenimiento-preventivo',
  templateUrl: './mantenimiento-preventivo.component.html',
  styleUrls: ['./mantenimiento-preventivo.component.css']
})
export class MantenimientoPreventivoComponent implements OnInit {
  public tableData1: TableData;
  public tableData2: TableData;
  public solicitudes: any[];

  constructor(private mantenimientoService:MantenimientoService) { }
  ngOnInit() {
      this.loadInfo();
      this.tableData1 = {
          headerRow: [ 'Actividad', 'Referencia', 'Frecuencia', 'Presupuesto', 'Duracion'],
          dataRows: [
              ['1', 'Dakota Rice', 'Niger', 'Oud-Turnhout', '$36,738'],
              ['2', 'Minerva Hooper', 'Curaçao', 'Sinaai-Waas', '$23,789'],
              ['3', 'Sage Rodriguez', 'Netherlands', 'Baileux', '$56,142'],
              ['4', 'Philip Chaney', 'Korea, South', 'Overland Park', '$38,735'],
              ['5', 'Doris Greene', 'Malawi', 'Feldkirchen in Kärnten', '$63,542'],
              ['6', 'Mason Porter', 'Chile', 'Gloucester', '$78,615']
          ]
      };
  }

  private async loadInfo() {
      this.solicitudes = await this.mantenimientoService.getSolicitudesMantenimientoPreventivo();
      console.log(this.solicitudes);
  }
}
