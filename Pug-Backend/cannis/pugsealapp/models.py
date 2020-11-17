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
    latitud = models.CharField(max_length=255, null=True, blank=True)
    longitud = models.CharField(max_length=255, null=True, blank=True)
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
    cotizacion = models.FloatField(default=0, blank=True, null=True)
    frecuencia_anual = models.IntegerField(default=0)
    fecha_inicio = models.DateField(null=True, default=timezone.now)
    id_empleado = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True, related_name="empleado")
    fecha_creacion = models.DateTimeField(default=timezone.now)

    # Auditor modifica estos campos
    id_auditor = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True, related_name="auditor", blank=True)
    comentarios_auditor = models.CharField(max_length=1000, null=True, blank=True)
    aprobado = models.BooleanField(default=False)
    auditado = models.BooleanField(default=False)

    # Supervisor modifica estos campos
    id_supervisor = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True, related_name="supervisor", blank=True)
    comentarios_supervisor = models.CharField(max_length=1000, null=True, blank=True)
    supervisado = models.BooleanField(default=False)

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