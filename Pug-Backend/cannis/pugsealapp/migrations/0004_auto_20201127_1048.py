# Generated by Django 3.1.1 on 2020-11-27 16:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pugsealapp', '0003_auto_20201126_2001'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mantenimiento_preventivo',
            name='cotizacion',
            field=models.FloatField(default=0),
        ),
    ]