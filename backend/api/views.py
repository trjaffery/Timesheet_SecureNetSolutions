from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, LeaveSerializer, WorkLogSerializer, TaskSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Task, WorkLog, Leave


# Create your views here.

class TaskListCreateView(generics.ListCreateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]


    def get_queryset(self):
        user = self.request.user
        return Task.objects.filter(employee=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(employee=self.request.user)
        else:
            print(serializer.errors)


class TaskRetrieveUpdateDestroyView(generics.DestroyAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Task.objects.filter(employee=user)

class WorkLogListCreateView(generics.ListCreateAPIView):
    serializer_class = WorkLogSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return WorkLog.objects.filter(employee=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(employee=self.request.user)  # Set employee here
        else:
            print(serializer.errors)

class WorkLogRetrieveUpdateDestroyView(generics.DestroyAPIView):
    serializer_class = WorkLogSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return WorkLog.objects.filter(employee=user)

class LeaveListCreateView(generics.ListCreateAPIView):
    serializer_class = LeaveSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Leave.objects.filter(employee=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(employee=self.request.user)  # Set employee here
        else:
            print(serializer.errors)

class LeaveRetrieveUpdateDestroyView(generics.DestroyAPIView):
    serializer_class = LeaveSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Leave.objects.filter(employee=user)

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]