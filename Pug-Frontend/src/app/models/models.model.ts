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

export class Empleado {
    public id_empleado?: number;
    public nombre?: string;
    public a_paterno?: string;
    public a_materno?: string;
    public correo_electronico?: string;
    public telefono?: string;
    public rol?: string;

    constructor(json?: Empleado) {
        this.id_empleado = json.id_empleado;
        this.nombre = json.nombre;
        this.a_paterno = json.a_paterno;
        this.a_materno = json.a_materno;
        this.telefono = json.telefono;
        this.correo_electronico = json.correo_electronico;
        this.rol = json.rol;
    }
}

export class Proveedor {
    public id_proveedor?: number;
    public nombre?: string;
    public contacto?: string;
    public telefono?: string;

    constructor(json?: Proveedor) {
        this.id_proveedor = json.id_proveedor;
        this.nombre = json.nombre;
        this.telefono = json.telefono;
        this.contacto = json.contacto;
    }
}

export class Categoria {
    public nombre?: string;
    public descripcion?: string;
    public id_categoria?: number;
    public activo?: boolean;

    constructor(json?: Categoria) {
        this.nombre = json?.nombre ? json.nombre : '';
        this.descripcion = json?.descripcion ? json.descripcion : null;
        this.id_categoria = json?.id_categoria ? json.id_categoria : undefined;
        this.activo = json?.activo ? json.activo : true;
    }
}

export class Area {
    public nombre?: string;
    public descripcion?: string;
    public id_area?: number;

    constructor(json?: Area) {
        this.nombre = json?.nombre ? json.nombre : '';
        this.descripcion = json?.descripcion ? json.descripcion : '';
        this.id_area = json?.id_area ? json.id_area : undefined;
    }
}

export class Hotel {
    public nombre?: string;
    public direccion?: string;
    public latitud?: string;
    public longitud?: string;
    public id_hotel?: number;

    constructor(json?: Hotel) {
        this.nombre = json?.nombre ? json.nombre : '';
        this.direccion = json?.direccion ? json.direccion : '';
        this.latitud = json?.latitud ? json.latitud : '';
        this.longitud = json?.longitud ? json.longitud : '';
        this.id_hotel = json?.id_hotel ? json.id_hotel : undefined;
    }
}
