const choices = ["bầu", "cua", "tôm", "cá", "gà", "nai"];
let selectedChoices = [];

function setSelectedChoice(choice) {
    if (selectedChoices.length >= 3 && !selectedChoices.includes(choice)) {
        alert("Bạn chỉ được chọn tối đa 3 ô!");
        return;
    }

    if (selectedChoices.includes(choice)) {
        selectedChoices = selectedChoices.filter(item => item !== choice);
    } else {
        selectedChoices.push(choice);
    }

    updateSelectedChoicesUI();
}

function updateSelectedChoicesUI() {
    document.querySelectorAll('.choice').forEach(item => {
        item.classList.remove('selected');
        item.classList.remove('bg-blue-300');
    });

    selectedChoices.forEach(choice => {
        const selectedElement = document.querySelector(`.choice[data-choice='${choice}']`);
        selectedElement.classList.add('selected');
        selectedElement.classList.add('bg-blue-300');
    });
}

function play() {
    if (selectedChoices.length === 0) {
        alert("Vui lòng chọn ít nhất một ô cược trước khi lắc!");
        return;
    }

    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";
    let winningCount = 0;
    let diceResults = "";

    for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * choices.length);
        const result = choices[randomIndex];
        const diceDiv = document.createElement("div");
        diceDiv.classList.add("dice");
        diceDiv.textContent = result;
        resultDiv.appendChild(diceDiv);

        if (selectedChoices.includes(result)) {
            winningCount++;
        }

        diceResults += result + " ";
    }

    const popup = document.createElement("div");
    popup.classList.add("fixed", "top-0", "left-0", "w-full", "h-full", "flex", "justify-center", "items-center", "bg-black", "bg-opacity-50", "popup");
    popup.innerHTML = `
        <div class="bg-white rounded-lg p-8">
            <p>${diceResults}</p>
            <button onclick="closePopupAndReset()" class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Đóng</button>
        </div>
    `;

    document.body.appendChild(popup);
}

function closePopupAndReset() {
    reset(); // Reset trò chơi khi đóng cửa sổ popup
    closePopup();
}

function closePopup() {
    const popup = document.querySelector(".popup");
    if (popup) {
        popup.remove();
    }
}

function reset() {
    selectedChoices = [];
    updateSelectedChoicesUI();
    document.getElementById("gameResult").textContent = "";
    document.getElementById("result").innerHTML = "";
}
