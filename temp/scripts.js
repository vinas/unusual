var image = new Image(),
    tiles = [],
    map = [],
    selected = [];
image.src = 'tiles.png';
numColsToCut = 20;
numRowsToCut = 11;
widthOfOnePiece = 32;
heightOfOnePiece = 32;


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
    tile.setAttribute('srctile', true);
    document.getElementById('container').appendChild(tile);
}

function displayTiles(bkgTiles, caption) {
    if (caption) document.getElementById('container').innerHTML += '<br/><br/>'+caption+'<br/>';
    for (var i = 0; i < bkgTiles.length; i++) {
        displayTile(bkgTiles[i].image);
        if (i != 0 && (i+1) % 20 == 0) document.getElementById('container').innerHTML += '<br/>';
    }
}

function displayMap() {
    var mapContainer = document.getElementById('map');
    var tile;
    mapContainer.innerHTML = '';
    for (var i = 0; i < map.length; i++) {
        map[i].image.id = i;
        mapContainer.appendChild(map[i].image);
        mapContainer.innerHTML += '';
        if (i != 0 && (i+1) % 10 == 0) mapContainer.innerHTML += '<br/>';
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

function generateMap(type, callback) {
    var totTiles = tileObj.background[type].length,
        idx, temp;
    for (var i = 0; i < 100; i++) {
        idx = Math.floor((Math.random() * totTiles));
        temp = tileObj.background[type].slice(idx)[0];
        map[i] = temp;
        map[i].image.setAttribute('srctile', false);
        map[i].image.setAttribute('map', true);
        map[i].image.setAttribute('selected', false);
    }
    if (callback) callback();
}

document.addEventListener('click', function(e) {
    var shiftEl;
    e.preventDefault();
    
    if (e.srcElement.getAttribute('map') == 'true') {
        if (e.shiftKey) {
            console.log();
            for (var x = 0; x <= Math.floor(e.srcElement.id / 10); x++) {
                for (var y = 0; y <= e.srcElement.id % 10; y++) {
                    shiftEl = document.getElementById(x*10+y);
                    if (shiftEl.getAttribute('selected') == 'true') {
                        shiftEl.style.padding = '0px';
                        shiftEl.style.backgroundColor = '#000';
                        shiftEl.setAttribute('selected', false);
                        for (var i = 0; i < selected.length; i++) {
                            if (selected[i] == shiftEl.id) {
                                selected.splice(i, 1);
                                break;
                            }
                        }
                    } else {
                        shiftEl.style.padding = '2px';
                        shiftEl.style.backgroundColor = '#FFC';
                        shiftEl.setAttribute('selected', true);
                        selected.push(shiftEl.id);
                    }
                }
            }
            return;
        }
        if (e.srcElement.getAttribute('selected') == 'true') {
            e.srcElement.style.padding = '0px';
            e.srcElement.style.backgroundColor = '#000';
            e.srcElement.setAttribute('selected', false);
            for (var i = 0; i < selected.length; i++) {
                if (selected[i] == e.srcElement.id) {
                    selected.splice(i, 1);
                    break;
                }
            }
        } else {
            e.srcElement.style.padding = '2px';
            e.srcElement.style.backgroundColor = '#FFC';
            e.srcElement.setAttribute('selected', true);
            selected.push(e.srcElement.id);
        }
    }

    if (e.srcElement.getAttribute('srctile') == 'true') {
        for (var i = 0; i < selected.length; i++) {
            document.getElementById(selected[i]).src = e.srcElement.src;
        }
    }
});
