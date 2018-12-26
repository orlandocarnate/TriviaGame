# TriviaGame
A trivia game that shows only one question until the player answers it or their time runs out

## Gameplay
* You'll create a trivia game that shows only one question until the player answers it or their time runs out.

* Use JavaScript for the logic and jQuery to DOM manipulation.

* If the player selects the correct answer, show a screen congratulating them for choosing the right option. After a few seconds, display the next question -- do this without user input.

* The scenario is similar for wrong answers and time-outs.

  * If the player runs out of time, tell the player that time's up and display the correct answer. Wait a few seconds, then show the next question.
  * If the player chooses the wrong answer, tell the player they selected the wrong option and then display the correct answer. Wait a few seconds, then show the next question.

* On the final screen, show the number of correct answers, incorrect answers, and an option to restart the game (without reloading the page).

## Pseudocode
* Create a trivia data object with properties for each question and possible answers
* The game object will be used to run the game. It will keep score and shuffle the answers.
* The Start Game button will be shown. When clicked it will hide and begin the game.
* When the game starts the game object will create a number array with the same length as the trivia data array using a for-loop.
* The number array will be shuffled using the [Fisher–Yates algorithm](https://en.wikipedia.org/wiki/Fisher–Yates_shuffle)
* The shuffle loop starts from the last index to the first. Two numbers will be swapped and put into a new array called randomList.
* The randomList numbers will used as index numbers for the trivia data object.
* When the question is shown, the answers will also be shuffled randomly.
* 30 second timer will commence.
* If the timer runs out, a incorrect count will be added.
* Incorrect will be displayed and the correct answer will be shown. Incorrect count increases by 1.
* Correct will be displayed and the correct count increases by 1.
* After 5 questions, a total tally will be displayed.
* Start Over button is shown.
* When Start Over button is clicked, the game restarts without refreshing the page.

## Programmer's Notes
* On Click events do not work on dynamically created elements
    * Use .on() with already existing parent elements and reference the id or class
    * EX: 
        * `$("#answers").on("click", ".answer", function() {...})`


## Media 

* [8-Bit Harry Potter](http://www.doctoroctoroc.com/8-bit-harry-potter.php) soundtrack from [Doctor Octoroc](http://www.doctoroctoroc.com)
* Harry Potter MIDI files from [Moviethemes.net](http://moviethemes.net/H1.html)
