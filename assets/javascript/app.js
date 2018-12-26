// Make sure HTML is loaded before running
$(document).ready(function () {
    var correct = 0;
    var wrong = 0;
    var unanswered = 0;
    var currentQuestionIndex = 0;
    var maxQuestions = 5;
    var timer;
    var maxtime = 10;
    var currentTrivia;

    // Trivia data. First Property is the question. Second Property is a list of possible anwsers.
    var triviaData = [
        {
            question: "Which spell was invented by Severus Snape?",
            answers: ["Sectumsempra", "Riddikulus", "Steuleus", "Serpensortia"],
            answer: 0,
            // pic: "https://gph.is/28UeI4D"
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
            // pic: "https://gph.is/16lTO9j"
            pic: "https://media.giphy.com/media/KGHzRH9EGt5mw/200w_d.gif"
        },
        {
            question: "What does Ferula do?",
            answers: ["Turns the object into stone", "Creates a high-pitched sound", "Creates bandages", "Nothing, really"],
            answer: 2,
            // pic: "https://gph.is/2eBjlIB"
            pic: "https://media.giphy.com/media/11P6dElPROzAbu/200w_d.gif",
        },
        {
            question: "What spell opens objects?",
            answers: ["Openia", "Alohamora", "Crucio", "Patentibus"],
            answer: 1,
            pic: "https://vignette.wikia.nocookie.net/harrypotter/images/3/3e/Unlocking_charm1.gif"
        },

    ];

    // create empty array for the shuffled indexes
    var shuffledIndex = [];

    $("#restart").hide();
    $("#endtext").hide();
    $("#time-remaining").hide();

    function shuffle() {
        // reset shuffledIndex array
        shuffledIndex = [];
        console.log("Current:", shuffledIndex);
        // create an array with item numbers based on length of trivia data
        for (var i=0; i < triviaData.length; i++) {
            shuffledIndex.push(i);
        }
        console.log("Shuffled: ",shuffledIndex);


        // gets the length 
        var randomIndex;
        var tempItem;
        for (i = shuffledIndex.length - 1; i > 0; i--) {
            randomIndex = Math.floor(Math.random() * (i+1));
            // copy current item in index i
            tempItem = shuffledIndex[i];
            // copy random item to current index i in array
            shuffledIndex[i] = shuffledIndex[randomIndex];
            // copy temp item to random index
            shuffledIndex[randomIndex] = tempItem;
            console.log(shuffledIndex);

        }
        console.log("Result:",shuffledIndex);
    }

    function displayQuestion() {
        currentTrivia = triviaData[shuffledIndex[currentQuestionIndex]];
        console.log("Current Q number: ", currentQuestionIndex);
        console.log("Current Trivia data:",currentTrivia);
        console.log("Current Q", currentTrivia.question);
        console.log(currentTrivia);
        $("#question").text(currentTrivia.question);

        for (var i=0; i < currentTrivia.answers.length; i++) {
            console.log(currentTrivia.answers[i]);
            answerID = i;
            var answerListItem = $("<div/>", {"class": "answer", "value": i, text: currentTrivia.answers[i]});
            $("#answers").append(answerListItem);
        }
        //display possible answers with values for onclick events

    }

    function checkAnswer(arg) {
        // stop timer
        // clearInterval(timer);
        // get value of clicked answer

        // if answer is correct 
        if (currentTrivia.answer === parseInt(arg)) {
            // tell player is correct and add to correct counter.
            correct++;
            $("#question").text("Correct!");
            $("#answers").text("");

            // display pic
            var answerPic = $("<img/>", {"class": "pic", "src": currentTrivia.pic});
            $("#picAnswer").append(answerPic);
        } else {
            // tell player is wrong and add to wrong counter.
            wrong++;
            $("#question").text("Wrong Answer.");
            $("#answers").text("The correct answer is " + currentTrivia.answers[currentTrivia.answer])

            // display pic
            var answerPic = $("<img/>", {"class": "pic", "src": currentTrivia.pic});
            $("#picAnswer").append(answerPic);
        }

            // display next question after 5 seconds.
            setTimeout(askQuestion, 5000);
    }

    function askQuestion() {
        // clear any generated elements with empty() method
        $("#question").empty();
        $("#answers").empty();
        $("#endtext").hide();
        $("#picAnswer").empty();

        if (currentQuestionIndex < maxQuestions) {
            displayQuestion();
            currentQuestionIndex++;
            // hide start
            $("#start").hide();

            startTimer();


        } else {
            // goto endGame
            endGame();
        }


    }

    // create timer function
    function startTimer() {
        var time = maxtime;
        $("#time-remaining").show();
        $("#timer").html("Time left: " + time + " seconds")
        timer = window.setInterval(function () {
            time--;
            console.log("time:", time);
            console.log("Current Q: ", currentQuestionIndex);
            $("#timer").html("Time left: " + time + " seconds");
            if (time <= 0) {
                window.clearInterval(timer);

                unanswered++;
                $("#timer").html("Time left: " + time + " seconds")

                // show correct answer
                $("#question").text("Times Up!");
                $("#answers").html('The correct answer is <h4><strong>"' + currentTrivia.answers[currentTrivia.answer] + '"<strong></h4>')

                // display pic
                var answerPic = $("<img/>", {"class": "pic", "src": currentTrivia.pic});
                $("#picAnswer").append(answerPic);

                // display next question after 5 seconds.
                setTimeout(askQuestion, 5000);
            }

        }, 1000);

    }

    function restartGame() {
        // clear any generated elements with empty() method
        correct = 0;
        wrong = 0;
        unanswered = 0;
        currentQuestionIndex = 0;
        currentTrivia = 0;

        // hide button
        $("#restart").hide();


        shuffle();
        askQuestion();

    }

    function endGame() {
        // clear all elements
        $("#time-remaining").hide();

        // display final tally
        $("#endtext").show();

        $("#correct").text(correct);
        $("#wrong").text(wrong);
        $("#unanswered").text(unanswered);

        // display restart button
        $("#restart").show();

    }


    // shuffle the trivia
    shuffle();

    // event listeners
    $("#start").click(function() {
        askQuestion();
    });

    $("#restart").click(function() {
        restartGame();
    });

    $("#answers").on('click', '.answer', function() {
        // alert($(this).attr("value"));
        window.clearInterval(timer);
        checkAnswer($(this).attr("value"));
    });


});