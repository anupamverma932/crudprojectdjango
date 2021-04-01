from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from crudoperation.models import Patient
from crudoperation.forms import PatientForm  


def index(request):
    patients=Patient.objects.all()
    return render(request, 'index.html', {'patients':patients})
    

def create(request):
    return render(request, 'create.html')


def store(request):
    if request.method == "POST":  
        form = PatientForm(request.POST)
        if form.is_valid():  
            try:  
                form.save()
                patients=Patient.objects.all()
                return render(request, 'index.html', {'patients':patients})
            except Exception as e:  
                print(str(e))

    return render(request, 'create.html')


def show(request, id):
    patients=Patient.objects.get(pk=id)
    return render(request, 'show.html', {'patient':patients})


def update(request):
    id=int(request.POST.get('id'))
    patient = Patient.objects.get(id=id)  
    print(patient)
    form = PatientForm(request.POST, instance = patient)  
    if form.is_valid():  
        form.save()  
    return render(request, 'show.html', {'patient': patient})  


def delete(request, id):
    patient = Patient.objects.filter(pk=id).delete()
    patients=Patient.objects.all()
    return render(request, 'index.html', {'patients':patients})
    