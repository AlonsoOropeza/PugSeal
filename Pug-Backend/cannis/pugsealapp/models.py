from django.db import models
from django.utils import timezone
from datetime import date


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

class Empleado(models.Model):
    id_empleado = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255)
    a_paterno = models.CharField(max_length=255)
    a_materno = models.CharField(max_length=255)
    correo_electronico = models.CharField(max_length=255)
    telefono = models.CharField(max_length=255)
    rol = models.CharField(max_length=255, default='')
    activo = models.BooleanField(default=True)
    def __str__(self):

        return self.nombre

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
    id_mantprev = models.AutoField(primary_key=True)
    id_proveedor = models.ForeignKey(Proveedor, on_delete=models.SET_NULL, null=True, blank=True)
    id_categoria = models.ForeignKey(Categoria, on_delete=models.SET_NULL, null=True, blank=True)
    actividad = models.CharField(max_length=255)
    referencia = models.CharField(max_length=255)
    frecuencia = models.IntegerField(default=0)
    fecha_creacion = models.DateTimeField(default=timezone.now)
    duracion_horas = models.IntegerField(default=0)
    id_empleado = models.ForeignKey(Empleado, on_delete=models.SET_NULL, null=True, related_name="solicitante", blank=True)
    id_supervisor = models.ForeignKey(Empleado, on_delete=models.SET_NULL, null=True, related_name="supervisor", blank=True)
    monto_total = models.IntegerField(default=0)
    comentarios_supervisor = models.TextField(max_length=1000, null=True, blank=True)
    activo = models.BooleanField(default=True)
    class Meta:
        verbose_name_plural = "Solicitudes de Mantenimiento Preventivo"
    def __str__(self):
        return "%s" % self.actividad