function loadPassword(password) {
    P[0] = password.length;
    for (let i = 0; i < password.length; i++) {
        P[i + 1] = password.charCodeAt(i);
    }
}
function check(password) {
    resetAnimation();
    loadPassword(password);
    runAnimation();
}

let debounceTimer;
password.oninput = () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        password.setAttribute('disabled', true);
        window.onAnimationDone = () => {
            delete window.onAnimationDone;
            password.removeAttribute('disabled');
            password.focus();
        };
        check(password.value);
    }, 350);
};

// rules
const randInt = (hi,lo=0) => Math.floor(Math.random() * (hi-lo) + lo);
const filled = (count, fn) => new Array(count).fill().map(fn).join('');
const repeat = (fn, count) => new Array(count).fill().map(fn);
const combiningChar = () => String.fromCharCode(randInt(879, 768));
const zalgo = (str) => str.split('').map((char) => `${char}${repeat(combiningChar, 7).join('')}`).join('');
const word = (min=2, max=11) => new Array(randInt(max, min)).fill(0).map(() => String.fromCharCode(Math.floor(Math.random()*26+0x61))).join('');
const randomSentence = (min=3, max=11) => new Array(randInt(max, min)).fill(0).map(() => zalgo(word())).join(' ');
document.querySelectorAll('.rule-desc').forEach(elem => elem.textContent = randomSentence());
