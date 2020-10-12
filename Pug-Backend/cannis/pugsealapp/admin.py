from django.contrib import admin
from .models import *


admin.site.register(Proveedor)
admin.site.register(Area)
admin.site.register(Categoria)
admin.site.register(Empleado)
admin.site.register(Hotel)
admin.site.register(Ubicacion)
admin.site.register(Mantenimiento_Preventivo)

# Register your models here.
