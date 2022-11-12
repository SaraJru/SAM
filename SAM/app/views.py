#librería para rendeziar
from django.shortcuts import render
#Peticiones/Respuestas
from django.http import HttpRequest, HttpResponse
#Vistas genéricas
from django.views import generic

from app.models import Publicaciones, Estudiantes

from django.contrib.auth.decorators import login_required

@login_required
def home (request):
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'home.html',
        {
            'title': 'Inicio',
            'year': '2022',
            'contenido': 'ESTE ES EL NUEVO CONTENIDO'
        }
    )

def Acerca_de (request):
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'AcercaDe.html',
        {
            'title': 'Inicio',
            'year': '2022',
            'contenido': 'ESTE ES EL NUEVO CONTENIDO'
        }
    )


class publicaciones (generic.ListView):
    template_name = 'Publicaciones.html'
    model = Publicaciones

    def get_queryset(self):
        return Publicaciones.objects.all()


def Creaciones (request):
    assert isinstance(request, HttpRequest)
    if request.method =='POST':
        publicacion = Publicaciones()
        publicacion.titulo = request.POST ['titulo']
        publicacion.descripcion = request.POST['descripcion']
        publicacion.save()
    return render(
        request,
        'Creaciones.html',
        {
            'title': 'Inicio',
            'year': '2022',
            'contenido': 'ESTE ES EL NUEVO CONTENIDO'
        }
    )

class estudiantes (generic.ListView):
    template_name = 'estudiantes.html'
    model = Estudiantes

    def get_queryset(self):
        return Estudiantes.objects.all()


def CrearEstudiante(request):
    assert isinstance(request, HttpRequest)
    if request.method =='POST':
        estudiantes = Estudiantes()
        estudiantes.nombre = request.POST ['nombre']
        estudiantes.apellido = request.POST['apellido']
        estudiantes.rol = request.POST['rol'] if request.POST['rol'] else 2 
        estudiantes.save()
    return render(
        request,
        'Creaciones.html',
    )

class administradores (generic.ListView):
    template_name = 'administradores.html'
    model = Estudiantes

    def get_queryset(self):
        return Estudiantes.objects.all()


def CrearAdministradores(request):
    assert isinstance(request, HttpRequest)
    if request.method =='POST':
        estudiantes = Estudiantes()
        estudiantes.nombre = request.POST ['nombre']
        estudiantes.apellido = request.POST['apellido']
        estudiantes.rol = request.POST['rol']
        estudiantes.save()
    return render(
        request,
        'Creaciones.html',

    )