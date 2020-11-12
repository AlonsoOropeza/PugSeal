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
    public responsable?: string;
    public auditor?: string;
    public observaciones?: string;

        constructor(json?: BitacoraMediciones) {
            this.id_medicion = json?.id_medicion ? json.id_medicion : undefined;
            this.fecha = json?.fecha ? json.fecha : new Date();
            this.cloro = json?.cloro ? json.cloro : undefined;
            this.porcentaje_nivel_agua = json?.porcentaje_nivel_agua ? json.porcentaje_nivel_agua : undefined;
            this.porcentaje_gas = json?.porcentaje_gas ? json.porcentaje_gas : undefined;
            this.luz = json?.luz ? json.luz : undefined;
            this.lectura = json?.lectura ? json.lectura : undefined;
            this.presion = json?.presion ? json.presion : undefined;
            this.temperatura_alberca_jacuzzi = json?.temperatura_alberca_jacuzzi ? json.temperatura_alberca_jacuzzi : undefined;
            this.temperatura_calder = json?.temperatura_calder ? json.temperatura_calder : undefined;
            this.responsable = json?.responsable ? json.responsable : '';
            this.auditor = json?.auditor ? json.auditor : '';
            this.observaciones = json?.observaciones ? json.observaciones : '';
        }
}
