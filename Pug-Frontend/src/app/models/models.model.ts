export class MantenimientoPreventivo {
    // Creacion de solicitud
    public id_mantprev?: number;
    public id_categoria?: number;
    public actividad?: string;
    public id_proveedor?: number;
    public cotizacion?: number;
    public frecuencia_anual?: number;
    public fecha_creacion?: Date;

    // aprobacion de solicitud
    public id_auditor?: number;
    public aprobado?: boolean;

    // meses y semanas
    public fecha_inicio?: any;
    public mes?: string;
    public semana?: number;

    // Finalizacion
    public id_empleado?: number;
    public fecha_terminacion?: any;
    public duracion_horas?: number;
    public comentarios_encargado?: string;

    // Supervision
    public comentarios_supervisor?: string;
    public id_supervisor?: number;

    // Auditor
    public comentarios_auditor?: string;

    constructor(json?: MantenimientoPreventivo) {
        this.id_mantprev = json?.id_mantprev ? json.id_mantprev : null;
        this.actividad = json?.actividad ? json.actividad : null;
        this.frecuencia_anual = json?.frecuencia_anual ? json.frecuencia_anual : null;
        this.fecha_creacion = json?.fecha_creacion ? json.fecha_creacion : new Date();
        this.cotizacion = json?.cotizacion ? json.cotizacion : null;
        this.id_proveedor = json?.id_proveedor ? json.id_proveedor : null;
        this.id_categoria = json?.id_categoria ? json.id_categoria : null;

        this.id_auditor = json?.id_auditor ? json.id_auditor : null;
        this.aprobado = json?.aprobado ? json.aprobado : false;

        this.fecha_inicio = json?.fecha_inicio ? json.fecha_inicio : null;
        this.mes = json?.mes ? json.mes : null;
        this.semana = json?.semana ? json.semana : null;

        this.id_empleado = json?.id_empleado ? json.id_empleado : null;
        this.fecha_terminacion = json?.fecha_terminacion ? json.fecha_terminacion : null;
        this.duracion_horas = json?.duracion_horas ? json.duracion_horas : null;
        this.comentarios_encargado = json?.comentarios_encargado ? json.comentarios_encargado : null;

        this.comentarios_supervisor = json?.comentarios_supervisor ? json.comentarios_supervisor : null;
        this.id_supervisor = json?.id_supervisor ? json.id_supervisor : null;

        this.comentarios_auditor = json?.comentarios_auditor ? json.comentarios_auditor : null;

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
    public id_hotel?: number;
    public activo?: boolean;

    constructor(json?: Hotel) {
        this.nombre = json?.nombre ? json.nombre : '';
        this.direccion = json?.direccion ? json.direccion : '';
        this.id_hotel = json?.id_hotel ? json.id_hotel : undefined;
        this.activo = json?.activo ? json.activo : true;
    }


}

export class BitacoraMediciones {
    public id_medicion?: number;
    public fecha?: Date;
    public cloro?: number;
    public porcentaje_nivel_agua?: number;
    public porcentaje_gas?: number;
    public luz?: number;
    public lectura?: number;
    public presion?: number;
    public temperatura_alberca_jacuzzi?: number;
    public temperatura_calder?: number;
    public responsable?: number;
    public auditor?: number;
    public observaciones?: string;
    public auditor_name?: string;
    public responsable_name?: string;


        constructor(json?: BitacoraMediciones) {
            this.id_medicion = json?.id_medicion ? json.id_medicion : null;
            this.fecha = json?.fecha ? json.fecha : new Date();
            this.cloro = json?.cloro ? json.cloro : null;
            this.porcentaje_nivel_agua = json?.porcentaje_nivel_agua ? json.porcentaje_nivel_agua : null;
            this.porcentaje_gas = json?.porcentaje_gas ? json.porcentaje_gas : null;
            this.luz = json?.luz ? json.luz : null;
            this.lectura = json?.lectura ? json.lectura : null;
            this.presion = json?.presion ? json.presion : null;
            this.temperatura_alberca_jacuzzi = json?.temperatura_alberca_jacuzzi ? json.temperatura_alberca_jacuzzi : null;
            this.temperatura_calder = json?.temperatura_calder ? json.temperatura_calder : null;
            this.responsable = json?.responsable ? json.responsable : null;
            this.auditor = json?.auditor ? json.auditor : null;
            this.observaciones = json?.observaciones ? json.observaciones : '';
            this.auditor_name = json?.auditor_name ? json.auditor_name : 'sin auditor';
            this.responsable_name = json?.responsable_name ? json.responsable_name : 'sin responsable';
        }
}

export class Requisicion {
    public id_requisicion?: number;
    public concepto?: string;
    public enlace_concepto?: string;
    public justificacion?: string;
    public cantidad?: number;
    public costo?: number;
    public categoria?: string;
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
        this.cantidad = json?.cantidad ? json.cantidad : null;
        this.costo = json?.costo ? json.costo : 0;
        this.categoria = json?.categoria ? json.categoria : '';
        this.fecha_creacion = json?.fecha_creacion ? json.fecha_creacion : undefined;
        this.fecha_estimada = json?.fecha_estimada ? json.fecha_estimada : undefined;
        this.fecha_entrega = json?.fecha_entrega ? json.fecha_entrega : undefined ;
        this.aprobacion_auditor = json?.aprobacion_auditor ? json.aprobacion_auditor : false;
        this.aprobacion_director_gral = json?.aprobacion_director_gral ? json.aprobacion_director_gral : false;
        this.proveedor = json?.proveedor ? json.proveedor : '';
        this.id_solicitante = json?.id_solicitante ? json.id_solicitante : null;
        this.metodo_de_pago = json?.metodo_de_pago ? json.metodo_de_pago : '';
        this.id_hotel = json?.id_hotel ? json.id_hotel : null;
        this.observaciones = json?.observaciones ? json.observaciones : '';
        this.finalizado = json?.finalizado ? json.finalizado : false;
    }
}


export class MantenimientoCorrectivo {
    // Creacion de solicitud
    public id_mantcor?: number;
    public id_solicitante?: number;
    public id_encargado?: number;
    public id_supervisor?: number;
    public fecha_solicitud?: Date;
    public semana?: number;
    public id_hotel?: number;
    public id_area?: number;
    public descripcion_problema?: String;
    public id_categoria?: number;
    public id_proveedor?: number;
    public costo_trabajo?: number;
    public costo_material?: number;
    public horas_trabajo?: number;
    public fecha_finalizacion?: Date;
    public comentarios_supervisor?: string;
    public calif_calidad?: number;
    public calif_terminacion?: number;
    public calif_limpieza?: number;
    public calif_totalidad?: number;
    public finalizada?: boolean;
    public estado?: string;

    constructor(json?: MantenimientoCorrectivo) {
        this.id_mantcor = json?.id_mantcor ? json.id_mantcor : null;
        this.id_solicitante = json?.id_solicitante ? json.id_solicitante : null;
        this.id_encargado = json?.id_encargado ? json.id_encargado : null;
        this.id_supervisor = json?.id_supervisor ? json.id_supervisor : null;
        this.fecha_solicitud = json?.fecha_solicitud ? json.fecha_solicitud : undefined;
        this.semana = json?.semana ? json.semana : 0;
        this.id_hotel = json?.id_hotel ? json.id_hotel : null;
        this.id_area = json?.id_area ? json.id_area : null;
        this.descripcion_problema = json?.descripcion_problema ? json.descripcion_problema : null;
        this.id_categoria = json?.id_categoria ? json.id_categoria : null;
        this.id_proveedor = json?.id_proveedor ? json.id_proveedor : null;
        this.costo_trabajo = json?.costo_trabajo ? json.costo_trabajo : null;
        this.costo_material = json?.costo_material ? json.costo_material : null;
        this.horas_trabajo = json?.horas_trabajo ? json.horas_trabajo : null;
        this.fecha_finalizacion = json?.fecha_finalizacion ? json.fecha_finalizacion : undefined;
        this.comentarios_supervisor = json?.comentarios_supervisor ? json.comentarios_supervisor : null;
        this.calif_calidad = json?.calif_calidad ? json.calif_calidad : null;
        this.calif_terminacion = json?.calif_terminacion ? json.calif_terminacion : null;
        this.calif_limpieza = json?.calif_limpieza ? json.calif_limpieza : null;
        this.calif_totalidad = json?.calif_totalidad ? json.calif_totalidad : null;
        this.finalizada = json?.finalizada ? json.finalizada : false;
        this.estado = json?.estado ? json.estado : null;
    }
}
