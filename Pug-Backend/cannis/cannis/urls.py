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
from django.contrib.auth import views as auth_views

from django.conf.urls import include 
from pugsealapp import views
from pugsealapp.views import *
from rest_framework import routers
from djoser.views import *

router = routers.SimpleRouter()
router.register('api/categorias', views.CategoriasViewSet, basename='api/categorias')
router.register('api/areas', views.AreasViewSet, basename='api/areas')
router.register('api/proveedores', views.ProveedoresViewSet, basename='api/proveedores')
router.register('api/empleados', views.EmpleadosViewSet, basename='api/empleados')
router.register('api/solicitantes', views.SolicitantesViewSet, basename='api/solicitantes')
router.register('api/supervisores', views.SupervisoresViewSet, basename='api/supervisores')
router.register('api/mantenimiento/preventivo', views.MantenimientoPreventivoViewSet, basename='api/mantenimiento/preventivo')

urlpatterns = [
    path('users/', UserViewSet.as_view({
    'get': 'list',
    'post': 'create',
    'delete': 'destroy',
    'put': 'update',
    'patch': 'partial_update'
    })),
    path('users/me/', UserViewSet.as_view({
    'get': 'me',
    'delete': 'me',
    'put': 'me',
    'patch': 'me'
    })),
    path('auth/login/', TokenCreateView.as_view()),
	path('auth/logout/', TokenDestroyView.as_view()),
    path('admin/', admin.site.urls),
]
urlpatterns += router.urls