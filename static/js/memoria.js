{% extends 'core/base.html' %}
{% load static %}

{% block title %}Jogo da Memória | Espaço das Crianças{% endblock %}

{% block content %}
<div style="max-width: 900px; margin: auto; text-align: center; padding: 20px; font-family: 'Comic Sans MS', cursive;">
    <h2 style="color: #00A859;">🧠🎉 Jogo da Memória com Animais! 🎉🧠</h2>
    <p>Encontre os pares de animais! Clique nas cartas para revelá-las.</p>

    <div id="game-board" style="display: grid; grid-template-columns: repeat(4, 100px); gap: 15px; justify-content: center; margin-top: 30px;"></div>
</div>

<style>
    .carta {
        width: 100px;
        height: 100px;
        background-color: #f0f8ff;
        border-radius: 12px;
        box-shadow: 2px 2px 10px rgba(0,0,0,0.2);
        cursor: pointer;
        background-size: cover;
        background-position: center;
        transition: transform 0.3s;
    }
    .carta.virada {
        transform: scale(1.05);
    }
</style>

<script>
    const urlBase = "{% static 'images/' %}";

    const animais = [
        'ararinha', 'onca', 'tucano', 'bicho_preguica', 'capivara', 'tamandua'
    ];
    const cartas = [...animais, ...animais]; // cria os pares
    let cartasViradas = [];
    let bloqueio = false;

    function embaralhar(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function criarCarta(nome) {
        const carta = document.createElement('div');
        carta.className = 'carta';
        carta.dataset.animal = nome;
        carta.style.backgroundImage = `url('${urlBase}back.png')`;

        carta.onclick = () => {
            if (bloqueio || carta.classList.contains('virada')) return;
            carta.style.backgroundImage = `url('${urlBase}${nome}.png')`;
            carta.classList.add('virada');
            cartasViradas.push(carta);

            if (cartasViradas.length === 2) {
                bloqueio = true;
                const [c1, c2] = cartasViradas;
                if (c1.dataset.animal === c2.dataset.animal) {
                    cartasViradas = [];
                    bloqueio = false;
                } else {
                    setTimeout(() => {
                        c1.classList.remove('virada');
                        c2.classList.remove('virada');
                        c1.style.backgroundImage = `url('${urlBase}back.png')`;
                        c2.style.backgroundImage = `url('${urlBase}back.png')`;
                        cartasViradas = [];
                        bloqueio = false;
                    }, 1000);
                }
            }
        };

        return carta;
    }

    function iniciarJogo() {
        const tabuleiro = document.getElementById('game-board');
        tabuleiro.innerHTML = '';
        embaralhar(cartas);
        cartas.forEach(nome => {
            const carta = criarCarta(nome);
            tabuleiro.appendChild(carta);
        });
    }

    document.addEventListener('DOMContentLoaded', iniciarJogo);
</script>
{% endblock %}
