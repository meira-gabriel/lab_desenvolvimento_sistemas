from django.urls import path
from .views import InfoUsuario, TipoUsuarioInfo

urlpatterns = [
    path('usuario/<int:id>', TipoUsuarioInfo.as_view()),
    path('usuario/', InfoUsuario.as_view()),
]
