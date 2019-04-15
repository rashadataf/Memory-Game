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