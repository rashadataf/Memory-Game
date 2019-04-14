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

//   playingCards array will handle the cards while the game is on playing.
let playingCards = [];
// the mvs variable will keep the value of moves player have made
let mvs = 0;
// the minutes will keep the value of minutes spent
let minutes = 0;
// // the seconds will keep the value of seconds spent
let seconds = 0;
// the sep is just ':' symbol for seperate between minutes and seconds
let sep = ':';