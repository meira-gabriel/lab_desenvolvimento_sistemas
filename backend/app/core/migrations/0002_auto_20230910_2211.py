# Generated by Django 3.2.20 on 2023-09-10 22:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Carrinho',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='Cartao',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cd_tipo', models.CharField(max_length=100)),
                ('cd_numero', models.BigIntegerField()),
                ('cd_cvv', models.IntegerField()),
                ('nm_apelido', models.CharField(max_length=100)),
                ('dt_vencimento', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='Compra',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('id_cartao', models.CharField(max_length=100)),
                ('id_carrinho', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='core.carrinho')),
            ],
        ),
        migrations.CreateModel(
            name='Endereco',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nm_logradouro', models.CharField(max_length=100)),
                ('nr_logradouro', models.IntegerField()),
                ('nm_bairro', models.CharField(max_length=100)),
                ('nm_cidade', models.CharField(max_length=100)),
                ('cd_uf', models.CharField(max_length=2)),
                ('cd_cep', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Estabelecimento',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dh_funcionamento_ini', models.TimeField()),
                ('dh_funcionamento_fimp', models.TimeField()),
                ('id_endereco', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.endereco')),
            ],
        ),
        migrations.CreateModel(
            name='Pedido',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('st_pedido', models.CharField(max_length=100)),
                ('id_compra', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='core.compra')),
            ],
        ),
        migrations.CreateModel(
            name='Produto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nm_produto', models.TextField()),
                ('cd_descricao', models.CharField(max_length=100)),
                ('tm_produto', models.CharField(max_length=100)),
                ('vl_produto', models.DecimalField(decimal_places=2, max_digits=10)),
                ('id_estabelecimento', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.estabelecimento')),
            ],
        ),
        migrations.CreateModel(
            name='StatusPedido',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nm', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='TipoUsuario',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nm', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Usuario',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cd_telefone', models.CharField(max_length=50)),
                ('cd_email', models.CharField(max_length=100)),
                ('nome', models.CharField(max_length=100)),
                ('cd_cpf_cnpj', models.CharField(max_length=14)),
                ('tp_usuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.tipousuario')),
            ],
        ),
        migrations.DeleteModel(
            name='Product',
        ),
        migrations.AddField(
            model_name='pedido',
            name='id_entregador',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.usuario'),
        ),
        migrations.AddField(
            model_name='estabelecimento',
            name='id_usuario',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.usuario'),
        ),
        migrations.AddField(
            model_name='endereco',
            name='id_usuario',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.usuario'),
        ),
        migrations.AddField(
            model_name='compra',
            name='id_estabelecimento',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.estabelecimento'),
        ),
        migrations.AddField(
            model_name='cartao',
            name='id_usuario',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.usuario'),
        ),
        migrations.AddField(
            model_name='carrinho',
            name='id_produto',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.produto'),
        ),
        migrations.AddField(
            model_name='carrinho',
            name='id_usuario',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.usuario'),
        ),
        migrations.AddConstraint(
            model_name='pedido',
            constraint=models.UniqueConstraint(fields=('id_compra',), name='unique_pedido_compra'),
        ),
        migrations.AddConstraint(
            model_name='compra',
            constraint=models.UniqueConstraint(fields=('id_carrinho',), name='unique_carrinho'),
        ),
    ]
