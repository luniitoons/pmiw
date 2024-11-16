//anahi molina vanegas 93609/9
//https://youtu.be/DGXAL0vurKc

let pantallaAncho = 640;
let pantallaAlto = 480;

let sonido = [];
let imagen = [];
let texto = [];


let pantallaActual = 0;
let pantallas = [0, 1, 2, 3, 4, 5, 6, 11, 12, 13, 21, 22, 23, 24, 25, 26, 27, 31, 100];
let pantallaDec = [1, 2, 5, 11, 13, 24];
let pantallaSonido = [6, 26, 27];
let botonActivo=false;

function preload() {
  sonido[6] = loadSound('assets/sonido0.mp3');
  sonido[26] = loadSound('assets/sonidobelcebu.mp3');
  sonido[27] = loadSound('assets/sonidobosque.mp3');

  for (i=0; i <= pantallas.length; i++)
  {
    if (pantallas.includes(i)) {
      imagen[i] = loadImage("pantallas/pantalla_"+nf(i, 2)+".png");
    }
    imagen[100] = loadImage("pantallas/pantalla_100.png");
    imagen[31] = loadImage("pantallas/pantalla_31.png");

  }
  
      for (i=21; i <= 27; i++) {
      imagen[i] = loadImage("pantallas/pantalla_"+i+".png");
    }

  texto = loadStrings('assets/texto.txt');
}

function setup() {
  createCanvas(640, 480);
}

function draw() {

  background(200);


  ControlImagen();
  
    botonActivo = false;
}
function ControlImagen()
{
  image(imagen[pantallaActual], 0, 0, 640, 480);
  CargarTexto();

  if (pantallaDec.includes(pantallaActual)) {
    DibujarBotonDecisiones()
  } else {
    DibujarBotonSiguiente();
  }


  if (pantallaSonido.includes(pantallaActual)) {
    botonSonido();
  }
}
function CargarTexto() {
  if (pantallaActual < texto.length) {
    let colorTexto = 255;
    let colorFondo = color(0, 0, 0, 150);

    textSize(20);
    textAlign(LEFT, TOP);

    let alturaLinea = 24;
    let posicionX = 20;
    let posicionY = 50;
    let textoActual = texto[pantallaActual];


    let palabras = textoActual.split(" ");
    let lineaTemporal = "";
    let lineasFinales = [];
    let anchoMaximo = 0;


    for (let i = 0; i < palabras.length; i++) {
      let pruebaLinea = lineaTemporal + palabras[i] + " ";
      let anchoPrueba = textWidth(pruebaLinea);

      if (anchoPrueba > 560 - posicionX * 2) {
        lineasFinales.push(lineaTemporal);
        anchoMaximo = max(anchoMaximo, textWidth(lineaTemporal));
        lineaTemporal = palabras[i] + " ";
        posicionY += alturaLinea;
      } else {
        lineaTemporal = pruebaLinea;
      }
    }
    lineasFinales.push(lineaTemporal);
    anchoMaximo = max(anchoMaximo, textWidth(lineaTemporal));


    let alturaFondo = lineasFinales.length * alturaLinea;
    fill(colorFondo);
    rect(posicionX - 5, 50 - 5, anchoMaximo + 10, alturaFondo + 10, 10);


    fill(colorTexto);
    posicionY = 50;
    for (let i = 0; i < lineasFinales.length; i++) {
      text(lineasFinales[i], posicionX, posicionY);
      posicionY += alturaLinea;
    }
  }
}


function DibujarBotonSiguiente()
{
  fill(150, 0, 0, 100);
  rect(pantallaAncho-80, 0, 80, 480);
  triangle(580, 210, 580, 270, 620, 240);
}

function DibujarBotonDecisiones()
{
  fill(0, 0, 0, 100);
  rect(0, 400, 320, 80);

  fill(0, 0, 0, 100);
  rect(320, 400, 320, 80);


  textAlign(CENTER, CENTER);
  fill(240);
  //boton izquierdo
  if (pantallaActual === 1) {
    text('elegir otro personaje', 120, 440);
  } else {
    if (pantallaActual === 2) {
      text('si', 120, 440);
    } else {
      if (pantallaActual === 5) {
        text('NO sacrificarse', 120, 440);
      } else {
        if (pantallaActual === 11) {
          text('No salvar', 120, 440);
        } else {
          if (pantallaActual === 13) {
            text('no sacrificarse y vivir', 120, 440);
          } else {
            if (pantallaActual === 24) {
              text('quedarse en la biblioteca', 120, 440);
            }
          }
        }
      }
    }
  }
  //boton derecho

  if (pantallaActual === 1) {
    text('bajarse ', 450, 440);
  } else {
    if (pantallaActual === 2) {
      text('no', 450, 440);
    } else {
      if (pantallaActual === 5) {
        text('sacrificarse', 450, 440);
      } else {
        if (pantallaActual === 11) {
          text('salvar a Wendy', 450, 440);
        } else {
          if (pantallaActual === 13) {
            text('Sacrificarse', 450, 440);
          } else {
            if (pantallaActual === 24) {
              text('ir por el bosque', 450, 440);
            }
          }
        }
      }
    }
  }
}

function botonSonido() {
  fill(255);
  text("Reproducir Sonido", 10, 180)
    textAlign(CENTER, CENTER);
  fill(150);
  if ((mouseX >= 50 && mouseX <= 100 && mouseY >= 200 && mouseY <= 250)) {
    fill(180);
  }
  rect(50, 200, 50, 50);
}

function mousePressed() {
  if (!botonActivo) {
    botonActivo = true;

    if (pantallaSonido.includes(pantallaActual) && sonido[pantallaActual].isPlaying()) {
      sonido[pantallaActual].stop();
    }

    if (pantallaDec.includes(pantallaActual)) {
      ClickBotonDecisiones();
    } else {
      if (mouseX <= 640 && mouseX >= 560 && mouseY <= 480 && mouseY >= 0) {
        if (pantallaActual !== 100) {
          pantallaActual = (pantallaActual === 6 || pantallaActual === 27 || pantallaActual === 31) ? 100 : pantallaActual + 1;
        } else {
          pantallaActual = 0;
        }
      }
    }

    if (pantallaSonido.includes(pantallaActual) && (mouseX >= 50 && mouseX <= 100 && mouseY >= 200 && mouseY <= 250)) {
      playSonido();
    }
  }
}



function playSonido() {
  sonido[pantallaActual].play();
  console.log("repro");
}

function ClickBotonDecisiones()
{
  //boton izquierdo
  if (mouseX >= 0 && mouseX <= 320 && mouseY >= 400 && mouseY <= 480)
  {
    if (pantallaActual === 1) {
      pantallaActual = 11 ;
    } else {
      if (pantallaActual === 2) {
        pantallaActual = 21 ;
      } else {
        if (pantallaActual === 5) {
          pantallaActual = 100 ;
        } else {
          if (pantallaActual === 11) {
            pantallaActual = 100 ;
          } else {
            if (pantallaActual === 13) {
              pantallaActual = 100 ;
            } else {
              if (pantallaActual === 24) {
                pantallaActual = 31 ;
              }
            }
          }
        }
      }
    }
  }
  //boton derecho
  if (mouseX >= 320 && mouseX <= 640 && mouseY >= 400 && mouseY <= 480)
  {
    if (pantallaActual === 1) {
      pantallaActual = 2;
    } else {
      if (pantallaActual === 2) {
        pantallaActual = 3 ;
      } else {
        if (pantallaActual === 5) {
          pantallaActual = 6 ;
        } else {
          if (pantallaActual === 11) {
            pantallaActual = 12 ;
          } else {
            if (pantallaActual === 13) {
              pantallaActual = 1 ;
            } else {
              if (pantallaActual === 24) {
                pantallaActual = 25 ;
              }
            }
          }
        }
      }
    }
  }
}
