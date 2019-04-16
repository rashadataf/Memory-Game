// The Array Of Total Cards That Program Will Choose 8 Cards From It.
// the cards are unicode symbols so you see the '\u' infront of each
// symbol.those unicodes will assigned to the textContent property
// of spans that represent the cards.
let cards = ['\u2702', '\u2708', '\u270E', '\u2719', '\u2729', '\u273E',
  '\u2756', '\u2766', '\u2600', '\u2602', '\u2603', '\u260E',
  '\u2618', '\u2620', '\u2622', '\u2623', '\u262D', '\u262F',
  '\u2638', '\u263A', '\u263C', '\u2646', '\u2654', '\u2658',
  '\u2660', '\u2663', '\u2665', '\u2666', '\u2668', '\u2672'
  , '\u26C0', '\u26C1'];

// playingCards array will handle the cards while the game is on playing.
let playingCards = [];
// the mvs variable will keep the value of moves player have made
let mvs = 0;
// the minutes will keep the value of minutes spent
let minutes = 0;
// // the seconds will keep the value of seconds spent
let seconds = 0;
// the sep is just ':' symbol for seperate between minutes and seconds
let sep = ':';
// the counter is a variable that represent the span with the 'moves' class
let counter = document.querySelector('.moves');
// star is a like an array that have three elements(span)
// each span represent a star 
let star = document.getElementsByClassName('star');
// timer is a variable that represent the span with 'timer' class
let timer = document.querySelector('.timer');
// boardCards is a like an array that have 16 element each one of them is a span represents a card
let boardCards = document.getElementsByClassName('card');
// replay variable will represent the replay symbol to handle it when click on it
let replay = document.querySelector('.replay');
// firstClicked and lastClicked are variables to hold the tow clicked cards to compare them
// to decide if they are match or not
let firstClicked = null, lastClicked = null;
// timing is a variable to handle the timer and stop it whenever we want
let timing = null;
// isTimeOn is a variable to know wheather the timer is on or off
let isTimeOn = false;
// winning is a variable to handle the function that will check if the player has finished the game
let winning = null;

// this function to pick 8 cards randomly from a given array
// and double them to 16 cards and put them in an array
// and return it . 
function pickCards(array) {
  let startArr = array;
  let pickedArr = [];
  for (let i = 0; i < 8; i++) {
    let ranNum = (Math.floor(Math.random() * startArr.length));
    pickedArr.push(startArr[ranNum]);
    pickedArr.push(startArr[ranNum]);
    startArr.splice(ranNum, 1);
  }
  return pickedArr;
}

// to shuffle a given array
// this function was taken from
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array/2450976#2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// this function to increase the moves by one
// and after increasing the moves it will call starRating() function
function incMoves() {
  mvs = mvs + 1;
  counter.textContent = 'moves ' + mvs;
  starRating();
}
// function to increase the time of the timer and make it in a specific format
function incTime() {
  seconds += 1;
  if (seconds === 60) {
    seconds = seconds % 60;
    minutes += 1;
  }
  timer.textContent = '' + minutes.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + sep + seconds.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
}

// starRating() function to make a test on the value of mvs variable
// and make a choise based on the rating system i made
// rating system
// 3 stars   -------> 100% -----------10 moves
// 2.5 stars -------> 83.33333333% ---15 moves
// 2 stars   -------> 66.66666667% ---20 moves
// 1.5 stars -------> 50% ------------25 moves
// 1 star    -------> 33.33333333% ---30 moves
// 0.5 star  -------> 16.66666667% ---35 moves
// the stars will be displayed using the Font Awesome classes
// fa-star represnt full black star
// fa-star-half-full represent half full star
// fa-star-o represent empty star or star just with the borders
function starRating() {
  switch (mvs) {
    case 11: {
      star[2].classList.remove('fa-star');
      star[2].classList.add('fa-star-half-full');
      break;
    }
    case 16: {
      star[2].classList.remove('fa-star-half-full');
      star[2].classList.add('fa-star-o');
      break;
    }
    case 21: {
      star[1].classList.remove('fa-star');
      star[1].classList.add('fa-star-half-full');
      break;
    }
    case 26: {
      star[1].classList.remove('fa-star-half-full');
      star[1].classList.add('fa-star-o');
      break;
    }
    case 31: {
      star[0].classList.remove('fa-star');
      star[0].classList.add('fa-star-half-full');
      break;
    }
    case 36: {
      star[0].classList.remove('fa-star-half-full');
      star[0].classList.add('fa-star-o');
      break;
    }
  }
}

// start playing is a function to start the play whenever it has been called
function startPlaying() {
  //this represent the array of cards when the game is palyed
  playingCards = shuffle(pickCards(cards));
  winning = setInterval(checkForWin, 200);
  // here we will add the listeners to the click events of each card
  // whenever a card clicked a several things will happen
  for (let curCard in boardCards) {
    boardCards[curCard].addEventListener('click', function () {
      // after clicking we will see if timer is already working or not
      // if it is off we will turn it on
      // otherwise nothing will happen
      if (isTimeOn === false) {
        timing = setInterval(incTime, 1000);
        isTimeOn = true;
      }
      // here we are testing to see if the clicked card is not an opened card
      if (!boardCards[curCard].classList.contains('openCard')) {
        // here we will make the first clicked card stored in firstClicked variable
        // and start the animation of rotation when it is clicked
        // and change the style of the clicked card
        if (firstClicked === null && lastClicked === null) {
          firstClicked = boardCards[curCard];
          firstClicked.classList.add("rotateAnimation");
          firstClicked.style['background-image'] = 'linear-gradient(to bottom right, #8da8a7, #eed2f7)';
          firstClicked.textContent = playingCards[curCard];
        }
        else if (firstClicked != null && lastClicked === null) {
          // here we are testing to see if the clicked card is not the same card that we clicked before
          // so the second clicked card will be stored in lastClicked variable
          // and start the animation of rotation when it is clicked
          // and change the style of the clicked card
          if (firstClicked != boardCards[curCard]) {
            lastClicked = boardCards[curCard];
            lastClicked.classList.add("rotateAnimation");
            lastClicked.style['background-image'] = 'linear-gradient(to bottom right, #8da8a7, #eed2f7)';
            lastClicked.textContent = playingCards[curCard];
            // here we are testing the tow clicked cards to see if they have tha same content
            // if they are mached the 'openCard' class will be assigned to them to tell us that
            // card has been opened
            // secondly the rotate animation will be removed to reuse it in other clicked cards
            // finally the dance animation will start on the tow opened cards
            // finally firstClicked and lastClicked will be null to repeat the operation on other cards
            if (firstClicked.textContent === lastClicked.textContent) {
              setTimeout(function () {
                firstClicked.classList.add("openCard");
                lastClicked.classList.add("openCard");
                firstClicked.classList.remove("rotateAnimation");
                lastClicked.classList.remove("rotateAnimation");
                firstClicked.classList.add("danceAnimation");
                lastClicked.classList.add("danceAnimation");
              }, 1500);
              // here we are removing the dance animation from the tow opened cards to reuse it on other cards
              setTimeout(function () {
                firstClicked.classList.remove("danceAnimation");
                lastClicked.classList.remove("danceAnimation");
                setTimeout(function(){
                  firstClicked = null;
                  lastClicked = null;
                },1000);
              }, 500);
              // the moves will be increased by one
              incMoves();
            }
            // here the code in case of the tow clicked cards were not the same
            // an animation of shake will start on both cards
            // also the rotate animation will be removed to reuse it on other cards
            // and the shake animation will be removed also for the same reason
            else {
              setTimeout(function () {
                firstClicked.classList.add("shakeAnimation");
                lastClicked.classList.add("shakeAnimation");
              }, 1100);
              // here we are removing the animations and we are changing the style of the both cards
              // and the firstClicked and lastClicked are returned to null
              setTimeout(function () {
                firstClicked.classList.remove("rotateAnimation");
                lastClicked.classList.remove("rotateAnimation");
                firstClicked.classList.remove("shakeAnimation");
                lastClicked.classList.remove("shakeAnimation");
                firstClicked.textContent = "";
                firstClicked.style['background-image'] = 'linear-gradient(to bottom right,#193857,#35a56d,#8bdb3a)';
                lastClicked.textContent = "";
                lastClicked.style['background-image'] = 'linear-gradient(to bottom right,#193857,#35a56d,#8bdb3a)';
                firstClicked = null;
                lastClicked = null;
              }, 2000);
              // the moves will be increased by one
              incMoves();
            }
          }
        }
      }
    });
  }
}

// this function to stop the game
function stopPlaying() {
  // here we are resetting the stars to their initial state
  for (let curStar of star) {
    if (curStar.classList.contains('fa-star-o')) {
      curStar.classList.remove('fa-star-o');
      curStar.classList.add('fa-star');
    }
    else if (curStar.classList.contains('fa-star-half-full')) {
      curStar.classList.remove('fa-star-half-full');
      curStar.classList.add('fa-star');
    }
  }
  // here we are resetting the counter to it's initial state
  counter.textContent = 'moves ';
  // reset the mvs variable to it's initial state
  mvs = 0;
  // stopping the timer
  if (isTimeOn === true) {
    clearInterval(timing);
    isTimeOn = false;
    seconds = 0;
    minutes = 0;
    timer.textContent = '00:00';
  }
  // resetting the cards to it's initial state without classes
  let newlyBoardCards = document.getElementsByClassName('card');
  for (let curCard of newlyBoardCards) {
    if (curCard.classList.contains('rotateAnimation')) {
      curCard.classList.remove('rotateAnimation');
    }
    if (curCard.classList.contains('shakeAnimation')) {
      curCard.classList.remove('shakeAnimation');
    }
    if (curCard.classList.contains('danceAnimation')) {
      curCard.classList.remove('danceAnimation');
    }
    if (curCard.classList.contains('openCard')) {
      curCard.classList.remove('openCard');
    }
    // clear the content of the cards
    curCard.textContent = '';
    // changing the style to the initial style
    curCard.style['background-image'] = 'linear-gradient(to bottom right,#193857,#35a56d,#8bdb3a)';
  }
  // the array of playing is being reseted
  playingCards = [];
  // reset the firstClicked and lastClicked to their initial state
  firstClicked = null;
  lastClicked = null;
  // stopping the function that checking if the player has won
  clearInterval(winning);
}

// adding the listener of the click event on the replay symbol
replay.addEventListener('click', function () {
  // stopping the game
  setTimeout(function () {
    stopPlaying();
  }, 1250);
  // starting the game again
  setTimeout(function () {
    startPlaying();
  }, 1250);

});

// function to check the win state
function checkForWin() {
  let newlyBoardCards = document.getElementsByClassName('card');
  let winCards = 14;

  // Get the modal
  let modal = document.getElementById('myModal');

  // Get the <span> element that closes the modal
  let span = document.querySelector(".close");

  // Get the <p> element that contains the message of the modal
  let pargraph = document.querySelector('.message');
  // a loop to see how many cards have been opened
  for (curCard of newlyBoardCards) {
    if (curCard.classList.contains('openCard')) {
      winCards += 1;
    }
  }
  // if the number of opened cards is 16 then it is a winning status
  if (winCards === 16) {
    // creating a section
     
    // document.createElement('section');
    let curStars = document.getElementsByClassName('star');
    
    // creating the message of the pargraph
    pargraph.textContent='Congratulations you have passed the memory game and your memory'+
    ' is very good.Your moves are '+ mvs;
    // append the stars section to the paragraph
    pargraph.innerHTML+= "<br>" +' and your rating is' + document.querySelector('.stars').innerHTML;
    // adding the time to the pargraph message
    // pargraph.textContent=pargraph.textContent+' and your time is ';
    // creating section for time to add it to the pargraph
    // timeSection = document.createElement('span');
    // timeSection.textContent = document.querySelector('.timer').textContent;
    // pargraph.appendChild(timeSection);
    pargraph.innerHTML+= "<br>" + ' and your time is ' + document.querySelector('.timer').innerHTML;
    pargraph.innerHTML+= "<br>" +"do you want to play again"
    // make the modal appear
    modal.style.display = "block";
    // stop the playing
    stopPlaying();
    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
      modal.style.display = "none";
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }
}
startPlaying();