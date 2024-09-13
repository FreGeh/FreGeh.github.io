document.addEventListener('DOMContentLoaded', function() {
    // Load saved font settings or set default values
    const savedUrduFont = localStorage.getItem('urduFont') || 'noto-nastaliq-urdu';

    // Log the retrieved values
    console.log('Retrieved Urdu Font:', savedUrduFont);

    // Apply saved or default font settings
    document.querySelectorAll('.urdu-font').forEach(el => {
        el.classList.add(savedUrduFont + '-font');
    });
});
