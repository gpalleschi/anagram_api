const Constants = require('./constants');

const getCount = async (Dictionary, sel_word, sel_language, sel_length) => {
	const count = await Dictionary.count({
            where: { word: sel_word,
                     language: sel_language,
		                 length: sel_length
	    }
	});
// console.log(count);
	return count;
}

const retErr = (errorCode, errorDesc) => {
	return ( { 'error' : errorCode,
	           'description' : errorDesc
	});
}

const checkBody = (language, word) => {
	let retValue = { 'error' : null,
			             'description' : null,
                 };

	if ( typeof language === 'undefined' ) {
	   retValue.error = retErr(101,'Language parameter not present in body.');
	}
	else {
	   if ( Constants.LANGUAGES.includes(language) === false ) {
	      retValue.error = retErr(102,'Language <' + language + '> not managed.');
	   }
	}

	if ( retValue.error === null ) {
     if ( typeof word === 'undefined' ) {
	     retValue.error = retErr(103,'Word parameter not present in body.');
	   } else {
       if ( word === null ) {
          retValue.error = retErr(104,'Word parameter is null in body.');
       } else {
         if ( !word.length ) {
            retValue.error = retErr(105,'Word parameter has length 0 in body.');
         } 
       }
     }
	}	
	return retValue;
}

const getWords = async (Dictionary, sel_language, sel_length, word_code) => {
  const ret = [];
  const listWords = await Dictionary.findAll({
            where: { language: sel_language,
		                 length: sel_length,
                     word_code: word_code
	                 }});
  for (const elem of listWords) {
    ret.push(elem.word);
  }
  return ret;
}

const getWordCode = (input_string) => {
  var ret=0
  primeNumbers = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401]

  for(i=0;i<input_string.length;i++)
  {
    var valChar = input_string.charCodeAt(i);
    if (valChar >= 65 && valChar <= 90) {
       ret += primeNumbers[valChar-65]
    } else {
      if (valChar >= 192 && valChar <= 221) {
        ret += primeNumbers[26+valChar-192]
      } else {
        return -1;
      }
    }
  }
  return ret
}

const checkWords = (arr, target) => target.every(v => arr.includes(v));

const getAnagrams = async (Dictionary, input_word, language) => {
  const ret = { 'language' : language,
                'word' : input_word,
                'anagrams' : []
              }
  const wordCode = getWordCode(input_word);
  if ( wordCode < 0 ) {
     return retErr(106,'Word contains some characters not recognized.');
  }
  const listWords = await getWords(Dictionary, language, input_word.length, wordCode);
  //console.log('listWords : ' + JSON.stringify(listWords));

  const wordToCheck = input_word.split('');
  for (const elem of listWords) {
    if ( checkWords(wordToCheck,elem.split('')) ) {
      if ( !(ret.anagrams.includes(elem)) ) ret.anagrams.push(elem);
    }
  }

  return ret;
  // res.status(200).json(anagrams);
} 

module.exports = {
    getAnagrams: getAnagrams,
    checkBody: checkBody
};
