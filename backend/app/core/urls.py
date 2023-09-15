from django.urls import path
from .views import UsuarioAPI, EnderecoAPI, EstabelecimentoAPI

urlpatterns = [
    path('usuario/', UsuarioAPI.as_view()),
    path('usuario/<int:id>', UsuarioAPI.as_view()),
    path('endereco/', EnderecoAPI.as_view()),
    path('endereco/<int:id>', EnderecoAPI.as_view()),
]
