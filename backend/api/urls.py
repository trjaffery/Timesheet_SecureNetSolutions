from django.urls import path
from . import views

urlpatterns = [
    path('tasks/', views.TaskListCreateView.as_view(), name='task-list-create'),
    path('tasks/delete/<int:pk>/', views.TaskRetrieveUpdateDestroyView.as_view(), name='task-delete'),
    path('worklogs/', views.WorkLogListCreateView.as_view(), name='worklog-list-create'),
    path('worklogs/delete/<int:pk>/', views.WorkLogRetrieveUpdateDestroyView.as_view(), name='worklog-delete'),
    path('worklogs/update/<int:pk>/', views.WorkLogRetrieveUpdateDestroyView.as_view(), name="worklog-update"),
    path('leaves/', views.LeaveListCreateView.as_view(), name='leave-list-create'),
    path('leaves/delete/<int:pk>/', views.LeaveRetrieveUpdateDestroyView.as_view(), name='leave-delete'),
]