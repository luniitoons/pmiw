// anahi molina vanegas comision 3
// https://youtu.be/kSP9vZVB0b4

let montanarusa, imgpiedras, belcebu; // Imágenes
let belcebusonido; // Sonido
let juego; // Instancia del juego

function preload() {
 
  montanarusa = loadImage("data/montanarusa.png");
  imgpiedras = loadImage("data/piedras.png");
  belcebu = loadImage("data/belcebu.png");


  belcebusonido = loadSound("assets/sonidobelcebu.mp3");
}

function setup() {
  createCanvas(640, 480);
  juego = new Juego(); // Crear instancia del juego
}

function draw() {
  juego.mostrar(); // lógica del juego
}

// Clase Carrito
class Carrito {
  constructor() {
    this.x = 100;
    this.y = height - 80;
    this.velY = 0;
    this.gravedad = 0.8;
    this.saltando = false;
  }

  saltar() {
    if (!this.saltando) {
      this.velY = -15;
      this.saltando = true;
    }
  }

  mover() {
    this.y += this.velY;
    this.velY += this.gravedad;

    if (this.y > height - 80) {
      this.y = height - 80;
      this.saltando = false;
    }
  }

  mostrar() {
    fill(255, 0, 0);
    rect(this.x, this.y, 60, 30, 5);
    fill(0);
    ellipse(this.x + 10, this.y + 30, 20, 20);
    ellipse(this.x + 50, this.y + 30, 20, 20);
    fill(255, 255, 0);
    rect(this.x + 15, this.y - 10, 30, 20);
  }
}

// Clase Piedras
class Piedras {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.velX = 5;
  }

  mover() {
    this.x -= this.velX;

    if (this.x < -50) {
      this.x = random(700, 1500);
    }
  }

  mostrar() {
    image(imgpiedras, this.x, this.y, 50, 50);
  }

  colision(carrito) {
    return (
      carrito.x + 60 > this.x &&
      carrito.x < this.x + 50 &&
      carrito.y + 30 > this.y &&
      carrito.y < this.y + 50
    );
  }
}

// Clase Fondo
class Fondo {
  constructor() {
    this.x = 0;
  }

  mostrar() {
    image(montanarusa, this.x, 0, width, height); // Fondo con imagen
  }
}

// Clase Juego
class Juego {
  constructor() {
    this.pantalla = "instrucciones"; // Pantalla inicial
    this.carrito = new Carrito();
    this.fondo = new Fondo();
    this.piedras = [];

    // Crear varias piedras
    for (let i = 0; i < 3; i++) {
      this.piedras.push(new Piedras(random(700, 1500), height - 100));
    }
  }

  mostrar() {
    if (this.pantalla === "instrucciones") {
      this.mostrarInstrucciones();
    } else if (this.pantalla === "juego") {
      this.jugar();
    } else if (this.pantalla === "creditos") {
      this.mostrarCreditos();
    }
  }

  mostrarInstrucciones() {
    background(0);
    textAlign(CENTER);
    textSize(24);
    fill(255, 255, 0);
    text("¡Bienvenido a la Carrera Contra belcebu!", width / 2, 100);
    text("Usa ESPACIO para saltar.", width / 2, 200);
    text("Evita las piedras para sobrevivir.", width / 2, 250);
    text("Presiona ENTER para comenzar.", width / 2, 400);
  }

  mostrarCreditos() {
    background(0);
    image(belcebu, width / 2 - 100, height / 2 - 150, 200, 300);
    textAlign(CENTER);
    textSize(24);
    fill(255, 0, 0);
    text("¡Perdiste contra belcebu!", width / 2, 100);
    text("Presiona R para reiniciar.", width / 2, 450);

    // Reproducir sonido solo una vez
    if (!belcebusonido.isPlaying()) {
      belcebusonido.play();
    }
  }

  jugar() {
    this.fondo.mostrar();
    fill(100, 200, 100);
    rect(0, height - 50, width, 50); // Suelo

    this.carrito.mover();
    this.carrito.mostrar();

    // Mostrar y mover piedras
    for (let piedra of this.piedras) {
      piedra.mover();
      piedra.mostrar();

      if (piedra.colision(this.carrito)) {
        this.pantalla = "creditos"; // Cambiar a pantalla de créditos
      }
    }
  }

  reiniciar() {
    this.carrito = new Carrito();
    this.piedras = [];
    for (let i = 0; i < 3; i++) {
      this.piedras.push(new Piedras(random(700, 1500), height - 100));
    }
    this.pantalla = "instrucciones";
  }
}

function keyPressed() {
  if (juego.pantalla === "instrucciones" && keyCode === ENTER) {
    juego.pantalla = "juego";
  } else if (juego.pantalla === "juego" && key === " ") {
    juego.carrito.saltar();
  } else if (juego.pantalla === "creditos" && key === "r") {
    juego.reiniciar();
  }
}
