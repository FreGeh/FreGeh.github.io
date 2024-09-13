function splitWord() {
    const inputWord = document.getElementById('inputWord').value;
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = ''; // Clear previous output
    let unicodeText = urduToUnicode(inputWord);
    let urduChars = unicodeToUrduArrayChars(unicodeText);
    const spacedWord = urduChars.map(char => {
        const romanizedChar = urduToRomanized[char] || char; // Get the Romanized version or use the character itself if not found
        return `<span class="tooltip">${char}<span class="tooltiptext"><span class="tooltiptext-inner" style="font-family:Noto Sans">${romanizedChar}</span></span></span>`;
    }).join(" "); // Add title attribute to each character
    outputDiv.innerHTML = spacedWord;
}

function urduToUnicode(urduText) {
    let unicodeText = '';
    for (let i = 0; i < urduText.length; i++) {
        unicodeText += '\\u' + urduText.charCodeAt(i).toString(16).padStart(4, '0');
    }
    return unicodeText;
}

function unicodeToUrdu(unicodeText) {
    let urduText = '';
    let unicodeArray = unicodeText.split('\\u').filter(Boolean);
    unicodeArray.forEach(code => {
        urduText += String.fromCharCode(parseInt(code, 16));
    });
    return urduText;
}

function unicodeToUrduArrayChars(unicodeText) {
    const urduChars = [];
    let count = 0;
    let unicodeArray = unicodeText.split(/(?=\\u)/).filter(Boolean);
    // go through whole array of unicodes and check for special combinations
    while (unicodeArray[count] != null) {
        let urduChar = null; // Changed from const to let
        // define first unicode element
        let firstElement = unicodeArray[count];
        console.log("first Element: " + firstElement.toString())
        // define Element after that if possible
        if (unicodeArray[count + 1] != null) {
            let secondElement = unicodeArray[count + 1];
            console.log("second Element: " + secondElement.toString())
            console.log("count: " + count.toString())
            // only for the first character define the Element after the next one
            if (count === 0) {
                // if theres a third element
                if (unicodeArray[count + 2] != null) {
                    let thirdElement = unicodeArray[count + 2];
                    console.log("third Element: " + thirdElement.toString())
                    // assign special urdu char combination if its the combo otherwise assign null
                    let threeWayKey = `${firstElement}${secondElement}${thirdElement}`;
                    console.log("checking if this combination is a special 3way combination " + threeWayKey)
                    urduChar = specialCombinationStart3map[threeWayKey] || null;
                    if (urduChar != null) {
                        count += 3;
                        console.log("special 3way combination at start found, char: " + urduChar)
                    }
                }
                // if no special urdu char has been assigned for three elements check for two
                if (urduChar == null) {
                    let twoWayKey = `${firstElement}${secondElement}`;
                    console.log("checking if this combination is a special 2way combination " + twoWayKey)
                    urduChar = specialCombinationStart2map[twoWayKey] || null;
                    if (urduChar != null) {
                        count += 2;
                        console.log("special 2way combination at start found, char: " + urduChar)
                    }
                }
                // just one simple unicode if no special combination
                if (urduChar == null) {
                    urduChar = unicodeToUrdu(firstElement);
                    count += 1;
                }
            } else {
                // if its not at the start check for middle special combos
                let twoWayKeyEnd = `${firstElement}${secondElement}`;
                urduChar = specialCombinationMiddle2map[twoWayKeyEnd] || null;
                if (urduChar != null) {
                    count += 2;
                } else {
                    // if theres no special middle combo, just normal 1 char urdu
                    urduChar = unicodeToUrdu(firstElement);
                    count += 1;
                }
            }
        } else {
            // just one simple unicode if theres no character after that available
            urduChar = unicodeToUrdu(firstElement);
            count += 1;
        }
        urduChars.unshift(urduChar);
    }
    return urduChars;
}

const specialCombinationStart2map = {
    '\\u0627\\u064e': 'اَ', // alif+zabar
    '\\u0627\\u0650': 'اِ', // alif+zer
    '\\u0627\\u064f': 'اُ', // alif+pesh
    '\\u0627\\u06cc': 'ایـ', // alif+ye
    '\\u0627\\u0648': 'او' // alif+vao
};
const specialCombinationStart3map = {
    '\\u0627\\u064e\\u06cc': 'اَیـ', // alif+zabar+ye
    '\\u0627\\u064e\\u0648': 'اَو', // alif+zabar+vao
    '\\u0627\\u064f\\u0648': 'اُو', // alif+vao+pesh
    '\\u0627\\u06cc\\u0650': 'اِیـ' // alif+ye+zer
};
const specialCombinationMiddle2map = {
    '\\u06cc\\u0648': 'ـیو', // ye+zer
    '\\u06cc\\u064e': 'ـیَـ', // ye+zabar
    '\\u0648\\u064f': 'ـوُ', // vao+pesh
    '\\u0648\\u064e': 'ـوَ' // vao+zabar
};
const urduToRomanized = {
    'ا': 'a',
    'آ': 'ā',
    'اَ': 'a',
    'اُ': 'u',
    'ایـ': 'e',
    'او': 'o',
    'اِ': 'i',
    'اَیـ': 'ai',
    'اَو': 'au',
    'اُو': 'ū',
    'اِیـ': 'ī',
    'ـیو': 'ī',
    'ـیَـ': 'ai',
    'ـوُ': 'ū',
    'ـوَ': 'au',
    'ب': 'b',
    'پ': 'p',
    'ت': 't',
    'ٹ': 'ṭ',
    'ث': 's',
    'ج': 'j',
    'چ': 'c',
    'ح': 'ḥ',
    'خ': 'kh',
    'د': 'd',
    'ڈ': 'ḍ',
    'ذ': 'z',
    'ر': 'r',
    'ڑ': 'ṛ',
    'ز': 'z',
    'ژ': 'zh',
    'س': 's',
    'ش': 'sh',
    'ص': 'ṣ',
    'ض': 'ẓ',
    'ط': 'ṭ',
    'ظ': 'ẓ',
    'ع': 'ʿ',
    'غ': 'gh',
    'ف': 'f',
    'ق': 'q',
    'ک': 'k',
    'گ': 'g',
    'ل': 'l',
    'م': 'm',
    'ن': 'n',
    'ں': 'ṅ',
    'و': 'w',
    'ہ': 'ḥ',
    'ء': 'ʾ',
    'ی': 'y',
    'ے': 'e'
};



// Example usage
let urduText = 'اِ';
let unicodeText = urduToUnicode(urduText);
console.log('Unicode:', unicodeText); // Output: \u0627\u0650

let transformedUrduText = unicodeToUrdu(unicodeText);
console.log('Urdu:', transformedUrduText); // Output: اِ