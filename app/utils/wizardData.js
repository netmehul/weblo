export const STORAGE_KEY = 'weblo_wizard_data';

export const defaultData = {
    businessName: '',
    industry: '',
    description: '',
    email: '',
    pages: ['Home'], // default
    style: 'Modern',
    features: []
};

export function loadData() {
    if (typeof window === 'undefined') return defaultData;
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : { ...defaultData };
}

export function saveData(data) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
