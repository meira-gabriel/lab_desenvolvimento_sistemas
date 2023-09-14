from django.db import models
from django.db.models import UniqueConstraint


class TipoUsuario(models.Model):
    nm = models.CharField(max_length=20)

    def __str__(self):
        return self.nm

class Usuario(models.Model):
    tp_usuario = models.ForeignKey(TipoUsuario, on_delete=models.CASCADE)# tipo de usuario
    cd_telefone = models.CharField(max_length=50) # codigo de telefone
    cd_email = models.CharField(max_length=100) # codigo de email
    nome = models.CharField(max_length=100)
    cd_cpf_cnpj = models.CharField(max_length=14) # codigo de cpf ou cnpj

class Endereco(models.Model):
    nm_logradouro = models.CharField(max_length=100)
    nr_logradouro = models.IntegerField()
    nm_bairro = models.CharField(max_length=100)
    nm_cidade = models.CharField(max_length=100)
    cd_uf = models.CharField(max_length=2)
    cd_cep = models.CharField(max_length=10)
    id_usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE) # chave estrangeira de usuario

class Estabelecimento(models.Model):
    id_endereco = models.ForeignKey(Endereco, on_delete=models.CASCADE)
    id_usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    dh_funcionamento_ini = models.TimeField() # data e hora de funcionamento inicial
    dh_funcionamento_fimp = models.TimeField() # data e hora de funcionamento final

class Produto(models.Model):
    id_estabelecimento = models.ForeignKey(Estabelecimento, on_delete=models.CASCADE)
    nm_produto = models.TextField()
    cd_descricao = models.CharField(max_length=100) # codigo de descricao
    tm_produto = models.CharField(max_length=100) # tamanho do produto
    vl_produto = models.DecimalField(max_digits=10, decimal_places=2) # valor do produto

class Cartao(models.Model):
    cd_tipo = models.CharField(max_length=100) # codigo de tipo
    cd_numero = models.BigIntegerField() # codigo de numero
    cd_cvv = models.IntegerField() # codigo de cvv
    nm_apelido = models.CharField(max_length=100)
    dt_vencimento = models.DateField() # data de vencimento
    id_usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)


class Carrinho(models.Model):
    id_usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    id_produto = models.ForeignKey(Produto, on_delete=models.CASCADE)

class Compra(models.Model):
    id_estabelecimento = models.ForeignKey(Estabelecimento, on_delete=models.CASCADE)
    id_cartao = models.CharField(max_length=100)
    id_carrinho = models.OneToOneField(Carrinho, on_delete=models.CASCADE)

    class Meta:
        constraints = [
            UniqueConstraint(fields=['id_carrinho'], name='unique_carrinho')
        ]

class StatusPedido(models.Model):
    nm = models.CharField(max_length=100)

class Pedido(models.Model):
    id_compra = models.OneToOneField(Compra, on_delete=models.CASCADE) # onde o entregador não pode ter mais de uma compra do mesmo pedido
    id_entregador = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    st_pedido = models.CharField(max_length=100) # status do pedido

    # isso aqui é pra garantir que o id_compra seja único já que é chave primária e estrangeira ao mesmo tempo
    class Meta:
        constraints = [
            UniqueConstraint(fields=['id_compra'], name='unique_pedido_compra')
        ]




