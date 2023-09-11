from django.contrib import admin
from .models import TipoUsuario, Usuario, Endereco, Estabelecimento, Produto, Cartao, Carrinho, Compra

admin.site.register(TipoUsuario)
admin.site.register(Usuario)
admin.site.register(Endereco)
admin.site.register(Estabelecimento)
admin.site.register(Produto)
admin.site.register(Cartao)
admin.site.register(Carrinho)
admin.site.register(Compra)

