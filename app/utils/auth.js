export const AUTH_KEY = 'weblo_auth_token';
export const AUTH_EVENT = 'weblo_auth_change';

export function isAuthenticated() {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem(AUTH_KEY);
}

export function login(email) {
    if (typeof window === 'undefined') return;
    const token = btoa(email + ':' + Date.now());
    localStorage.setItem(AUTH_KEY, token);
    window.dispatchEvent(new Event(AUTH_EVENT));
}

export function logout() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(AUTH_KEY);
    window.dispatchEvent(new Event(AUTH_EVENT));
}
