# Generated by Django 5.0.6 on 2024-06-05 09:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_worklog_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='worklog',
            name='date',
            field=models.DateField(),
        ),
    ]