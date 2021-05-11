const button = document.getElementById('playpause');
const time = document.getElementById('time');
const init = document.getElementById('init');
const incr = document.getElementById('incr');
const incg = document.getElementById('incg');
const incb = document.getElementById('incb');

const desc = document.getElementsByTagName('small');

window.onload = () => {
    begin();
};

button.onclick = (e) => {
    if (curr_state == states.RUNNING) {
        stop();
    } else {
        begin();
    }
};

const states = {
    RUNNING: 'RUNNING',
    STOPPED: 'STOPPED'
};

let curr_state = undefined;
    let interval = undefined;

    let increment = {};
    let timeInterval = undefined;
    let initColor = undefined;
    let currColor = undefined;

    const stop = () => {
        time.style.display = 'block';
        init.style.display = 'block';
        incr.style.display = 'block';
        incg.style.display = 'block';
        incb.style.display = 'block';

        for (let i = 0; i < desc.length; i++) {
            desc[i].style.display = 'block';
        }

        button.style.backgroundColor = '#06d6a0';
        button.style.color = '#02563F';
        button.innerHTML = 'Start';

    curr_state = states.STOPPED;

    clearInterval(interval);
};

const begin = () => {
    time.style.display = 'none';
    init.style.display = 'none';
    incr.style.display = 'none';
    incg.style.display = 'none';
    incb.style.display = 'none';

    for (let i = 0; i < desc.length; i++) {
        desc[i].style.display = 'none';
    }

    button.style.backgroundColor = '#ef476f';
    button.style.color = '#720A22';
    button.innerHTML = 'Stop';

    curr_state = states.RUNNING;

    increment.r = Number(incr.value);
    increment.g = Number(incg.value);
    increment.b = Number(incb.value);

    initColor = init.value;
    currColor = initColor;

    timeInterval = Number(time.value) * 1000;

    document.body.style.backgroundColor = initColor;
    interval = setInterval(change, timeInterval);
};

const change = () => {
    console.log('call');
    let r = parseInt(currColor.substr(1, 2), 16);
    let g = parseInt(currColor.substr(3, 2), 16);
    let b = parseInt(currColor.substr(5, 2), 16);

    console.log(r, g, b);
    r += increment.r;
    r %= 256;
    g += increment.g;
    g %= 256;
    b += increment.b;
    b %= 256;

    const newColor =
        '#' +
        r.toString(16).padStart(2, '0') +
        g.toString(16).padStart(2, '0') +
        b.toString(16).padStart(2, '0');
    console.log(newColor);
    currColor = newColor;
    document.body.style.backgroundColor = newColor;
};
