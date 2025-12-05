// Data storage key
const STORAGE_KEY = 'weblo_wizard_data';

// Default data
const defaultData = {
    businessName: '',
    industry: '',
    description: '',
    email: '',
    pages: [],
    style: 'Modern',
    features: []
};

// Load data from localStorage or use default
function loadData() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : { ...defaultData };
}

// Save data to localStorage
function saveData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Save current step data and navigate
function saveAndNext(step, nextUrl) {
    const data = loadData();

    if (step === 1) {
        data.businessName = document.getElementById('businessName').value;
        data.industry = document.getElementById('industry').value;
        data.description = document.getElementById('description').value;
        data.email = document.getElementById('email').value;
    } else if (step === 2) {
        const checkboxes = document.querySelectorAll('input[name="pages"]:checked');
        data.pages = Array.from(checkboxes).map(cb => cb.value);
    } else if (step === 3) {
        const selectedStyle = document.querySelector('.style-card.selected .style-name');
        if (selectedStyle) {
            data.style = selectedStyle.innerText;
        }
    } else if (step === 4) {
        const checkboxes = document.querySelectorAll('input[name="features"]:checked');
        data.features = Array.from(checkboxes).map(cb => cb.value);
    }

    saveData(data);
    window.location.href = nextUrl;
}

// Populate Review Screen (Step 5)
function loadReviewData() {
    const data = loadData();
    document.getElementById('reviewName').innerText = data.businessName || 'Not entered';
    document.getElementById('reviewIndustry').innerText = data.industry || 'Not selected';
    document.getElementById('reviewPages').innerText = data.pages.length > 0 ? data.pages.join(', ') : 'None';
    document.getElementById('reviewStyle').innerText = data.style;
    document.getElementById('reviewFeatures').innerText = data.features.length > 0 ? data.features.join(', ') : 'None';
}

// Finish Wizard
function finishWizard() {
    const data = loadData();
    alert('Building your website with the following details:\n' + JSON.stringify(data, null, 2));
    // Optional: Clear data after finish
    // localStorage.removeItem(STORAGE_KEY);
    // window.location.href = 'index.html';
}

// Initialize Step (Optional: Pre-fill data if returning)
function initStep(step) {
    const data = loadData();

    if (step === 1) {
        if (data.businessName) document.getElementById('businessName').value = data.businessName;
        if (data.industry) document.getElementById('industry').value = data.industry;
        if (data.description) document.getElementById('description').value = data.description;
        if (data.email) document.getElementById('email').value = data.email;
    } else if (step === 2) {
        data.pages.forEach(page => {
            const cb = document.querySelector(`input[name="pages"][value="${page}"]`);
            if (cb) cb.checked = true;
        });
    } else if (step === 3) {
        const cards = document.querySelectorAll('.style-card');
        cards.forEach(card => {
            card.classList.remove('selected');
            if (card.querySelector('.style-name').innerText === data.style) {
                card.classList.add('selected');
            }
        });
    } else if (step === 4) {
        data.features.forEach(feature => {
            const cb = document.querySelector(`input[name="features"][value="${feature}"]`);
            if (cb) cb.checked = true;
        });
    }
}

// Event Listeners for Style Cards (Step 3)
document.addEventListener('DOMContentLoaded', () => {
    const styleCards = document.querySelectorAll('.style-card');
    if (styleCards.length > 0) {
        styleCards.forEach(card => {
            card.addEventListener('click', () => {
                styleCards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
            });
        });
    }

    // Auto-init based on body data-step attribute if we wanted to be fancy, 
    // but calling initStep(N) in script tag on page is simpler.
});
