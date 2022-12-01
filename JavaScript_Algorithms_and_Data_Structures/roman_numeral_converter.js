/*
Convert the given number into a roman numeral.

Roman numerals	Arabic numerals
--------------------------------
        |    M	| 1000  |
        -----------------
        |    CM	| 900   |
        -----------------
        |    D	| 500   |
        -----------------
        |    CD	| 400   |
        -----------------
        |    C	| 100   |
        -----------------
        |    XC	| 90    |
        -----------------
        |    L	| 50    |
        -----------------
        |    XL	| 40    |
        -----------------
        |    X	| 10    |
        -----------------
        |    IX	| 9     |
        -----------------
        |    V	| 5     |
        -----------------
        |    IV	| 4     |
        -----------------
        |    I	| 1     |
---------------------------------
All roman numerals answers should be provided in upper-case.
*/

function convertToRoman(num) {

    // Create an object, containing every value classified by decimal.

    const numberObj = {
      0 : { 1: 'I', 4: 'IV', 5: 'V', 9: 'IX' },
      1 : { 10: 'X', 40: 'XL', 50: 'L', 90: 'XC' }, 
      2 : { 100: 'C', 400: 'CD', 500: 'D', 900: 'CM' },
      3 : { 1000: 'M' }
    };

    // Convert parameter value to array, making it iterable.

    num = num.toString().split("");

    // Store length value relative to the array, to reuse it.

    const parsedNumLength = num.length - 1;

    // Declare result array, where found values will be stored.

    let result = [];

    // Iterate parsed parameter array.

    for (let i = 0; i <= parsedNumLength; i++) {

        //  Get object keys based on the decimal that is being iterated.

        let values = Object.keys(numberObj[parsedNumLength-i]).reverse();

        // Parse iterated number to its decimal.

        let number = num[i] * Math.pow(10, parsedNumLength-i);

        // Iterate found object keys.

        for (let i2 = 0; i2 <= values.length-1; i2++) {

            // Iterate n times, corresponding to how many times the iterated values can be substracted from the parsed decimal.
            // Push the key value according to the previous statement.

            while (number - values[i2] >= 0) {
                result.push(numberObj[parsedNumLength-i][values[i2]]);
                number-=values[i2];
            }
        }
    }

    // Return joined result array (string)

    return result.join("");
  }
  
  console.log(convertToRoman(36));