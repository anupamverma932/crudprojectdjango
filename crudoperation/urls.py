from django.urls import path
from . import views


urlpatterns = [
    path('', views.index, name='index'),
    path('add', views.create, name='crudoperation.add'),
    path('save', views.store, name='crudoperation.save'),
    path('update', views.update, name='crudoperation.update'),
    path('view/<int:id>/', views.show, name='crudoperation.view'),
    path('delete/<int:id>/', views.delete, name="crudoperation.delete"),

]