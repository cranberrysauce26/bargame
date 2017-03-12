function Shape(id) {
    var id = id;
    var type;
    var position;
    var initialPosition;
    var width;
    var height;
    var direction;
    var fill;

    function initRandomProperties() {
        var cWidth = $("#smallShapeContainer").width();
        var cHeight = $("#smallShapeContainer").height();
        var types = ["rect", "circle"];
        var colours = ["#3C6E71", "#084887", "#F58A07", "#D52941"];
        var directions = [1, -1];
        var scales = {
            minWidth: 0.1,
            maxWidth: 0.2,
            minHeight: 0.1,
            maxHeight: 0.2,
            minX: 5,
            maxX: 95,
            minY: 5,
            maxY: 95
        };
        fill = Random.randomElementIn(colours);
        type = Random.randomElementIn(types);
        width = Random.randomBetween(scales.minWidth, scales.maxWidth + 1) / 100 * cWidth;
        height = Random.randomBetween(scales.minHeight, scales.maxHeight + 1) / 100 * cHeight;
        var x = Random.randomBetween(scales.minX, scales.maxX + 1) / 100 * cWidth;
        var y = Random.randomBetween(scales.minY, scales.maxY + 1) / 100 * cHeight;
        position = new Position(x, y);
        initialPosition = new Position(x, y);
        direction = Random.randomElementIn(directions);

    }

    function generateCode() {
        initRandomProperties();
        if (type === 'circle') {
            return " <circle position='absolute' class=\"small-shape\" id = \"" + id + "\" position = \"absolute\" z-index=\"-10\" cx=" + position.x + " cy=" + position.y + " r=" + width + " fill= \"" + fill + "\" />";
        } else if (type === 'rect') {
            return "<rect position='absolute' z-index=-10 class=\"small-shape\" id = \"" + id + "\" position = \"absolute\"  x=" + position.x + " y=" + position.y + " width=" + width + " height=" + height + " fill=\"" + fill + "\"/>";
        }
        return "";
    }

    this.create = function () {
        var code = generateCode();
        document.getElementById("smallShapeContainer").innerHTML += code;
    }

    this.update = function (delta) {

        var distanceFromInitPos = position.distanceTo(initialPosition);
        delta.scale(direction * factor(distanceFromInitPos));

        position.add(delta);
        if (type === "rect") {

            document.getElementById(id).setAttribute("x", position.x);
            document.getElementById(id).setAttribute("y", position.y);
            return;
        }
        if (type === "circle") {

            document.getElementById(id).setAttribute("cx", position.x);
            document.getElementById("shape-" + i).setAttribute("cy", position.y);
            return;
        }
        return;
    }
    function factor(dist) {
        return 1 / 20 * Math.pow(2, -1 * dist / 50);
    }
}

function ShapeManager() {

    var numberOfShapes = 15;

    var shapes = [];

    function createShapes() {
        for (i = 0; i < numberOfShapes; i++) {
            shapes.push(new Shape('shape-' + i));
            shapes[i].create();
        }
    }

    function configureMouse() {

        var lastMouse = new Position(-1, -1);
        $("html").mousemove(function (e) {

            var mouse = new Position(e.pageX, e.pageY);
            if (lastMouse.x > -1 && lastMouse.y > -1) {
                var delta = Position.subtract(mouse, lastMouse);
                for (i = 0; i < shapes.length; i++) {

                    // have to create temporary var value
                    // Because js passes object Position by reference.
                    var value = new Position(0, 0);
                    value.set(delta);
                    shapes[i].update(value);
                }
            }
            lastMouse.set(mouse);
        });
    }
    this.start = function () {
        createShapes();
        configureMouse();
    }
}

$(document).ready(function () {
    shapeManager = new ShapeManager();
    shapeManager.start();
});

