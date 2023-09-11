from rest_framework import serializers
from .models import TipoUsuario, Usuario, Endereco, Estabelecimento, Produto, Cartao, Carrinho, Compra

class TipoUsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoUsuario
        fields = '__all__'

class UsuarioSerializer(serializers.ModelSerializer):
    tp_usuario_name = serializers.CharField()

    class Meta:
        model = Usuario
        fields = '__all__'
        extra_kwargs = {
            'tp_usuario': {'read_only': True},  # Configurar tp_usuario como somente leitura
        }

    def create(self, validated_data):
        tp_usuario_name = validated_data.pop('tp_usuario_name', None)
        if tp_usuario_name:
            tp_usuario, created = TipoUsuario.objects.get_or_create(nm=tp_usuario_name)
            validated_data['tp_usuario'] = tp_usuario
        return super().create(validated_data)

class EnderecoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Endereco
        fields = '__all__'

class EstabelecimentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estabelecimento
        fields = '__all__'

class ProdutoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produto
        fields = '__all__'

class CartaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cartao
        fields = '__all__'

class CarrinhoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carrinho
        fields = '__all__'

class CompraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Compra
        fields = '__all__'

