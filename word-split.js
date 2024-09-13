function splitWord() {
    const inputWord = document.getElementById('inputWord').value;
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = ''; // Clear previous output

    // Regular expression to match Urdu characters
    const urduRegex = /^[\u0600-\u06FF\s]+$/;

    // Mapping of Urdu characters to their Romanized equivalents
    const romanizedMap = {
        'ا': 'a',
        'ب': 'b',
        'پ': 'p',
        'ت': 't',
        'ٹ': 'ṭ',
        'ث': 's',
        'ج': 'j',
        'چ': 'ch',
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
        'ہ': 'h',
        'ء': 'ʾ',
        'ی': 'y',
        'ے': 'e'
    };

    if (urduRegex.test(inputWord)) {
        const inputArray = inputWord.split(""); // Split the word into characters
        const spacedWord = inputArray.map(char => {
            const romanizedChar = romanizedMap[char] || char; // Get the Romanized version or use the character itself if not found
            return `<span class="tooltip">${char}<span class="tooltiptext"><span class="tooltiptext-inner">${romanizedChar}</span></span></span>`;
        }).join(" "); // Add title attribute to each character
        outputDiv.innerHTML = spacedWord;
    } else {
        outputDiv.innerHTML = 'Please enter only Urdu characters.';
    }
}