let fondoImg; // Variable para la imagen de fondo
let cuadradoImg; // Variable para la imagen cuadrada
let rectangulos = []; // Arreglo de rectángulos
let rectanguloInicial; // Rectángulo inicial en la esquina superior izquierda
let cuadroTexto; // Cuadro de texto con forma de rectángulo

// Textos personalizables para cada tarea
let textoPersonalizable1 = "Lluvia Desenfrenada en Hokkaido";
let textoPersonalizable2 = "Cuerpos Victimas del Efecto Tensor";
let textoPersonalizable3 = "Timbres Sensibles al Toque";
let textoPersonalizable4 = "Danza de Gotas a Copos";
let textoPersonalizable5 = "Ballet de Gusanos Interactivos";
let textoPersonalizable6 = "Armonía de Partículas en Sintonía";
let textoPersonalizable7 = "Ruido Colorido en Interacción Circular";

function preload() {
  fondoImg = loadImage('negro.png'); // Carga tu imagen de fondo
  cuadradoImg = loadImage('gef.gif'); // Carga tu imagen cuadrada
  // Reemplaza 'tu_imagen.jpg' con la ruta de tu imagen cuadrada
}

function setup() {
  createCanvas(2000, 800); // Establece el tamaño del lienzo (ancho x alto)

  // Crea el rectángulo inicial en la esquina superior izquierda
  rectanguloInicial = new RectanguloInicial(0, 0); // Cambio en la posición inicial

  // Crea una instancia de CuadradoImagen
  cuadrado = new CuadradoImagen(650, 80, 700, 700); // Cambia la posición, ancho y alto según tus necesidades

  // Crea el cuadro de texto encima de la imagen
  cuadroTexto = new CuadroTexto(90, 120, 500, 620, "¡Hola! Mi nombre es Dominique Carvajal González, actualmente me encuentro cursando el segundo semestre de mi primer año en la carrera de diseño. A un costado, se presenta una recopilación de tareas realizadas en el marco de la asignatura Imagen Escrita, el cual comprende la relación entre el diseño y el lenguaje informático básico.                                                                                                                                                                                                  He tenido la oportunidad de adentrarme en la creación de páginas web utilizando herramientas fundamentales como p5.js y GitHub, explorando el potencial creativo que ofrece la programación básica con el diseño, buscando fusionar la estética visual con la tecnología. En el desarrollo de las tareas, se utilizo como apoyo educativo, la utilización de inteligencia artificial, ChatGPT, buscando la integración de este medio como herramienta fundamental en la actualidad.                                                                                                                                                                                                         A través de este portafolio, compartiré los proyectos y experiencias que he desarrollado hasta ahora, desde la conceptualización de ideas hasta la implementación de páginas web interactivas,¡Bienvenido a mi mundo creativo que dio vida a experiencias visuales únicas!");
  // Cambia la posición, ancho, alto y texto según tus 6

  // Crea los rectángulos en ubicaciones fijas
  let ubicacionesFijas = [
    { x: 1500, y: 70, url: 'https://dominiquecarvajal.github.io/imagenescrita23-dominiquecarvajal/', nombre: 'Tarea 1' },
    { x: 1500, y: 250, url: 'https://dominiquecarvajal.github.io/imagen-escrita-tarea2-23/', nombre: 'Tarea 2' },
    { x: 1500, y: 425, url: 'https://dominiquecarvajal.github.io/tarea3-ie23-dominiquecarvajal/', nombre: 'Tarea 3' },
    { x: 1500, y: 610, url: 'https://dominiquecarvajal.github.io/Tarea4-IE23-DominiqueCG/', nombre: 'Tarea 4' },
    { x: 1700, y: 170, url: 'https://dominiquecarvajal.github.io/Tarea-5-IE-DC/', nombre: 'Tarea 5' },
    { x: 1700, y: 340, url: 'https://dominiquecarvajal.github.io/Tarea-6-IE-DC/', nombre: 'Tarea 6' },
    { x: 1700, y: 510, url: 'https://dominiquecarvajal.github.io/TAREA-7-IE-DC/', nombre: 'Tarea 7' }
  ];

  for (let i = 0; i < ubicacionesFijas.length; i++) {
    let ubicacion = ubicacionesFijas[i];
    let lado = 150; // Establece el tamaño de los rectángulos (puedes cambiarlo)
    let extensionDirection = ubicacion.x === 1500 ? -1 : 1; // Determina la dirección de la extensión
    let textoPersonalizable = eval(`textoPersonalizable${i + 1}`);
    let rectangulo = new Rectangulo(ubicacion.x, ubicacion.y, lado, ubicacion.nombre, ubicacion.url, extensionDirection, textoPersonalizable);
    rectangulos.push(rectangulo);
  }
}

function draw() {
  background(fondoImg); // Establece la imagen de fondo

  // Dibuja el rectángulo inicial
  rectanguloInicial.mostrar();

  // Dibuja el cuadro de texto
  cuadroTexto.mostrar();

  // Dibuja los rectángulos
  for (let i = 0; i < rectangulos.length; i++) {
    rectangulos[i].mostrar();
    rectangulos[i].interactuar(mouseX, mouseY);
  }

  // Dibuja la imagen cuadrada
  cuadrado.mostrar();
}

function mousePressed() {
  for (let i = 0; i < rectangulos.length; i++) {
    if (rectangulos[i].seleccionado) {
      window.open(rectangulos[i].url, '_blank');
    }
  }
}

class Rectangulo {
  constructor(x, y, lado, nombre, url, extensionDirection, textoInicial) {
    this.x = x;
    this.y = y;
    this.ancho = lado;
    this.alto = lado;
    this.expandir = false;
    this.nombre = nombre; // Texto inicial
    this.url = url;
    this.seleccionado = false;
    this.extensionSize = 0;
    this.extensionDirection = extensionDirection;

    // Nuevo: Texto personalizable
    this.textoPersonalizable = textoInicial;
  }

  mostrar() {
    fill(100);
    stroke(255);
    let xPosition = this.extensionDirection === 1 ? this.x : this.x - this.extensionSize;
    rect(xPosition, this.y, this.ancho + this.extensionSize, this.alto);

    // Muestra el nombre siempre y el texto personalizable solo cuando el rectángulo se expande
    textAlign(CENTER, CENTER);
    textSize(16);
    fill(255);
    text(this.nombre, xPosition + (this.ancho + this.extensionSize) / 2, this.y + 20);
    
    if (this.expandir) {
      text(this.textoPersonalizable || this.nombre, xPosition + (this.ancho + this.extensionSize) / 2, this.y + this.alto / 2);
    }
  }

  interactuar(mx, my) {
    // Verifica si el mouse está sobre este rectángulo
    let xStart = this.extensionDirection === 1 ? this.x : this.x - this.extensionSize;
    if (mx > xStart && mx < xStart + this.ancho + this.extensionSize && my > this.y && my < this.y + this.alto) {
      this.expandir = true;
      this.seleccionado = true;
    } else {
      this.expandir = false;
      this.seleccionado = false;
    }

    // Ajusta el ancho de la extensión en función de si se debe expandir o no
    if (this.expandir) {
      this.extensionSize = lerp(this.extensionSize, 150, 0.1);
      this.extensionSize = constrain(this.extensionSize, 0, width - xStart); // Evitar que se salga del lienzo
    } else {
      this.extensionSize = lerp(this.extensionSize, 0, 0.1);
    }
  }

  // Nuevo método para actualizar el texto personalizable
  actualizarTexto(nuevoTexto) {
    this.textoPersonalizable = nuevoTexto;
  }
}

class RectanguloInicial {
  constructor(x, y) {
    this.x = x;
    this.y = 0; // Cambio en la posición inicial
    this.ancho = 0; // Ancho inicial
    this.alto = 60; // Altura fija
    this.velocidad = 2; // Velocidad de expansión
    this.texto = "➣ PORTAFOLIO DE DOMINIQUE CARVAJAL GONZALEZ "; // Texto a mostrar
    this.franjaExtendida = false; // Variable para controlar el estado de la franja
  }

  mostrar() {
    fill(100);
    stroke(255);

    if (!this.franjaExtendida) {
      if (this.ancho < width) {
        rect(this.x, this.y, this.ancho, this.alto);
        this.ancho += this.velocidad;
      } else {
        this.franjaExtendida = true; // Cambia el estado de la franja cuando llega al otro extremo
      }
    } else {
      rect(this.x, this.y, width - this.x, this.alto); // Mantiene la franja extendida
    }

    if (this.franjaExtendida) {
      textAlign(CENTER, CENTER);
      textSize(16);
      fill(255);
      text(this.texto, this.x + (width - this.x) / 2, this.y + this.alto / 2);
    }
  }
}

class CuadradoImagen {
  constructor(x, y, ancho, alto) {
    this.x = x;
    this.y = y;
    this.ancho = ancho; // Ancho del cuadrado de imagen
    this.alto = alto; // Alto del cuadrado de imagen
  }

  mostrar() {
    image(cuadradoImg, this.x, this.y, this.ancho, this.alto);
  }
}

class CuadroTexto {
  constructor(x, y, ancho, alto, texto) {
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
    this.texto = texto;
    this.margen = 20; // Puedes ajustar el margen según tus necesidades
    this.tamañoTexto = 19; // Ajusta el tamaño de la letra
  }

  mostrar() {
    fill(100);
    stroke(255);
    rect(this.x, this.y, this.ancho, this.alto);

    textAlign(LEFT, TOP); // Alinea el texto a la izquierda y arriba

    fill(255);
    textSize(this.tamañoTexto);

    // Divide el texto en líneas basadas en el ancho y alto del cuadro
    let lineas = this.texto.split('\n');
    let yActual = this.y + this.margen; // Inicia en la posición y con el margen

    for (let i = 0; i < lineas.length; i++) {
      let palabras = lineas[i].split(' ');
      let textoLinea = '';
      let xInicio = this.x + this.margen;

      for (let j = 0; j < palabras.length; j++) {
        let palabra = palabras[j];
        let medidaTexto = textWidth(textoLinea + palabra + ' ');

        // Si la palabra cabe en la línea actual, agrégala
        if (medidaTexto <= this.ancho - this.margen * 2) {
          textoLinea += palabra + ' ';
        } else {
          // Dibuja la línea actual justificada
          this.dibujarLineaJustificada(textoLinea.trim(), xInicio, yActual);

          yActual += this.tamañoTexto + 2; // Puedes ajustar el espaciado entre líneas según tus necesidades
          textoLinea = palabra + ' ';
          xInicio = this.x + this.margen;
        }
      }

      // Dibuja la última línea de la sección actual
      this.dibujarLineaJustificada(textoLinea.trim(), xInicio, yActual);
      yActual += this.tamañoTexto + 2; // Puedes ajustar el espaciado entre líneas según tus necesidades
    }
  }

  // Nuevo método para dibujar una línea justificada
  dibujarLineaJustificada(textoLinea, xInicio, y) {
    let espacioEntrePalabras = (this.ancho - this.margen * 2 - textWidth(textoLinea)) / (textoLinea.split(' ').length - 1);

    let palabrasEnLinea = textoLinea.split(' ');
    for (let k = 0; k < palabrasEnLinea.length; k++) {
      text(palabrasEnLinea[k], xInicio, y);
      xInicio += textWidth(palabrasEnLinea[k] + ' ') + espacioEntrePalabras;

    }
  }
}