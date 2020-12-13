let angle = 0;
var cap;
var direction = true;
var i = 0;

class Stamp {
  constructor(img, z = false, x = img.width, y = img.height) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.z = z;
  }
  show() {
    push();
    this.x = this.x * scaleSlider.value() * 0.01;
    this.y = this.y * scaleSlider.value() * 0.01;
    if (jitterSlider.value() != 0) {
      translate(mouseX +
        (random(-jitterSlider.value(), jitterSlider.value())),
        mouseY +
        (random(-jitterSlider.value(), jitterSlider.value())));
    } else {
      translate(mouseX, mouseY);
    }
    rotate(angle);
    if (this.z == true) {
      tint(0, 0, 0, 50);
      image(this.img,
        (0 - (this.x / 2)) + 10,
        (0 - (this.y / 2)) + 10,
        this.x,
        this.y);
    }
    tint(redSlider.value(),
      greenSlider.value(),
      blueSlider.value(),
      alphaSlider.value());

    if (gradR == true) {
      for (let i = 0; i < 30; i++) {
        image(this.img, i - (this.x / 2), i - (this.y / 2), this.x - (i * 2), this.y - (i * 2));
        tint(
          redSlider.value() + (i * 7),
          greenSlider.value() + (i * 7),
          blueSlider.value() + (i * 7),
          alphaSlider.value());
      }
    } else {
      image(this.img,
        (0 - (this.x / 2)),
        (0 - (this.y / 2)),
        this.x,
        this.y);
    }
    angle = angle + (spinSlider.value() * 0.01);
    translate(0, 0);
    pop();
  }
}

class SquareBrush {
  constructor(x, y = false, z = false) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  show() {
    push();
    fill(color(
      redSlider.value(),
      greenSlider.value(),
      blueSlider.value(),
      alphaSlider.value()));
    noStroke();
    if (jitterSlider.value() != 0) {
      translate(mouseX +
        (random(-jitterSlider.value(), jitterSlider.value())),
        mouseY +
        (random(-jitterSlider.value(), jitterSlider.value())));
    } else {
      translate(mouseX, mouseY);
    }
    rotate(angle);
    if (this.z == true) {
      fill(0, 10);
      rect(0 - (this.x / 2) + 10,
        0 - (this.x / 2) + 10,
        this.x,
        this.x, 2);
      fill(color(
        redSlider.value(),
        greenSlider.value(),
        blueSlider.value(),
        alphaSlider.value()));
    }
    if (gradR == true) {
      for (let i = 0; i < 30; i++) {
        rect(i - (this.x / 2), i - (this.x / 2), this.x - (i * 2));
        fill(color(
          redSlider.value() + (i * 7),
          greenSlider.value() + (i * 7),
          blueSlider.value() + (i * 7),
          alphaSlider.value()));
      }
    } else {
      rect(0 - (this.x / 2),
        0 - (this.x / 2),
        this.x,
        this.x);
    }
    translate(0, 0);
    angle = angle + (spinSlider.value() * 0.01);
    pop();
  }
}

class PencilBrush {
  constructor(x, y = false, z = false) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  show() {

    if (this.z == true) {
      stroke(0, 10);
      strokeWeight(this.x);
      line(mouseX + 10, mouseY + 10, pmouseX + 10, pmouseY + 10)
      strokeWeight(1);
      stroke(0);
    }

    if (gradR == true) {
      for (let i = 0; i < 30; i++) {
        strokeWeight(this.x - (i * 2));
        stroke(
          redSlider.value() + (i * 7),
          greenSlider.value() + (i * 7),
          blueSlider.value() + (i * 7),
          alphaSlider.value());
        line(mouseX, mouseY, pmouseX, pmouseY);
        strokeWeight(1);
        stroke(0);
      }
    } else {
      strokeWeight(this.x);
      stroke(redSlider.value(),
        greenSlider.value(),
        blueSlider.value(),
        alphaSlider.value());
      line(mouseX, mouseY, pmouseX, pmouseY)
      strokeWeight(1);
      stroke(0);
    }


  }
}
class CircleBrush {
  constructor(x, y = false, z = false) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  show() {
    push();
    fill(color(
      redSlider.value(),
      greenSlider.value(),
      blueSlider.value(),
      alphaSlider.value()));
    noStroke();
    if (jitterSlider.value() != 0) {
      translate(mouseX +
        (random(-jitterSlider.value(), jitterSlider.value())),
        mouseY +
        (random(-jitterSlider.value(), jitterSlider.value())));
    } else {
      translate(mouseX, mouseY);
    }
    rotate(angle);
    if (this.z == true) {
      fill(0, 10);
      ellipse(10, 10, this.x);
      fill(color(
        redSlider.value(),
        greenSlider.value(),
        blueSlider.value(),
        alphaSlider.value()));
    }
    //
    if (this.y == true) {
      fill(255, 50);
      ellipse(0, 0, this.x - 10)
      fill(255, 255);
    }

    if (gradR == true) {
      for (let i = 0; i < 30; i++) {
        ellipse(0, 0, this.x - (i * 2));
        fill(color(
          redSlider.value() + (i * 7),
          greenSlider.value() + (i * 7),
          blueSlider.value() + (i * 7),
          alphaSlider.value()));
      }
    } else {
      ellipse(0, 0, this.x);
    }

    translate(0, 0);
    angle = angle + (spinSlider.value() * 0.01);
    pop();

  }
}

class tenPrint {
  constructor(x, z = false) {
    this.x = x;
    this.z = z;
  }
  show() {
    let sW = random(1, 30);
    strokeWeight(sW);
    if (this.z == true) {
      push();
      translate(10, 10);
      stroke(0, 10);
      for (let y = 0; y < height; y += this.x) {
        for (let x = 0; x < width; x += this.x) {
          if (random(1) > 0.5) {
            line(x, y, x + this.x, y + this.x);
          } else {
            line(x, y + this.x, x + this.x, y);
          }
        }
      }
      pop();
    }
    stroke(redSlider.value(),
      greenSlider.value(),
      blueSlider.value(),
      alphaSlider.value());
    for (let y = 0; y < height; y += this.x) {
      for (let x = 0; x < width; x += this.x) {
        if (random(1) > 0.5) {
          line(x, y, x + this.x, y + this.x);
        } else {
          line(x, y + this.x, x + this.x, y);
        }
      }
    }
    strokeWeight(1);
    stroke(0);
  }
}

class FogBrush {
  show() {
    let artboardGrab = get(
      b, b * 2, wW - pW - (b * 2), wH - (b * 3));
    tint(255, 20);
    push();
    translate(b, (b * 2));
    let blur = (1 * (scaleSlider.value() * 0.02)); // blur value
    image(artboardGrab, -blur, 0);
    image(artboardGrab, 0, -blur);
    image(artboardGrab, blur, 0);
    image(artboardGrab, 0, blur);
    pop();
    noTint();
  }
}

class TxBrush {
  show() {
    tint(redSlider.value(), greenSlider.value(), blueSlider.value(), 10);
    image(txRand, b, b * 2);
  }
}

class VideoBrush {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  show() {

    let vidX = 400;
    let vidY = 300;
    vidX = vidX * (scaleSlider.value() * 0.02)
    vidY = vidY * (scaleSlider.value() * 0.02)
    noStroke();
    fill(redSlider.value() * 1.3,
      greenSlider.value() * 1.3,
      blueSlider.value() * 1.3,
      alphaSlider.value() * 1.3);
    if (videoR == 1) {
      let vidX = 400;
      let vidY = 300;

      maskGraphic.circle(200, 150, 25 + (scaleSlider.value() * 0.75));
      video.mask(maskGraphic);

      image(video, mouseX - (vidX / 2), mouseY - (vidY / 2), vidX, vidY);

      noTint();
      maskGraphic.clear();
    } else if (videoR == 2) {
      video.loadPixels();
      rect(mouseX - (video.width / 2), (mouseY - (video.height / 2)), 405, 300);
      fill(redSlider.value(),
        greenSlider.value(),
        blueSlider.value(),
        alphaSlider.value());
      for (var cy = 0; cy < video.height; cy += 10) {
        for (var cx = 0; cx < video.width; cx += 5) {
          var offset = ((cy * video.width) + cx) * 4;
          var xpos = (cx / video.width * video.width) + (mouseX - (video.width / 2));
          var ypos = (cy / video.height * video.height) + (mouseY - (video.height / 2));
          rect(xpos, ypos, 10, 10 * (video.pixels[offset + 1] / 255));
        }
      }
    } else if (videoR == 3) {

      tint(redSlider.value(),
        greenSlider.value(),
        blueSlider.value(),
        alphaSlider.value());
      image(video, mouseX - (vidX / 2), mouseY - (vidY / 2), vidX, vidY);
      noTint();
    }
    strokeWeight(1);
    stroke(0);


  }
}

class EmojiBrush {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  show() {
    push();

    let pg = createGraphics(512, 512);

    let w = 512;
    let y = 512;
    translate(mouseX, mouseY);
    pg.translate(256, 256);

    // head
    let randomColor = [redSlider.value(), greenSlider.value(),
      blueSlider.value()
    ]
    pg.fill(randomColor[0], randomColor[1], randomColor[2], alphaSlider.value());
    pg.noStroke();

    let headWidth = w - random(40, 250);
    let headHeight = w - 50;
    let step = headWidth / 5;
    for (let h = 0; h < step; h++) {
      pg.fill(randomColor[0] + (h * 3), randomColor[1] + (h * 3), randomColor[2] + (h * 3), alphaSlider.value());

      pg.ellipse(0, 0, headWidth - (1 / step * headWidth * h), headHeight - (1 / step * headWidth * h));

    }


    // eyes
    let eyeHeight = random(-106, -10);
    let eyeSpacing = random(20, 120);
    let eyeWidth = random(50, 150);
    let eyeTall = eyeWidth + random(10, 30);

    // rColor();
    pg.fill(randomColor);
    pg.noStroke();
    step = eyeWidth / 5;

    for (let i = 0; i < step; i++) {
      pg.fill(randomColor[0] + (i * 3), randomColor[1] + (i * 3), randomColor[2] + (i * 3), alphaSlider.value())
      pg.ellipse(-eyeSpacing, eyeHeight, eyeWidth - (1 / step * eyeWidth * i), eyeTall - (1 / step * eyeWidth * i));
      pg.ellipse(eyeSpacing, eyeHeight, eyeWidth - (1 / step * eyeWidth * i), eyeTall - (1 / step * eyeWidth * i));
    }

    //pupils
    let pupilSize = random(2, 5);
    let pupilWidth = (eyeWidth / pupilSize);
    let pupilTall = (eyeTall / pupilSize);
    let pupilLocY = random(-30, 30);
    let pupilLocX = random(-20, 20);

    step = pupilWidth / 5;
    //rColor();
    pg.fill(randomColor);
    for (let p = 0; p < step; p++) {
      pg.fill(randomColor[0] - (p * 40), randomColor[1] - (p * 40), randomColor[2] - (p * 40))

      pg.ellipse(-eyeSpacing + pupilLocX, eyeHeight - pupilLocY, pupilWidth - (1 / step * pupilWidth * p), pupilTall - (1 / step * pupilTall * p));
      pg.ellipse(eyeSpacing + pupilLocX, eyeHeight - pupilLocY, pupilWidth - (1 / step * pupilWidth * p), pupilTall - (1 / step * pupilTall * p));
    }
    // mouth
    pg.fill(255);
    let mouthWidth = w - 220 - random(0, 200);
    let mouthHeight = random(-30, 100);
    let mouthOptions = [1, 2]
    let mouthR = random(mouthOptions)
    let vW = random(50, 150);
    let vH = random(20, 150);
    //rColor();
    //fill(randomColor);

    for (let m = 0; m < 10; m++) {
      pg.fill(randomColor[0] - (m * 40), randomColor[1] - (m * 40), randomColor[2] - (m * 40));

      if (mouthR == 1) {
        pg.ellipse(0, 100, mouthWidth - (m * 5), 50 + mouthHeight - (m * 5));
      } else if (mouthR == 2) {

        if (m == 0) {
          pg.translate(0, random(20, 150))
        }
        vW = vW - (1 * m);
        vH = vH - (1 * m);

        pg.beginShape();
        pg.vertex(-vW, 0);
        pg.bezierVertex(-vW, vH, vW, vH, vW, 0);
        pg.vertex(-vW, 0);
        pg.endShape(CLOSE);

      }
    }
    image(pg, -scaleSlider.value() / 2, -scaleSlider.value() / 2, scaleSlider.value(), scaleSlider.value());
    pop();
  }
}