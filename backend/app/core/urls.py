from django.urls import path
from .views import UsuarioAPI

urlpatterns = [
    path('usuario/', UsuarioAPI.as_view()),
    path('usuario/<int:id>', UsuarioAPI.as_view()),
]
