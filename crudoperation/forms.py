from django import forms  
from crudoperation.models import Patient  


class PatientForm(forms.ModelForm):
    class Meta:
        model = Patient
        fields=['name', 'gender', 'date_of_birth']