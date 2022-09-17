from django.db import models

# Create your models here.
class Estudiantes (models.Model):
    ADMINISTRADOR = 1
    USUARIO = 2
    roles = (
        (ADMINISTRADOR, 'administrador'),
        (USUARIO, 'usuario')
    )

    
    nombre = models.CharField(max_length=25)
    apellido = models.CharField(max_length=25)
    rol = models.IntegerField(choices=roles,default=USUARIO)

    def __str__(self) -> str:
        return '%s %s' %(self.nombre, self.apellido)

class Comentarios (models.Model):
    descripcion = models.CharField(max_length=150)
    id_estudiantes = models.ForeignKey(Estudiantes,on_delete=models.CASCADE)


class Publicaciones (models.Model):
    titulo = models.CharField(max_length=50)
    descripcion = models.TextField(max_length=1500)
    id_comentario = models.ForeignKey(Comentarios,on_delete=models.CASCADE,null=True,blank=True)
