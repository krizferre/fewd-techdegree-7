const overlay = $('#overlay')[0];
const qwerty = $('#qwerty')[0];
const phrase = $('#phrase ul')[0];
const scoreboard = $('#scoreboard')[0];
const hearts = $('.tries > img');
const buttons = $('#qwerty button');
const letters = $('.letter');
const title = $(overlay).find('.title')[0];
const btnReset = $('.btn__reset')[0];

let missed = 0;

const phrases = [
  'A bird in the hand is worth two in the bush',
  'A chain is only as strong as its weakest link',
  'A friend in need is a friend indeed',
  'All that glitters is not gold',
  'Bring home the bacon'
]

function getRandomPhraseAsArray(arr) {
  const index = Math.floor(Math.random() * arr.length);
  const randomPhrase = arr[index];
  return randomPhrase.split('');
}

function addPhraseToDisplay(arr) {

  $.each(arr, function(index, value) {
    let li = `<li class=`;
    
    if (value === ' ') {
      li += `"space">&nbsp;`
    } else {
      li += `"letter">${value}`;
    }
    li += `</li>`;

    $(phrase).append(li);
  }) // end of each

} // end of addPhraseToDisplay

function checkLetter(button) {
  const letter = $(button)[0].textContent;
  let letterFound = null;

  $.each($('.letter'), function(index, value) {

    if (value.textContent.toLowerCase() === letter) {
      $(value).addClass('show');
      letterFound = letter;
    }
  }); // end of each

  return letterFound;
} // end of checkLetter

function checkWin() {
  const shows = $('.show').length;
  const letters = $('.letter').length;
  let gameOver = false;

  if (shows === letters) {
    gameOver = true;
    $(overlay).addClass('win');
    title.textContent = 'You Won!';
  } else if (missed >= 5) {
    gameOver = true;
    $(overlay).addClass('lose');
    title.textContent = 'You Lost!';
  }

  if (gameOver) {
    $(phrase).hide();
    $(qwerty).hide();
    $(scoreboard).hide();

    btnReset.textContent = 'Play Again?';
    $(overlay).removeClass('start');
    $(overlay).show();
  }

} // end of checkWin

$(document).on('DOMContentLoaded', function() {

  $(btnReset).on('click', function() {
    missed = 0;

    $(overlay).hide();
    $(overlay).removeClass('win');
    $(overlay).removeClass('lose');

    $(phrase).show();
    $(qwerty).show();
    $(scoreboard).show();

    $(hearts).attr('src', 'images/liveHeart.png');
    $(buttons).removeClass('chosen');
    $(buttons).attr('disabled', false);
    $(phrase).find('li').remove();

    const phraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray); 
  }); // end of btn__reset click

  $(qwerty).on('click', function(event) {

    if ($(event.target)[0].tagName !== 'BUTTON') {
      return;
    }

    const button = event.target;
    const letterFound = checkLetter(button);

    if (letterFound === null) {
      $(hearts[missed]).attr('src', 'images/lostHeart.png');
      missed++;
    }

    $(button).addClass('chosen');
    $(button).attr('disabled', true);

    checkWin();
  }); // end of keyrow > button click

}); // end of DOMContentLoaded