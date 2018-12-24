$(document).ready(function () {
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

    function createOrderedIndex() {
        for (var i=0; i < triviaData.length; i++) {
            shuffledIndex.push(i);
        }
        console.log(shuffledIndex);
    }

    createOrderedIndex();

    var game = {
        // Fisher-Yates Shuffle Algorithm
        
        shuffle: function() {
            console.log("Current:", shuffledIndex);
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
        },

        displaySeconds: function() {
            // change time by -1
            time--;
            $("#timer").html(time)
            // display time
            this.askQuestion();

        },

        displayQuestion: function() {
            // display current question

            // display possible answers with values for onclick events

        },

        checkAnswer: function(arg) {
            // stop timer
            clearInterval(timer);
            // get value of clicked answer

            // if answer is correct stop 
        },

        askQuestion: function() {
            
            var timer = setInterval(countdown, 1000);
            
            function countdown() {
              if (time == 0) {
                clearTimeout(timer);
                // Next Step
              } else {
                $("#timer").html(time)
                time--;
              }
            }

        },

        restartGame: {
            // restart variables
            
            // empty elements using jQuery
        }

    }

    $("#start").click(game.askQuestion);
})