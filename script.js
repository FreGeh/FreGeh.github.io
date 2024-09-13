document.addEventListener('DOMContentLoaded', function() {
    // Load saved font settings or set default values
    const savedEnglishFont = localStorage.getItem('englishFont') || 'noto-sans';
    const savedUrduFont = localStorage.getItem('urduFont') || 'noto-nastaliq-urdu';

    // Log the retrieved values
    console.log('Retrieved English Font:', savedEnglishFont);
    console.log('Retrieved Urdu Font:', savedUrduFont);

    // Apply saved or default font settings
    document.body.classList.add(savedEnglishFont + '-font');
    document.querySelectorAll('.urdu-font').forEach(el => {
        el.classList.add(savedUrduFont + '-font');
    });
});
