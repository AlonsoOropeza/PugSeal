export class MantenimientoPreventivo {
    public actividad?: string;
    public referencia?: string;
    public frecuencia?: number;
    public fecha_creacion?: Date;
    public duracion_horas?: number;
    public monto_total?: number;
    public comentarios_supervisor?: string;
    public id_proveedor?: number;
    public id_categoria?: number;
    public id_empleado?: number;
    public id_supervisor?: number;

    constructor(json?: MantenimientoPreventivo) {
        this.actividad = json.actividad;
        this.referencia = json.referencia;
        this.frecuencia = json.frecuencia;
        this.fecha_creacion = json.fecha_creacion;
        this.duracion_horas = json.duracion_horas;
        this.monto_total = json.monto_total;
        this.comentarios_supervisor = json.comentarios_supervisor;
        this.id_proveedor = json.id_proveedor;
        this.id_categoria = json.id_categoria;
        this.id_empleado = json.id_empleado;
        this.id_supervisor = json.id_supervisor;
    }
}
