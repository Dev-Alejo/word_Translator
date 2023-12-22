var palabras = ["palabra1", "palabra2", "palabra3", "palabra4", "palabra5", "palabra6", "palabra7", "palabra8", "palabra9", "palabra10", "palabra11", "palabra12", "palabra13", "palabra14", "palabra15"];
var palabraActual = '';

window.onload = function() {
    seleccionarPalabraAleatoria();
}

function seleccionarPalabraAleatoria() {
    palabraActual = palabras[Math.floor(Math.random() * palabras.length)];
    mostrarPalabra(palabraActual);
}

function mostrarPalabra(palabra) {
    var titulo = document.getElementById("word");
    titulo.innerText = palabra;
}

function verificarPalabra() {
    var inputPalabra = document.getElementById("inputWord").value.trim();
  
    if (inputPalabra === palabraActual) {
        seleccionarPalabraAleatoria();
        document.getElementById("inputWord").value = '';
    } else {
        alert("¡Palabra incorrecta! Intenta nuevamente.");
        document.getElementById("inputWord").value = '';
    }
}


