from django.db import models
from django.utils import timezone
from datetime import date
from django.contrib.auth.models import User, AbstractUser

# Models in alphabetical order

class Area(models.Model):
    id_area = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255, unique=True)
    descripcion = models.TextField(max_length=500, null=True, blank=True)
    activo = models.BooleanField(default=True)
    def __str__(self):
	    return self.nombre

class Categoria(models.Model):
    id_categoria = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255, unique=True)
    descripcion = models.TextField(max_length=500, null=True, blank=True)
    activo = models.BooleanField(default=True)
    def __str__(self):
	    return self.nombre

class Usuario(AbstractUser):
    # id_empleado = models.OneToOneField(User, on_delete=models.CASCADE,primary_key=True, related_name='info')
    telefono = models.CharField(max_length=255)
    rol = models.CharField(max_length=255, default=' ', null=False)
    class Meta:
        abstract = False
    def __str__(self):
        return self.first_name

class Hotel(models.Model):
    id_hotel = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255)
    direccion = models.CharField(max_length=255, default='')
    activo = models.BooleanField(default=True)
    def __str__(self):
        return self.nombre

class Proveedor(models.Model):
    id_proveedor = models.AutoField(primary_key=True)
    nombre_empresa = models.CharField(max_length=255, unique=True, default='')
    nombre_proveedor = models.CharField(max_length=255, default='')
    email = models.CharField(max_length=255, default='', null=True)
    telefono = models.CharField(max_length=10)
    fechaAlianza = models.DateField(default=date.today)
    activo = models.BooleanField(default=True)
    class Meta:
        verbose_name_plural = "Proveedores"
    def __str__(self):
        return "%s" % self.nombre_empresa

class Ubicacion(models.Model):
    id_ubicacion = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255)
    activo = models.BooleanField(default=True)
    def __str__(self):
        return self.nombre

#Las siguientes son dependencias, por eso no están en orden alfabetico

class Mantenimiento_Preventivo(models.Model):
    #Encargado selecciona estos campos
    id_mantprev = models.AutoField(primary_key=True)
    id_categoria = models.ForeignKey(Categoria, on_delete=models.SET_NULL, null=True)
    actividad = models.CharField(max_length=255)
    id_proveedor = models.ForeignKey(Proveedor, on_delete=models.SET_NULL, null=True)
    #presupuesto = models.FloatField(default=0)
    frecuencia_anual = models.IntegerField(default=0)
    fecha_creacion = models.DateTimeField(default=timezone.now)
    #mes_sugerido = models.CharField(max_length=255, default='No hay sugerencia')

    # Aprobacion
    id_auditor = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True, related_name="auditor", blank=True)
    aprobado = models.BooleanField(default=False)
    fecha_inicio = models.DateField(null=True, blank=True)

    # finalizacion (encargado)
    cotizacion = models.FloatField(default=0)
    id_empleado = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True, related_name="empleado", blank=True)
    duracion_horas = models.FloatField(default=0, blank=True, null=True)
    fecha_terminacion = models.DateField(null=True, blank=True)
    comentarios_encargado = models.CharField(max_length=1000, null=True, blank=True)

    # Supervisor
    id_supervisor = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True, related_name="supervisor", blank=True)
    comentarios_supervisor = models.CharField(max_length=1000, null=True, blank=True)

    # Auditor
    comentarios_auditor = models.CharField(max_length=1000, null=True, blank=True)


    class Meta:
        verbose_name_plural = "Solicitudes de Mantenimiento Preventivo"
    def __str__(self):
        return "%s" % self.actividad

class Bitacora_Mediciones(models.Model):
    id_medicion = models.AutoField(primary_key=True)
    fecha = models.DateField(default=date.today)
    cloro = models.DecimalField(decimal_places=2, max_digits = 10)
    porcentaje_nivel_agua = models.DecimalField(decimal_places=2, max_digits = 10)
    porcentaje_gas = models.DecimalField(decimal_places=2, max_digits = 10)
    luz = models.DecimalField(decimal_places=2, max_digits = 10)
    lectura = models.DecimalField(decimal_places=2, max_digits = 10)
    presion = models.DecimalField(decimal_places=2, max_digits = 10)
    temperatura_alberca_jacuzzi = models.DecimalField(decimal_places=2, max_digits = 10)
    temperatura_caldera = models.DecimalField(decimal_places=2, max_digits = 10)
    responsable = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True, related_name="responsable_name", blank=True)
    auditor = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True, related_name="auditor_name", blank=True)
    observaciones = models.CharField(max_length=255, unique=True, default='')
    class Meta:
        verbose_name_plural = "Bitácora Mediciones"

class Requisicion(models.Model):
    id_requisicion = models.AutoField(primary_key=True)
    concepto = models.CharField(max_length=255)
    enlace_concepto = models.CharField(max_length=300, default='', null=True, blank=True)
    justificacion = models.TextField(max_length=500, null=True, blank=True)
    cantidad = models.IntegerField(default=1)
    costo = models.FloatField(default=0)
    categoria = models.CharField(max_length = 255, default='', blank=True)
    fecha_creacion = models.DateField(default=timezone.now)
    fecha_estimada = models.DateField( null=True, blank=True)
    fecha_entrega = models.DateField(null=True, blank=True)
    aprobacion_auditor = models.BooleanField(default=False)
    aprobacion_director_gral = models.BooleanField(default=False)
    proveedor = models.CharField(max_length=255, null=True, blank=True)
    id_solicitante = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True, related_name="solicitante", blank=True)
    metodo_de_pago = models.CharField(max_length=255, null=True, blank=True)
    id_hotel = models.ForeignKey(Hotel, on_delete=models.SET_NULL, null=True, blank=True)
    observaciones = models.TextField(null=True, default='', blank=True)
    finalizado = models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = "Requisiciones"
    def __str__(self):
        return "%s" % self.concepto

class Mantenimiento_Correctivo(models.Model):
    id_mantcor = models.AutoField(primary_key=True)
    id_solicitante = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True, related_name="encargado_solicitud", blank= True)
    id_encargado = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True, related_name="encargado_correctivo", blank= True)
    id_supervisor = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True, related_name="supervisor_correctivo", blank= True)
    fecha_solicitud = models.DateField(default=timezone.now)
    semana = models.IntegerField(default=0)
    id_hotel = models.ForeignKey(Hotel, on_delete=models.SET_NULL, null=True, blank=True)
    id_area = models.ForeignKey(Area, on_delete=models.SET_NULL, null=True, blank=True)
    descripcion_problema =  models.CharField(max_length=255)
    id_categoria = models.ForeignKey(Categoria, on_delete=models.SET_NULL, null=True)
    id_proveedor = models.ForeignKey(Proveedor, on_delete=models.SET_NULL, null=True)
    costo_trabajo = models.FloatField(default=0, null=True, blank=True)
    costo_material = models.FloatField(default=0, null=True, blank=True)
    horas_trabajo = models.CharField(max_length = 255, default='', null=True, blank=True)
    fecha_finalizacion = models.DateField(null=True, blank=True)
    comentario_supervisor = models.TextField(max_length=500, null=True, blank=True)
    calif_calidad = models.IntegerField(null=True, blank=True, default=1)
    calif_terminacion = models.IntegerField(null=True, blank=True, default=1)
    calif_limpieza = models.IntegerField(null=True, blank=True, default=1)
    calif_totalidad = models.IntegerField(null=True, blank=True, default=1)
    finalizada = models.BooleanField(default=False)
    estado = models.CharField(max_length = 255, default='', blank=True)

    class Meta:
        verbose_name_plural = "Solicitudes de Mantenimiento Correctivo"
    def __str__(self):
        return "%s" % self.descripcion_problema