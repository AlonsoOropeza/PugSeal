from django.shortcuts import render
from django.http import HttpResponse
from djoser import views
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, viewsets, filters
from rest_framework.response import Response
from pugsealapp.models import Area, Categoria, Usuario, Hotel, Ubicacion, Proveedor, Mantenimiento_Preventivo, Requisicion , Bitacora_Mediciones, Mantenimiento_Correctivo
from pugsealapp.serializer import AreaSerializer, CategoriaSerializer, EmpleadoSerializer, HotelSerializer, UbicacionSerializer, ProveedorSerializer, MantenimientoPreventivoSerializer, RequisicionSerializer, HotelSerializer, BitacoraMedicionesSerializer, MantenimientoCorrectivoSerializer
from django.shortcuts import redirect

class AreasViewSet(viewsets.ModelViewSet):
	serializer_class = AreaSerializer
	queryset = Area.objects.all()

class CategoriasViewSet(viewsets.ModelViewSet):
	#permission_classes = (IsAuthenticated,) 
	serializer_class = CategoriaSerializer
	queryset = Categoria.objects.all()
	'''def get_queryset(self):
		auth = self.request.auth
		if auth:
			return Categoria.objects.all()
		else:
			raise ValidationError({"error": ["You don't have enough permission."]})'''

class ProveedoresViewSet(viewsets.ModelViewSet):
	serializer_class = ProveedorSerializer
	queryset = Proveedor.objects.all()

class EmpleadosViewSet(viewsets.ModelViewSet):
	serializer_class = EmpleadoSerializer
	queryset = Usuario.objects.all()

class MantenimientoPreventivoViewSet(viewsets.ModelViewSet):
	serializer_class = MantenimientoPreventivoSerializer
	queryset = Mantenimiento_Preventivo.objects.order_by('fecha_inicio')

class BitacoraMedicionesViewSet(viewsets.ModelViewSet):
	serializer_class = BitacoraMedicionesSerializer
	queryset = Bitacora_Mediciones.objects.all()

class RequisicionViewSet(viewsets.ModelViewSet):
	serializer_class = RequisicionSerializer
	queryset = Requisicion.objects.all()

class HotelViewSet(viewsets.ModelViewSet):
	serializer_class = HotelSerializer
	queryset = Hotel.objects.all()
class AuditoresViewSet(viewsets.ModelViewSet):
	serializer_class = EmpleadoSerializer
	queryset = Usuario.objects.filter(rol='Auditor')

class ResponsablesViewSet(viewsets.ModelViewSet):
	serializer_class = EmpleadoSerializer
	queryset = Usuario.objects.all()

class MantenimientoCorrectivoViewSet(viewsets.ModelViewSet):
	serializer_class = MantenimientoCorrectivoSerializer
	queryset = Mantenimiento_Correctivo.objects.all()

def URLView(request):
    return redirect('admin/')