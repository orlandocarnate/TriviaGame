// Make sure HTML is loaded before running
$(document).ready(function () {
    var correct = 0;
    var wrong = 0;
    var unanswered = 0;
    var currentQuestion = 0;
    var maxQuestions = 5;
    var currentTrivia;

    var timer;
    var maxtime = 5;

    // Trivia data. First Property is the question. Second Property is a list of possible anwsers.
    var triviaData = [
        {
            question: "What is...Q0",
            answers: ["answer0", "answer1", "answer2", "answer3"],
            answer: 0,
            pic: "pic.jpg"
        },
        {
            question: "What is...Q1",
            answers: ["answer0", "answer1", "answer2", "answer3"],
            answer: 1,
            pic: "pic.jpg"
        },
        {
            question: "What is...Q2",
            answers: ["answer0", "answer1", "answer2", "answer3"],
            answer: 2,
            pic: "pic.jpg"
        },
        {
            question: "What is...Q3",
            answers: ["answer0", "answer1", "answer2", "answer3"],
            answer: 3,
            pic: "pic.jpg"
        },
        {
            question: "What is...Q4",
            answers: ["answer0", "answer1", "answer2", "answer3"],
            answer: 0,
            pic: "pic.jpg"
        },
        {
            question: "What is...Q5",
            answers: ["answer0", "answer1", "answer2", "answer3"],
            answer: 1,
            pic: "pic.jpg"
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
        currentTrivia = triviaData[shuffledIndex[currentQuestion]];
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

        clearInterval(timer);
        // get value of clicked answer

        // if answer is correct 
        if (currentTrivia.answer === parseInt(arg)) {
            // tell player is correct and add to correct counter.
            correct++;
            alert("Correct")
        } else {
            // tell player is wrong and add to wrong counter.
            wrong++;
            $("#question").text("Wrong Answer.");
            $("#answers").text("The correct answer is " + currentTrivia.answer)
        }

            // display next question after 5 seconds.
            setTimeout(askQuestion, 5000);
    }

    function wrongAnswer(){
        
    }

    function askQuestion() {
        // clear any generated elements with empty() method
        $("#question").empty();
        $("#answers").empty();
        $("#endtext").hide();

        if (currentQuestion < maxQuestions) {

            currentQuestion++;
            displayQuestion();
            // hide start
            $("#start").hide();

            startTimer(maxtime);

        } else {
            // goto endGame
            endGame();
        }


    }

    // create timer function
    function startTimer(time) {
        $("#time-remaining").show();
        $("#timer").html(time + " Seconds")
        timer = setInterval(function () {
            --time;
            $("#timer").html(time + " Seconds")
            if (time <= 0) {
            clearTimeout(timer);

            console.log("Times up!")
            // currentQuestion++;
            unanswered++;
            $("#timer").html(time + " Seconds")

            // show correct answer
            $("#question").text("Times Up!");
            $("#answers").text("The correct answer is " + currentTrivia.answer)

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
        currentQuestion = 0;
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
        alert($(this).attr("value"));
        checkAnswer($(this).attr("value"));
    });


});