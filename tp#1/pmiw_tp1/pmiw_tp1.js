let imagen;
let c, a;
let click;

function preload() {
  imagen = loadImage("imagen3.jpg");
}

function setup() {
  createCanvas(800, 400);
  click = 0; 
}

function draw() {
  image(imagen, 0, 0, 400, 400);
  noStroke();
  
  for (let i = 0; i <= 1; i++) {
    for (let j = 0; j <= 1; j++) {
      c = 0;
      for (let k = 10; k >= 1; k--) {
        a = map(c, 0, 100, 0, 255);
        colorear(i, j);
        rect(i * 200 + 10 * (10 - k) + 400, j * 200 + 10 * (10 - k), 20 * k, 20 * k);
        c += 10;
      }
    }
  }
}

function colorear(i, j) {
  if (click === 0) {
    if (i === 0 && j === 0) {
      fill(0, a, 15);
    } else if (i === 0 && j === 1) {
      fill(a, a, 40);
    } else if (i === 1 && j === 0) {
      fill(a, 0, 13);
    } else if (i === 1 && j === 1) {
      fill(a, 0, a);
    }
  } else if (click === 1) {
    if (i === 0 && j === 0) {
      fill(a, 0, 0);
    } else if (i === 0 && j === 1) {
      fill(a, 56, a);
    } else if (i === 1 && j === 0) {
      fill(a, a, a);
    } else if (i === 1 && j === 1) {
      fill(66, 0, a);
    }
  } else if (click === 2) {
    if (i === 0 && j === 0) {
      fill(a, a, a);
    } else if (i === 0 && j === 1) {
      fill(0, 87, a);
    } else if (i === 1 && j === 0) {
      fill(0, a, 0);
    } else if (i === 1 && j === 1) {
      fill(a, a, 0);
    }
  }
}

function mousePressed() {
  click = hagoclick(click);
}

function hagoclick(c) {
  if (c === 2) {
    c = 0;
  } else {
    c++;
  }
  return c;
}
