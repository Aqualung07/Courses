// TODO: write the validation functions
function isValidName(name) {
    return typeof name == "string" && name.split(" ").join("").length >= 3;
}

function hoursAttended(attended, length) {
    const validType = (...args) => {
        let valid = true;
        args.forEach(value => { 
            const type = typeof value;
            if (type !== "number" && type !== "string") return valid = false; 
        })
        return valid;
    }

    const validValue = (...args) => {
        let valid = true;
        args.forEach(value => {
            if ( (typeof value == "string" && !value.match(/\d+/)) ||
                    (value <= 0 || String(value).split('.')[1])
                ) {
                        return valid = false;
            }
        })
        return valid;
    }

    return validType(attended, length) && 
                validValue(attended, length) && 
                    Number(attended) <= Number(length);
}

// tests:
console.log(isValidName("Frank") === true);
console.log(hoursAttended(6,10) === true);
console.log(hoursAttended(6,"10") === true);
console.log(hoursAttended("6",10) === true);
console.log(hoursAttended("6","10") === true);

console.log(isValidName(false) === false);
console.log(isValidName(null) === false);
console.log(isValidName(undefined) === false);
console.log(isValidName("") === false);
console.log(isValidName("  \t\n") === false);
console.log(isValidName("X") === false);
console.log(hoursAttended("",6) === false);
console.log(hoursAttended(6,"") === false);
console.log(hoursAttended("","") === false);
console.log(hoursAttended("foo",6) === false);
console.log(hoursAttended(6,"foo") === false);
console.log(hoursAttended("foo","bar") === false);
console.log(hoursAttended(null,null) === false);
console.log(hoursAttended(null,undefined) === false);
console.log(hoursAttended(undefined,null) === false);
console.log(hoursAttended(undefined,undefined) === false);
console.log(hoursAttended(false,false) === false);
console.log(hoursAttended(false,true) === false);
console.log(hoursAttended(true,false) === false);
console.log(hoursAttended(true,true) === false);
console.log(hoursAttended(10,6) === false);
console.log(hoursAttended(10,"6") === false);
console.log(hoursAttended("10",6) === false);
console.log(hoursAttended("10","6") === false);
console.log(hoursAttended(6,10.1) === false);
console.log(hoursAttended(6.1,10) === false);
console.log(hoursAttended(6,"10.1") === false);
console.log(hoursAttended("6.1",10) === false);
console.log(hoursAttended("6.1","10.1") === false);
