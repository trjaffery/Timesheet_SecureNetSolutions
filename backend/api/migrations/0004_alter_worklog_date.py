# Generated by Django 5.0.6 on 2024-06-05 09:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_leave_employee_alter_task_employee_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='worklog',
            name='date',
            field=models.DateTimeField(),
        ),
    ]