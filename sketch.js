let x_centro = 150;
let y_centro = 200;
let radio = 100;
let reloj_la_paz
let reloj_mx
let reloj_esp
let timeInput

function setup() {
  createCanvas(750, 400);
  timeInput = createInput();
  timeInput.position(x_centro - 45, 320);
  timeInput.attribute('type', 'time');

  reloj_la_paz = new Circle(x_centro, y_centro, radio)
  reloj_mx = new Circle(x_centro + 218, y_centro, radio)
  reloj_esp = new Circle(x_centro + 438, y_centro, radio)

}

function draw() {
  background(10, 120, 100);

  reloj_la_paz.show()
  reloj_mx.show()
  reloj_esp.show()

  let hrInput = timeInput.value();

  // let _horas = parseInt(hrInput.split(":")[0]);
  // let _minutos = parseInt(hrInput.split(":")[1]);
  //  let _segundos = second();

  //if(_segundos==60){ _minutos++}


  //let mines = parseInt(horaActual.split(":")[0]);

  let horas = hour();
  let minutos = minute();
  let segundos = second();

  reloj_la_paz.punto_pend(horas, minutos, segundos)
  reloj_mx.dda(horas + 1, minutos, segundos)
  //reloj_esp.bre(horas + 1, minutos, segundos)


  text("La Paz", x_centro, 370)
  text("Mexico", x_centro + 230, 370)

  textSize(30)
  fill(0)
  textAlign(CENTER, CENTER)
}

class Circle {

  constructor(x, y, r) {
    this.x_centro = x;
    this.y_centro = y;
    this.radio = r;
  }
  show() {
    let x = 0;
    let y = this.radio;
    let p = 1 - this.radio;


    while (x <= y) {
      point(this.x_centro + x, this.y_centro + y);
      point(this.x_centro + y, this.y_centro + x);
      point(this.x_centro + y, this.y_centro - x);
      point(this.x_centro + x, this.y_centro - y);
      point(this.x_centro - x, this.y_centro - y);
      point(this.x_centro - y, this.y_centro - x);
      point(this.x_centro - y, this.y_centro + x);
      point(this.x_centro - x, this.y_centro + y);

      x++;

      if (p < 0) {
        p += 2 * x + 1;
      } else {
        y--;
        p += 2 * (x - y) + 1;
      }
    }

    textSize(12);
    textAlign(CENTER, CENTER);
    for (let i = 1; i <= 12; i++) {
      let angulo = map(i, 0, 12, 0, TWO_PI) - HALF_PI;
      let x_num = this.x_centro + cos(angulo) * (this.radio - 20);
      let y_num = this.y_centro + sin(angulo) * (this.radio - 20);
      text(i, x_num, y_num);
    }
  }

  punto_pend(hr, min, seg) {

    let horas = hr;
    let minutos = min;
    let segundos = seg;


    strokeWeight(2)
    let anguloHoras = map(horas % 12, 0, 12, 0, TWO_PI) - HALF_PI;
    let x_horas = x_centro + cos(anguloHoras) * radio * 0.5;
    let y_horas = y_centro + sin(anguloHoras) * radio * 0.5;
    line(x_centro, y_centro, x_horas, y_horas);

    let anguloMinutos = map(minutos, 0, 60, 0, TWO_PI) - HALF_PI;
    let x_minutos = x_centro + cos(anguloMinutos) * radio * 0.8;
    let y_minutos = y_centro + sin(anguloMinutos) * radio * 0.8;
    line(x_centro, y_centro, x_minutos, y_minutos);


    let anguloSegundos = map(segundos, 0, 60, 0, TWO_PI) - HALF_PI;
    let x_segundos = x_centro + cos(anguloSegundos) * radio * 0.9;
    let y_segundos = y_centro + sin(anguloSegundos) * radio * 0.9;
    line(x_centro, y_centro, x_segundos, y_segundos, strokeWeight(1));

  }



  dda(hr, min, seg) {
    let anguloHoras = map(hr % 12, 0, 12, 0, TWO_PI) - HALF_PI;
    let anguloMinutos = map(min, 0, 60, 0, TWO_PI) - HALF_PI;
    let anguloSegundos = map(seg, 0, 60, 0, TWO_PI) - HALF_PI;

    this.dibujarManecillaDDa(anguloHoras, this.radio * 0.5, 2);
    this.dibujarManecillaDDa(anguloMinutos, this.radio * 0.8, 2);
    this.dibujarManecillaDDa(anguloSegundos, this.radio * 0.9, 1);
  }

  dibujarManecillaDDa(angulo, longitud, grosor) {
    strokeWeight(grosor);
    let x_final = this.x_centro + cos(angulo) * longitud;
    let y_final = this.y_centro + sin(angulo) * longitud;

    let x1 = this.x_centro;
    let y1 = this.y_centro;
    let x2 = x_final;
    let y2 = y_final;

    let dx = x2 - x1;
    let dy = y2 - y1;


    let steps = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy);


    let incrementX = dx / steps;
    let incrementY = dy / steps;

    for (let i = 0; i < steps; i++) {
      point(x1, y1);
      x1 += incrementX;
      y1 += incrementY;
    }
  }

  bre(hr, min, seg) {

    let anguloHoras = map(hr % 12, 0, 12, 0, TWO_PI) - HALF_PI;
    let anguloMinutos = map(min, 0, 60, 0, TWO_PI) - HALF_PI;
    let anguloSegundos = map(seg, 0, 60, 0, TWO_PI) - HALF_PI;

    this.drawBre(anguloHoras, this.radio * 0.5, 2);
    this.drawBre(anguloMinutos, this.radio * 0.8, 2);
    this.drawBre(anguloSegundos, this.radio * 0.9, 2);

  }


  //   drawBre(angulo, longitud, grosor) {
  //     strokeWeight(grosor);
  //     let x_final = this.x_centro + cos(angulo) * longitud;
  //     let y_final = this.y_centro + sin(angulo) * longitud;

  //     let x = this.x_centro;
  //     let y = this.y_centro;
  //     let dx = Math.abs(x_final - x);
  //     let dy = Math.abs(y_final - y);
  //     let sx = (x < x_final) ? 1 : -1;
  //     let sy = (y < y_final) ? 1 : -1;
  //     let err = dx - dy;

  //     while (true) {
  //         point(x, y);

  //         if (x === x_final && y === y_final) break;

  //         let e2 = 2 * err;
  //         if (e2 > -dy) { 
  //             err -= dy; 
  //             x += sx; 
  //         }
  //         if (e2 < dx) { 
  //             err += dx; 
  //             y += sy; 
  //         }
  //     }
  // }






}













