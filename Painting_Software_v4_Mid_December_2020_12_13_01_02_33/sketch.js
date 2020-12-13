 /*  
    Fourth Version of Drawing App
    December 2020
    
    Thanks and credit to Fletcher Bach and Daniel Schiffman for 
    p5.js introduction and TenPrint and loadPixel examples.
    
    Version Five will be a complete re-write using layers to allow
    for a better udno system.
    
*/
document.oncontextmenu = function() {
  return false;
};

var wW;
var wH;
var b = 30;
var pW = b * 5;
var colCount = [];
var saveNumber = 0;
var brush = "square";
var saveCount = 0;
var dropCheckbox;
var dS = false;
var colorCycle = false;
var sizeCycle = false;
var sVArray = [0, 0, 0];
var sVDir = [true, true, true];
var sWArray = [0, 0, 0, 0];
var sWDir = [true, true, true, true];
var grassList = [];
var fireList = [];
var waterList = [];
var txList = [];
var mask;
var videoOptions = [1,2,3];
var videoR;
var maskGraphic;
var switchInterval = 15000;
var timeOfLastSwitch = 0;
var saveBuffer;
let layerDraw;
let layerBrush;
var gradR = false;
let input;
let button;
var webImage;


function preload() {
  grassStamp1 = loadImage('assets/grass/grass1.png');
  grassStamp2 = loadImage('assets/grass/grass2.png');
  grassStamp3 = loadImage('assets/grass/grass3.png');
  grassStamp4 = loadImage('assets/grass/grass4.png');
  grassStamp5 = loadImage('assets/grass/grass5.png')
  grassStamp6 = loadImage('assets/grass/grass6.png');
  grassStamp7 = loadImage('assets/grass/grass7.png');
  grassStamp8 = loadImage('assets/grass/grass8.png');
  grassStamp9 = loadImage('assets/grass/grass9.png');
  grassStamp10 = loadImage('assets/grass/grass10.png');
  grassList.push(grassStamp1, grassStamp2, grassStamp3, grassStamp4, grassStamp5, grassStamp6, grassStamp7, grassStamp8, grassStamp9, grassStamp10);

  
  fireStamp1 = loadImage('assets/fire/fire1.png');
  fireStamp2 = loadImage('assets/fire/fire2.png');
  fireStamp3 = loadImage('assets/fire/fire3.png');
  fireStamp4 = loadImage('assets/fire/fire4.png');
  fireStamp5 = loadImage('assets/fire/fire5.png');
  fireStamp6 = loadImage('assets/fire/fire6.png');
  fireStamp7 = loadImage('assets/fire/fire7.png');
  fireStamp8 = loadImage('assets/fire/fire1_2.png');
  fireList.push(fireStamp1, fireStamp2, fireStamp3, fireStamp4, fireStamp5, fireStamp6, fireStamp7, fireStamp8);
  
  waterStamp1 = loadImage('assets/water/water1.png');
  waterStamp2 = loadImage('assets/water_bw/water2.png');
  waterStamp3 = loadImage('assets/water_bw/water3.png');
  waterStamp4 = loadImage('assets/water_bw/water4.png');
  waterList.push(waterStamp1, waterStamp2, waterStamp3, waterStamp4);
  
  tx1 = loadImage('assets/texture/tx1.jpg');
  tx2 = loadImage('assets/texture/tx2.jpg');
  tx3 = loadImage('assets/texture/tx3.jpg');
  tx4 = loadImage('assets/texture/tx4.jpg');
  tx5 = loadImage('assets/texture/tx5.jpg');
  tx6 = loadImage('assets/texture/tx6.jpg');
  txList.push(tx1,tx2,tx3,tx4,tx5,tx6);
  
  mask = loadImage('assets/mask3.png')
  title = loadImage('assets/cm.jpeg')
}

function setup() {
  wW = windowWidth;
  wH = windowHeight;
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('display', 'block');
  background(185);
  layerDraw = createGraphics(windowWidth, windowHeight);
  layerBrush = createGraphics(windowWidth, windowHeight);


  artboard = rect(b, b * 2, wW - pW - (b * 2), wH - (b * 3));
  
  maskGraphic = createGraphics(400, 300);
  
  
  // Presentation Image
  // image(title,b, 0); 
  
  
  textAlign(LEFT, CENTER);

  // color sliders
  redSlider = createSlider(0, 255, random(0, 255));
  redSlider.position(wW - pW - b + 3, b + (b * 1) + 3);
  redSlider.size(70, 20);

  greenSlider = createSlider(0, 255, random(0, 255));
  greenSlider.position(wW - pW - b + 3, b + (b * 2) + 3);
  greenSlider.size(70, 20);

  blueSlider = createSlider(0, 255, random(0, 255));
  blueSlider.position(wW - pW - b + 3, b + (b * 3) + 3);
  blueSlider.size(70, 20);

  // brush sliders
  spinSlider = createSlider(-10, 10, 0);
  spinSlider.position(wW - pW - b + 3, b + (b * 10) + 3);
  spinSlider.size(70, 20);

  scaleSlider = createSlider(1, 300, 100)
  scaleSlider.position(wW - pW - b + 3, b + (b * 11) + 3);
  scaleSlider.size(70, 20);

  alphaSlider = createSlider(1, 255, 255);
  alphaSlider.position(wW - pW - b + 3, b + (b * 12) + 3);
  alphaSlider.size(70, 20);

  jitterSlider = createSlider(0, 100, 0);
  jitterSlider.position(wW - pW - b + 3, b + (b * 13) + 3);
  jitterSlider.size(70, 20);

  // checkboxes
  dropCheckbox = createCheckbox('', false);
  dropCheckbox.changed(dropShadow);
  dropCheckbox.position(wW - pW - b + 3, b + (b * 14) + 5);
  
  gradCheckbox = createCheckbox('', false);
  gradCheckbox.changed(innerGradient);
  gradCheckbox.position(wW - pW - b + 3, b + (b * 15) + 5);
  
//   input = createInput('http...');
//   input.position(wW - pW - b + 5, b + (b * 16) + 5);
//   input.size(100);
  
//   button = createButton('link web image');
//   button.position(wW - pW - b + 5, b + (b * 17) + 5);
//   button.mousePressed(upload);

}

// function upload(){
//   const webpage = input.value();
//   webImage = loadImage(webpage);
//   input.value('http...')
// }

function draw() {
  if (colorCycle == true) {
    sVArray[0] = redSlider.value();
    sVArray[1] = greenSlider.value();
    sVArray[2] = blueSlider.value();
    for (var i = 0; i < 3; i++) {
      if (sVArray[i] == 255) {
        sVDir[i] = false;
      } else if (sVArray[i] == 0) {
        sVDir[i] = true;
      }
      if (sVDir[i] == false) {
        sVArray[i] = sVArray[i] - 1;
      } else {
        sVArray[i] = sVArray[i] + 1;
      }
    }
    redSlider.value(sVArray[0]);
    greenSlider.value(sVArray[1]);
    blueSlider.value(sVArray[2]);
  }

  if (sizeCycle == true) {
    sWArray[0] = scaleSlider.value();
    for (var j = 0; j < 1; j++) {
      if (sWArray[j] >= 300) {
        sWDir[j] = false;
      } else if (sWArray[j] == 10) {
        sWDir[j] = true;
      }
      if (sWDir[j] == false) {
        sWArray[j] = sWArray[j] - 1;
      } else {
        sWArray[j] = sWArray[j] + 1;
      }
      scaleSlider.value(sWArray[0]);
    }
  }
  
  layerBrush.clear();

  if (pmouseX > b &&
    pmouseX < wW - pW - (b) &&
    pmouseY > b * 2 &&
    pmouseY < wH - (b)) {

    if (mouseIsPressed) {
      if (brush == 'square') {
        squareBrush = new SquareBrush(scaleSlider.value(), false, dS);
        squareBrush.show();
      } else if (brush == 'circle') {
        circleBrush = new CircleBrush(scaleSlider.value(), false, dS);
        circleBrush.show();
      } else if (brush == 'pencil') {
        pencilBrush = new PencilBrush(scaleSlider.value(), false, dS);
        pencilBrush.show();
      } else if (brush == 'grass') {
        grassStamp = new Stamp(grassRand,dS);
        grassStamp.show();
      } else if (brush == 'fire') {
        fireStamp = new Stamp(fireRand,dS);
        fireStamp.show();
      } else if (brush == 'water') {
        waterStamp = new Stamp(waterRand,dS);
        waterStamp.show();
      } else if (brush == 'fog') {
        fogBrush = new FogBrush();
        fogBrush.show();
      } else if (brush == 'video') {
        videoBrush = new VideoBrush();
        videoBrush.show();
      } else if(brush == 'emoji'){
        let emojiBrush = new EmojiBrush(mouseX,mouseY);
        emojiBrush.show();
      } else if(brush == 'texture'){
        txStamp = new Stamp(txRand,dS);
        txStamp.show();
      } 
      // else if(brush == 'web'){
      //   webStamp = new Stamp(webImage,dS);
      //   webStamp.show();
      // }
      
        else if(brush == 'eye'){
        let eyeSelection = get(mouseX,mouseY);
        redSlider.value(eyeSelection[0]);
        greenSlider.value(eyeSelection[1]);
        blueSlider.value(eyeSelection[2]);
      } 
    }
  }

  // no paint area


  // top panel
  fill(200);
  rect(b, b, wW, b);
  fill(230);

  fill(230, 255);
  textSize(12);
  let k = 7; // kerning

  rect(b, b, b);
  text("🔲", b + k, b + 15);

  rect(b * 2, b, b);
  text("🔘", b * 2 + k, b + 15);

  rect(b * 3, b, b);
  fill(0);
  strokeWeight(0);
  text("🅧", b * 3 + k+1, b + 15);
  fill(230);
  strokeWeight(1);
  rect(b * 4, b, b);
  text("🌱", b * 4 + k, b + 15);
 
  rect(b*5, b, b);
  text("🔥", b*5 + k, b + 15);
  
  rect(b*6, b, b);
  text("💧", b*6 + k, b + 15);
  
  rect(b*7, b, b);
  text("🌫", b*7 + k, b + 15);
  
  rect(b*8, b, b);
  text("📹", b*8+k, b+15);
  
  rect(b*9, b,b);
  text("😮", b*9+k, b+15);
  
  rect(b*10, b, b);
  fill(0);
  textSize(16);
  strokeWeight(0);
  text("▦", b*10+k+1, b+15);
  strokeWeight(1);
  textSize(12);
  fill(230);
  
  // rect(b*11, b,b);
  // text("🕸", b*11+k, b+15);
  
  // right panel
  fill(230);
  let rPX = wW - b - pW;
  let rPY = b;
  rect(rPX, rPY, pW, wH - (b + b));
  rect(rPX, rPY, pW, b);
  line(wW - b - b, b + b, wW - b - b, wH - b);

  // color
  fill(redSlider.value(), greenSlider.value(), blueSlider.value());
  rect(wW - b - b, b * 2, b, b * 3);

  fill(210);
  rect(wW - pW - b, b * 5, pW, b);
  fill(0);
  strokeWeight(0);
  // text('Save Color', wW - pW, b * 5 + (b / 2));
  strokeWeight(1);

  // eyedropper selection
  fill(230);
  rect(wW - pW - b, b, b);
  text("🔬", wW - pW - b +(b/4), b * 1.5);
  
  // color wheel cycle
  fill(230);
  rect(wW - b - b, b, b);
  text("🍭 ", wW - (b * 1.77), b * 1.5);
  
  // color randomizer
  fill(230);
  rect(wW - b - b, b * 5, b);
  text("🎲 ", wW - (b * 1.77), b * 5.5);

  // random size cycle
  fill(255, 255);
  rect(wW - b - b, b * 15, b);
  text("🌀 ", wW - (b * 1.77), b * 15.5);


  // slider
  line(rPX, b * 3, wW - b - b, b * 3);
  line(rPX, b * 4, wW - b - b, b * 4);
  line(rPX, b * 5, wW - b, b * 5);

  textSize(12);
  textStyle();
  fill(0);
  strokeWeight(0);
  text('R: ' + redSlider.value(), wW - (b * 3) - 12, b * 2 + (b / 2));
  text('G: ' + greenSlider.value(), wW - (b * 3) - 12, b * 3 + (b / 2));
  text('B: ' + blueSlider.value(), wW - (b * 3) - 12, b * 4 + (b / 2));
  noFill();
  strokeWeight(1);

  // color save boxes

 /* fill(255);
  let cBX;
  let cBY;
  for (let cBX = wW - pW - b; cBX <= wW - (b * 3); cBX++) {
    for (let cBY = b * 6; cBY < b * 10; cBY++) {
      rect(cBX, cBY, b);
      cBY = cBY + b;
    }
    cBX = cBX + b - 1;
  }
  
  let colorChart =[
    [],
    [255,255,255],
    [255,0,0],
    [0,255,0],
    [0,0,255],
    [255,255,0],
    [0,255,255],
    [255,0,255],
    [255,165,0],
    [191,191,191],
    [127,127,127],
    [64,64,64],
    [0,0,0]    
  ]

  let cB = 1;
  let cBX = wW - pW - b;
  let cBY = b * 6;
  for (let cB = 1; cB < 13; cB++){
    if (cB < 5){
      fill(colorChart[cB]);
      rect(cBX - b + (b * cB), b * 6, b);
    } else if (cB > 4 && cB< 9){
      fill(colorChart[cB]);
      rect(cBX - (b*5)+ (b * cB), b * 7, b);
    } else{
      fill(colorChart[cB]);
      rect(cBX - (b*9) + (b * cB), b * 8, b);
    }
  }
  */
  
  fill(255,255,255);
  rect(wW - pW - b, b* 6, b);
  fill(255,0,0);
  rect(wW - pW, b * 6, b);
  fill(0,255,0);
  rect(wW - pW + b, b * 6, b);
  fill(0,0,255);
  rect(wW - pW + b + b, b * 6, b);
  
  fill(255,255,0);
  rect(wW - pW - b, b* 7, b);
  fill(0,255,255);
  rect(wW - pW, b * 7, b);
  fill(255,0,255);
  rect(wW - pW + b, b * 7, b);
  fill(255,165,0);
  rect(wW - pW + b + b, b * 7, b);
  
  fill(191,191,191);
  rect(wW - pW - b, b* 8, b);
  fill(127,127,127);
  rect(wW - pW, b * 8, b);
  fill(64,64,64);
  rect(wW - pW + b, b * 8, b);
  fill(0,0,0);
  rect(wW - pW + b + b, b * 8, b);

  
  fill(250);
  rect(wW - pW - b, b * 10, wW - b, b * 5);
  fill(220, 255);
  rect(wW - pW - b, b * 10, wW - b, b);
  line(wW - pW - b, b * 12, wW - b, b * 12);
  line(wW - pW - b, b * 13, wW - b, b * 13);
  line(wW - pW - b, b * 14, wW - b, b * 14);
  fill(210, 255);
  rect(wW - pW - b, b * 15, b * 4, b);
  rect(wW - pW - b, b * 16, b * 4, b);
  
  // Download, Delete, Undo
  rect(wW-pW-b,wH - (b*4), pW-b, b);
  rect(wW-pW-b,wH - (b*3), pW-b, b);
  rect(wW-pW-b,wH - (b*2), pW-b, b);
  
  
  textSize(12);
  textStyle();
  fill(0);
  strokeWeight(0);
  text('Spin: ' + spinSlider.value(), wW - (b * 3) - 12, b * 11 + (b / 2));
  text('Scale: ' + scaleSlider.value(), wW - (b * 3) - 12, b * 12 + (b / 2));
  text('Alpha: ' + alphaSlider.value(), wW - (b * 3) - 12, b * 13 + (b / 2));
  text('Jitter: ' + jitterSlider.value(), wW - (b * 3) - 12, b * 14 + (b / 2));
  text('Drop Shadow', wW - (b * 5), b * 15 + (b / 2));
  text('Inner Gradient', wW - (b * 5), b * 16 + (b / 2));
  
  //text('B: ' + blueSlider.value(),wW-(b*3)-12, b*4 + (b/2));
  
  text('Download (x)', wW - (b * 6) + 10, wH - (b*4) + (b/2));
  text('Delete (d)', wW - (b * 6) + 10, wH - (b*3) + (b/2));
  text('15 sec. Undo (z)', wW - (b * 6) + 10, wH - (b*2) + (b/2));

  noFill();
  strokeWeight(1);


  // bottom panel
  /*
  // box around artboard
  fill(180)
  rect(b,b*2,b,wH-(b*4));
  rect(b,b*2,wW-(b*7),b);
  rect(b,wH-(b*2),wW-(b*7), wH-(b*2));
  */
  // box frame
  fill(200);
  rect(0, 0, wW, b);
  rect(0, 0, b, wH);
  rect(0, wH - b, wW, b);
  rect(wW - b, 0, b, wH);
  fill(230);
  rect(0, 0, b);
  rect(0, wH - b, b);
  rect(wW - b, 0, b);
  rect(wW - b, wH - b, b);
  
  if (millis() - timeOfLastSwitch > switchInterval){
    saveHistory();
    timeOfLastSwitch = millis();
  }
  
}

function mousePressed() {
  // Square Brush Selection
  if (mouseX > b && mouseX < b * 2 && mouseY > b && mouseY < b * 2) {
    brush = "square";
    cursor('default');
  }
  // Circle Brush Selection
  else if (mouseX > b * 2 && mouseX < b * 3 && mouseY > b && mouseY < b * 2) {
  brush = "circle";
  cursor('default');
  }
  // Ten Print Button
  else if (mouseX > b * 3 && mouseX < b * 4 && mouseY > b && mouseY < b * 2) {
    brush = "tenPrint";
    cursor('cursor/cFlag.png', 1, 5);
    tenPrintBrush = new tenPrint(scaleSlider.value(), dS);
    tenPrintBrush.show();
  }
  // // Pencil Brush
  // else if (mouseX > b * 3 && mouseX < b * 4 && mouseY > b && mouseY < b * 2) {
  //   brush = "pencil";
  //   cursor('default');
  // }
  // Grass Stamp
  else if (mouseX > b * 4 && mouseX < b * 5 && mouseY > b && mouseY < b * 2) {
    brush = "grass";
    grassRand = random(grassList);
    stampReset();
  }
  // Fire Stamp
  else if (mouseX > b * 5 && mouseX < b * 6 && mouseY > b && mouseY < b * 2) {
    brush = "fire";
    fireRand = random(fireList);
    stampReset();
  }
  // Water Stamp
  else if (mouseX > b * 6 && mouseX < b * 7 && mouseY > b && mouseY < b * 2) {
    brush = "water";
    waterRand = random(waterList);
    stampReset();
  }
  // Blur Button
  else if (mouseX > b * 7 && mouseX < b * 8 && mouseY > b && mouseY < b * 2) {
    brush = "fog";
    cursor('cursor/fog.png', 0, 0);
  }
  // Video Brush
  else if (mouseX > b * 8 && mouseX < b * 9 && mouseY > b && mouseY < b * 2) {
    brush = "video";
    cursor('cursor/video.png',1,7);
    scaleSlider.value(50);
    video = createCapture(VIDEO);
    video.size(400, 300);
    video.hide();
    videoR = random(videoOptions);
  }
  // Emoji Brush
  else if(mouseX> b*9 && mouseX< b*10 && mouseY > b && mouseY < b*2){
    brush= "emoji";
    cursor('default');
  }
  // Texture Brush
  else if(mouseX> b*10 && mouseX< b*11 && mouseY > b && mouseY < b*2){
    brush = "texture";
    txRand = random(txList);
    cursor('default');
    stampReset();
  }

  // Web Brush
  // else if(mouseX> b*11 && mouseX< b*12 && mouseY > b && mouseY < b*2){
  //   brush = "web";
  //   stampReset();
  // }
  
  // Eye Dropper Test
   else if (mouseX > wW - pW - b && mouseX < wW - pW && mouseY > b && mouseY < b * 2) {
    colorCycle = false;
    brush = "eye";
    cursor('crosshair');
  }
  // Random Color Selector
  else if (mouseX > (wW - b - b) && mouseX < (wW - b) && mouseY > b * 5 && mouseY < b * 6) {
    redSlider.value(random(0, 255));
    greenSlider.value(random(0, 255));
    blueSlider.value(random(0, 255));
  }
  // Color Cycle
  else if (mouseX > (wW - b - b) && mouseX < (wW - b) && mouseY > b && mouseY < b * 2) {
    if (colorCycle == false) {
      colorCycle = true;
    } else {
      colorCycle = false;
    }
  }
  // Color Chart
  else if (mouseX > wW-pW-b && mouseX <wW-pW+(b*3) && mouseY> b*6 && mouseY<b*9) {
    colorCycle = false;
    let eyeSelection = get(mouseX,mouseY);
    redSlider.value(eyeSelection[0]);
    greenSlider.value(eyeSelection[1]);
    blueSlider.value(eyeSelection[2]);
  }
  
  
  // Size Cycle
  else if (mouseX > (wW - b - b) && mouseX < (wW - b) && mouseY > b * 15 && mouseY < b * 16) {
    if (sizeCycle == false) {
      sizeCycle = true;
    } else {
      sizeCycle = false;
    }
  }
  // Download
  else if (mouseX > (wW - pW - b) && mouseX < (wW-b-b) && mouseY > wH-(b*4) && mouseY < wH-(b*3)){
    to_save = get(b, b * 2, wW - pW - (b * 2), wH - (b * 3));
    to_save.save("Painting Software v3 by Travess Smalley " + saveCount + ".png");
    saveCount++;
  }
  // Delete
  else if (mouseX > (wW - pW - b) && mouseX < (wW-b-b) && mouseY > wH-(b*3) && mouseY < wH-(b*2)){
    fill(255)
    artboard = rect(b, b * 2, wW - pW - (b * 2), wH - (b * 3));
  }
  // Undo
  else if (mouseX > (wW - pW - b) && mouseX < (wW-b-b) && mouseY > wH-(b*2) && mouseY < wH-(b*1)){
    loadSaveHistory();
  }
  
  /*  // Save Color Swatch
    else if(mouseX > wW-b-pW && mouseX < wW-(b*2) && mouseY > b*5 && mouseY < b*6) {
      // adds color to the array
      let saveColor = [redSlider.value(), greenSlider.value(), blueSlider.value()];
      append(colCount, saveColor);
      
      // fills swatch with color
      fill(colCount[saveNumber]);
      rect(wW-pW-b,b * 6,b);
      saveNumber = saveNumber + 1;
    }
    */
}

function keyPressed() {
  if (key == 'x') {
    to_save = get(b, b * 2, wW - pW - (b * 2), wH - (b * 3));
    to_save.save("Painting Software v3 by Travess Smalley " + saveCount + ".png");
    saveCount++;
  }
  if (key == 'd') {
    fill(255)
    artboard = rect(b, b * 2, wW - pW - (b * 2), wH - (b * 3));
  }
}

function dropShadow() {
  if (this.checked()) {
    dS = true;
  } else {
    dS = false;
  }
}

function innerGradient(){
  if(this.checked()){
    gradR = true;
  }else {
    gradR = false;
  }
}

function stampReset(){
  cursor('default');
  // colorCycle = false;
  // spinSlider.value(0);
  angle = 0;
  // redSlider.value(255);
  // greenSlider.value(255);
  // blueSlider.value(255);
}

function saveHistory(){
  saveBuffer = get(b, b * 2, wW - pW - (b * 2), wH - (b * 3));
}
function loadSaveHistory(){
  image(saveBuffer, b, b*2);
}