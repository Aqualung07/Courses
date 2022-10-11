// Type JavaScript here and click "Run Code" or press Ctrl + s
console.log('Hello, world!');


// Challenge 1
function addTwo(num) {
	return num+2;
}

// To check if you've completed it, uncomment these console.logs!
// console.log(addTwo(3));
// console.log(addTwo(10));


// Challenge 2
function addS(word) {
	return word+'s';
}

// uncomment these to check your work
// console.log(addS('pizza'));
// console.log(addS('bagel'));


// Challenge 3
function map(array, callback) {
	let output = [];
  for (let i = 0; i < array.length; i++) {
    output.push(callback(array[i]));
  }
  return output;
}

// console.log(map([1, 2, 3], addTwo));


// Challenge 4
function forEach(array, callback) {
	for (let i = 0; i < array.length; i++) {
    callback(array[i]);
  }
}

// see for yourself if your forEach works!


// Challenge 5
function mapWith(array, callback) {
	let output = [];
  forEach(array, (item) => output.push(callback(item)));
  return output;
}

// console.log(mapWith([1, 2, 3], addTwo));


// Challenge 6
function reduce(array, callback, initialValue) {
	let finalValue = initialValue;
  
  for (let i = 0; i < array.length; i++) {
    finalValue = callback(finalValue, array[i]);
  }
  
  return finalValue;
}

// Challenge 7
function intersection(arrays) {
  let finalArray = [];
  
  finalArray = reduce(arrays, (initialArray, array) => {
    
    forEach(array, (item) => {
      let count = 0;
      forEach(arrays, (array2) => {
        if (array2.indexOf(item) !== -1) ++count;
      });  
      if (count == arrays.length && initialArray.indexOf(item) == -1) initialArray.push(item);  
    });
    
    return initialArray;
  }, []);
  
  return finalArray;
}

// console.log(intersection([[5, 10, 15, 20], [15, 88, 1, 5, 7], [1, 10, 15, 5, 20]]));
// should log: [5, 15]


// Challenge 8
function union(arrays) {
	let finalArray = [];
  
  finalArray = reduce(arrays, (initialArray, array) => {
    forEach(array, (item) => {
      if (initialArray.indexOf(item) == -1) initialArray.push(item);
    });
    return initialArray;
  }, []);
  
  return finalArray;
}

 //console.log(union([[5, 10, 15], [15, 88, 1, 5, 7], [100, 15, 10, 1, 5]]));
 //should log: [5, 10, 15, 88, 1, 7, 100]


// Challenge 9
function objOfMatches(array1, array2, callback) {
	let finalObj = {};
  
  for (let i = 0; i < array1.length; i++) {
    if (callback(array1[i]) == array2[i]) finalObj[array1[i]] = array2[i];
  }
  
  return finalObj;
}

// console.log(objOfMatches(['hi', 'howdy', 'bye', 'later', 'hello'], ['HI', 'Howdy', 'BYE', 'LATER', 'hello'], function(str) { return str.toUpperCase(); }));
// should log: { hi: 'HI', bye: 'BYE', later: 'LATER' }


// Challenge 10
function multiMap(arrVals, arrCallbacks) {
	let finalObj = {};
  
  forEach(arrVals, (val) => {
    
    forEach(arrCallbacks, (callback) => {
      if (!finalObj[val]) return finalObj[val] = [callback(val)]
    	return finalObj[val] = finalObj[val].concat(callback(val));
    });
    
  });
  
  return finalObj;
}

// console.log(multiMap(['catfood', 'glue', 'beer'], [function(str) { return str.toUpperCase(); }, function(str) { return str[0].toUpperCase() + str.slice(1).toLowerCase(); }, function(str) { return str + str; }]));
// should log: { catfood: ['CATFOOD', 'Catfood', 'catfoodcatfood'], glue: ['GLUE', 'Glue', 'glueglue'], beer: ['BEER', 'Beer', 'beerbeer'] }


// Challenge 11
function objectFilter(obj, callback) {
	let finalObj = {};
  
  finalObj = reduce(Object.keys(obj), (initialObj, key) => {
  	if (obj[key] == callback(obj[key])) initialObj[key] = obj[key];
    return initialObj;
  }, {});
  
  return finalObj;
}

//const cities = {
//  London: 'LONDON',
//  LA: 'Los Angeles',
//  Paris: 'PARIS',
//};

// console.log(objectFilter(cities, city => city.toUpperCase())) // Should log { London: 'LONDON', Paris: 'PARIS'}


// Challenge 12
function majority(array, callback) {
	let trueCount = 0;
  let falseCount = 0;
  
  forEach(array, (item) => {
    if (callback(item)) return ++trueCount;
    ++falseCount;
  });
  
  return trueCount > falseCount;
}

// /*** Uncomment these to check your work! ***/
// const isOdd = function(num) { return num % 2 === 1; };
// console.log(majority([1, 2, 3, 4, 5], isOdd)); // should log: true
// console.log(majority([2, 3, 4, 5], isOdd)); // should log: false


// Challenge 13
function prioritize(array, callback) {
	let finalArray = [];
  
  finalArray = reduce(array, (initialArray, item) => {
    callback(item) ? initialArray.unshift(item) : initialArray.push(item);
    return initialArray;
  }, []);
  
  return finalArray;
}

// /*** Uncomment these to check your work! ***/
// const startsWithS = function(str) { return str[0] === 's' || str[0] === 'S'; };
// console.log(prioritize(['curb', 'rickandmorty', 'seinfeld', 'sunny', 'friends'], startsWithS)); // should log:
// ['seinfeld', 'sunny', 'curb', 'rickandmorty', 'friends']


// Challenge 14
function countBy(array, callback) {
	let finalObj = {};
  
  finalObj = reduce(array, (initialObj, item) => {
    const key = callback(item);
    initialObj[key] = initialObj[key] ? ++initialObj[key] : 1;
    return initialObj;
  }, {})
  
  return finalObj;
}

// /*** Uncomment these to check your work! ***/
// console.log(countBy([1, 2, 3, 4, 5], function(num) {
// if (num % 2 === 0) return 'even';
// else return 'odd';
// })); // should log: { odd: 3, even: 2 }


// Challenge 15
function groupBy(array, callback) {
	let finalObj = {};
  
  finalObj = reduce(array, (initialObj, item) => {
    const key = callback(item);
    initialObj[key] = initialObj[key] ? initialObj[key].concat(item) : [item];
    return initialObj;
  }, {});
  
  return finalObj;
}

// /*** Uncomment these to check your work! ***/
// const decimals = [1.3, 2.1, 2.4];
// const floored = function(num) { return Math.floor(num); };
// console.log(groupBy(decimals, floored)); // should log: { 1: [1.3], 2: [2.1, 2.4] }


// Challenge 16
function goodKeys(obj, callback) {
	let finalArray = [];
  
  finalArray = reduce(Object.keys(obj), (initialArray, key) => {
    if (callback(obj[key])) initialArray.push(key);
    return initialArray;
  }, []);
  
  return finalArray;
}

// /*** Uncomment these to check your work! ***/
// const sunny = { mac: 'priest', dennis: 'calculating', charlie: 'birdlaw', dee: 'bird', frank: 'warthog' };
// const startsWithBird = function(str) { return str.slice(0, 4).toLowerCase() === 'bird'; };
// console.log(goodKeys(sunny, startsWithBird)); // should log: ['charlie', 'dee']


// Challenge 17
function commutative(func1, func2, value) {
	return func2(func1(value)) == func1(func2(value));
}

// /*** Uncomment these to check your work! ***/
// const multBy3 = n => n * 3;
// const divBy4 = n => n / 4;
// const subtract5 = n => n - 5;
// console.log(commutative(multBy3, divBy4, 11)); // should log: true
// console.log(commutative(multBy3, subtract5, 10)); // should log: false
// console.log(commutative(divBy4, subtract5, 48)); // should log: false


// Challenge 18
function objFilter(obj, callback) {
	let finalObj = {};
  
  finalObj = reduce(Object.keys(obj), (initialObj, key) => {
    if (callback(key) == obj[key]) initialObj[key] = obj[key];
    return initialObj;
  }, {});
  
  return finalObj;
}

// /*** Uncomment these to check your work! ***/
// const startingObj = {};
// startingObj[6] = 3;
// startingObj[2] = 1;
// startingObj[12] = 4;
// const half = n => n / 2;
// console.log(objFilter(startingObj, half)); // should log: { 2: 1, 6: 3 }


// Challenge 19
function rating(arrOfFuncs, value) {
	let totalTruthy = 0;
  
  forEach(arrOfFuncs, (func) => {
    if (func(value)) ++totalTruthy;
  });
  
  return (totalTruthy/arrOfFuncs.length)*100;
}

// /*** Uncomment these to check your work! ***/
// const isEven = n => n % 2 === 0;
// const greaterThanFour = n => n > 4;
// const isSquare = n => Math.sqrt(n) % 1 === 0;
// const hasSix = n => n.toString().includes('6');
// const checks = [isEven, greaterThanFour, isSquare, hasSix];
// console.log(rating(checks, 64)); // should log: 100
// console.log(rating(checks, 66)); // should log: 75


// Challenge 20
function pipe(arrOfFuncs, value) {
	let finalValue = "";
  
  finalValue = reduce(arrOfFuncs, (initialValue, func) => {
  	initialValue = initialValue ? func(initialValue) : func(value); 
    return initialValue;
  }, "");
  
  return finalValue;
}

// /*** Uncomment these to check your work! ***/
// const capitalize = str => str.toUpperCase();
// const addLowerCase = str => str + str.toLowerCase();
// const repeat = str => str + str;
// const capAddlowRepeat = [capitalize, addLowerCase, repeat];
// console.log(pipe(capAddlowRepeat, 'cat')); // should log: 'CATcatCATcat'


// Challenge 21
function highestFunc(objOfFuncs, subject = undefined) {
	if (subject == undefined) return '';
  let key;
  
}

// /*** Uncomment these to check your work! ***/
// const groupOfFuncs = {};
// groupOfFuncs.double = n => n * 2;
// groupOfFuncs.addTen = n => n + 10;
// groupOfFuncs.inverse = n => n * -1;
// console.log(highestFunc(groupOfFuncs, 5)); // should log: 'addTen'
// console.log(highestFunc(groupOfFuncs, 11)); // should log: 'double'
// console.log(highestFunc(groupOfFuncs, -20)); // should log: 'inverse'


// Challenge 22
function combineOperations(startVal, arrOfFuncs) {

}

function add100(num) {
  return num + 100;
}

function divByFive(num) {
  return num / 5;
}

function multiplyByThree(num) {
  return num * 3;
}

// /*** Uncomment these to check your work! ***/
// console.log(combineOperations(0, [add100, divByFive, multiplyByThree])); // Should output 60 -->
// console.log(combineOperations(0, [divByFive, multiplyFive, addTen])); // Should output 10


// Challenge 23
function myFunc(array, callback) {

}

const numbers = [2, 3, 6, 64, 10, 8, 12];
const evens = [2, 4, 6, 8, 10, 12, 64];

function isOdd(num) {
  return (num % 2 !== 0);
}

// /*** Uncomment these to check your work! ***/
// console.log(myFunc(numbers, isOdd)); // Output should be 1
// console.log(myFunc(evens, isOdd)); // Output should be -1


// Challenge 24
function myForEach(array, callback) {

}

let sum = 0;

function addToSum(num) {
  sum += num;
}

// /*** Uncomment these to check your work! ***/
// const nums = [1, 2, 3];
// myForEach(nums, addToSum);
// console.log(sum); // Should output 6
