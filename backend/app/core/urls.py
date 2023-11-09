from django.urls import path

from .serializers import LocalizacaoSerializer
from .views import UsuarioAPI, EnderecoAPI, EstabelecimentoAPI, LocalizacaoAPI

urlpatterns = [
    path('usuario/', UsuarioAPI.as_view()),
    path('usuario/<int:id>', UsuarioAPI.as_view()),
    path('endereco/', EnderecoAPI.as_view()),
    path('endereco/<int:id>', EnderecoAPI.as_view()),
    path('geocode/<int:idUsuario>/<str:enderecoEntregador>', LocalizacaoAPI.as_view()),
]
