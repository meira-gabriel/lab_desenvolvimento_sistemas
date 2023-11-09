import googlemaps
from rest_framework.response import Response
from django.db import connections
from rest_framework.views import APIView
from rest_framework import status
from .models import TipoUsuario, Usuario, Endereco, Estabelecimento, Produto, Cartao, Carrinho, Compra, Localizacao
from .serializers import (
    TipoUsuarioSerializer, UsuarioSerializer,
    EnderecoSerializer, EstabelecimentoSerializer,
    ProdutoSerializer, CartaoSerializer,
    CarrinhoSerializer, CompraSerializer, LocalizacaoSerializer
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

#
class LocalizacaoAPI(APIView):
    def get(self, request, idUsuario, enderecoEntregador):

        enderecoEstabelecimentoQuery = f"select en.* from core_usuario u join core_carrinho ca on u.id = ca.id_usuario_id join core_compra cmp on cmp.id_carrinho_id = ca.id join core_estabelecimento es on es.id = cmp.id_estabelecimento_id join core_endereco en on en.id_estabelecimento_id = es.id where u.id = {idUsuario}"
        enderecoEstabelecimento = self.runQuery(enderecoEstabelecimentoQuery)

        try:
            endereco_comprador = self.runQuery(f"select en.* from core_usuario u join core_carrinho ca on u.id = ca.id_usuario_id  join core_compra cmp on cmp.id_carrinho_id = ca.id join core_estabelecimento es on es.id = cmp.id_estabelecimento_id  join core_endereco en on en.id_usuario_id  = es.id where u.id = {idUsuario}")
        except Endereco.DoesNotExist:
            msg = {"msg": "Endereço do comprador não encontrado"}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)

        endereco_restaurante = self.runQuery(f"select en.* from core_usuario u join core_carrinho ca on u.id = ca.id_usuario_id  join core_compra cmp on cmp.id_carrinho_id = ca.id join core_estabelecimento es on es.id = cmp.id_estabelecimento_id  join core_endereco en on en.id_estabelecimento_id = es.id where u.id = {idUsuario}")


        if endereco_restaurante[0][2] is not None:
            numero_restaurante = str(endereco_restaurante[0][2])
        else:
            numero_restaurante = None

        if endereco_restaurante[0][4] is not None:
            cep_restaurante = str(endereco_restaurante[0][4])
        else:
            cep_restaurante = None

        endereco_restaurante = endereco_restaurante[0][1]
        # numero_restaurante = str(endereco_restaurante[0][2])
        #cep_restaurante = endereco_restaurante[0][6]


        if endereco_comprador[0][2] is not None:
            numero_comprador = str(endereco_comprador[0][2])
        else:
            numero_comprador = None

        if endereco_comprador[0][4] is not None:
            cep_comprador = str(endereco_comprador[0][4])
        else:
            cep_comprador = None

        endereco_comprador = endereco_comprador[0][1]
        # numero_comprador = endereco_comprador[0][2]
        # cep_comprador = endereco_comprador[0][6]

        gmaps = googlemaps.Client(key="*")
        response_comprador_restaurante = gmaps.distance_matrix(
            origins=f"{endereco_restaurante}, {numero_restaurante}, {cep_restaurante}",

            destinations=f"{endereco_comprador}, {numero_comprador}, {cep_comprador}"
        )

        # Calcular a distância entre o endereço do entregador e o restaurante
        response_entregador_restaurante = gmaps.distance_matrix(
            origins=enderecoEntregador,
            destinations=f"{endereco_restaurante}, {numero_restaurante}, {cep_restaurante}"
        )


        # Somar as distâncias
        distancia_total = (
                response_comprador_restaurante['rows'][0]['elements'][0]['distance']['value'] +
                response_entregador_restaurante['rows'][0]['elements'][0]['distance']['value']
        )

        return Response({"distancia_total": distancia_total}, status=status.HTTP_200_OK)

        # {
        #     "distancia_total": 20369
        # }



    def runQuery(self, query, rows=True):
        with connections['default'].cursor() as cursor:
            cursor.execute(query)
            if rows:
                rows = cursor.fetchall()
                return rows
            else:
                return True
        # Obter o endereço do comprador do banco de dados

    #
    # def get(self, request, enderecoEntregador):
    #     # location = Localizacao.objects.get()
    #     enderecoComprador = 'Rua Salgado Filho'
    #     gmaps = googlemaps.Client(key="AIzaSyA99mmGdOqVFDca9CFbHErHKmKs5fR2osU")
    #     response = gmaps.distance_matrix(origins=enderecoEntregador, destinations=enderecoComprador)
    #     return Response(response)

