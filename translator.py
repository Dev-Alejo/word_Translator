import random
import json

def palabrasJson(archivo):
    with open(archivo, 'r') as archivo_json:
        palabras = json.load(archivo_json)
    return palabras

def palabraRandom(palabras):
    palabra_espanol = random.choice(list(palabras.keys()))
    traduccion_ingles = palabras[palabra_espanol]
    return palabra_espanol, traduccion_ingles

# Cargar palabras desde el archivo JSON
palabras = palabrasJson('palabras.json')

while True:
    # Seleccionar una palabra aleatoria
    palabra_espanol, traduccion_ingles = palabraRandom(palabras)

    print("Palabra en español:", palabra_espanol)

    # Solicitar la traducción al usuario
    traduccion_usuario = input('Ingresa la traducción en inglés: ')

    # Validar la traducción
    if traduccion_usuario.lower() == traduccion_ingles.lower():
        print('¡Correcta!')
    else:
        print(f"Incorrecto, la traducción es: {traduccion_ingles}")