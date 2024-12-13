const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export function testEmail(email) {
    console.log(regex.test(email));
    return regex.test(email);
}
