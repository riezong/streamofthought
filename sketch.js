var canv = createCanvas;

function setup() {
    // put setup code here
    var canv = createCanvas(1920/2, 1080/2);
    // make div#canvas-container the parent of the created canvas
    canv.parent("canvas-container");
    background('#ff8800');

    //    let div = createDiv('').size(1920 / 2, 1080 / 2);
    //    div.style('background-color', 'orange');
    //    div.center();
}

function draw() {
    // put drawing code here
    background('#ff8800');
}
