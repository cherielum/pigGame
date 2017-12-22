/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer; 

scores = [0,0];
roundScore = 0; 
activePlayer = 0;  

document.querySelector('.dice').style.display = 'none';

//sets everything to 0
document.getElementById('score-0').textContent = '0'; 
document.getElementById('score-1').textContent = '0'; 
document.getElementById('current-0').textContent = '0'; 
document.getElementById('current-1').textContent = '0'; 

document.querySelector('.btn-roll').addEventListener('click', function(){
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

});

document.querySelector('.btn-hold').addEventListener('click', function(){
    //Add current score to Global score 
    scores[activePlayer] += roundScore; // scores[activePlayer] = scores[activePlayer] + roundScore; 
   

    //update the user interface (UI)
    document.querySelector('#score-' + activePlayer).textContent= scores[activePlayer];
   

    //check if player won the game
    if(scores [activePlayer] >=20){
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

        
       
    } else {
    //next player
    nextPlayer();
    
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

// document.querySelector('#current-' + activePlayer).textContent = '<em>' + dice + '</em>';

// var x = document.querySelector('#score-0').textContent;
// console.log(x);