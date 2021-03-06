/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as s/he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, the ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that the ROUND score gets added to the GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

$(document).ready(function (){

alert ('The game has 2 players.' + '\n' + 
'1) During each turn, a player rolls a dice as many times as s/he wishes. Each result get added to the ROUND score.' + '\n' + 
'2) BUT, if the player rolls a 1, the ROUND score gets lost. After that, it\'s the next player\'s turn.' + '\n' + 
'3) The player can choose to \'Hold\', which means that the ROUND score gets added to the GLOBAL score. After that, it\'s the next player\'s turn.' + '\n' +  
'4) The first player to reach 100 points on GLOBAL score wins the game!')

});



var scores, roundScore, activePlayer, gamePlaying; 

init();

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
        //1. random number
            /*create a random number and make it even*/
            var dice = Math.floor(Math.random() *6 ) + 1;

        //2. Display Result 
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        //3. Update the round score only IF the rolled number was NOT a 1 (which means you lose)
        if(dice !==1 ){
            //add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore; 
        } else {
            //next player 
            //turnary operator
            // activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; 

            //will roll until you hit 1, then it'll be the second player!
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){

        //Add current score to Global score 
        scores[activePlayer] += roundScore; // scores[activePlayer] = scores[activePlayer] + roundScore; 
    

        //update the user interface (UI)
        document.querySelector('#score-' + activePlayer).textContent= scores[activePlayer];
    

        //check if player won the game
        if(scores [activePlayer] >=100){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying= false;
            
        } else {
        //next player
        nextPlayer();
        }
    }
});


function nextPlayer(){
//Check if player won the game 

    if(activePlayer ===0) {
        activePlayer = 1; 
    }else {
        activePlayer = 0; 
        
    }
    //reset to 0 
    roundScore = 0;

    document.getElementById('current-0').textContent= '0';        
    document.getElementById('current-1').textContent= '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // document.querySelector('.player-0-panel').classList.remove('active');
    // document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('.dice').style.display= 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init () {
    scores =[0,0] //reset scores back to 0,0
    activePlayer = 0; 
    roundScore = 0; 
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';

    //sets everything to 0
    document.getElementById('score-0').textContent = '0'; 
    document.getElementById('score-1').textContent = '0'; 
    document.getElementById('current-0').textContent = '0'; 
    document.getElementById('current-1').textContent = '0'; 
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');

}

// document.querySelector('#current-' + activePlayer).textContent = '<em>' + dice + '</em>';

// var x = document.querySelector('#score-0').textContent;
// console.log(x);
