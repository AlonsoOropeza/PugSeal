from django import forms

class CrearCategoria(forms.Form):
    nombre = forms.CharField(label='Nombre Categoría', max_length=255)