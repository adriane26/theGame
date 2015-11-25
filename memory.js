
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
		tile.style.background = 'none';
		tile.innerHTML = '<img src="images/'+ val + '.png"/>';
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
					if (player1Score > player2Score) {
							swal({   title: "Player 1: #winning",   text: "Let's play again!",   imageUrl: "images/StrawberryMilkLgcopy.png" });

						//alert("Nice job, Player 1! Let's play again!")


					} else if (player2Score > player1Score) {

								swal({   title: "Heck yeah, Player 2!",   text: "Let's play again!",   imageUrl: "images/tigercopy.png" });

						//alert("Way to go, Player 2! Let's play again!")


					} else {
					swal({   title: "It's a tie!",   text: "Let's play again!",   imageUrl: "images/sabochan.png" });
						//alert("It's a tie! Let's play again!")

					};


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
					setTimeout(currentPlayer,500);
					//currentPlayer();
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
		// alert("player1, your turn");  highlight playername
		//$('#player1Div').style.textShadow="3px 2px #3FF245";
		$('#player1Div').css({"textShadow": "3px 2px #3FF245"});
		$('#player2Div').css({"textShadow": ""});
		console.log(playerID);
	} else {
		playerID = 2;
		//alert("player 2, your turn");
		$('#player2Div').css({"textShadow": "3px 2px #3FF245"});
		$('#player1Div').css({"textShadow": ""});
		console.log(playerID);
	}
};

///////  RESET BUTTON


$('#resetButton').on('click', function(){  
	//newBoard();
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


////// IN SCORING SECTION: IF current player is 1, highlight animation OR JUST ADD SHADOW TEXT!!
//




////// mouseover tkdk image

/*

function showLogo(x) {
    x.style.height = "64px";
    x.style.width = "64px";
};
function normText() {

}

////// event Listeners

player1Input: .submit(e.preventDefault)

var player1Name = function(name) {

}

*/


////////// when you click playButton, all of this happens. ////////

$('#playButton').on('click', function(){

	///// capture name values, add to player1Div and player2Div. RESET BUTTON NEEDS TO CLEAR THIS INFO from html
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



});  //// create another nbsp in <p></p> instead of player1? 


















