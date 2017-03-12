// Create an instance of circleManager and update
$(document).ready(function () {
    var circleManager = new CircleManager();
    circleManager.createCircles();
    var id = setInterval(frame, 20);
    function frame() {
        circleManager.update();
    }
});

// Class Circle 
function Circle(radius, position, id, speed, fill, title) {
    var bigRadius = radius;
    var smallRadius = radius/8;
    // var radius = radius;
    // var position = position;
    // var speed = speed;
    var angle = Random.randomBetween(0, 2*Math.PI);
    // var id = id;
    // var fill = fill;
    var data;
    // var title = title;
    this.updateData = function (d) {
        data = d;
       
        if (data.length != 5) {
            console.log("Data is not right");
            return;
        }
        for (i = 0; i < 5; i++) {
            document.getElementById(id+'-right-text-'+i).innerHTML = data[i].score;
            document.getElementById(id+'-left-text-'+i).innerHTML = data[i].name;
        }
    }
    this.setAngle = function(a){
        angle = a;
    }
    this.getPosition = function() {
        return position;
    }
    var scales = {
        titleYOffset: 0.45,
        leftPositionOffset: 0.4,
        rightPositionOffset: 0.4,
        deltaYOffset: 0.2,
        firstTextOffset: 0.2,
        titleFontSize: 1/6,
        textFontSize: 1/10
    };

    function createSVGCode(id, position, radius, fill, title) {
        var titleY = position.y - radius * scales.titleYOffset;
        var titleSize = radius * scales.titleFontSize;
        var textSize = radius * scales.textFontSize;
        var code =
            '<g>' +
            '<circle position="absolute" id=' + id + '-circle' + ' fill="' + fill + '" cx="' + position.x + '" cy="' + position.y + '" r="' + radius + '" z-index=1> </circle>' +
            '<g id='+id+'-text'+' >'+
            '<text position="absolute" id = "' + id + '-title' + '"x="' + position.x + '" y="' + titleY + '" text-anchor="middle" fill="black" font-family = "Slackey" font-size = "'+titleSize+'" z-index=1>' + title + '</text>';
        var leftPosition = position.x - scales.leftPositionOffset * radius;
        var rightPosition = position.x + scales.rightPositionOffset * radius;
        var InitialYPosition = position.y - scales.firstTextOffset * radius;
        var deltaY = scales.deltaYOffset * radius;
        for (i = 0; i < 5; i++) {
            var newYPosition = InitialYPosition + deltaY * i;
            code +=
                ' <g >' +
                '<text id = "' + id + '-left-text-' + i + '" x="' + leftPosition + '" y="' + newYPosition + '" text-anchor="middle" fill="white" font-family = "Slackey" font-size = "'+textSize+'">...</text>' +
                '<text id = "' + id + '-right-text-' + i + '" x="' + rightPosition+'" y="' + newYPosition + '" text-anchor="middle" fill="white" font-family = "Slackey"font-size = "'+textSize+'">...</text>' +
                '</g>';
        }
        code += '</g> </g>';
        return code;
    };
    this.instantiate = function () {
        var code = createSVGCode(id, position, radius, fill, title);
        // console.log(code);
        document.getElementById("right").innerHTML += code;
    };
    this.updateAngle = function () {
        // Use the code below for some dev in angle
        // var delta = Math.PI / 180 * 0;
        // var deviation = Random.randomBetween(-delta, delta);
        // this.angle += deviation;
        var containerWidth = $("#right").width();
        var containerHeight = $("#right").height();
        if (position.x >= (containerWidth - radius) || position.x <= radius) {
            angle = Math.PI - angle;
        }
        if (position.y >= (containerHeight - radius) || position.y <= radius) {
            angle = -1 * angle;
        }
    };
    this.updatePosition = function () {
        var delta = new Position(speed * Math.cos(angle), speed * Math.sin(angle));
        position.add(delta);
        document.getElementById(id + '-circle').setAttribute("cx", position.x);
        document.getElementById(id + '-circle').setAttribute("cy", position.y);
        document.getElementById(id + '-title').setAttribute("x", position.x);
        document.getElementById(id + '-title').setAttribute("y", position.y - scales.titleYOffset * radius);
        var InitialYPosition = position.y - scales.firstTextOffset * radius;
        var deltaY = scales.deltaYOffset * radius;
        for (i = 0; i < 5; i++) {
            var newYPosition = InitialYPosition + deltaY * i;
            document.getElementById(id + '-left-text-' + i).setAttribute("x", position.x - radius * scales.leftPositionOffset);
            document.getElementById(id + '-left-text-' + i).setAttribute("y", newYPosition);
            document.getElementById(id + '-right-text-' + i).setAttribute("x", position.x + radius * scales.rightPositionOffset);
            document.getElementById(id + '-right-text-' + i).setAttribute("y", newYPosition);
        }
    };
    this.hide = function () {
        console.log("getting rid of title");
        // document.getElementById(id+'-title').style.visibility = 'hidden';
        // for (i = 0; i < 5; i++) {
            
        //     document.getElementById(id+'-right-text-'+i).style.visibility = 'hidden';
        //     document.getElementById(id+'-left-text-'+i).style.visibility = 'hidden';
        // }
        document.getElementById(id+'-text').style.visibility = 'hidden';
        var collapseTime = 1000;
        var updateTime = 20;
        var timer = setInterval(frame, updateTime);
        var count = 0;
        // I am using currentRadius to ensure that the circles don't intersect when shown
        var currentRadius = radius;
        function frame() {
            if (count == Math.floor(collapseTime/updateTime)){
                clearInterval(timer);
                return;
            } 
            currentRadius -= (bigRadius-smallRadius)*updateTime/collapseTime;
           
            document.getElementById(id+'-circle').setAttribute("r", currentRadius);
            count++;
        }
    }
    this.show = function () {
        console.log("in show");
        // if (radius != smallRadius) return;
        var collapseTime = 1000;
        var updateTime = 20;
        var timer = setInterval(frame, updateTime);
        var count = 0;
        var currentRadius = smallRadius;
        function frame() {
            if (count == Math.floor(collapseTime/updateTime)){
                // document.getElementById(id+'-title').style.visibility = 'visible';
                // for (i = 0; i < 5; i++) {
                //     document.getElementById(id+'-left-text-'+i).style.visibility = 'visible';
                //     document.getElementById(id+'-right-text-'+i).style.visibility = 'visible';
                // }
                document.getElementById(id+'-text').style.visibility = 'visible';
                clearInterval(timer);
                return;
            } 
           
            currentRadius += (bigRadius-smallRadius)*updateTime/collapseTime;
            document.getElementById(id+'-circle').setAttribute("r", currentRadius);
            count++;
        }
    }
}
// Class CircleManager
function CircleManager() {
    var circles = [];
    var radius = 0.2 * $("#right").width();
    var padding = 0.05 * $("#right").width();
    var positions = [];
    var ids = ['all-time', 'today'];
    var titles = ['All Time', "Today"];
    var speed = 1;
    var fills = ["#BF211E", "#69A197"];
    var index = 0;
    // Private function that generates random centers for the circles.
    function generateRandomCenters(radius, padding) {
        var containerWidth = $("#right").width();
        var containerHeight = $("#right").height();
        var mostGeneralIntervalX = new IntervalSet([new Interval(radius + padding, containerWidth - radius - padding)]);
        var mostGeneralIntervalY = new IntervalSet([new Interval(radius + padding, containerHeight - radius - padding)]);

        if (mostGeneralIntervalX.isNull() || mostGeneralIntervalY.isNull()) {
            console.log("most general interval is null");
            return;
        }
        var illegalIntervalForFirstCenterX = new IntervalSet([new Interval(containerWidth - 3 * radius - 2 * padding, 3 * radius + 2 * padding)]);
        var legalIntervalForFirstCenterX = mostGeneralIntervalX.deleteIntervalSet(illegalIntervalForFirstCenterX);
        var illegalIntervalForFirstCenterY = new IntervalSet([new Interval(containerHeight - 3 * radius - 2 * padding, 3 * radius + 2 * padding)]);
        var legalIntervalForFirstCenterY = mostGeneralIntervalY.deleteIntervalSet(illegalIntervalForFirstCenterY);
        // console.log("deleted the illegal interval");
        if (legalIntervalForFirstCenterX.isNull() || legalIntervalForFirstCenterY.isNull()) {
            console.log("legal interval for first center is null");
            return;
        }
        var firstCenter = new Position(legalIntervalForFirstCenterX.randomIntInInterval(), legalIntervalForFirstCenterY.randomIntInInterval());
        var yIntervalsForSecondCircle = new IntervalSet([
            new Interval(radius + padding, Math.max(radius + padding, firstCenter.y - 2 * radius - padding)),
            new Interval(Math.min(containerHeight - radius - padding, firstCenter.y + 2 * radius + padding), containerHeight - radius - padding)
        ]);
        var xIntervalsForSecondCircle = new IntervalSet([
            new Interval(radius + padding, Math.max(firstCenter.x - 2 * radius - padding, radius + padding)),
            new Interval(Math.min(containerWidth - radius - padding, firstCenter.x + 2 * radius + padding), containerWidth - radius - padding)
        ]);
        var secondCenter = new Position(xIntervalsForSecondCircle.randomIntInInterval(), yIntervalsForSecondCircle.randomIntInInterval());
        positions = [firstCenter, secondCenter];
    };
    // Public function that creates the circles.
    this.createCircles = function () {
        generateRandomCenters(radius, padding);
        var firstCircle = new Circle(radius, positions[0], ids[0], speed, fills[0], titles[0]);
        var secondCircle = new Circle(radius, positions[1], ids[1], speed, fills[1], titles[1]);
        firstCircle.instantiate();
        secondCircle.instantiate();
        circles = [firstCircle, secondCircle];
    };
    // Private function that updates angles.
    function updateAngles() {
        var delta = Position.subtract(circles[0].getPosition(), circles[1].getPosition());
        if (delta.length() <= 2 * radius) {
            console.log("collided");
            var theta = Math.atan(delta.y / delta.x);
            if (delta.x < 0) theta += Math.PI;
            circles[0].setAngle(theta);
            circles[1].setAngle(Math.PI + theta);
            return;
        }
        circles[0].updateAngle();
        circles[1].updateAngle();
    }
    function updatePositions() {
        circles[0].updatePosition();
        circles[1].updatePosition();
    }

    function dataUpdate() {
        $.get("php/getscores.php", function(data, status) {
            jsonData = JSON.parse(data);
            circles[0].updateData(jsonData[0]);
            circles[1].updateData(jsonData[1]);
        });
    }

    this.update = function () {
        if (index == 0) {
            dataUpdate();
        }
        index++;
        if (index == 50*15) {
            index = 0;
            console.log("refreshing index==" + index);
        }
        if (gameManager.didPlayerJustDie()){
          console.log("showing");
          dataUpdate();
          circles[0].show();
          circles[1].show();
        }
        if (gameManager.justStartedPlaying()) {
            console.log("hiding");
            circles[0].hide();
            circles[1].hide();
        }
  
        updateAngles();
        updatePositions();
    };
}