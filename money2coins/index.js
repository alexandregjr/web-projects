const input = document.getElementById("money");
const cents = document.getElementById("cents");
const coins = document.getElementById("coins");

const processInput = (event) => {
    const { value } = event.target;

    if (!value) {
        cents.innerText = "No value.";
        coins.innerText = "";
        return;
    }
    
    const coinValues = [ 50, 25, 10, 5, 1 ]

    let centsAmt = parseInt(value * 100);
    const centsText = `${centsAmt} cents`;

    let coinChosen = 0;
    let coinCount = {
        50: 0,
        25: 0,
        10: 0,
        5: 0,
        1: 0
    };

    while (centsAmt > 0) {
        if (centsAmt < coinValues[coinChosen]) {
            coinChosen++;
            continue;
        }
        
        centsAmt -= coinValues[coinChosen];
        coinCount[coinValues[coinChosen]] += 1;
    }

    let coinsText = "";
    for (const coin of coinValues) {
            if (coinCount[coin] != 0)
            coinsText += `${coinCount[coin]}x ${coin}¢\n`
    }

    cents.innerText = centsText;
    coins.innerText = coinsText;
    }

input.oninput = processInput;
