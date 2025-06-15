from django.contrib import admin
from django.urls import path
from core import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),  # raiz
    path('criancas/', views.espaco_criancas, name='espaco_criancas'),  # nome corrigido para espaco_criancas
    path('historias/', views.historias, name='historias'),
    path('brincadeiras/', views.brincadeiras, name='brincadeiras'),
    path('animais/', views.animais, name='animais'),
    path('jogo-memoria/', views.jogo_memoria, name='jogo_memoria'),
]
