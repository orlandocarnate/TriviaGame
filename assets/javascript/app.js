// Make sure HTML is loaded before running
$(document).ready(function () {
    var correct = 0;
    var wrong = 0;
    var currentQuestion = 0;
    var maxQuestions = 5;
    var currentTrivia;

    var timer;

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
            answer: 4,
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

    // create timer variable
    var startTimer;

    // set timer in seconds
    var time = 30;

    $("#restart").hide();

    function shuffle() {
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
            alert("You clicked " + arg + ", should be " + currentTrivia.answer)
        }

        // play next question after 5 seconds
    }

    function askQuestion() {
        if (currentQuestion < maxQuestions) {

            currentQuestion++;
            displayQuestion();
            // hide start
            $("#start").hide();

            timer = setInterval(countdown, 1000);
            
            function countdown() {
              if (time === 5) {
                clearTimeout(timer);
                // Next Step
              } else {
                $("#timer").html(time)
                time--;
              }
            }
        } else {
            // goto end
        }


    }

    function restartGame() {
        // restart variables
        
        // empty elements using jQuery
    }


    // shuffle the trivia
    shuffle();

    // event listeners
    $("#start").click(function() {
        askQuestion();
    });

    $("#answers").on('click', '.answer', function() {
        alert($(this).attr("value"));
        checkAnswer($(this).attr("value"));
    });


});