export class MantenimientoPreventivo {
    // Creacion de solicitud
    public id_mantprev?: number;
    public id_categoria?: number;
    public actividad?: string;
    public id_proveedor?: number;
    public cotizacion?: number;
    public frecuencia_anual?: number;
    public fecha_inicio?: Date;
    public id_empleado?: number;
    public auditado?: boolean;
    public fecha_creacion?: Date;

    // Por definir
    public fecha_planeada?: Date;
    public duracion_horas?: number;
    public comentarios_supervisor?: string;
    public comentarios_auditor?: string;
    public id_supervisor?: number;
    public id_auditor?: number;
    public supervisado?: boolean;

    constructor(json?: MantenimientoPreventivo) {
        this.id_mantprev = json?.id_mantprev ? json.id_mantprev : null;
        this.actividad = json?.actividad ? json.actividad : null;
        this.frecuencia_anual = json?.frecuencia_anual ? json.frecuencia_anual : null;
        this.fecha_creacion = json?.fecha_creacion ? json.fecha_creacion : new Date();
        this.fecha_planeada = json?.fecha_planeada ? json.fecha_planeada : new Date();
        this.fecha_inicio = json?.fecha_inicio ? json.fecha_inicio : new Date();
        this.duracion_horas = json?.duracion_horas ? json.duracion_horas : null;
        this.cotizacion = json?.cotizacion ? json.cotizacion : null;
        this.comentarios_supervisor = json?.comentarios_supervisor ? json.comentarios_supervisor : null;
        this.comentarios_auditor = json?.comentarios_auditor ? json.comentarios_auditor : null;
        this.supervisado = json?.supervisado ? json.supervisado : false;
        this.auditado = json?.auditado ? json.auditado : false;
        this.id_proveedor = json?.id_proveedor ? json.id_proveedor : null;
        this.id_categoria = json?.id_categoria ? json.id_categoria : null;
        this.id_auditor = json?.id_auditor ? json.id_auditor : null;
        this.id_supervisor = json?.id_supervisor ? json.id_supervisor : null;
        this.id_empleado = json?.id_empleado ? json.id_empleado : null;
    }
}

export class Usuario {
    public id?: number;
    public first_name?: string;
    public last_name?: string;
    public email?: string;
    public telefono?: string;
    public rol?: string;

    constructor(json?: Usuario) {
        this.id = json.id;
        this.first_name = json.first_name;
        this.last_name = json.last_name;
        this.telefono = json.telefono;
        this.email = json.email;
        this.rol = json?.rol ? json.rol : undefined;
    }
}

export class Proveedor {
    public id_proveedor?: number;
    public nombre_empresa?: string;
    public nombre_proveedor?: string;
    public email?: string;
    public telefono?: string;
    public activo?: boolean;
    public fechaAlianza: Date;

    constructor(json?: Proveedor) {
        this.id_proveedor = json?.id_proveedor ? json.id_proveedor : null;
        this.nombre_empresa = json?.nombre_empresa ? json.nombre_empresa : null;
        this.nombre_proveedor = json?.nombre_proveedor ? json.nombre_proveedor : null;
        this.email = json?.email ? json.email : null;
        this.telefono = json?.telefono ? json.telefono : null;
        this.activo = json?.activo ? json.activo : true;
        this.fechaAlianza = json?.fechaAlianza ? json.fechaAlianza : new Date();
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
    public activo?: boolean;

    constructor(json?: Area) {
        this.nombre = json?.nombre ? json.nombre : '';
        this.descripcion = json?.descripcion ? json.descripcion : '';
        this.id_area = json?.id_area ? json.id_area : undefined;
        this.activo = json?.activo ? json.activo : true;
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
