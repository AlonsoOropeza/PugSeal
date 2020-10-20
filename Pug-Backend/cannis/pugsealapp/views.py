from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework import status, viewsets, filters
from rest_framework.response import Response
from pugsealapp.models import Area, Categoria, Empleado, Hotel, Ubicacion, Proveedor, Mantenimiento_Preventivo
from pugsealapp.serializer import AreaSerializer, CategoriaSerializer, EmpleadoSerializer, HotelSerializer, UbicacionSerializer, ProveedorSerializer, MantenimientoPreventivoSerializer

class AreasViewSet(viewsets.ModelViewSet):
	serializer_class = AreaSerializer
	queryset = Area.objects.all()

class CategoriasViewSet(viewsets.ModelViewSet):
	serializer_class = CategoriaSerializer
	queryset = Categoria.objects.all()

class ProveedoresViewSet(viewsets.ModelViewSet):
	serializer_class = ProveedorSerializer
	queryset = Proveedor.objects.all()

class EmpleadosViewSet(viewsets.ModelViewSet):
	serializer_class = EmpleadoSerializer
	queryset = Empleado.objects.all()

class SupervisoresViewSet(viewsets.ModelViewSet):
	serializer_class = EmpleadoSerializer
	queryset = Empleado.objects.filter(rol='admin')

class SolicitantesViewSet(viewsets.ModelViewSet):
    serializer_class = EmpleadoSerializer
    queryset = Empleado.objects.exclude(rol='admin')

class MantenimientoPreventivoViewSet(viewsets.ModelViewSet):
	serializer_class = MantenimientoPreventivoSerializer
	queryset = Mantenimiento_Preventivo.objects.all()



































