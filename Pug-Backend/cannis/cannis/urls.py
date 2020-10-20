"""cannis URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import include 
from pugsealapp import views
from rest_framework import routers

router = routers.SimpleRouter()
router.register('api/categorias', views.CategoriasViewSet, basename='api/categorias')
router.register('api/areas', views.AreasViewSet, basename='api/areas')
router.register('api/proveedores', views.ProveedoresViewSet, basename='api/proveedores')
router.register('api/empleados', views.EmpleadosViewSet, basename='api/empleados')
router.register('api/solicitantes', views.SolicitantesViewSet, basename='api/solicitantes')
router.register('api/supervisores', views.SupervisoresViewSet, basename='api/supervisores')
router.register('api/solicitudes/mantenimiento', views.MantenimientoPreventivoViewSet, basename='api/solicitudes/mantenimiento')

urlpatterns = [
    path('admin/', admin.site.urls),
]
urlpatterns += router.urls