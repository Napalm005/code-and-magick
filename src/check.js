function getMessage(a, b) {
    var result;
    if (typeof a === "boolean") {
        if (a) {
            result = "Я попал в " + b;
        } else {
            result = "Я никуда не попал";
        }
    } else if (typeof a === "number") {
        result = "Я прыгнул на " + a * 100 + " сантиметров";
    } else if (Array.isArray(a)) {
        if (Array.isArray(b)) {
            var length = 0;
            for (var i = 0; i < a.length; i++) {
                length += a[i] * b[i];
            }
            result = "Я прошёл " + length + " метров";
        } else {
            var sum = 0;
            for (var i = 0; i < a.length; i++) {
                sum += a[i];
            }
            result = "Я прошёл " + sum + " шагов";
        }
    }
    return result;
};


