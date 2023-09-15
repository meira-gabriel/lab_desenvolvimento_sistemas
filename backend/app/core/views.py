from rest_framework.response import Response

from rest_framework.views import APIView

from rest_framework import status
from .models import TipoUsuario, Usuario, Endereco, Estabelecimento, Produto, Cartao, Carrinho, Compra
from .serializers import (
    TipoUsuarioSerializer, UsuarioSerializer,
    EnderecoSerializer, EstabelecimentoSerializer,
    ProdutoSerializer, CartaoSerializer,
    CarrinhoSerializer, CompraSerializer
)

class TipoUsuarioInfo(APIView):
    def get(self, request, id):
        obj = TipoUsuario.objects.all()
        serializer = TipoUsuarioSerializer(obj, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = TipoUsuarioSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)


class UsuarioAPI(APIView):
    def get(self, request, id=None):
        if id is None:
            # Se id não for fornecido, listamos todos os usuários
            queryset = Usuario.objects.all()
            serializer = UsuarioSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            # Se id for fornecido, obtemos um único usuário
            try:
                obj = Usuario.objects.get(pk=id)
                serializer = UsuarioSerializer(obj)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Usuario.DoesNotExist:
                msg = {"msg": "Usuario não encontrado"}
                return Response(status=status.HTTP_404_NOT_FOUND, data=msg)
        serializer = UsuarioSerializer(obj)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = UsuarioSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id):
        try:
            obj = Usuario.objects.get(id=id)

        except Usuario.DoesNotExist:
            msg = {"msg": "Usuario não encontrado"}
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = UsuarioSerializer(obj, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_205_RESET_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        try:
            obj = Usuario.objects.get(id=id)

        except Usuario.DoesNotExist:
            msg = {"msg": "Usuario não encontrado"}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)

        obj.delete()
        return Response({"msg":"deletado"}, status=status.HTTP_204_NO_CONTENT)

class EnderecoAPI(APIView):
    def get(self, request, id=None):
        if id is None:
            queryset = Endereco.objects.all()
            serializer = EnderecoSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            try:
                obj = Endereco.objects.get(pk=id)
                serializer = EnderecoSerializer(obj)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Endereco.DoesNotExist:
                msg = {"msg": "Endereco não encontrado"}
                return Response(status=status.HTTP_404_NOT_FOUND, data=msg)
        serializer = EnderecoSerializer(obj)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = EnderecoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id):
        try:
            obj = Endereco.objects.get(id=id)
        except Endereco.DoesNotExist:
            msg = {"msg": "Endereco não encontrado"}
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = EnderecoSerializer(obj, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_205_RESET_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        try:
            obj = Endereco.objects.get(id=id)

        except Endereco.DoesNotExist:
            msg = {"msg": "Endereco não encontrado"}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)

        obj.delete()
        return Response({"msg":"deletado"}, status=status.HTTP_204_NO_CONTENT)

class EstabelecimentoAPI(APIView):
    def get(self, request, id=None):
        if id is None:
            # Se id não for fornecido, listamos todos os usuários
            queryset = Estabelecimento.objects.all()
            serializer = EstabelecimentoSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            # Se id for fornecido, obtemos um único usuário
            try:
                obj = Estabelecimento.objects.get(pk=id)
                serializer = EstabelecimentoSerializer(obj)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Estabelecimento.DoesNotExist:
                msg = {"msg": "Estabelecimento não encontrado"}
                return Response(status=status.HTTP_404_NOT_FOUND, data=msg)
        serializer = EstabelecimentoSerializer(obj)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = EstabelecimentoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id):
        try:
            obj = Estabelecimento.objects.get(id=id)

        except Estabelecimento.DoesNotExist:
            msg = {"msg": "Estabelecimento não encontrado"}
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = EstabelecimentoSerializer(obj, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_205_RESET_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        try:
            obj = Estabelecimento.objects.get(id=id)

        except Estabelecimento.DoesNotExist:
            msg = {"msg": "Estabelecimento não encontrado"}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)

        obj.delete()
        return Response({"msg":"deletado"}, status=status.HTTP_204_NO_CONTENT)