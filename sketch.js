//var canv = createCanvas;
var vid;

// Scene counter
var scene;
var endCounter;
var endTrue;

// Countdown timer variables
var timerTitle;
var timerRotate;
var countdown;
var timer;
var state;

var videoPlaying = false;

function setup() {
    // put setup code here
    var canv = createCanvas(1920 / 2, 1080 / 2);
    // make div#canvas-container the parent of the created canvas
    canv.parent("canvas-container");
    //    createCanvas(1920 / 2, 1080 / 2);

    scene = 0;
    endCounter = 0;
    endTrue = 4;

    // Countdown timer setup
    timerTitle = 10000;
    timerRotate = 5000;
    timer = millis() + timerTitle;
    state = 0;

    // Typography (Totally optional)
    textAlign(CENTER);
}

function draw() {
    // put drawing code here    

    // Scene 0
    if (scene == 0) {
        background('#ff8800');
        text("Hello world.", width / 2, height / 2 - 10);
        text("Click to continue", width / 2, height / 2 + 10);
    }

    // Scene 1
    if (scene == 1) {
        if (videoPlaying == false) {
            title();
        } else {
            background('#f8f8f8');
            fill(0);

            // Timer
            countdown = ceil((timer - millis()) / 1000);
            if (state == 0) {
                text("T-minus " + countdown, width / 2, height / 2 - 10);
                text("Rotation " + endCounter, width / 2, height / 2 + 10);
            } else if (state == 1) {
                scene = 2;
                vid.hide();
                videoPlaying = false;
                state = 0;
            }
            if (timer < millis()) {
                timer = millis() + timerRotate; // Reset timer
                state = 1;
            }
        }
    }

    // Scene 2
    if (scene == 2) {
        if (videoPlaying == false) {
            tap();
        } else {
            background('#f8f8f8');
            fill(0);

            // Timer
            countdown = ceil((timer - millis()) / 1000);
            if (state == 0) {
                text("T-minus " + countdown, width / 2, height / 2 - 10);
                text("Rotation " + endCounter + "A", width / 2, height / 2 + 10);
            } else if (state == 1) {
                scene = 3;
                vid.hide();
                videoPlaying = false;
                state = 0;
            }
            if (timer < millis()) {
                timer = millis() + timerRotate;
                state = 1;
            }
        }
    }

    // Scene 3
    if (scene == 3) {
        shower();
    }

    // Scene 4
    if (scene == 4) {
        memory();
    }

    // Scene 5
    if (scene == 5) {
        end();
    }
}

function title() {
    // background('#ffffff');

    // Load video
    vid = createVideo("https://riezong.github.io/streamofthought/data/Opening.mp4");
    var x = (windowWidth - width) / 2 - 15;
    var y = (windowHeight - height) / 2 - 2;
    vid.position(x, y);
    vid.size(width, height);
    vid.play();
    vid.speed(0);
    vid.onended(sayDone);
    videoPlaying = true;
}

function tap() {
    background('#f8f8f8');

    // Load video
    vid = createVideo("https://riezong.github.io/streamofthought/data/Opening.mp4");
    var x = (windowWidth - width) / 2 - 15;
    var y = (windowHeight - height) / 2 - 2;
    vid.position(x, y);
    vid.size(width, height);
    vid.play();
    vid.speed(0);
    vid.onended(sayDone);
    videoPlaying = true;
}

function shower() {
    background('#f8f8f8');
    fill(0);

    // Timer
    countdown = ceil((timer - millis()) / 1000);
    if (state == 0) {
        text("T-minus " + countdown, width / 2, height / 2 - 10);
        text("Rotation " + endCounter + "B", width / 2, height / 2 + 10);
    } else if (state == 1) {
        scene = 4;
        state = 0;
    }
    if (timer < millis()) {
        timer = millis() + timerRotate;
        state = 1;
    }

    // Switch to end scene
    if (endCounter == endTrue) {
        scene = 4;
    }
}

function memory() {
    background('#f8f8f8');
    fill(0);

    // Timer
    countdown = ceil((timer - millis()) / 1000);
    if (state == 0) {
        text("T-minus " + countdown, width / 2, height / 2 - 10);
        text("Rotation " + endCounter + "C", width / 2, height / 2 + 10);
    } else if (state == 1) {
        scene = 2;
        state = 0;
    }
    if (timer < millis()) {
        timer = millis() + timerRotate;
        endCounter = endCounter + 1;
        state = 1;
    }

    // Switch to end scene
    if (endCounter == endTrue) {
        scene = 5;
    }
}

function end() {
    background('#f8f8f8')
    fill(0);

    text("T-minus " + countdown, width / 2, height / 2 - 10);
    text("Rotation " + endCounter, width / 2, height / 2 + 10);
    text("Yay, you made it to the end!", width / 2, height / 2 + 30);
}

function onVideoLoad() {
    // The media will not play untill some explicitly triggered.
    vid.autoplay(true);
    vid.volume(0);
}

// Fix autoplay issue on Chrome
function mousePressed() {
    if (scene == 0) {
        scene = 1;
    } else {}
}

function sayDone(elt) {
    vid.stop();
    vid.hide();
    // scene = scene + 1;
}
