export function random(len: number) {
    let options = "qwertyuiopasdfghjklzxcvbnm1234567890"
    let string = '';
    for(let i = 0; i < len; i++) {
        string += options[Math.round((Math.random() * 10))]
    }

    return string;
}