var fingers;

function setup() {
  createCanvas(710, 400);
  // specify multiple formats for different browsers
  fingers = createVideo(['https://riezong.github.io/streamofthought/data/Opening.mp4']);
  fingers.hide(); // by default video shows up in separate dom
  // element. hide it and draw it to the canvas
  // instead
}

function draw() {
  background(150);
  fingers.size(width, height);
  image(fingers, 0, 0); // draw the video frame to canvas
}

function mousePressed() {
  fingers.play(); // set the video to loop and start playing
}
