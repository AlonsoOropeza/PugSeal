from rest_framework import serializers
from pugsealapp.models import Area, Categoria, Empleado, Hotel, Ubicacion, Proveedor

class AreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Area
        fields = ('id_area','nombre')

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ('id_categoria','nombre')

class EmpleadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empleado
        fields = ('id_empleado','nombre','a_paterno','a_materno','correo_electronico','telefono')

class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = ('id_hotel','nombre')

class UbicacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ubicacion
        fields = ('id_ubicacion','nombre')

class ProveedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proveedor
        fields = ('id_proveedor','nombre', 'contacto', 'telefono')