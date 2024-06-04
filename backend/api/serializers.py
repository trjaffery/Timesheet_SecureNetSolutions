from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Employee, Task, WorkLog, Leave

class EmployeeSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Employee
        fields = ['user', 'first_name', 'last_name', 'employeeID']

class UserSerializer(serializers.ModelSerializer):
    employee_profile = EmployeeSerializer(required=True)

    class Meta:
        model = User
        fields = ["id", "username", "password", "employee_profile"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        employee_data = validated_data.pop('employee_profile')
        password = validated_data.pop('password', None)
        user = User(**validated_data)
        if password is not None:
            user.set_password(password)
        user.save()
        Employee.objects.create(user=user, **employee_data)
        return user

    def update(self, instance, validated_data):
        employee_data = validated_data.pop('employee_profile')
        instance.username = validated_data.get('username', instance.username)

        password = validated_data.get('password', None)
        if password is not None:
            instance.set_password(password)
        
        instance.save()

        employee = instance.employee_profile
        employee.position = employee_data.get('position', employee.position)
        employee.department = employee_data.get('department', employee.department)
        employee.date_of_birth = employee_data.get('date_of_birth', employee.date_of_birth)
        employee.save()

        return instance

class TaskSerializer(serializers.ModelSerializer):
    assigned_to = EmployeeSerializer(read_only=True)

    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'assigned_to']


class WorkLogSerializer(serializers.ModelSerializer):
    employee = EmployeeSerializer(read_only=True)
    task = TaskSerializer()

    class Meta:
        model = WorkLog
        fields = ['id', 'employee', 'task', 'date', 'hours_worked', 'description']
        extra_kwargs = {"employee": {"read_only": True}}

class LeaveSerializer(serializers.ModelSerializer):
    employee = EmployeeSerializer(read_only=True)

    class Meta:
        model = Leave
        fields = ['id', 'employee', 'leave_type', 'start_date', 'end_date', 'description']
        extra_kwargs = {"employee": {"read_only": True}}