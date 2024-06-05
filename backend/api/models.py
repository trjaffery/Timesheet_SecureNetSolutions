from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Task(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    employee = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tasks', default='')

    def __str__(self):
        return self.title

class WorkLog(models.Model):
    employee = models.ForeignKey(User, on_delete=models.CASCADE, related_name='work_logs')
    date = models.DateField()
    start_time = models.TimeField(auto_now=False, auto_now_add=False, blank=True, null=True)
    end_time = models.TimeField(auto_now=False, auto_now_add=False, blank=True, null=True)

    def __str__(self):
        return f"{self.employee.user.username}'s log for {self.date}"

class Leave(models.Model):
    employee = models.ForeignKey(User, on_delete=models.CASCADE, related_name='leave')
    leave_type = models.CharField(max_length=100)  # PTO, Sick Leave, Volunteer Leave, etc.
    start_date = models.DateField()
    end_date = models.DateField()
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.leave_type} - {self.start_date} to {self.end_date}"