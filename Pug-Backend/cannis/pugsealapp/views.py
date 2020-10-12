from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework import status, viewsets, filters
from rest_framework.response import Response
from pugsealapp.models import Area, Categoria, Empleado, Hotel, Ubicacion, Proveedor
from pugsealapp import forms
from pugsealapp.serializer import AreaSerializer, CategoriaSerializer, EmpleadoSerializer, HotelSerializer, UbicacionSerializer, ProveedorSerializer

# Create your views here.

'''def index(request):
    return HttpResponse("simon")'''

def crear_categoria(request):
    context = {
        'title' : 'Crear Categoría'
    }
    form = forms.CrearCategoria(request.POST or None)
    if form.is_valid():
        form.save()
    context['form'] = form 
    return render(request, 'categoria/crear_categoria.html', context)
 
def listar_categorias(request):
    context = {
        'title' : 'Lista Categorias'
    }
    context['dataset'] = Categoria.objects.all()
    return render(request, 'categoria/listar_categorias.html', context)

class CategoriasViewSet(viewsets.ModelViewSet):
	serializer_class = CategoriaSerializer
	queryset = Categoria.objects.all()



































