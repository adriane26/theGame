
var memory_array =[
	"dolce",
	"porcinolg",
	"stellinalg",
	"lattelg",
	"donutella",
	"skeletrinalg",
	"dolce",
	"porcinolg",
	"stellinalg",
	"lattelg",
	"donutella",
	"skeletrinalg"
	];

var memory_values = [];

var memory_tile_ids = [];

var tiles_flipped = 0;

var turnCount = 0;

var player1Score = 1;
var player2Score = 1;
var playerID = null;

Array.prototype.memory_tile_shuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
};


function newBoard(){
	tiles_flipped = 0;
	var output = '';
    memory_array.memory_tile_shuffle();
	for(var i = 0; i < memory_array.length; i++){
		output += '<div class="tile" id="tile_'+i+'" onclick="memoryFlipTile(this,\''+memory_array[i]+'\')"></div>';
	}
	document.getElementById('gameboard').innerHTML = output;
	//console.log(output);
};



function memoryFlipTile(tile,val){
	if(tile.innerHTML === "" && memory_values.length < 2){
		tile.style.background = '#FFF';
		tile.innerHTML = '<img class="card-img img-reponsive" src="images/'+ val + '.png"/>';
		//console.log(tile.innerHTML);
		if(memory_values.length === 0){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
			//console.log(this);
		} else if(memory_values.length === 1){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
			if(memory_values[0] === memory_values[1]){
				tiles_flipped += 2;
				// Clear both arrays
				memory_values = [];
            	memory_tile_ids = [];

            	/////////// ADDED
            	turnCount ++;
            	console.log("turnCount"+turnCount);
            	setTimeout(currentPlayer,500);
            	//////
            	if (playerID ===1){
            		$('#player1Score').html(player1Score++);
            	} else {
            		$('#player2Score').html(player2Score++);
            	}

				// Check to see if the whole board is cleared
				if(tiles_flipped === memory_array.length){
					alert("Let's play again!");
					document.getElementById('gameboard').innerHTML = "";
					turnCount = 0;
					newBoard();
				}
			} else {
				function flip2Back(){
				    // Flip the 2 tiles back over
				    var tile_1 = document.getElementById(memory_tile_ids[0]);
				    var tile_2 = document.getElementById(memory_tile_ids[1]);
				    tile_1.style.background = 'url(images/starlogo.png) no-repeat center';
            	    tile_1.innerHTML = "";
				    tile_2.style.background = 'url(images/starlogo.png) no-repeat center';
            	    tile_2.innerHTML = "";
				    // Clear both arrays
				    memory_values = [];
            	    memory_tile_ids = [];
				}
				setTimeout(flip2Back, 500);

				//// added
					turnCount ++;
					setTimeout(currentPlayer,700);
					console.log("turnCount"+turnCount);
			}
		}
	}
};

/*

var player1Turn = function(){
	memoryFlipTile();
	if turnCount
}


*/

var currentPlayer = function(){
	if (turnCount %2 === 0) {
		playerID = 1;
		alert("player1, your turn");
		console.log(playerID);
	} else {
		playerID = 2;
		alert("player 2, your turn");
		console.log(playerID);
	}
};

//// RESET BUTTON


$('#resetButton').on('click', function(){  
	newBoard();
	turnCount =0;
	$('#player1Score').html('&nbsp;');
	$('#player2Score').html('&nbsp');
	player1Score = 1;
	player2Score = 1;
});


////// IN SCORING SECTION: IF CURRENT PLAYER IS 1, update 
//// how to check which is current player? just update current player's score. 





