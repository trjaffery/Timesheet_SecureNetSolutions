from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Task, WorkLog, Leave


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user

class TaskSerializer(serializers.ModelSerializer):
    employee = UserSerializer(read_only=True)

    class Meta:
        model = Task
        fields = ['id', 'title', 'content', 'created_at', 'employee']


class WorkLogSerializer(serializers.ModelSerializer):
    employee = UserSerializer(read_only=True)

    class Meta:
        model = WorkLog
        fields = ['id', 'employee', 'date', 'start_time', 'end_time']
        extra_kwargs = {"employee": {"read_only": True}}

class LeaveSerializer(serializers.ModelSerializer):
    employee = UserSerializer(read_only=True)

    class Meta:
        model = Leave
        fields = ['id', 'employee', 'leave_type', 'start_date', 'end_date', 'description']
        extra_kwargs = {"employee": {"read_only": True}}