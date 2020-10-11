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

var mySound;
var videoPlaying = false;

// Total video files per scene in whole number
var tapFrames = 2;
var bathroomFrames = 4;
var objectsFrames = 3;

// Used to generate a pull a random animation for each scene
var tapi;
var bathroomi;
var objectsi;

// Declare video files
var title = [
        "https://riezong.github.io/streamofthought/data/Opening.mp4"
    ];

var tap = [
        "https://riezong.github.io/streamofthought/data/Tap Render.mp4",
        "https://riezong.github.io/streamofthought/data/Tap Running Render.mp4",
    ];

var bathroom = [
        "https://riezong.github.io/streamofthought/data/Heater Light.mp4",
        "https://riezong.github.io/streamofthought/data/Shower Door Handle.mp4",
        "https://riezong.github.io/streamofthought/data/Shower Door.mp4",
        "https://riezong.github.io/streamofthought/data/Shower Drain Inverted.mp4",
    ];

var objects = [
        "https://riezong.github.io/streamofthought/data/Radio.mp4",
        "https://riezong.github.io/streamofthought/data/Snowglobe.mp4",
        "https://riezong.github.io/streamofthought/data/VHS.mp4",
    ];

var positionX = [
    2,
    1,
    4,
    0,
    1,
    2,
    3,
    2,
    1,
    3
    ]

var positionY = [
    0,
    1,
    1,
    2,
    2,
    2,
    2,
    3,
    4,
    4,
    ]


function preload() {
    soundFormats('mp3', 'ogg');
    song = loadSound('https://riezong.github.io/streamofthought/data/Meeting_Again.mp3');
    showerSFX = loadSound('https://riezong.github.io/streamofthought/data/ShowerEdited.wav');
}

function setup() {
    // put setup code here
    // var canv = createCanvas(1920 / 2, 1080 / 2);
    // make div#canvas-container the parent of the created canvas
    // canv.parent("canvas-container");
    createCanvas(windowWidth - 30, windowHeight - 45);

    scene = 0;
    endCounter = 0;
    endTrue = 4;

    // Countdown timer setup
    timerTitle = 20000;
    timerRotate = 4000;
    timer = millis() + timerTitle;
    state = 0;

    // Typography (Totally optional)
    textAlign(CENTER);

    // mySound.play();

    // Generate first set of scenes
    tapi = int(random(tapFrames));
    bathroomi = int(random(bathroomFrames));
    objectsi = int(random(objectsFrames));
    print(tapi);
}

function draw() {
    // put drawing code here    

    // Scene 0
    if (scene == 0) {
        background('#ff8800');
        text("Hello world.", width / 2, height / 2 - 10);
        text("Click to continue", width / 2, height / 2 + 10);
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
            if (state == 0) {
                text("T-minus " + countdown, width / 2, height / 2 - 10);
                text("Rotation " + endCounter, width / 2, height / 2 + 10);
            } else if (state == 1) {

                vid.hide();
                videoPlaying = false;
                showerSFX.setVolume(0, 1, 60000);
                showerSFX.play();
                state = 0;
                scene = 3;
            }
            if (timer < millis()) {
                timer = millis() + timerRotate; // Reset timer
                state = 1;
            }
        }
    }

    // Scene 2
    if (scene == 2) {
        background(255);
        fill(255);
        noStroke();

        textHeaterLight(
            width / 5 * 2, 0, width / 5, height / 5, width / 5, height / 5);
        textShower(
            width / 5 * 4, height / 5, width / 5, height / 5);
        textTapText(
            0, height / 5 * 2, width / 5, height / 5);
        textShowerDoorHandle(
            width / 5 * 2, height / 5 * 2, width / 5, height / 5);
        textShowerHandle(
            width / 5 * 3, height / 5 * 2, width / 5, height / 5);
        textShowerDoor(
            width / 5 * 2, height / 5 * 3, width / 5, height / 5);
        textShowerDrain(
            width / 5 * 3, height / 5 * 4, width / 5, height / 5);

    }

    // Kuleshov
    if (scene == 3) {
        if (videoPlaying == false) {
            Kuleshov(width / 5 * 2, height / 5 * 2);
        } else {
            background('#FFFFFF');
            fill(0);

            // Timer
            countdown = ceil((timer - millis()) / 1000);
            if (state == 0) {
                text("T-minus " + countdown, width / 2, height / 2 - 10);
                text("Rotation " + endCounter + "A", width / 2, height / 2 + 10);
            } else if (state == 1) {
                scene = 4;
                vid.hide();
                videoPlaying = false;

                //Generate new frame    
                var j = int(random(tapFrames));
                print(tapi, j);
                while (j == tapi) {
                    j = int(random(tapFrames));
                    print("match");
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
    if (scene == 4) {
        if (videoPlaying == false) {
            // Heater Light
            if (bathroomi == 0) {
                PlaceofRecall(width / 5 * 2, 0);
            }
            // Shower Door Handle
            if (bathroomi == 1) {
                PlaceofRecall(width / 5 * 0, height / 5 * 2);
            }
            // Shower Door
            if (bathroomi == 2) {
                PlaceofRecall(width / 5 * 2, height / 5 * 3);
            }
            // Shower Drain
            if (bathroomi == 3) {
                PlaceofRecall(width / 5 * 3, height / 5 * 4);
            }
        } else {
            background('#FFFFFF');
            fill(0);

            // Timer
            countdown = ceil((timer - millis()) / 1000);
            if (state == 0) {
                text("T-minus " + countdown, width / 2, height / 2 - 10);
                text("Rotation " + endCounter + "B", width / 2, height / 2 + 10);
            } else if (state == 1) {
                scene = 5;
                vid.hide();
                videoPlaying = false;

                //Generate new frame    
                var j = int(random(bathroomFrames));
                print(bathroomi, j);
                while (j == bathroomi) {
                    j = int(random(bathroomFrames));
                    print("match");
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
    if (scene == 5) {
        if (videoPlaying == false) {
            // Heater Light
            if (objectsi == 0) {
                Mnemonic(width / 5 * 1, height/5 * 1);
            }
            // Shower Door Handle
            if (objectsi == 1) {
                Mnemonic(width / 5 * 4, height / 5 * 2);
            }
            // Shower Door
            if (objectsi == 2) {
                Mnemonic(width / 5 * 1, height / 5 * 3);
            }
        } else {
            background('#FFFFFF');
            fill(0);

            // Timer
            countdown = ceil((timer - millis()) / 1000);
            if (state == 0) {
                text("T-minus " + countdown, width / 2, height / 2 - 10);
                text("Rotation " + endCounter + "C", width / 2, height / 2 + 10);
            } else if (state == 1) {
                scene = 3;
                vid.hide();
                videoPlaying = false;

                //Generate new frame    
                var j = int(random(objectsFrames));
                print(objectsi, j);
                while (j == objectsi) {
                    j = int(random(objectsFrames));
                    print("match");
                }
                objectsi = j;
                state = 0;
            }
            if (timer < millis()) {
                timer = millis() + timerRotate;
                endCounter = endCounter + 1;
                state = 1;
                print("EndCounter" + endCounter);
            }

            // Switch to end scene
            if (endCounter == endTrue) {
                scene = 6;
            }
        }
    }

    // End
    if (scene == 6) {
        end();
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
    background('#FFFFFF');

    // Load video
    vid = createVideo(tap[tapi]);
    var x = (windowWidth - width) / 2 - 15;
    var y = (windowHeight - height) / 2 - 2;
    vid.position(posX, posY);
    vid.size(1920 / 4, 1080 / 4);
    vid.loop();
    vid.speed(1);
    vid.onended(sayDone);
    videoPlaying = true;
}

function PlaceofRecall(posX, posY) {
    background('#FFFFFF');
    fill(0);

    // Load video
    vid = createVideo(bathroom[bathroomi]);
    var x = (windowWidth - width) / 2 - 15;
    var y = (windowHeight - height) / 2 - 2;
    vid.position(posX, posY);
    vid.size(1920 / 4, 1080 / 4);
    vid.loop();
    vid.speed(1);
    vid.onended(sayDone);
    videoPlaying = true;
}

function Mnemonic(posX, posY) {
    background('#FFFFFF');
    fill(0);

    // Load video
    vid = createVideo(objects[objectsi]);
    var x = (windowWidth - width) / 2 - 15;
    var y = (windowHeight - height) / 2 - 2;
    vid.position(posX, posY);
    vid.size(1920 / 4, 1080 / 4);
    vid.loop();
    vid.speed(1);
    vid.onended(sayDone);
    videoPlaying = true;
}

function end() {
    background('#FFFFFF')
    fill(0);

    text("T-minus " + countdown, width / 2, height / 2 - 10);
    text("Rotation " + endCounter, width / 2, height / 2 + 10);
    text("Yay, you made it to the end!", width / 2, height / 2 + 30);
}

function onVideoLoad() {
    // The media will not play untill some explicitly triggered.
    //    vid.autoplay(true);
    //    vid.volume(0);
}

// Fix autoplay issue on Chrome
function mousePressed() {
    if (scene == 0) {
        scene = 1;

        song.play();
    } else {}
}

function sayDone(elt) {
    vid.stop();
    vid.hide();
    // scene = scene + 1;
}

// Text boxes

function textHeaterLight(posX, posY, widthX, heightY) {
    fill('#00B7D9');
    rect(posX, posY, widthX, heightY);
    fill(255);
    text("whir", posX + widthX / 2, posY + heightY / 2);
}

function textShower(posX, posY, widthX, heightY) {
    fill('#00B7D9');
    rect(posX, posY, widthX, heightY);
    fill(255);
    text("pitter-patter", posX + widthX / 2, posY + heightY / 2);
}

function textTapText(posX, posY, widthX, heightY) {
    fill('#00B7D9');
    rect(posX, posY, widthX, heightY);
    fill(255);
    text("swoosh", posX + widthX / 2, posY + heightY / 2);
}

function textShowerDoorHandle(posX, posY, widthX, heightY) {
    fill('#00B7D9');
    rect(posX, posY, widthX, heightY);
    fill(255);
    text("knock-knock", posX + widthX / 2, posY + heightY / 2);
}

function textShowerHandle(posX, posY, widthX, heightY) {
    fill('#00B7D9');
    rect(posX, posY, widthX, heightY);
    fill(255);
    text("squeak", posX + widthX / 2, posY + heightY / 2);
}

function textShowerDoor(posX, posY, widthX, heightY) {
    fill('#00B7D9');
    rect(posX, posY, widthX, heightY);
    fill(255);
    text("plaaak", posX + widthX / 2, posY + heightY / 2);
}

function textShowerDrain(posX, posY, widthX, heightY) {
    fill('#00B7D9');
    rect(posX, posY, widthX, heightY);
    fill(255);
    text("gurgle", posX + widthX / 2, posY + heightY / 2);
}
