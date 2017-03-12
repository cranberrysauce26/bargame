$(document).ready(function () {
    console.log("in deathform.js");

    $('#dead-form').submit(function (event) {
        var maxNameLength = 20;
        console.log("adding submit function to death form");
        event.preventDefault();
        var dataToSend = {
            name: $("#name-input").val(),
            score: $("#score-input").val()
        };
        console.log("configuring form. Here's the data");
        console.log(dataToSend);


        if (dataToSend['name'].length > maxNameLength) {
            document.getElementById("death-msg").innerHTML = "You name is too long";
            return;
        }

        $.ajax({
            type: 'POST',
            url: 'php/savescores.php',
            data: dataToSend
        })

            .done(function (data) {
                document.getElementById("death-msg").innerHTML = data;
                // document.getElementById("name-input").style.visibility = 'hidden';
                // document.getElementById("submit-button").style.visibility = 'hidden';
            });

    });
});