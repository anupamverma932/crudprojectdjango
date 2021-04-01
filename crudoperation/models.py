from django.db import models


class Patient(models.Model):  
    pid = models.CharField(max_length=20)  
    name = models.CharField(max_length=100)  
    date_of_birth = models.DateField(max_length=100)
    gender = models.CharField(max_length=15)  
    class Meta:  
        db_table = "patients"