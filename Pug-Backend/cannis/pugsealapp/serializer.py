from rest_framework import serializers
from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.password_validation import validate_password
from pugsealapp.models import Area, Categoria, Usuario, Hotel, Ubicacion, Proveedor, Mantenimiento_Preventivo, Bitacora_Mediciones
from djoser import utils
from djoser.compat import get_user_email, get_user_email_field_name
from djoser.conf import settings
from django.contrib.auth.models import Group

User = get_user_model()

class AreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Area
        fields = ('id_area','nombre', 'descripcion', 'activo')

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ('id_categoria','nombre', 'descripcion', 'activo')

class EmpleadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'

class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = ('id_hotel','nombre', 'activo')

class UbicacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ubicacion
        fields = ('id_ubicacion','nombre', 'activo')

class ProveedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proveedor
        fields = ('id_proveedor','nombre_empresa','nombre_proveedor','email', 'telefono', 'activo','fechaAlianza')

class MantenimientoPreventivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mantenimiento_Preventivo
        fields = '__all__'

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('name',)

class UserSerializer(serializers.ModelSerializer):
    # groups = GroupSerializer(many=True)
    class Meta:
        model = Usuario
        fields = ('id', 'first_name', 'last_name', 'telefono', 'email', 'rol')

class BitacoraMedicionesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bitacora_Mediciones
        fields = '__all__'