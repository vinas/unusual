var image = new Image();
image.src = 'tiles.png';
numColsToCut = 20;
numRowsToCut = 11;
widthOfOnePiece = 32;
heightOfOnePiece = 32;
var tiles = [];

var tileObj = {};

function cutImageUp() {
    var imagePieces = [];
    for (var x = 0; x < numRowsToCut; ++x) {
        for (var y = 0; y < numColsToCut; ++y) {
            var canvas = document.createElement('canvas');
            canvas.width = widthOfOnePiece;
            canvas.height = heightOfOnePiece;
            var context = canvas.getContext('2d');
            context.drawImage(image, y * widthOfOnePiece, x * heightOfOnePiece, widthOfOnePiece, heightOfOnePiece, 0, 0, canvas.width, canvas.height);
            imagePieces.push(canvas.toDataURL());
        }
    }

    for (var i = 0; i < imagePieces.length; i++) {
        tiles[i] = document.createElement('img');
        tiles[i].src = imagePieces[i];
    }
}

function displayTile(tile) {
    document.getElementById('container').appendChild(tile);
}

function displayTiles(tiles, caption) {
    if (caption) document.getElementById('container').innerHTML += '<br/><br/>'+caption+'<br/>';
    for (var i = 0; i < tiles.length; i++) {
        displayTile(tiles[i].image);
        if (i != 0 && (i+1) % 20 == 0) document.getElementById('container').innerHTML += '<br/>';
    }
}



function loadTiles(callback) {
    cutImageUp();
    tileObj.background = {};

    tileObj.background.dungeon = [];
    tileObj.background.desert = [];
    tileObj.background.forest = [];
    tileObj.background.grassland = [];
    tileObj.background.jungle = [];
    tileObj.background.snowForest = [];
    tileObj.background.swamp = [];
    tileObj.background.tundra = [];
    tileObj.background.water = [];
    tileObj.background.river = [];
    tileObj.background.locations = [];
    tileObj.background.details = [];


    loadTileCategory(0, 67, tileObj.background.dungeon, true);
    loadTileCategory(68, 82, tileObj.background.desert, true);
    loadTileCategory(83, 97, tileObj.background.forest, true);
    loadTileCategory(98, 112, tileObj.background.grassland, true);
    loadTileCategory(113, 115, tileObj.background.jungle, true);
    loadTileCategory(116, 121, tileObj.background.snowForest, true);
    loadTileCategory(122, 131, tileObj.background.swamp, true);
    loadTileCategory(132, 148, tileObj.background.tundra, true);
    loadTileCategory(149, 155, tileObj.background.water, true);
    loadTileCategory(156, 165, tileObj.background.river, true);
    loadTileCategory(166, 169, tileObj.background.grassland, true);
    loadTileCategory(170, 176, tileObj.background.locations, true);
    loadTileCategory(177, 219, tileObj.background.details, false);

    if (callback) callback();
}

function displayAllTiles() {
    displayTiles(tileObj.background.dungeon, 'background.dungeon');
    displayTiles(tileObj.background.desert, 'background.desert');
    displayTiles(tileObj.background.forest, 'background.forest');
    displayTiles(tileObj.background.grassland, 'background.grassland');
    displayTiles(tileObj.background.jungle, 'background.jungle');
    displayTiles(tileObj.background.snowForest, 'background.snowForest');
    displayTiles(tileObj.background.swamp, 'background.swamp');
    displayTiles(tileObj.background.tundra, 'background.tundra');
    displayTiles(tileObj.background.water, 'background.water');
    displayTiles(tileObj.background.river, 'background.river');
    displayTiles(tileObj.background.locations, 'background.locations');
    displayTiles(tileObj.background.details, 'background.details');
}

function loadTileCategory(start, end, arr, stepable) {
    var count = arr.length;
    end++;
    for (i = start; i < end; i++) {
        arr[count] = {};
        arr[count].image = tiles[i];
        arr[count].stepable = stepable;
        count++;
    }

}

