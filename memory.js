/////// Declaring variables
var memory_array =[
	"donutella",
	"porcinolg",
	"stellinalg",
	"lattelg",
	"bastardinojrlg",
	"skeletrinalg",
	"donutella",
	"porcinolg",
	"stellinalg",
	"lattelg",
	"bastardinojrlg",
	"skeletrinalg"
	];
var memory_values = [];
var memory_tile_ids = [];
var tiles_flipped = 0;
var turnCount = 0;
var player1Score = 1;
var player2Score = 1;
var playerID = null;


//////// Shuffles memory tile array
Array.prototype.memory_tile_shuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
};

////// Sets up a new board
function newBoard(){
	tiles_flipped = 0;
	var output = '';
    memory_array.memory_tile_shuffle();
	for(var i = 0; i < memory_array.length; i++){
		output += '<div class="tile col-md-6 col-md-offset-2 " id="tile_'+i+'" onclick="memoryFlipTile(this,\''+memory_array[i]+'\')"></div>';
	}
	document.getElementById('gameboard').innerHTML = output;
};

////// Game play. A whole lotta game play. Memory values array holds the values of the 2 cards that are flipped. if they match, the appropriate player's score is increased and it's the next player's turn. If they don't match, the next player goes.

function memoryFlipTile(tile,val){
	if(tile.innerHTML === "" && memory_values.length < 2){
		tile.style.background = 'none';
		tile.innerHTML = '<img class="img-responsive" src="images/'+ val +'.png"/>';
		
		if(memory_values.length === 0){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
		
		} else if(memory_values.length === 1){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);

			////// if it's a match... 
			if(memory_values[0] === memory_values[1]){
				tiles_flipped += 2;
				// Clear both arrays
				memory_values = [];
            	memory_tile_ids = [];

            	/////////// TurnCount is increased and the next player is up
            	turnCount ++;
            	setTimeout(currentPlayer,500);
            	////// increase the appropriate player's score
            	if (playerID ===1){
            		$('#player1Score').html(player1Score++);	
            	} else {
            		$('#player2Score').html(player2Score++);
            	}

				///// Check to see if the whole board is cleared/matched. If so, declare the winner!
				if(tiles_flipped === memory_array.length){
					if (player1Score > player2Score) {
						swal({   title: "Player 1: #winning",   text: "Let's play again!",   imageUrl: "images/StrawberryMilkLgcopy.png" });

						///// was having trouble with sweetAlert, leaving this commented normal alert in for now.
						//alert("Player 1: #winning. Let's play again!");   

					} else if (player2Score > player1Score) {

							swal({   title: "Heck yeah, Player 2!",   text: "Let's play again!",   imageUrl: "images/tigercopy.png" });

							///// was having trouble with sweetAlert, leaving this commented normal alert in for now.
						//alert("Heck yeah, Player 2! Let's play again!");


					} else {
						swal({   title: "Well look at that. You're both winners.",   text: "Let's play again!",   imageUrl: "images/sabochan.png" });

						///// was having trouble with sweetAlert, leaving this commented normal alert in for now, just in case.
						//alert("Well look at that. You're both winners! Let's play again!");

					};
					/////// clear the board, reset the turnCount, set newBoard.
					document.getElementById('gameboard').innerHTML = "";
					turnCount = 0;
					newBoard();
				}
			} else {

				///// if it's not a match... 
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

				//// increase the turn count, switch players.
					turnCount ++;
					setTimeout(currentPlayer,500);
				
			}
		}
	}
};

////////  whose turn is it? 
var currentPlayer = function(){
	if (turnCount %2 === 0) {
		playerID = 1;
		//////// add text shadow highlight to player 1, remove from player 2.
		$('#player1Div').css({"textShadow": "3px 2px #3FF245"});
		$('#player2Div').css({"textShadow": ""});
		
	} else {
		playerID = 2;
		////// if it's 2nd player's turn, highlight player 2 name and remove highlight from player 1.
		$('#player2Div').css({"textShadow": "3px 2px #3FF245"});
		$('#player1Div').css({"textShadow": ""});
		console.log(playerID);
	}
};


///////  RESET BUTTON (same as reloading the page)

$('#resetButton').on('click', function(){  
	turnCount =0;
	$('#player1Score').html('&nbsp;');
	$('#player2Score').html('&nbsp');
	$('#player1P').html('&nbsp');
	$('#player2P').html('&nbsp');
	player1Score = 1;
	player2Score = 1;
	$('#launchModalButton').show();
	$('#gameboard').html(null);
	$('#headerTitle').show();
	

});



////////// when you click playButton, all of this happens.

$('#playButton').on('click', function(){

	///// capture name values, add to player1Div and player2Div.
	var player1Text = $('#player1Name').val();
	var player2Text = $('#player2Name').val();

	///// add value to player1div/player2div. if no input, default to "Player 1" and "Player 2"
		if (!player1Text) {
			$('#player1P').html('Player 1');
		} else {
				$('#player1P').html(player1Text);
		};

		if (!player2Text) {
			$('#player2P').html('Player 2');
		} else {
				$('#player2P').html(player2Text);
		};
	////// clear input values
	$('#player1Name').val('');
	$('#player2Name').val('');

	/////// hide "let's get started" button and "tokidoki" header title
	$('#launchModalButton').hide();
	$('#headerTitle').hide();
	

	///// highlight player 1 div to start
	$('#player1Div').css({"textShadow": "3px 2px #3FF245"});

		////// finally, playButton will call newBoard();
	newBoard();

}); 


















