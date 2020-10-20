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

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/areas/', views.AreasViewSet.as_view({'post':'create', 'get':'list'})),
    path('api/categorias/', views.CategoriasViewSet.as_view({'post':'create', 'get':'list'})),
    path('api/proveedores/', views.ProveedoresViewSet.as_view({'post' :'create', 'get':'list'})),
    path('api/empleados/', views.EmpleadosViewSet.as_view({'post' :'create', 'get':'list'})),
    path('api/solicitantes/', views.SolicitantesViewSet.as_view({'get':'list'})),
    path('api/supervisores/', views.SupervisoresViewSet.as_view({'get':'list'})),
    path('api/solicitudes/mantenimiento/', views.MantenimientoPreventivoViewSet.as_view({'get':'list', 'post':'create'}))

]
