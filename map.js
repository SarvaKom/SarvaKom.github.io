//http://jsfiddle.net/8adUK/1/
//DOM
var canvas = document.getElementById ( 'canvas' );
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;
var context = canvas.getContext ( '2d' );

//CONSTS
var RIGHT_KEY_CODE = 39;
var LEFT_KEY_CODE = 37;
var UP_KEY_CODE = 38;
var DOWN_KEY_CODE = 40;

var TILE_TYPE_WATER = 0;
var TILE_TYPE_GRASS = 1;
var TILE_TYPE_MOUNTAIN = 2;
var TILE_TYPE_MUD = 3;
var NUM_TILE_TYPES = 4;
var TILE_COLORS = [ '#5b81d9', '#00CC00', 'DeepSkyBlue', 'lightpink' ];

var TILE_SIZE = 100;
var WORLD_SIZE = 10000;
var TILES_IN_A_LINE = Math.floor ( WORLD_SIZE/TILE_SIZE );

var VIEW_WIDTH = 2800;
var VIEW_HEIGHT = 1400;
var VIEW_TILE_WIDTH = Math.floor ( VIEW_WIDTH / TILE_SIZE );
var VIEW_TILE_HEIGHT = Math.floor ( VIEW_HEIGHT / TILE_SIZE );

//INITIALIZATION
var keysPressed = {};
keysPressed[RIGHT_KEY_CODE] = false;
keysPressed[LEFT_KEY_CODE] = false;
keysPressed[UP_KEY_CODE] = false;
keysPressed[DOWN_KEY_CODE] = false;

var playerX = WORLD_SIZE/2; //center
var playerY = WORLD_SIZE/2; //center

var tileGrid = [];
var tiles = [];

for ( x = 0; x < TILES_IN_A_LINE; x++ ) {
    var collumn = new Array();
    for ( y = 0; y < TILES_IN_A_LINE; y++ ) {
        collumn[y] = Math.floor ( Math.random() * NUM_TILE_TYPES );
    }
    tileGrid[x] = collumn;
}

document.addEventListener ( 'keydown', keyDown, false );
document.addEventListener ( 'keyup', keyUp, false );
setInterval ( onEnterFrame, 1000 / 30 ); //30 FPS

function onEnterFrame() {
    if (keysPressed[RIGHT_KEY_CODE]) playerX = playerX + 2;
    if (keysPressed[LEFT_KEY_CODE]) playerX = playerX - 2;
    if (keysPressed[UP_KEY_CODE]) playerY = playerY - 2;
    if (keysPressed[DOWN_KEY_CODE]) playerY = playerY + 2; 
    
    var left = playerX - VIEW_WIDTH/2;
    var top = playerY - VIEW_HEIGHT/2;
    
    var leftTile = Math.floor ( left / TILE_SIZE );
    var topTile = Math.floor ( top / TILE_SIZE );
    
    var tileOffsetX = left % TILE_SIZE;
    var tileOffsetY = top % TILE_SIZE;
    
    //var playerLocalX = Math.floor ( playerX / TILE_SIZE ) + tileOffsetX;
    //var playerLocalY = Math.floor ( playerY / TILE_SIZE ) + tileOffsetY;
    context.clearRect(0, 0, canvas.width, canvas.height);

    for ( x = 0; x < VIEW_TILE_WIDTH; x++ ) {
        for ( y = 0; y < VIEW_TILE_HEIGHT; y++ ) {
            var tileColor = tileGrid[leftTile+x][topTile+y];
            context.fillStyle = TILE_COLORS[tileColor];
            context.fillRect ( x * TILE_SIZE - tileOffsetX, y * TILE_SIZE - tileOffsetY, TILE_SIZE, TILE_SIZE );
        }
    }
    
    context.fillStyle = '#FFFFFF';
    context.fillRect ( VIEW_WIDTH/2 - 10, VIEW_HEIGHT/2 - 10, 20, 20);
    context.fillStyle = '#FFFFFF';
    context.fillRect ( VIEW_WIDTH/2 - 7, VIEW_HEIGHT/2 - 7, 14, 14);
}

function keyDown(e) {
    if ( e.keyCode in keysPressed ) keysPressed[e.keyCode] = true;
}

function keyUp(e) {
    if ( e.keyCode in keysPressed ) keysPressed[e.keyCode] = false;
}