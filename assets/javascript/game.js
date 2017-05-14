//Defining variables to be used by Hangman
var currentWord;
var currentWordMasked;
var winValue = 0;
var computerPickValue;
var correctGuessValue = 0;
var remainingGuessValue = 10;
var alreadyGuessValue = "";
var gameStart;
var charactersFound = 0;

var gameStart = document.getElementById("gameMessageText"); 
var userText = document.getElementById("userGuessText");
var computerPick = document.getElementById("computerPickText");
var artistImage = document.getElementById("artistImage"); 
var win = document.getElementById("winText");
var alreadyGuess = document.getElementById("alreadyGuessText");
var remainingGuessLeft = document.getElementById("remainingGuessText");

//Display Number of Wins
win.textContent = winValue;

//Artist Choices
var gameChoiceObject = {
	"R Kelly": ["I Believe I Can Fly","rkelly.jpg"],
	"Aaliyah": ["Back & Forth","aaliyah.jpg"],
	"Sade": ["No Ordinary Love","sade.jpg"],
	"TLC": ["Waterfalls","tlc.jpg"],
	"K-Ci & Jojo": ["All My Life","kciandjojo.jpg"],
	"Blackstreet": ["No Diggity","blackstreet.jpg"],
	"Usher": ["You Make Me Wanna","usher.jpg"],
	"Boyz II Men": ["End of the Road","boyziimen.jpg"],
	"Montell Jordan": ["This is How We Do It","montelljordan.jpg"],
	"Mary J Blige": ["Real Love","maryjblige.jpg"],
	"Shai": ["If I Even Fall In Love","shai.jpg"],
};

//Create array with list of artists
var gameChoice = Object.keys(gameChoiceObject);

//Create a randomize list and mask the list
computerPickValue = gameChoice[Math.floor(Math.random() * gameChoice.length)];
currentWordMasked = computerPickValue.replace(/./g,"_");

//Write Values to the page
computerPick.textContent = currentWordMasked;
remainingGuessLeft.textContent = remainingGuessValue;
win.textContent = winValue;
alreadyGuess.textContent = alreadyGuessValue;

//Function Driving the Hangamn
document.onkeyup = function(event) {
	userText.textContent = event.key;

	//Initialize values after restart of the game
	gameStart.textContent = "";
	artistImage.src = "assets/images/90srbmainimage.jpg";

	//Search for the key pressed in the randomly picked word only if the character has not been already guessed
	if (!alreadyGuessValue.toLowerCase().includes(userText.textContent.toLowerCase())){
	    searchForCharacter(userText.textContent.toLowerCase());

		if (charactersFound === 0){
			remainingGuessValue--;
			remainingGuessLeft.textContent = remainingGuessValue;
		}
	}
	
	//If all letters guessed right, exit for
	if (correctGuessValue === computerPickValue.length) {
		winValue++;
		winText.textContent = winValue;

		//Display Win message and set appropriate name and messages
		gameStart.textContent = " YOU HAVE WON - GUESS THE NEXT WORD BELOW";
		userText.textContent =  gameChoiceObject[computerPickValue][0];
		artistImage.src = "assets/images/" + gameChoiceObject[computerPickValue][1];
		resetValues();
	}

	if (remainingGuessValue == 0){
		//Display Loss message
		gameStart.textContent = "SORRY YOU COULDN'T GUESS !!!! PRESS A KEY TO START OVER";
		resetValues();
	}
}

//Function to reset values
function resetValues(){
	correctGuessValue = 0;
	remainingGuessValue = 10;
	remainingGuessLeft.textContent = remainingGuessValue;
	alreadyGuessValue = "";
	alreadyGuessText.textContent = alreadyGuessValue;
	computerPickValue = gameChoice[Math.floor(Math.random() * gameChoice.length)];
	currentWordMasked = computerPickValue.replace(/./g,"_");
	computerPickText.textContent = currentWordMasked;
}

function searchForCharacter(c){
	charactersFound = 0
	
	for (var i = 0; i < computerPickValue.length; i++){
    	if (c ===  computerPickValue.charAt(i).toLowerCase()) {
    		//Counter for letters guessed right
    		correctGuessValue++;
    		charactersFound++;

    		//Display the new found letter
    		console.log(currentWordMasked.replaceAt(i,computerPickValue.charAt(i)));
    		currentWordMasked = currentWordMasked.replaceAt(i,computerPickValue.charAt(i));
    		computerPickText.textContent = currentWordMasked;
    		console.log(currentWordMasked[i]);
    		
    		//Building the string showing values guessed right
    		if(!alreadyGuessValue.toLowerCase().includes(computerPickValue.charAt(i).toLowerCase())){
    		    if (alreadyGuessValue.length === 0){
        			alreadyGuessValue = computerPickValue.charAt(i);
        		}
        		else{
        			alreadyGuessValue = alreadyGuessValue + "," + computerPickValue.charAt(i);
        		}
        	}
    	}
    }

	//Updating the Web Page
	alreadyGuessText.textContent = alreadyGuessValue;
}

String.prototype.replaceAt=function(index, replacement) {
	return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}
