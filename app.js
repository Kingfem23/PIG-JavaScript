/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scorer, roundScore, activePlayer, gamePlaying;

init();

//'click is a event reference found on developer.mozilla.org/en-US/docs
//call back function is a function that gets called by even listener which is btn in our example
document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying)
    {
        // 1. Random number
        var dice = Math.floor(Math.random() * 6) + 1;

        // 2. Display correct number to dice
        var diceDom = document.querySelector('.dice');
        diceDom.style.display = 'block';
        diceDom.src = 'dice-' + dice + '.png';

        // 3 Update round score if the rolled number was not a 1
        if (dice !== 1)
        {
            roundScore = roundScore + dice;
            
            //Allows you to select things in CSS file
            //displays the score value on the html page to corresponding player
            //'#current-' + activePlayer will switch between current-0 or current-1 thats why the + active player is there.
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }

        else
        {
            //Next Players turn
            // activePlayer  === 0 ? activePlayer = 1 : activePlayer = 0;
            nextPlayer();
        }
    }

});

document.querySelector('.btn-hold').addEventListener('click', function() {
    
    if(gamePlaying)
    {
        //Add current score to global score
        scores[activePlayer] = roundScore + scores[activePlayer]; //scores[activePlayer] because if its player 0 then array will be score 0 and if player one array will be score 1

        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //Check if player won the game
        if (scores[activePlayer] >= 20)
        {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }

        else
        {
            nextPlayer();
        }

    }

});

function nextPlayer()
{
    if(activePlayer == 0)
    {
        activePlayer = 1;
        roundScore = 0;
        document.getElementById('current-0').textContent = '0';
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.add('active');
        document.querySelector('.dice').style.display = 'none';
    }

    else
    {
        activePlayer = 0;
        roundScore = 0;
        document.getElementById('current-1').textContent = '0';
        document.querySelector('.player-1-panel').classList.remove('active');
        document.querySelector('.player-0-panel').classList.add('active');
        document.querySelector('.dice').style.display = 'none';
    }

}

document.querySelector('.btn-new').addEventListener('click', init);


function init()
{
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    
    //hides dice so that it'll display when clicked.
    document.querySelector('.dice').style.display = 'none';

    //set all values to zero before starting.
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //Clear winner sign
    document.getElementById('name-0').textContent = 'Player1';
    document.getElementById('name-1').textContent = 'Player2';

    //Remove winner class
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');   
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active'); 

}
