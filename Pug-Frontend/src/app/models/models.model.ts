export class MantenimientoPreventivo {
    public id_mantprev?: number;
    public actividad?: string;
    public frecuencia_anual?: number;
    public mes_inicio?: string;
    public fecha_creacion?: Date;
    public fecha_planeada?: Date;
    public fecha_real?: Date;
    public duracion_horas?: number;
    public presupuesto_plan?: number;
    public cotizacion?: number;
    public comentarios_supervisor?: string;
    public comentarios_auditor?: string;
    public activo?: boolean;
    public id_categoria?: number;
    public id_proveedor?: number;
    public id_supervisor?: number;
    public id_auditor?: number;
    public id_empleado?: number;

    constructor(json?: MantenimientoPreventivo) {
        this.id_mantprev = json.id_mantprev;
        this.actividad = json.actividad;
        this.frecuencia_anual = json.frecuencia_anual;
        this.mes_inicio = json.mes_inicio;
        this.fecha_creacion = json.fecha_creacion;
        this.fecha_planeada = json.fecha_planeada;
        this.fecha_real = json.fecha_real;
        this.duracion_horas = json.duracion_horas;
        this.presupuesto_plan = json.presupuesto_plan;
        this.cotizacion = json.cotizacion;
        this.comentarios_supervisor = json.comentarios_supervisor;
        this.comentarios_auditor = json.comentarios_auditor;
        this.activo = json.activo;
        this.id_proveedor = json.id_proveedor;
        this.id_categoria = json.id_categoria;
        this.id_auditor = json.id_auditor;
        this.id_supervisor = json.id_supervisor;
        this.id_empleado = json.id_empleado;
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

export class Requisicion {
    public id_requisicion?: number;
    public concepto?: string;
    public enlace_concepto?: string;
    public justificacion?: string;
    public cantidad?: number;
    public costo?: number;
    public fecha_creacion?: Date;
    public fecha_estimada?: Date;
    public fecha_entrega?: Date;
    public aprobacion_auditor?: boolean;
    public aprobacion_director_gral?: boolean;
    public proveedor?: string;
    public id_solicitante?: number;
    public metodo_de_pago: string;
    public id_hotel?: number;
    public observaciones?: string;
    public finalizado?: boolean;

    constructor(json?: Requisicion) {
        this.id_requisicion = json?.id_requisicion ? json.id_requisicion : null;
        this.concepto = json?.concepto ? json.concepto : '';
        this.enlace_concepto = json?.enlace_concepto ? json.enlace_concepto : '';
        this.justificacion = json?.justificacion ? json.justificacion : '';
        this.cantidad = json?.cantidad ? json.cantidad : undefined;
        this.costo = json?.costo ? json.costo : undefined;
        this.fecha_creacion = json?.fecha_creacion ? json.fecha_creacion : new Date();
        this.fecha_estimada = json?.fecha_estimada ? json.fecha_estimada : new Date();
        this.fecha_entrega = json?.fecha_entrega ? json.fecha_entrega : new Date();
        this.aprobacion_auditor = json?.aprobacion_auditor ? json.aprobacion_auditor: false;   
        this.aprobacion_director_gral = json?.aprobacion_director_gral ? json.aprobacion_director_gral : false;
        this.proveedor = json?.proveedor ? json.proveedor : '';
        this.id_solicitante = json?.id_solicitante ? json.id_solicitante : null;
        this.metodo_de_pago = json?.metodo_de_pago ? json.metodo_de_pago : '';
        this.id_hotel = json?.id_hotel ? json.id_hotel : null;
        this.observaciones = json?.observaciones ? json.observaciones : '';
        this.finalizado = json?.finalizado ? json.finalizado : false;
    }
}
