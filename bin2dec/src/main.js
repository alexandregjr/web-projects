const input = document.getElementById("bin");
input.oninput = process;

const output = document.getElementById("result")

const regex = /^[01]*$/;

function process(event) {
    let binary = event.target.value;

    if (regex.test(binary)) {
        let result = bin2dec(binary);
        output.style = "font-weight: bold";
        output.innerText = result === 0 && binary.length === 0 ? "" : result;    
    } else {
        output.style = "color: #994433";
        output.innerText = "error: can only input 0's & 1's";
    }
}

function bin2dec(binary) {
    let binRev = binary.split("").reverse().join("");  
    
    let dec = 0;
    let pow = 1;
    for (const digit of binRev) {
        if (Number(digit) === 1) {
            dec += pow;
        }
        pow *= 2;
    }

    return dec;
}
