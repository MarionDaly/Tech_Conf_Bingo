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
	"repeat REPEAT REPEAT",
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
	"All Male Panel"
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
	let array       = [];
	let randLibrary = randomizeArray(library);
	for (let N = 0; N < 25; N++) {
		if (N == 12){
			array[12] = ["mansplaining freespace", 0];
			continue;
		}
		let payload = [randLibrary[N], 0];
		array[N]      = payload;

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
		if (N == 24) {
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
	document.getElementById(tile_id).className = "board_tile_1";
	let board = JSON.parse(localStorage.getItem("board"));
	board[tile_ref] = [board[tile_ref][0], 1];
	localStorage.setItem("board", JSON.stringify(board));
}
// function to allow the user to randomly generate a new board.
function reset() {
	let board = generateBoard();
	localStorage.setItem("board", JSON.stringify(board));
	drawBoard(board);
}