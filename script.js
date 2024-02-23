const choices = ["đông", "ka", "tiên", "bảo", "hạnh", "thắm"];
const imagePaths = {
    "đông": "./img/dong.png",
    "ka": "./img/ka.png",
    "tiên": "./img/tien.png",
    "bảo": "./img/bao.png",
    "hạnh": "./img/hanh.png",
    "thắm": "./img/tien-nu-sgu.png"
};
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

    // Clear previous result displayed on the main page
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";

    // Generate new result and display in popup
    const popup = document.createElement("div");
    popup.classList.add("fixed", "top-0", "left-0", "w-full", "h-full", "flex", "justify-center", "items-center", "bg-black", "bg-opacity-50", "popup");
    const popupContent = document.createElement("div");
    popupContent.classList.add("bg-white", "rounded-lg", "p-8");
    const title = document.createElement("h2");
    title.classList.add("text-xl", "font-bold", "mb-4");
    const resultContainer = document.createElement("div");
    resultContainer.classList.add("flex", "items-center", "justify-center", "space-x-2", "mt-2");
    
    for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * choices.length);
        const result = choices[randomIndex];
        const diceImg = document.createElement("img");
        diceImg.classList.add("dice-image");
        diceImg.src = imagePaths[result];
        resultContainer.appendChild(diceImg);
    }

    const closeButton = document.createElement("button");
    closeButton.textContent = "Đóng";
    closeButton.classList.add("mt-4", "bg-blue-500", "hover:bg-blue-700", "text-white", "font-bold", "py-2", "px-4", "rounded");
    closeButton.onclick = closePopup;

    popupContent.appendChild(title);
    popupContent.appendChild(resultContainer);
    popupContent.appendChild(closeButton);
    popup.appendChild(popupContent);

    document.body.appendChild(popup);
}


function closePopup() {
    const popup = document.querySelector(".popup");
    if (popup) {
        popup.remove();
        // Reset selected choices array
        selectedChoices = [];
        // Clear previous results
        const resultDiv = document.getElementById("result");
        resultDiv.innerHTML = ""; // Clear the content
        // Update UI to reflect the reset
        updateSelectedChoicesUI();
    }
}


