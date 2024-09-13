document.addEventListener('DOMContentLoaded', function() {
    const englishFontSelect = document.getElementById('english-font');
    const urduFontSelect = document.getElementById('urdu-font');
    const fontForm = document.getElementById('font-form');

    // Check if elements exist
    if (!englishFontSelect || !urduFontSelect || !fontForm) {
        console.error('One or more elements not found');
        return;
    }

    // Load saved font settings or set default values
    const savedEnglishFont = localStorage.getItem('englishFont') || 'noto-sans';
    const savedUrduFont = localStorage.getItem('urduFont') || 'noto-nastaliq-urdu';

    // Apply saved or default font settings
    englishFontSelect.value = savedEnglishFont;
    urduFontSelect.value = savedUrduFont;

    // Save font settings on apply
    fontForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const selectedEnglishFont = englishFontSelect.value;
        const selectedUrduFont = urduFontSelect.value;

        // Log the values being saved
        console.log('Saving English Font:', selectedEnglishFont);
        console.log('Saving Urdu Font:', selectedUrduFont);

        // Save to localStorage
        localStorage.setItem('englishFont', selectedEnglishFont);
        localStorage.setItem('urduFont', selectedUrduFont);

        // Apply fonts
        document.body.className = ''; // Reset classes
        document.body.classList.add(selectedEnglishFont + '-font');
        document.querySelectorAll('.urdu-font').forEach(el => {
            el.className = 'urdu-font ' + selectedUrduFont + '-font';
        });
    });
});
