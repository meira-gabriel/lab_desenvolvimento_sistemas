# Generated by Django 3.2.22 on 2023-11-04 20:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_auto_20230910_2211'),
    ]

    operations = [
        migrations.CreateModel(
            name='Localizacao',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('latitude', models.DecimalField(decimal_places=8, max_digits=12)),
                ('longitude', models.DecimalField(decimal_places=8, max_digits=12)),
            ],
        ),
    ]