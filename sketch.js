//var canv = createCanvas;
var titleVid;
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

// Fadein variables
var fade;
var fadeAmount = 1

var videoPlaying = false;

// Total video files per scene in whole number
var tapFrames = 4;
var bathroomFrames = 8;
var objectsFrames = 8;

// Used to generate a pull a random animation for each scene
var tapi;
var bathroomi;
var objectsi;

// Declare video files and corresponding audio files (if applicable)
var tap = [
    "https://riezong.github.io/streamofthought/data/Tap Render.mp4",
    "https://riezong.github.io/streamofthought/data/Tap Dripping Render.mp4",
    "https://riezong.github.io/streamofthought/data/Tap Running Render.mp4",
    "https://riezong.github.io/streamofthought/data/Tap Running Full Render.mp4",
];

//var tapSounds = [
//    "",
//    "",
//    "https://riezong.github.io/streamofthought/data/Tap.mp3",
//    "https://riezong.github.io/streamofthought/data/Tap.mp3",
//];

var bathroom = [
    "https://riezong.github.io/streamofthought/data/Heater Light.mp4",
    "https://riezong.github.io/streamofthought/data/Shower Door.mp4",
    "https://riezong.github.io/streamofthought/data/Shower Door Handle.mp4",
    "https://riezong.github.io/streamofthought/data/Shower Drain Inverted.mp4",
    "https://riezong.github.io/streamofthought/data/Shower Faucet Running.mp4",
    "https://riezong.github.io/streamofthought/data/Shower Faucet Rotated Render.mp4",
    "https://riezong.github.io/streamofthought/data/Shower Head Render.mp4",
    "https://riezong.github.io/streamofthought/data/Shower Head Running.mp4",
];

//var bathroomSounds = [
//    "https://riezong.github.io/streamofthought/data/Heater Fan.mp3",
//    "https://riezong.github.io/streamofthought/data/Shower Door.mp3",
//    "https://riezong.github.io/streamofthought/data/Shower Door.mp3",
//    "",
//    "https://riezong.github.io/streamofthought/data/Shower Running.mp3",
//    "",
//    "",
//    "https://riezong.github.io/streamofthought/data/Shower Running.mp3",
//];

var objects = [
    "https://riezong.github.io/streamofthought/data/Boardgame Render.mp4",
    "https://riezong.github.io/streamofthought/data/Mahjong Render.mp4",
    "https://riezong.github.io/streamofthought/data/Snowglobe Render.mp4",
    "https://riezong.github.io/streamofthought/data/Snowglobe Still Render.mp4",
    "https://riezong.github.io/streamofthought/data/Radio Tuning Render.mp4",
    "https://riezong.github.io/streamofthought/data/Radio Antenna Render.mp4",
    "https://riezong.github.io/streamofthought/data/Radio Antenna Render 2.mp4",
    "https://riezong.github.io/streamofthought/data/VHS.mp4",
];

// Play button
class button {
    constructor(x_, y_, r_) {
        // Location and size
        this.x = x_;
        this.y = y_;
        this.r = r_;
    }
    // Is a point inside the doorbell? (used for mouse rollover, etc.)
    contains(mx, my) {
        return dist(mx, my, this.x, this.y) < this.r;
    }

    // Show the doorbell (hardcoded colors, could be improved)
    display(mx, my) {
        if (this.contains(mx, my)) {
            fill('#FFE056');
        } else {
            fill('#333333');
        }
        stroke(0);
        strokeWeight(0);
        ellipseMode(RADIUS);
        ellipse(this.x, this.y, this.r, this.r);

        fill(255);
        triangle(width / 2 - 10, height / 2 - 15, width / 2 - 10, height / 2 + 15, width / 2 + 15, height / 2);
    }
}

let playButton;

function preload() {
    soundFormats('mp3', 'ogg');
    song = loadSound('https://riezong.github.io/streamofthought/data/Meeting_Again.mp3');
    showerSFX = loadSound('https://riezong.github.io/streamofthought/data/ShowerEdited.wav');
}

function setup() {
    // put setup code here
    var canv = createCanvas(windowWidth, windowHeight);
    // make div#canvas-container the parent of the created canvas
    canv.parent("canvas-container");
    // createCanvas(windowWidth - 30, windowHeight - 5);
    print("Dedicated to Louisa Liu")

    scene = 0;
    endCounter = 0;
    endTrue = 4;

    // Countdown timer setup
    timerTitle = 20000;
    timerRotate = 4000;
    timer = millis() + timerTitle;
    state = 0;

    fade = 0;

    // Typography (Totally optional)
    textAlign(LEFT);
    textFont('Helvetica');
    textSize(18);
    //    textStyle('bold');

    // Generate first set of scenes
    tapi = int(random(tapFrames));
    bathroomi = int(random(bathroomFrames));
    objectsi = int(random(objectsFrames));

    playButton = new button(width / 2, height / 2, 40);
}

function draw() {
    // put drawing code here    

    // Thumbnail
    if (scene == 0) {
        background(255);
        fill(255);

        thumbnail = createImg("https://riezong.github.io/streamofthought/data/Thumbnail.png", "");
        var scale = 0.5;
        imageMode(CENTER);
        image(thumbnail, 0.5 * width, 0.5 * height, scale * width, scale * thumbnail.height * width / thumbnail.width); // to fit width
        thumbnail.hide();

        playButton.display(mouseX, mouseY);
    }

    // Introduction
    if (scene == 1) {
        if (videoPlaying == false) {
            intro();
        } else {
            background('#FFFFFF');
            fill(0);

            // Timer
            countdown = ceil((timer - millis()) / 1000);
            if (state == 0) {} else if (state == 1) {

                vid.hide();
                videoPlaying = false;
                showerSFX.setVolume(0.5);
                showerSFX.play();
                state = 0;
                scene = 2;
            }
            if (timer < millis()) {
                timer = millis() + timerRotate; // Reset timer
                state = 1;
            }
        }
    }

    // Kuleshov
    if (scene == 2) {
        if (videoPlaying == false) {
            Kuleshov();
        } else {
            background('#ffffff');
            fill(0);

            // Timer
            countdown = ceil((timer - millis()) / 1000);
            if (state == 0) {} else if (state == 1) {
                scene = 3;
                vid.hide();
                videoPlaying = false;

                //Generate new frame    
                var j = int(random(tapFrames));
                // print(tapi, j);
                while (j == tapi) {
                    j = int(random(tapFrames));
                    // print("match");
                }
                tapi = j;

                state = 0;
            }
            if (timer < millis()) {
                timer = millis() + timerRotate;
                state = 1;
            }
        }
    }

    // Place of Recall
    if (scene == 3) {
        if (videoPlaying == false) {
            PlaceofRecall();
        } else {
            background('#ffffff');
            fill(0);

            // Timer
            countdown = ceil((timer - millis()) / 1000);
            if (state == 0) {} else if (state == 1) {
                scene = 4;
                vid.hide();
                videoPlaying = false;

                //Generate new frame    
                var j = int(random(bathroomFrames));
                // print(bathroomi, j);
                while (j == bathroomi) {
                    j = int(random(bathroomFrames));
                    // print("match");
                }
                bathroomi = j;

                state = 0;
            }
            if (timer < millis()) {
                timer = millis() + timerRotate;
                state = 1;
            }
        }
    }

    // Mnemonic
    if (scene == 4) {
        if (videoPlaying == false) {
            Mnemonic();
        } else {
            background('#ffffff');
            fill(0);

            // Timer
            countdown = ceil((timer - millis()) / 1000);
            if (state == 0) {} else if (state == 1) {
                scene = 2;
                vid.hide();
                videoPlaying = false;

                //Generate new frame    
                var j = int(random(objectsFrames));
                // print(objectsi, j);
                while (j == objectsi) {
                    j = int(random(objectsFrames));
                    // print("match");
                }
                objectsi = j;
                state = 0;


                // Switch to end scene
                if (endCounter == endTrue) {
                    scene = 5;
                }
            }
            if (timer < millis()) {
                timer = millis() + timerRotate;
                endCounter = endCounter + 1;
                state = 1;
                // print("EndCounter" + endCounter);
            }
        }
    }

    // End
    if (scene == 5) {
        showerSFX.setVolume(0, 0.5);
        if (videoPlaying == false) {
            end();
        } else {
            background('#FFFFFF');
            fill(0);
        }
    }
}

function intro() {
    // background('#ffffff');

    // Load video
    vid = createVideo("https://riezong.github.io/streamofthought/data/Opening.mp4");
    var x = (windowWidth - width / 2) / 2 - 15;
    var y = (windowHeight - height / 2) / 2 - 2;
    vid.position(x, y);
    vid.size(width / 2, height / 2);
    vid.play();
    vid.speed(0);
    vid.onended(sayDone);
    videoPlaying = true;
}

function Kuleshov(posX, posY) {
    background('#ffffff');

    // Load video
    vid = createVideo(tap[tapi]);
    vid.position(0, 0);
    vid.size(width, height);
    vid.loop();
    vid.speed(1);
    vid.onended(sayDone);
    videoPlaying = true;
}

function PlaceofRecall(posX, posY) {
    background('#ffffff');
    fill(0);

    // Load video
    vid = createVideo(bathroom[bathroomi]);
    vid.position(0, 0);
    vid.size(width, height);
    vid.loop();
    vid.speed(1);
    vid.onended(sayDone);
    videoPlaying = true;
}

function Mnemonic(posX, posY) {
    background('#ffffff');
    fill(0);

    // Load video
    vid = createVideo(objects[objectsi]);
    vid.position(0, 0);
    vid.size(width, height);
    vid.loop();
    vid.speed(1);
    vid.onended(sayDone);
    videoPlaying = true;
}

function end() {
    background('#FFFFFF')
    fill(0);

    vid = createVideo("https://riezong.github.io/streamofthought/data/Ending.mp4");
    var x = (windowWidth - width / 2) / 2 - 15;
    var y = (windowHeight - height / 2) / 2 - 2;
    vid.position(x, y);
    vid.size(width / 2, height / 2);
    vid.play();
    vid.speed(0);
    vid.onended(sayDone);
    videoPlaying = true;

    // Text fade
    if (fade < 0) fadeAmount = 1;
    if (fade > 255) fadeAmount = -10;
    fade += fadeAmount;
}

function onVideoLoad() {}

// Fix autoplay issue on Chrome
function mousePressed() {
    if (scene == 0) {
        scene = 1;
        videoPlaying = false;

        song.play();
    } else {}
}

function sayDone(elt) {}
