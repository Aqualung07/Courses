// TODO: write `findAll(..)`
function findAll(match, array) {
	const resultArray = [];

	const matchFn = (value) => {
		if (Object.is(value, match)) return resultArray.push(value);
		
		if (typeof value == "string") {
			if (typeof match == "number" &&
				!Object.is(match, -0) &&
				value.trim().length) {
					if (value == match) return resultArray.push(value);
				}
			if (typeof match == "string") {
				if (value == match) return resultArray.push(value);
			}
		}

		if (typeof value == "number") {
			if (typeof match == "string" &&
				match.trim().length &&
				!Object.is(value, NaN) &&
				!Object.is(value, Infinity) && 
				!Object.is(value, -Infinity) &&
				!Object.is(value, -0)
				) {
					if (match == value) return resultArray.push(value);
				}
		}

		if (match == undefined && value == match) return resultArray.push(value);
		
		if (typeof match == "boolean" && value === match) {
			return resultArray.push(value);
		}
	}
	
	array.forEach(item => matchFn(item));
	return resultArray;
}


// tests:
var myObj = { a: 2 };

var values = [
	null, undefined, -0, 0, 13, 42, NaN, -Infinity, Infinity,
	"", "0", "42", "42hello", "true", "NaN", true, false, myObj
];

console.log(setsMatch(findAll(null,values),[null,undefined]) === true);
console.log(setsMatch(findAll(undefined,values),[null,undefined]) === true);

console.log(setsMatch(findAll(0,values),[0,"0"]) === true);
console.log(setsMatch(findAll(-0,values),[-0]) === true);

console.log(setsMatch(findAll(13,values),[13]) === true);
console.log(setsMatch(findAll(42,values),[42,"42"]) === true);
console.log(setsMatch(findAll(NaN,values),[NaN]) === true);
console.log(setsMatch(findAll(-Infinity,values),[-Infinity]) === true);
console.log(setsMatch(findAll(Infinity,values),[Infinity]) === true);

console.log(setsMatch(findAll("",values),[""]) === true);

console.log(setsMatch(findAll("0",values),[0,"0"]) === true);

console.log(setsMatch(findAll("42",values),[42,"42"]) === true);
console.log(setsMatch(findAll("42hello",values),["42hello"]) === true);
console.log(setsMatch(findAll("true",values),["true"]) === true);
console.log(setsMatch(findAll(true,values),[true]) === true);
console.log(setsMatch(findAll(false,values),[false]) === true);
console.log(setsMatch(findAll(myObj,values),[myObj]) === true);

console.log(setsMatch(findAll(null,values),[null,0]) === false);
console.log(setsMatch(findAll(undefined,values),[NaN,0]) === false);
console.log(setsMatch(findAll(0,values),[0,-0]) === false);
console.log(setsMatch(findAll(42,values),[42,"42hello"]) === false);
console.log(setsMatch(findAll(25,values),[25]) === false);
console.log(setsMatch(findAll(Infinity,values),[Infinity,-Infinity]) === false);
console.log(setsMatch(findAll("",values),["",0]) === false);
console.log(setsMatch(findAll("false",values),[false]) === false);
console.log(setsMatch(findAll(true,values),[true,"true"]) === false);
console.log(setsMatch(findAll(true,values),[true,1]) === false);
console.log(setsMatch(findAll(false,values),[false,0]) === false);

// ***************************

function setsMatch(arr1,arr2) {
	if (Array.isArray(arr1) && Array.isArray(arr2) && arr1.length == arr2.length) {
		for (let v of arr1) {
			if (!arr2.includes(v)) return false;
		}
		return true;
	}
	return false;
}
