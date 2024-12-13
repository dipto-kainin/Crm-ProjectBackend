const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function testEmail(email) {
    return emailRegex.test(email);
}