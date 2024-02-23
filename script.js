const choices = ["bầu", "cua", "tôm", "cá", "gà", "nai"];

function play() {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";
    for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * choices.length);
        const result = choices[randomIndex];
        const diceDiv = document.createElement("div");
        diceDiv.classList.add("dice");
        diceDiv.textContent = result;
        resultDiv.appendChild(diceDiv);
    }
}
