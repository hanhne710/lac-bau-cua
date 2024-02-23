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
let playerScores = {
    id1: 0,
    id2: 0,
    id3: 0
}; // Lưu điểm của mỗi người chơi

let totalScores = {
    id1: 0,
    id2: 0,
    id3: 0
}; // Lưu tổng điểm của mỗi người chơi

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
    const player1Name = document.getElementById("player1").value;
    const player2Name = document.getElementById("player2").value;
    const player3Name = document.getElementById("player3").value;

    if (!player1Name || !player2Name || !player3Name) {
        alert("Vui lòng nhập tên của 3 người chơi!");
        return;
    }

    if (selectedChoices.length === 0) {
        alert("Vui lòng chọn ít nhất một ô cược trước khi lắc!");
        return;
    }

    // Lắc kết quả
    const result = [];
    for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * choices.length);
        const choice = choices[randomIndex];
        result.push(choice);
    }

    // Tính điểm và hiển thị kết quả
    const score = calculateScore(result);
    displayResult(player1Name, player2Name, player3Name, result, score);
}

function calculateScore(result) {
    // Khởi tạo điểm cho mỗi người chơi trong ván mới
    let roundScores = {
        id1: 0,
        id2: 0,
        id3: 0
    };

    // Tăng điểm cho người chơi đoán đúng và giảm điểm cho người chơi đoán sai
    selectedChoices.forEach((choice, index) => {
        const player = "id" + (index + 1);
        const occurrences = result.filter(x => x === choice).length;
        if (occurrences > 0) {
            // Tăng điểm cho người chơi nếu lựa chọn xuất hiện trong kết quả
            roundScores[player] += occurrences;
        } else {
            // Giảm điểm cho người chơi nếu lựa chọn không xuất hiện trong kết quả
            roundScores[player]--;
        }
    });

    // Cập nhật tổng điểm và trả về điểm của từng ván
    Object.keys(roundScores).forEach(player => {
        playerScores[player] += roundScores[player];
        totalScores[player] += roundScores[player];
    });

    return roundScores;
}

function displayResult(player1Name, player2Name, player3Name, result, score) {
    // Hiển thị kết quả
    const popup = document.createElement("div");
    popup.classList.add("fixed", "top-0", "left-0", "w-full", "h-full", "flex", "justify-center", "items-center", "bg-black", "bg-opacity-50", "popup");
    const popupContent = document.createElement("div");
    popupContent.classList.add("bg-white", "rounded-lg", "p-8");
    const title = document.createElement("h2");
    title.classList.add("text-xl", "font-bold", "mb-4");
    title.textContent = "Kết quả";

    // Hiển thị hình ảnh kết quả cược
    const imagesContainer = document.createElement("div");
    imagesContainer.classList.add("flex", "justify-around", "mb-4");
    result.forEach(choice => {
        const choiceImage = document.createElement("img");
        choiceImage.src = imagePaths[choice];
        choiceImage.classList.add("result-image");
        imagesContainer.appendChild(choiceImage);
    });

    const resultContainer = document.createElement("div");
    resultContainer.classList.add("flex", "flex-col", "items-center");

    // Hiển thị điểm số và tên người chơi
    const player1ScoreItem = document.createElement("span");
    player1ScoreItem.textContent = `${player1Name}: ${score.id1} điểm (Tổng điểm: ${totalScores.id1})`;
    resultContainer.appendChild(player1ScoreItem);

    const player2ScoreItem = document.createElement("span");
    player2ScoreItem.textContent = `${player2Name}: ${score.id2} điểm (Tổng điểm: ${totalScores.id2})`;
    resultContainer.appendChild(player2ScoreItem);

    const player3ScoreItem = document.createElement("span");
    player3ScoreItem.textContent = `${player3Name}: ${score.id3} điểm (Tổng điểm: ${totalScores.id3})`;
    resultContainer.appendChild(player3ScoreItem);

    const closeButton = document.createElement("button");
    closeButton.textContent = "Đóng";
    closeButton.classList.add("mt-4", "bg-blue-500", "hover:bg-blue-700", "text-white", "font-bold", "py-2", "px-4", "rounded");
    closeButton.onclick = closePopup;

    popupContent.appendChild(title);
    popupContent.appendChild(imagesContainer); // Thêm hình ảnh kết quả cược vào popup
    popupContent.appendChild(resultContainer);
    popupContent.appendChild(closeButton);
    popup.appendChild(popupContent);

    document.body.appendChild(popup);
}


function closePopup() {
    const popup = document.querySelector(".popup");
    if (popup) {
        popup.remove();
        selectedChoices = [];
        const resultDiv = document.getElementById("result");
        resultDiv.innerHTML = "";
        updateSelectedChoicesUI();
    }
}
