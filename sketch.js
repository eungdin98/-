let movers = [];
let rad = 60;
let xpos, ypos;

let xspeed = 3.8;
let yspeed = 3.2;

let xdirection = 1;
let ydirection = 1;

let G = 1;

function setup() {
  createCanvas(700, 700);
  frameRate(30);
  ellipseMode(RADIUS);
  xpos = width / 2;
  ypos = height / 2;

  for (let i = 0; i < 25; i++) {
    movers[i] = new Mover(random(width), random(height), random(0.1, 2));
  }
}

function draw() {
  background(50, 89, 100);
  
  xpos = xpos + xspeed * xdirection;
  ypos = ypos + yspeed * ydirection;

   if (xpos > width - rad || xpos < rad) {
    xdirection *= -1;
  }
  if (ypos > height - rad || ypos < rad) {
    ydirection *= -1;
  }
  
  for (let i = 0; i < movers.length; i++) {
    for (let j = 0; j < movers.length; j++) {
      if (i !== j) {
        let force = movers[j].attract(movers[i]);
        movers[i].applyForce(force);
      }
    }
    ellipse(xpos, ypos, rad, rad);
    movers[i].update();
    movers[i].display();
  }
}
class Mover {
  constructor(x, y, m) {
    this.mass = m;
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);

    this.acceleration = createVector(0, 0);
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  display() {
    stroke(0);
    strokeWeight(2);
    fill(255, 127);
    ellipse(this.position.x, this.position.y, this.mass * 16);
  }
  attract(other) {
    let force = p5.Vector.sub(this.position, other.position);
    let distance = force.mag();
    distance = constrain(distance, 1.0, 5.0);
    let strength = (G * this.mass * other.mass) / (distance * distance);
    force.setMag(strength);
    return force;
  }
}
