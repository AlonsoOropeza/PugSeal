from django.db import models
from django.utils import timezone


# Models in alphabetical order

class Area(models.Model):
    id_area = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255)
    descripcion = models.TextField(max_length=500, null=True)
    def __str__(self):
	    return self.nombre

class Categoria(models.Model):
    id_categoria = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255, unique=True)
    descripcion = models.TextField(max_length=500, null=True)
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
    def __str__(self):

        return self.nombre

class Hotel(models.Model):
    id_hotel = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255)
    def __str__(self):
        return self.nombre

class Proveedor(models.Model):
    id_proveedor = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255)
    contacto = models.CharField(max_length=255, default='')
    telefono = models.BigIntegerField(unique=True, default=0)
    class Meta:
        verbose_name_plural = "Proveedores"
    def __str__(self):
        return "%s" % self.nombre

class Ubicacion(models.Model):
    id_ubicacion = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255)
    def __str__(self):
        return self.nombre

#Las siguientes son dependencias, por eso no están en orden alfabetico

class Mantenimiento_Preventivo(models.Model):
    id_mantprev = models.AutoField(primary_key=True)
    id_proveedor = models.ForeignKey(Proveedor, on_delete=models.SET_NULL, null=True)
    id_categoria = models.ForeignKey(Categoria, on_delete=models.SET_NULL, null=True)
    actividad = models.CharField(max_length=255)
    referencia = models.CharField(max_length=255)
    frecuencia = models.IntegerField(unique=True, default=0)
    fecha_creacion = models.DateTimeField(default=timezone.now)
    duracion_horas = models.DecimalField(default=0, decimal_places=10, max_digits=10)
    id_empleado = models.ForeignKey(Empleado, on_delete=models.SET_NULL, null=True, related_name="solicitante" )
    id_supervisor = models.ForeignKey(Empleado, on_delete=models.SET_NULL, null=True, related_name="supervisor")
    monto_total = models.DecimalField(default=0, decimal_places=10, max_digits=10)
    comentarios_supervisor = models.TextField(max_length=1000)
    class Meta:
        verbose_name_plural = "Solicitudes de Mantenimiento Preventivo"
    def __str__(self):
        return "%s" % self.actividad