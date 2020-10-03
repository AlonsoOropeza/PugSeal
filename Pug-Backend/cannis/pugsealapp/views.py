from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from pugsealapp.models import Area, Categoria, Empleado, Hotel, Ubicacion, Proveedor
from pugsealapp import forms
from pugsealapp.serializer import AreaSerializer, CategoriaSerializer, EmpleadoSerializer, HotelSerializer, UbicacionSerializer, ProveedorSerializer

# Create your views here.

'''def index(request):
    return HttpResponse("simon")'''

def crearCategoria(request):
    if request.method == 'POST':
        form = forms.CrearCategoria(request.POST)
        if form.is_valid():
            nombre = form.cleaned_data['nombre']
            try:
                nuevaCategoria = Categoria(nombre=nombre)
                nuevaCategoria.save()
                return HttpResponse("se creo el objeto")
            except:
                return HttpResponse("No se creo el objeto")

    else:
        context = {
            'title' : 'Crear Categoría',
            'form' : forms.CrearCategoria()
        }
        return render(request, 'categoria/crearCategoria.html', context)


































