let value = '';
let memory = 0; 
let op = '';
let toggle = false;

const numbers = document.getElementsByClassName('number');
const funcs = document.getElementsByClassName('func');

Array.from(numbers).forEach((numb) => { numb.onclick = add_number; })
Array.from(funcs).forEach((fn) => { fn.onclick = make_calc; })

document.getElementsByClassName('clear')[0].onclick = clear_memory;
document.getElementsByClassName('point')[0].onclick = add_point;

const display = document.getElementsByClassName('display')[0];

function clear_memory() {
    value = '';
    toggle = false;
    memory = 0;
    op = '';
    display.textContent = value;
}

function add_point() {
    if (value == '' || toggle) {
        value = '0.';
        toggle = false;
        display.textContent = value;
        return;
    }

    if (value.includes('.'))
        return;

    value += '.';
    display.textContent = value;
}

function add_number(event) {
    const clicked = event.target.textContent;
    if (value == '' && clicked == '0')
        return;
    
    if (!toggle) {
        value += clicked;
        display.textContent = value;
        return;
    }
    
    toggle = false;
    value = clicked;
    display.textContent = value;
}

function make_calc(event) {
    const clicked = event.target.textContent;
    
    if (memory == 0 && value == '')
        return;

    if (clicked == '%') {
        value = String(Number(value) / 100);
        display.textContent = value;
        return;
    }

    if (clicked == '=') {
        if (toggle) return;

        switch(op) {
            case '+':
                value = String(Number(value) + memory);
                break;
            case '-':
                value = String(memory - Number(value));
                break;
            case '*':
                value = String(Number(value) * memory);
                break;
            case '/':
                value = String(memory / Number(value));
                break;
            case '':
                break;
            default:
                console.log('NOT IMPLEMENTED: ' + op + '.');
                break;
        }

        op = '';
        toggle = true;
        display.textContent = value;
        return;
    }
    
    if (op != '') {
        switch(op) {
            case '+':
                memory = String(Number(value) + memory);
                break;
            case '-':
                memory = String(memory - Number(value));
                break;
            case '*':
                memory = String(Number(value) * memory);
                break;
            case '/':
                memory = String(memory / Number(value));
                break;
           default:
                console.log('NOT IMPLEMENTED: ' + op + '.');
                break;
        }
        op = clicked;
        toggle = true;
        return;
    }

    memory = Number(value);
    op = clicked;
    toggle = true;

}
