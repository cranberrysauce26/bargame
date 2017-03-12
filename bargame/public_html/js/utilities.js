//Some helper functions

function Position(x, y) {
    this.x = x;
    this.y = y;
    this.add = function (delta) {
        this.x += delta.x;
        this.y += delta.y;
    };
    this.scale = function() {
        if (arguments.length==0) return;
        if (arguments.length == 1) {
            var factor = arguments[0];
            this.x *= factor;
            this.y *= factor;
            return;
        } 
        this.x *= arguments[0];
        this.y *= arguments[1];
        return;
    }
    this.length = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };
    this.distanceTo = function(other) {
        var newPos = new Position(this.x-other.x, this.y-other.y);
        return newPos.length();
    }
    this.set = function(other) {
        this.x = other.x;
        this.y = other.y;
    }
}

Position.subtract = function(p1, p2) {
    return new Position(p1.x-p2.x, p1.y-p2.y);
}

// Create an class IntervalSet which is a set on the real numbers.

function Interval(min, max) {
    this.min = min;
    this.max = max;
}

function IntervalSet(intervals) {

    // sorts the arguments in ascending order by minimum
    intervals.sort(function (a, b) {
        return a.min - b.min;
    });

    // Get rid of all invalid intervals
    for (i = 0; i < intervals.length; i++) {
        if (intervals[i].min >= intervals[i].max) {
            // remove the invalid term in the argument array
            intervals.splice(i, 1);
        }
    }

    for (i = 0; i < intervals.length; i++) {
        var max = intervals[i].max;
        for (j = i + 1; j < intervals.length; j++) {
            // if j is completely inside i
            if (intervals[j].min >= intervals[i].min && intervals[j].max <= max) {
                // remove all between i and j inclusively
                // add in the ith index [arguments[i][0], arguments[j][1]]
                intervals.splice(i, j - i + 1, new Interval(intervals[i].min, intervals[i].max));
                j = i;

            }
            // if j is completely seperate from i
            else if (max < intervals[j].min) {
                // all is normal. keep on looping
                continue;
            }
            // if j is partially inside and outside
            else if (intervals[j].min <= max && intervals[j].max > max) {
                intervals.splice(i, j - i + 1, new Interval(intervals[i].min, intervals[j].max));
                j = i;
            }
            else {
                console.log("this case should not be executed. i==" + i + " j==" + j);
            }
        }
    }

    this.intervals = intervals;
    if (intervals.length > 0) {
        this.min = intervals[0].min;
        this.max = intervals[intervals.length - 1].max;
        this.numberOfDisjointIntervals = intervals.length;
    }



    this.isNull = function () {
        return this.min >= this.max;
    }
    // this function takes an IntervalSet as an argument
    // It then deletes all the members of this set from the interval
    this.deleteIntervalSet = function (delInterval) {
        if (delInterval.isNull()) {
            console.log("del interval is null");
            return this;
        }

        var myIntervals = this.intervals;
        // console.log("delInterval: ");
        // console.log(delInterval);
        var delIntervals = delInterval.intervals;
        while (delIntervals.length > 0) {
            var currentDelInterval = delIntervals.pop();
            var delMin = currentDelInterval.min;
            var delMax = currentDelInterval.max;
            for (i = 0; i < myIntervals.length; i++) {

                if (myIntervals[i].max >= currentDelInterval.min && myIntervals[i].min <= currentDelInterval.min) {
                    var min = myIntervals[i].min;
                    for (j = i; j < myIntervals.length; j++) {

                        if (myIntervals[j].max >= currentDelInterval.max && myIntervals[j].min <= currentDelInterval.min) {
                            var max = myIntervals[j].max;
                            // There are four cases
                            if (min < delMin) {
                                if (max > delMax) {
                                    myIntervals.splice(i, j - i + 1, new Interval(min, delMin), new Interval(delMax, max));
                                } else {
                                    myIntervals.splice(i, j - i + 1, new Interval(min, delMin));
                                }
                            } else {
                                if (max > delMax) {
                                    myIntervals.splice(i, j - i + 1, new Interval(delMax, max));
                                } else {
                                    //do nothing
                                }
                            }

                            break;
                        }
                    }
                    break;
                }
            }
        }
        return new IntervalSet(myIntervals);
    };



    this.randomIntInInterval = function () {
        // console.log("we're choosing a random int. Here's lengths");
        if (intervals.length == 0) return;
        var lengths = [intervals[0].max - intervals[0].min];
        // console.log("lengths[0]==" + lengths[0]);
        for (i = 1; i < this.numberOfDisjointIntervals; i++) {
            lengths.push(lengths[i - 1] + intervals[i].max - intervals[i].min + 1);
            // console.log("lengths[" + i + "]==" + lengths[i]);
        }
        var temp = Random.randomIntBetween(0, lengths[lengths.length - 1] + 1);
        // console.log("temp==" + temp);
        var index = 0;
        if (temp <= lengths[0]) {
            // console.log("in zero");
            index = 0;
        } else {
            // console.log("in other");
            for (i = 1; i < lengths.length; i++) {
                if (temp <= lengths[i] && temp > lengths[i - 1]) {
                    index = i;
                    break;
                }
            }
        }
        // console.log("index==" + index);
        var random = Random.randomIntBetween(intervals[index].min, intervals[index].max);
        // console.log("randomly chosen int==" + random);
        return random;
    };
}

function Random() {};
Random.randomIntBetween = function(a, b) {
    if (a > b) return;
    return Math.floor(Math.random() * (b - a) + a);
}
Random.randomBetween = function(a, b) {
    if (a > b) return;
    return Math.random()*(b-a)+a;
}

Random.randomElementIn = function(array) {
    if (array.length==0) return;
    return array[Random.randomIntBetween(0, array.length)];
}

