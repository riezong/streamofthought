var canv = createCanvas;
var vid;

function setup() {
    // put setup code here
    var canv = createCanvas(1920 / 2, 1080 / 2);
    // make div#canvas-container the parent of the created canvas
    canv.parent("canvas-container");
    //    background('#ff8800');


    //    var scene = 1;
}

function draw() {
    // put drawing code here
    //    background('#ff8800');

    // Load video
    vid = createVideo("https://riezong.github.io/streamofthought/data/Opening.mp4");
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    vid.position(x, y);
    vid.size(width, height);
    //    vid.showControls();
    //    Testing to see if this solves autoplay on mobile
    vid.autoplay();
    vid.speed(3);
    vid.onended(sayDone);
    noLoop();
}

function onVideoLoad() {
    // The media will not play untill some explicitly triggered.
    vid.autoplay(true);
    vid.volume(0);
}

function sayDone(elt) {
    vid.stop();
    vid.hide();
}
