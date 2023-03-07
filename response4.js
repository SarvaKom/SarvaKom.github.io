console.log("hello javascript!")
function setup(){
    //runs once
    createCanvas(windowWidth,windowHeight)
    background(18,0,48)
}

function draw(){
    //this is a loop
    //default is 60 fps
    ellipse(mouseX,mouseY,2,2)
    noStroke()
}