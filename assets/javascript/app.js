
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
var timer = 30;

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

    askQuestion: function() {
        // loop through 5 total questions
        for (q = 0; q < 4; q++) {
            // display question and answers

            // start timer loop
            for (var sec = 30; sec > 0; sec--) {
                setInterval(this.displaySeconds, 1000)
            }
            
            // if timer is > 0 

                // if answer is correct

                // else show incorrect

        }

        // show tally

        // show restart button

    },

    displaySeconds: function() {
        // change time by -1
        timer--;
        // display time

    }

    restartGame: {
        // restart variables
        
        // empty elements using jQuery
    }

}