from django.contrib import admin
from .models import *
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext, gettext_lazy as _
class UserAdmin2(UserAdmin):
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        (_('Personal info'), {'fields': ('first_name', 'last_name', 'email','telefono','rol')}),
        (_('Permissions'), {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
        }),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
admin.site.register(Proveedor)
admin.site.register(Area)
admin.site.register(Requisicion)
admin.site.register(Categoria)
admin.site.register(Usuario, UserAdmin2)
admin.site.register(Hotel)
admin.site.register(Ubicacion)
admin.site.register(Mantenimiento_Preventivo)
admin.site.register(Bitacora_Mediciones)

# Register your models here.
