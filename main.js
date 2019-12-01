// Basic set of terms to fill the board, it repeats, will add more later.
const library = [
	"Are You Here With Your Boyfriend / Husband?",
	"Are You In Marketing?",
	"Unisex T-Shirts",
	"A 'Question' That's Really Just a Statement.",
	"Booth Babes",
	"In a sea of drunk men at the conference afterparty",
	"Are you in Sales?",
	"Being Hit On",
	"Assumption You Are a Diversity Hire",
	"Assumption You Are a Manager or Project Manager",
	"'Dongle Jokes'",
	"All Male Panel",
	"All The Keynote Speakers are Men",
	"No Lines for the Women's Bathroom",
	"All Photos in Slides are Men",
	"No Women Speakers",
	"Only Women's Event Scheduled Opposite to Main Keynote",
	"Air Conditioning Cracked Up High",
	"WElL ACTUALLY",
	"Being Mistaken for An Intern",
	"Being Asked if You're a Designer or something to do with Art",
	"'You Don't Look Like An Engineer'",
	"Being Asked if You Need Help",
	"Being Interrupted by a Stranger While Talking to a Colleague",
	"Having Somenone's First Comment To You be About Your Looks",
	"'Girls' Instead of 'Women'",
	"'You look just like ______!' [female celeb, no resemblance]",
	"Dude Explaining to You about the Tyranny of a CoC.",
	"Reports of Harassment Going UnAnswered",
	"Someone Hands you an Empty Drink Assuming You're a Server",
	"Getting 'Advice' Because You're a 'Beginner' Despite 10+ Yrs of XP",
	"Oh You Know What Git Is? GOOD",
	"You're a Unicorn!",
	"Are You a Developer?",
	"Mention of 'Yoga Pants'",
	"'Females'",
	"Every Example is About a 'He'",
	"Dodging Unwanted Hugs",
	"Let Me Tell you About How my Company Does Diversity",
	"Your Glasses Make you Look Like a Sexy Librarian",
	"Assuming the Younger Male Member of Your Team is Your Senior/Boss",
	"You Work in Front End?"
];
// Check to see if a board already exists for this user, if so set the var, 
// if not create a new board and save it in local storage then draws the board
if (localStorage.getItem("board") === null) {
	var board = generateBoard();
	localStorage.setItem("board", JSON.stringify(board));
} else {
	var board = JSON.parse(localStorage.getItem("board"));
}
drawBoard(board);
// Basic function to generate new boards, it randomizes library array and creates the basic array 
// for the board, adds blank space for mansplaining at N == 12 (center tile)
function generateBoard() {
	let array = [];
	let randLibrary = randomizeArray(library);
	for (let N = 0; N < 25; N++) {
		if (N === 12){
			array[12] = ["Man-Splaining Free-Space", 1];
			continue;
		}
		let payload = [randLibrary[N], 0];
		array[N] = payload;
	}
	return array;
}
// Basic implementation of Fisher-Yates Array Shuffle.
function randomizeArray(array) {
	let currentIndex = array.length, temporaryValue, randomIndex;
	while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
	}
	return array;
}
// Takes given board array from storage and draws it on the HTML page.
function drawBoard(array) {
	let outputBoard = "<div class='main_board'><div class='row'>";
	for (let N = 0; N < 25; N++) {
		outputBoard += "<div class='board_tile_" + array[N][1] + "' id='tile_" + N + "' onclick='mark(" + N + ")'><p>" + array[N][0] + "</p></div>";
		if (N === 24) {
			outputBoard += "</div>";
			break;
		}
		if ( ( N + 1 ) % 5 == 0 && N != 0) {
			outputBoard += "</div><div class='row'>";
		}
	}
	document.getElementById('main').innerHTML = outputBoard;
}
// Function to mark which tiles have been seen already
function mark(tile_ref) {
	let tile_id = "tile_" + tile_ref;
	let class_name = document.getElementById(tile_id).className;
	let board = JSON.parse(localStorage.getItem("board"));
	if (class_name == "board_tile_1") {
		class_name = "board_tile_0";
		board[tile_ref] = [board[tile_ref][0], 0];
	} else {
		class_name = "board_tile_1";
		board[tile_ref] = [board[tile_ref][0], 1];
		if(winCondition(tile_ref, board) == true) {
			document.getElementById('win_title').innerHTML = "You Win!!!...yay?";
		}
	}
	document.getElementById(tile_id).className = class_name;
	localStorage.setItem("board", JSON.stringify(board));	
}
// function to allow the user to randomly generate a new board.
function reset() {
	let board = generateBoard();
	localStorage.setItem("board", JSON.stringify(board));
	document.getElementById('caller_button').style.visibility = 'visible';
	drawBoard(board);
}
// Draw the Caller app and redraw the page somewhat to accomdoate it. 
function draw_caller() {
	let outputBoard = "<div class='main_board'><button id='new_tile' type='button' onclick='newTile()'>Call A New Tile</button><div id='tile_bank' class='tile_bank'>";
	if (localStorage.getItem("called_library") !== null) {
		var calledLibrary = JSON.parse(localStorage.getItem("called_library"));
		outputBoard += drawCalled(calledLibrary);
	}
	outputBoard += "</div><button id='caller_reset' type='button' onclick='callerReset()'>Start a New Game</button></div>";
	document.getElementById('main').innerHTML = outputBoard;
	document.getElementById('caller_button').style.visibility = 'hidden';
	document.getElementById('new_button').innerHTML = "Play The Game";
}
// Randomize library, draw a new item from library and add it to called library for future recall.
function newTile() {	
	if (localStorage.getItem("call_library") === null) {
		var callLibrary = randomizeArray(library);
		var calledLibrary = [];
		var callerIndex = 0;
		localStorage.setItem("call_library", JSON.stringify(callLibrary));
		localStorage.setItem("called_library", JSON.stringify(calledLibrary));
		localStorage.setItem("caller_index", JSON.stringify(callerIndex));
	} else {
		var callLibrary = JSON.parse(localStorage.getItem("call_library"));
		var calledLibrary = JSON.parse(localStorage.getItem("called_library"));
		var callerIndex = JSON.parse(localStorage.getItem("caller_index"));
	}
	var tile = callLibrary[callerIndex];
	calledLibrary.push(tile);
	callerIndex++;
	localStorage.setItem("called_library", JSON.stringify(calledLibrary));
	localStorage.setItem("caller_index", JSON.stringify(callerIndex));
	var outputBoard = drawCalled(calledLibrary);
	document.getElementById('tile_bank').innerHTML = outputBoard;

}
// Clear storage for caller side of the app and empties the page. 
function callerReset(){
	localStorage.removeItem("caller_index");
	localStorage.removeItem("called_library");
	localStorage.removeItem("call_library");
	document.getElementById('tile_bank').innerHTML = "";
}
// Draw called out items. 
function drawCalled(calledLibrary) {
	var outputBoard = "<ul>";
	for (let i = 0; i < calledLibrary.length; i++) {
		outputBoard += "<li>" + calledLibrary[i] + "</li>";
	}
	outputBoard += "</ul>";
	return outputBoard;
}
// function to determine if the user has one or not.
function winCondition(square, board){
	//index of all known winning patterns.
	const winners = [
		[0, 1, 2, 3, 4],
		[5, 6, 7, 8, 9],
		[10, 11, 12, 13, 14],
		[15, 16, 17, 18, 19],
		[20, 21, 22, 23, 24],
		[0, 5, 10, 15, 20],
		[1, 6, 11, 16, 21],
		[2, 7, 12, 17, 22],
		[3, 8, 13, 18, 23],
		[4, 9, 14, 19, 24],
		[0, 6, 12, 18, 24],
		[4, 8, 12, 16, 20]
	];
	//Loop through all possible win conditions to see if the square matches 
	//then go through each index in the array to see if they are already marked. 
	for(let i = 0; i < 12; i++) {
		let index = winners[i].indexOf(square);
		if (index != -1) {
			for(let j = 0; j < 5; j++) {
				squareIndex = winners[i][j];
				if (board[squareIndex][1] === 0 && j !== 4) {
					break;
				}
				else if (board[squareIndex][1] === 1 && j === 4){
					return true;
				}
			}
		}
	}
	return false;
}