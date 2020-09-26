var canv = createCanvas;
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

function setup() {
    // put setup code here
    var canv = createCanvas(1920 / 2, 1080 / 2);
    // make div#canvas-container the parent of the created canvas
    canv.parent("canvas-container");
    //    background('#ff8800');

    scene = 1;
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
    background('#ff8800');

    // Scene 1
    if (scene == 1) {
        background('#ffffff');

        // Timer
        countdown = ceil((timer - millis()) / 1000);
        if (state == 0) {
            text("T-minus " + countdown, width/2, height/2-10);
            text("Rotation " + endCounter, width/2, height/2+10);
        } else if (state == 1) {
            scene = 2;
            state = 0;
        }
        if (timer < millis()) {
            timer = millis() + timerRotate; // Reset timer
            state = 1;
        }
    }

    // Scene 2
    if (scene == 2) {
        background('#000000')
        fill(255);

        // Timer
        countdown = ceil((timer - millis()) / 1000);
        if (state == 0) {
            text("T-minus " + countdown, width/2, height/2-10);
            text("Rotation " + endCounter, width/2, height/2+10);
        } else if (state == 1) {
            scene = 3;
            state = 0;
        }
        if (timer < millis()) {
            timer = millis() + timerRotate;
            state = 1;
        }
    }

    // Scene 3
    if (scene == 3) {
        background('#ff8800')
        fill(255);

        // Timer
        countdown = ceil((timer - millis()) / 1000);
        if (state == 0) {
            text("T-minus " + countdown, width/2, height/2-10);
            text("Rotation " + endCounter, width/2, height/2+10);
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
    
    // Scene 4
    if (scene == 4) {
        background('#333333')
        fill(255);

        // Timer
        countdown = ceil((timer - millis()) / 1000);
        if (state == 0) {
            text("T-minus " + countdown, width/2, height/2-10);
            text("Rotation " + endCounter, width/2, height/2+10);
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

    // Scene 5
    if (scene == 5) {
        background('#f8f8f8')
        fill(0);

        text("T-minus " + countdown, width/2, height/2-10);
            text("Rotation " + endCounter, width/2, height/2+10);
        text("Yay, you made it to the end!", width/2, height/2+30);
    }
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
