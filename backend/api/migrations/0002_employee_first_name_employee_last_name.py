# Generated by Django 5.0.6 on 2024-06-04 19:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='employee',
            name='first_name',
            field=models.CharField(default='John', max_length=20),
        ),
        migrations.AddField(
            model_name='employee',
            name='last_name',
            field=models.CharField(default='Joe', max_length=20),
        ),
    ]