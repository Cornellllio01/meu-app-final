from django.shortcuts import render

def home(request):
    return render(request, 'core/home.html')

def espaco_criancas(request):
    return render(request, 'core/criancas.html')  # Corrigido para 'criancas.html'

def historias(request):
    return render(request, 'core/historias.html')

def brincadeiras(request):
    return render(request, 'core/brincadeiras.html')

def animais(request):
    return render(request, 'core/animais.html')

def jogo_memoria(request):
    return render(request, 'core/jogo_memoria.html')
