// Make sure HTML is loaded before running
$(document).ready(function () {
    var correct = 0;
    var wrong = 0;
    var unanswered = 0;
    var currentQuestionIndex = 0;
    var maxQuestions = 10;
    var timer;
    var transitiontimer;
    var maxtime = 15;
    var transitionTime = 7;
    var currentTrivia;
    var shuffledIndex = []; // create empty array for the shuffled indexes

    // Sound setup
    var soundList = ["assets/sounds/wrong1.mp3", "assets/sounds/wrong2.mp3"];
    var soundFX = document.createElement("audio"); // create audio element in the Document
    var music = document.createElement("audio");
    var endMusic =  document.createElement("audio");
    music.setAttribute("src", "assets/sounds/fairytale1.mp3");
    music.volume = 0.25;
    music.loop = true;
    endMusic.setAttribute("src", "assets/sounds/intro.mp3");
    endMusic.volume = 1;
    endMusic.loop = true;
    soundFX.volume = 0.75;

    // Trivia data. First Property is the question. Second Property is a list of possible anwsers.
    var triviaData = [
        {
            question: "Which spell was invented by Severus Snape?",
            answers: ["Sectumsempra", "Riddikulus", "Steuleus", "Serpensortia"],
            answer: 0,
            pic: "https://media.giphy.com/media/R2nvBkAW7XIRy/200w_d.gif"
        },
        {
            question: "What does Incendio do?",
            answers: ["Starts a fire", "Polishes an object", "Causes an object to explode", "Nothing, really"],
            answer: 0,
            pic: "https://pa1.narvii.com/6208/5abf988735cabd4f4c431fa07f9223d92560b144_hq.gif"
        },
        {
            question: "What type of incantation is Wingardium Leviosa?",
            answers: ["Spell", "Curse", "Charm", "Jinx"],
            answer: 2,
            pic: "https://media.giphy.com/media/pI2paNxecnUNW/giphy.gif"
        },
        {
            question: "What does Ferula do?",
            answers: ["Turns the object into stone", "Creates a high-pitched sound", "Creates bandages", "Nothing, really"],
            answer: 2,
            pic: "https://media.giphy.com/media/3ofT5YwE2opHvw6bQc/giphy-downsized.gif",
        },
        {
            question: "What spell opens objects?",
            answers: ["Openia", "Alohamora", "Crucio", "Patentibus"],
            answer: 1,
            pic: "https://vignette.wikia.nocookie.net/harrypotter/images/3/3e/Unlocking_charm1.gif"
        },
        {
            question: "What spell causes a blindfold over your eyes?",
            answers: ["Caecusare", "Opertis", "Nonvidere", "Obscuro"],
            answer: 3,
            pic: "https://media.giphy.com/media/1BFGFPPuIRTUPZFy4d/giphy-downsized.gif"
        },
        {
            question: "What was Harry Potter's pet's name?",
            answers: ["Jerry", "Hedwig", "Oliver", "Hagrid"],
            answer: 1,
            pic: "https://media.giphy.com/media/CJ3PRGEzpTzVK/giphy-downsized.gif"
        },
        {
            question: "Which of these is NOT a Deathly Hallow?",
            answers: ["Resurrection Stone", "Cloak of Invisibility", "Potion of Power", "Elder Wand"],
            answer: 2,
            pic: "https://media.giphy.com/media/CK4BZhVG3689O/giphy-downsized.gif"
        },
        {
            question: "What is a Thestral's Classification?",
            answers: ["X", "XX", "XXX", "XXXX"],
            answer: 3,
            pic: "https://media.giphy.com/media/f0OjjIH6I68GA/giphy-downsized.gif"
        },
        {
            question: "Who is Hagrid?",
            answers: ["A Spider","An Elephant","A Giant","An Executioner"],
            answer: 2,
            pic: "https://media.giphy.com/media/5zdcxaljX66mQ/giphy-downsized.gif"
        },
        {
            question: "Who killed Dumbledore?",
            answers: ["Voldemort", "Severus Snape", "Antonin Dolohov", "No one"],
            answer: 1,
            pic: "https://media.giphy.com/media/OHNvxhuOdR1te/giphy-downsized.gif"
        },
        {
            question: "Who was Severus Snape in love with?",
            answers: ["Leta Lestrange", "Molly Weasley", "Lily Potter", "No one" ],
            answer: 2,
            pic: "https://media.giphy.com/media/qEabWrZXscSTm/giphy.gif"
        },
        {
            question: "What is Felix Felicis?",
            answers: ["Potion of Love", "Potion of Death", "Potion of Resistance", "Potion of Luck"],
            answer: 3,
            pic: "https://media.giphy.com/media/WLXYBlFuBiuQM/giphy.gif"
        },
    	{
            question: "What does the spell Lumos do?",
            answers: ["Creates Light", "Creates Fire", "Creates Ice", "Creates Darkness"],
            answer: 0,
            pic: "https://media.giphy.com/media/Q8WGAVxruhAIg/giphy-downsized.gif"
        },
    	{
            question: "What does the curse Avada Kedavra do?",
            answers: ["A Curse of Fire",  "A Curse Of Light", "A Killing Curse", "A Curse Of Slime"],
            answer: 2,
            pic: "https://media.giphy.com/media/rMYBNQ6LfVV5u/giphy-downsized.gif"
        },
        {
            question: "Who is the head of the House of Gryffindor?",
            answers: ["Minerva McGonagall",  "Celestina Warbeck", "Godric Gryffindor", "Helga Hufflepuff"],
            answer: 0,
            pic: "https://media.giphy.com/media/kDWbmeiUFMx6EOfQti/giphy.gif"
        },
        {
            question: "Who is the ghost of the House of Hufflepuff?",
            answers: ["Minerva McGonagall",  "Pomona Sprout", "Fat Friar", "Helga Hufflepuff"],
            answer: 2,
            pic: "http://pa1.narvii.com/5894/1d2ff4c1d0cb863d6933b6941498a8f39bec9120_hq.gif"
        },
        {
            question: "What is the emblematic animal of the House of Slytherin?",
            answers: ["a badger",  "a lion", "a squirdle", "a snake"],
            answer: 3,
            pic: "https://media.giphy.com/media/NcAIyreaZovjq/giphy.gif"
        },
        {
            question: "What house values intelligence, knowledge, and wit?",
            answers: ["House of Hufflepuff",  "House of Ravenclaw ", "House of Slytherin", "House of Pancakes"],
            answer: 1,
            pic: "https://media.giphy.com/media/lKYMj63WqlBcc/giphy.gif"
        },

    ];

    // hide text
    $("#restart").hide();
    $("#endtext").hide();
    $("#time-remaining").hide();

    // event listeners
    $("#start").click(function() {
        music.play()
        triviaGame.askQuestion();
    });

    $("#restart").click(function() {
        triviaGame.restartGame();
        
    });

    $("#answers").on('click', '.answer', function() {
        triviaGame.checkAnswer($(this).attr("value"));
    });

    // mouseover FX
    $("#answers").on('mouseover', '.answer', function() {
        $(this).animate({"font-size": "26pt"}, "fast");
    });
    $("#answers").on('mouseleave', '.answer', function() {
        $(this).animate({"font-size": "20pt"}, "fast");
    });

    // Trivia Game Object
    var triviaGame = {

        // shuffles index numbers to read trivia questions randomly
        shuffle: function () {
            // reset shuffledIndex array
            shuffledIndex = [];
            for (var i=0; i < triviaData.length; i++) {
                shuffledIndex.push(i);
            }
            var randomIndex;
            var tempItem;
            for (i = shuffledIndex.length - 1; i > 0; i--) {
                randomIndex = Math.floor(Math.random() * (i+1));
                tempItem = shuffledIndex[i]; // copy current item in index i
                shuffledIndex[i] = shuffledIndex[randomIndex]; // copy random item to current index i in array
                shuffledIndex[randomIndex] = tempItem; // copy temp item to random index
            }
            console.log("Shuffled Questions Array: ",shuffledIndex);
        },

        // random sound fx
        randomFX: function () {
            var fxSource = soundList[Math.floor(Math.random() * soundList.length)];
            soundFX.setAttribute("src", fxSource)
            soundFX.play();
        },

        // displays the question and possible answers from the trivia array
        displayQuestion: function () {
            currentTrivia = triviaData[shuffledIndex[currentQuestionIndex]];
            console.log(currentTrivia);

            // show the trivia question
            $("#question").text(currentTrivia.question);
    
            // use for loop to display possible answers
            for (var i=0; i < currentTrivia.answers.length; i++) {
                answerID = i;
                var $answerListItem = $("<div/>", {"class": "answer", "value": i, text: currentTrivia.answers[i]});
                $("#answers").append($answerListItem);
            }
        },

        // display pic
        displayPic: function (arg) {
            var answerPic = $("<img/>", {"class": "pic img-fluid", "src": arg});
            $("#picAnswer").append(answerPic);
        },

        // determines if there more questions or go to end of game.
        askQuestion: function () {
            // clear any generated elements with empty() method
            $("#question").empty();
            $("#answers").empty();
            $("#endtext").hide();
            $("#picAnswer").empty();
            $("#transition").hide();
    
            // Continue game if there are still questions
            if (currentQuestionIndex < maxQuestions) {
                this.displayQuestion();
                currentQuestionIndex++;
                // hide start
                $("#start").hide();
    
                // start countdown timer
                this.startTimer();
            } 
            // If no more questions left go to endGame method
            else {
                // goto endGame
                this.endGame();
            }
        },

        // checks the clicked answer if it's correct
        checkAnswer: function (arg) {
            clearInterval(timer);
            // if passed argument is equal to the answer
            if (currentTrivia.answer === parseInt(arg)) {
                // tell player is correct and add to CORRECT score.
                correct++;
                $("#question").text('Correct!');
                $("#answers").html('You Picked <h4><spa class="correctanswer">"' + currentTrivia.answers[currentTrivia.answer] + '"</span></h4>');
    
                // display pic
                this.displayPic(currentTrivia.pic);

                // play a Correct Sound
                soundFX.setAttribute("src", "assets/sounds/correct.mp3");
                soundFX.play();
            } 
            // Wrong Answer
            else {
                // play random sound
                this.randomFX();

                // tell player is wrong and add to Wrong score.
                $("#question").text("Wrong Answer."); 
                $("#answers").html('The correct answer is <h4><span class="correctanswer">"' + currentTrivia.answers[currentTrivia.answer] + '"</span></h4>');
                wrong++;
                this.displayPic(currentTrivia.pic); // display pic
            }
    
                // see if this is the last question
                this.nextTimerHeadiing();
        },

        // countdown timer
        startTimer: function () {
            // assign max time to time
            var time = maxtime;

            // display hourglass
            // triviaGame.displayPic("https://media.giphy.com/media/117AhFsciLHEJy/giphy-downsized.gif");

            // display time remaining
            $("#time-remaining").show();
            $("#timer").html("Time left: " + time + " seconds");

            // start interval timer
            timer = setInterval(function () {
                time--;
                console.log("time:", time);
                console.log("Current Q: ", currentQuestionIndex);
                $("#timer").html("Time left: " + time + " seconds");

                // stop timer if time is 0
                if (time === 0) {
                    clearInterval(timer);

                    // add to Unanswered score
                    unanswered++;
                    $("#timer").html("Time left: " + time + " seconds")
    
                    // show correct answer
                    triviaGame.randomFX();
                    $("#question").text("Times Up!");
                    $("#answers").html('The correct answer is <h4><span class="correctanswer">"' + currentTrivia.answers[currentTrivia.answer] + '"</span></h4>')
    
                    // display pic
                    triviaGame.displayPic(currentTrivia.pic);
    
                    // check if the next question is the last
                    triviaGame.nextTimerHeadiing();
                }
            }, 1000);
        },

        nextTimerHeadiing: function () {
            // if there are still questions left, tell player the next question will be in 5 seconds
            if (currentQuestionIndex < maxQuestions) {
                $("#transition-text").text("Next Question in ");
    
            // if it was the last question then tell player score is next in 5 seconds
            } else {
                $("#transition-text").text("Let's see your score in ");
            }
            //  run the transition timer
            this.nextTimer();
        },

        // a transition timer between questions
        nextTimer: function () {
            // set the time count
            var transTime = transitionTime;
            console.log("Trans Time: ", transTime);
            // unhide the transition row
            $("#transition").show();
            $("#transition-time").text(transTime + " seconds");

            // set timer
            transitiontimer = setInterval(function () {
                // update timer
                transTime--;
                $("#transition-time").text( transTime + " seconds");

                // stop timer at 0
                if (transTime === 0) {
                    clearInterval(transitiontimer);

                    // display next question
                    triviaGame.askQuestion();
                }
            }, 1000)
        },

        restartGame: function () {
            // clear any generated elements with empty() method
            correct = 0;
            wrong = 0;
            unanswered = 0;
            currentQuestionIndex = 0;
            currentTrivia = 0;

            soundFX.setAttribute("src", "assets/sounds/correct.mp3");
            soundFX.play();
            endMusic.pause();
            music.currentTime = 0;
            music.play()
    
            // hide button
            $("#restart").hide();
    
            // shuffle a new index array
            this.shuffle();
            
            // display the trivia question
            this.askQuestion();
        },

        endGame: function () {
            music.pause();
            endMusic.currentTime = 0;
            endMusic.play();
            // clear or hide all elements
            $("#time-remaining").hide();
            $("#transition").hide();
    
            // display final tally
            $("#endtext").show();
            $("#correct").text(correct);
            $("#wrong").text(wrong);
            $("#unanswered").text(unanswered);
    
            // display restart button
            $("#restart").show();
        },
    }

    // shuffle the trivia
    triviaGame.shuffle();
});