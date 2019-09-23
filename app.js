const format = document.getElementById('format'),
    before = document.getElementById('before'),
    after = document.getElementById('after'),
    input = document.querySelector('input'),
    wrapper = document.querySelector('.wrapper'),
    help = document.getElementById('help');

let counter = 0;
let hidden = false;

const randBg = () =>
    (document.body.style.background = `hsl(${Math.random() * 255}, 50%, 50%)`);

const toggleHidden = () => {
    hidden
        ? (wrapper.classList.remove('hidden'), help.classList.remove('hidden'))
        : (wrapper.classList.add('hidden'), help.classList.add('hidden'));
    hidden = !hidden;
};

let inputToCss = v => `#${v}`;

format.onclick = () => {
    // console.log(3);
    format.textContent = text = ['hex', 'rgb', 'hsl', 'css'][++counter % 4];
    input.value = '';
    if (text === 'hex') {
        input.placeholder = 'hexcode';
        before.textContent = '#';
        after.textContent = '';
        inputToCss = v => `#${v}`;
    } else if (text === 'rgb') {
        input.placeholder = 'r, g, b';
        before.textContent = '(';
        after.textContent = ')';
        inputToCss = v => `rgb(${v})`;
    } else if (text === 'hsl') {
        input.placeholder = 'h, s, l';
        before.textContent = '(';
        after.textContent = ')';
        inputToCss = v => `hsl(${v})`;
    } else if (text == 'css') {
        input.placeholder = 'color:';
        before.textContent = '';
        after.textContent = '';
        inputToCss = v => (v ? v : document.body.style.background);
    }
};

input.oninput = () => {
    document.body.style.background = inputToCss(input.value);
};

randBg();

document.onkeydown = event => {
    const { altKey, key } = event;
    if (altKey) {
        if (key === 'r') randBg();
        if (key === 'h') toggleHidden();
    }
};
