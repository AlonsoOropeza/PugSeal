from django import forms
from pugsealapp import models

class CrearCategoria(forms.ModelForm):
    class Meta:
        model = models.Categoria
        fields = [
            'nombre',
        ]