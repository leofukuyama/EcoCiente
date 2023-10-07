let xmlDoc; // O documento XML
let currentLevel = "level1"; // Começa no nível 1
let currentPath = []; // Rastrea o caminho das escolhas do usuário

// Carregar o XML ao carregar a página
window.onload = function () {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            xmlDoc = this.responseXML;
            displayStory(xmlDoc);
        }
    };
    xhttp.open("GET", "historia.xml", true);
    xhttp.send();
};

// Exibir a história
function displayStory(xml) {
    const storyContainer = document.getElementById('story-container');
    const intro = xml.getElementsByTagName("introduction")[0].textContent;
    const title = xml.getElementsByTagName("story")[0].getAttribute("title");

    storyContainer.querySelector("h1").textContent = title;
    document.getElementById("introduction").textContent = intro;

    displayChoices(currentLevel, "");
}

// Exibir as escolhas
function displayChoices(level, path) {
    let choicesContainer = document.getElementById('choices');
    choicesContainer.innerHTML = ""; // Limpar escolhas anteriores

    let choices = xmlDoc.querySelectorAll(level + ">choice" + path);

    if (choices.length === 0) {
        // Se não houver mais escolhas, paramos aqui
        return;
    }

    choices.forEach(choice => {
        let btn = document.createElement('button');
        let img = document.createElement('img');
        btn.textContent = choice.getAttribute('description');
        img.src = choice.getAttribute('image');
        btn.onclick = function () {
            makeChoice(choice);
        };
        choicesContainer.appendChild(img);
        choicesContainer.appendChild(btn);
    });
}

// Fazer uma escolha
function makeChoice(choice) {
    let choiceDescription = choice.getAttribute('description');
    let choiceId = choice.getAttribute('id');
    currentPath.push(choiceId);
    updateHistory(choiceDescription, choiceId);
    displayChoices("level" + (currentPath.length + 1), generatePath());
}

// Atualizar o histórico de escolhas
function updateHistory(description, id) {
    let ulHistory = document.getElementById('choice-history').querySelector('ul');
    let ulIdHistory = document.getElementById('choice-id-history').querySelector('ul');

    let liHistory = document.createElement('li');
    liHistory.textContent = description;
    ulHistory.appendChild(liHistory);

    let liIdHistory = document.createElement('li');
    liIdHistory.textContent = id;
    ulIdHistory.appendChild(liIdHistory);
}

// Gerar o caminho XML com base no histórico de escolhas
function generatePath() {
    return currentPath.map((choiceId, idx) => `:nth-child(${parseInt(choiceId, 36) - 9})`).join(">level" + (idx + 2) + ">choice");
}