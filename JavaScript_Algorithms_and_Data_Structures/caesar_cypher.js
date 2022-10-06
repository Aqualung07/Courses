/*
One of the simplest and most widely known ciphers is a Caesar cipher, also known as a shift cipher. In a shift cipher the meanings of the letters are shifted by some set amount.

A common modern use is the ROT13 cipher, where the values of the letters are shifted by 13 places. Thus A ↔ N, B ↔ O and so on.

Write a function which takes a ROT13 encoded string as input and returns a decoded string.

All letters will be uppercase. Do not transform any non-alphabetic character (i.e. spaces, punctuation), but do pass them on.
*/


function rot13(str) {
    str = str.split("");
    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const threshold = alphabet.length;
    const decodedStr = [];
    
    for (let i = 0; i <= str.length-1; i++) {
      const char = str[i];
      if (alphabet.indexOf(char) != -1) {
        let newPosition = alphabet.indexOf(char) + 13;
        if (newPosition >= threshold) newPosition = newPosition - threshold;
        decodedStr.push(alphabet[newPosition])
      } else {
        decodedStr.push(char);
      }
    }
    return decodedStr.join("");
  }
  
  rot13("SERR PBQR PNZC");