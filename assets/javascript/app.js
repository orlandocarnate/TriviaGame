// Make sure HTML is loaded before running
$(document).ready(function () {
    var correct = 0;
    var wrong = 0;
    var currentQuestion = 0;
    var maxQuestions = 5;

    var timer;

    // Trivia data. First Property is the question. Second Property is a list of possible anwsers.
    var triviaData = [
        {
            question: "What is...Q0",
            answers: ["answer1", "answer2", "answer3", "answer4"],
            answer: "A",
            pic: "pic.jpg"
        },
        {
            question: "What is...Q1",
            answers: ["answer1", "answer2", "answer3", "answer4"],
            answer: "A",
            pic: "pic.jpg"
        },
        {
            question: "What is...Q2",
            answers: ["answer1", "answer2", "answer3", "answer4"],
            answer: "A",
            pic: "pic.jpg"
        },
        {
            question: "What is...Q3",
            answers: ["answer1", "answer2", "answer3", "answer4"],
            answer: "A",
            pic: "pic.jpg"
        },
        {
            question: "What is...Q4",
            answers: ["answer1", "answer2", "answer3", "answer4"],
            answer: "A",
            pic: "pic.jpg"
        },
        {
            question: "What is...Q5",
            answers: ["answer1", "answer2", "answer3", "answer4"],
            answer: "A",
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
        var currentTrivia = triviaData[shuffledIndex[currentQuestion]];
        console.log(currentTrivia);
        $("#question").text(currentTrivia.question);

        for (var i=0; i < currentTrivia.answers.length; i++) {
            console.log(currentTrivia.answers[i]);
            answerID = "answer" + i;
            var answerListItem = $("<div/>", {"class": "answer", "value": answerID, text: currentTrivia.answers[i]});
            $("#answers").append(answerListItem);
        }
        //display possible answers with values for onclick events

    }

    function checkAnswer() {
        // stop timer

        clearInterval(timer);
        // get value of clicked answer

        // if answer is correct 
        if (currentTrivia.answer === $(this).val()) {
            // tell player is correct and add to correct counter.
            correct++;
            alert("Correct: ", $(this).attr("id"))
        } else {
            // tell player is wrong and add to wrong counter.
            wrong++;
            alert("You clicked " + $(this).val() + ", should be " + currentTrivia.answer)
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

    $(document).on('click', '.answer', function() {
        alert("Clicked");
        // $(this).game.checkAnswer();
    });


});