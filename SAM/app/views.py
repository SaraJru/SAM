#librería para rendeziar
from django.shortcuts import render
#Peticiones/Respuestas
from django.http import HttpRequest, HttpResponse
#Vistas genéricas
from django.views import generic


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