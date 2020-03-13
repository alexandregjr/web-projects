let inputs = document.getElementsByTagName("input");
let previewer = document.getElementById("previewer");
let cssValue = document.getElementById("css-value");

let errorState = false;

cssValue.onclick = copyCss

let regex = /^[0-9%]*$/

let borders = {
    tl: "0",
    tr: "0",
    br: "0",
    bl: "0"
}

for (let input of inputs) {
    input.oninput = changeBorder;
}

function changeBorder(event) {
    errorState = false;

    let corner = event.target.name;

    if (regex.test(event.target.value)) {
        borders[corner] = event.target.value != 0 ? event.target.value : "0";
    } else {
        errorState = true;
        cssValue.value = "ERROR! You can only insert numbers or '%' character";
        return;
    }

    let css = "border-radius: ";
    css += borders.tl;
    css += !borders.tl.endsWith("%") ? "px " : " ";
    css += borders.tr;
    css += !borders.tr.endsWith("%") ? "px " : " ";
    css += borders.br;
    css += !borders.br.endsWith("%") ? "px " : " "
    css += borders.bl;
    css += !borders.bl.endsWith("%") ? "px;" : ";"
    previewer.style = css

    cssValue.value = css;
}

function copyCss() {
    if (errorState)
        return;

    cssValue.focus();
    cssValue.select();

    document.execCommand("copy");
}