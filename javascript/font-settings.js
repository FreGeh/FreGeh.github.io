document.addEventListener('DOMContentLoaded', function() {
    const urduFontSelect = document.getElementById('urdu-font');
    const fontForm = document.getElementById('font-form');

    const savedUrduFont = localStorage.getItem('urduFont') || 'noto-nastaliq-urdu';

    urduFontSelect.value = savedUrduFont;

    // Save font settings on apply
    fontForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const selectedUrduFont = urduFontSelect.value;

        // Log the values being saved
        console.log('Saving Urdu Font:', selectedUrduFont);

        // Save to localStorage
        localStorage.setItem('urduFont', selectedUrduFont);

        // Apply fonts
        document.body.className = ''; // Reset classes
        document.querySelectorAll('.urdu-font').forEach(el => {
            el.className = 'urdu-font ' + selectedUrduFont + '-font';
        });
    });
});
