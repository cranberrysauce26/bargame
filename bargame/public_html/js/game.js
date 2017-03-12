function GameManager() {

    var startCounting = false;

    var isPlaying = false;
    var justStarted = false;
    var bars = document.getElementsByClassName("bar");

    var justDied = false;

    var score = 0;
    var count = 0;

    var otherBarText = "Other Bar...";
    var playText = "Play!";

    var timeForOnePoint = 200;
    var updatePeriod = 10;


    this.waitForGame = function () {
        for (i = 0; i < bars.length; i++) {
            bars[i].addEventListener("mouseover", playGame);
        }
    }

    this.didPlayerJustDie = function () {
        if (justDied) {
            justDied = false;
            return true;
        }
        return false;
    }

    this.justStartedPlaying = function() {
        if (justStarted) {
            justStarted = false;
            return true;
        }
        return false;
    }




    function die() {
        justDied = true;
        isPlaying = false;
        startCounting = false;
        document.getElementById("timer").innerHTML = playText;
        console.log("creating death form manager");
        document.getElementById("death").style.display = "block";
        document.getElementById("score-input").value = score.toString();
        document.getElementById("death-msg").innerHTML = deathMessage(score);
        count = 0;
        score = 0;
    }

    function deathMessage(score) {

        var badMessages = [
            "You got " + score + ". You're shit.",
            score + " only? Just leave",
            "You got " + score + ". Come on"
        ];

        var mediumMessages = [
            "You got " + score + ". Not too shabby.",
            "You got " + score + ". Your pretty ok"
        ];

        var goodMessages = [
            "You got " + score + "! That's amazing! Go ahead and share!",
            "Awesome! " + score + ", wow! Share it!"
        ];

        if (score <= 4) {
            return badMessages[Random.randomIntBetween(0, badMessages.length)];
        }
        if (5 <= score && score <= 20) {
            return mediumMessages[Random.randomIntBetween(0, mediumMessages.length)];
        }
        return goodMessages[Random.randomIntBetween(0, goodMessages.length)];
    }


    function playGame() {
        console.log("playing");
        if (isPlaying) return;
        isPlaying = true;
        justStarted = true;
        var id = setInterval(frame, updatePeriod);
        function frame() {
            var barIsBeforeLine = [true, true];
            for (i = 0; i < bars.length; i++) {
                barIsBeforeLine[i] = $(bars[i]).width() + $(bars[i]).position().left < $("#right").position().left;
            }

            // check if counting has started
            if (!barIsBeforeLine[0] && !barIsBeforeLine[1]) startCounting = true;

            if (barIsBeforeLine[0] ^ barIsBeforeLine[1]) {
                $("#timer").text(otherBarText);
            }

            if (barIsBeforeLine[0] && barIsBeforeLine[1]) $("#timer").text("Play!");

            if (startCounting) {
                //check for death
                if (barIsBeforeLine[0] || barIsBeforeLine[1]) {
                    clearInterval(id);
                    die();
                    return;
                }


                if (count % timeForOnePoint == 0) {
                    if (count > 0) score++;
                    $("#timer").text("Your Score: " + score);
                }

                else $("time").text = playText;
                count++;
            }
        }
    }

}
var gameManager = new GameManager();
$(document).ready(function () {
    console.log("connected to game.js");

    console.log("created gameManager");
    gameManager.waitForGame();
    console.log("waited");
});