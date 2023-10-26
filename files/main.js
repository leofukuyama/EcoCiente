let choiceHistory = [];
let choiceIdHistory = [];

document.addEventListener("DOMContentLoaded", function () {
    fetch('historia.xml')
        .then(response => response.text())
        .then(data => {
            let parser = new DOMParser();
            let xml = parser.parseFromString(data, "application/xml");
            displayStory(xml);
            displayChoices(xml.querySelector('level1'));
        })
        .catch(err => {
            console.error('Erro ao carregar a história:', err);
        });
});

function displayStory(xml) {
    const title = xml.querySelector('story').getAttribute('title');
    const introduction = xml.querySelector('introduction').textContent;

    document.querySelector('h1').textContent = title;
    document.getElementById('introduction').textContent = introduction;
}

function displayChoices(node) {
    const choicesDiv = document.getElementById('choices');
    choicesDiv.innerHTML = '';

    const choices = node.querySelectorAll(':scope > choice');
    choices.forEach(choice => {
        const choiceContainer = document.createElement('div');
        choiceContainer.classList.add('choice-container');

        const btn = createChoiceButton(choice);
        const img = createChoiceImage(choice);

        btn.addEventListener('click', () => handleChoiceSelection(choice));

        choiceContainer.appendChild(btn);
        choiceContainer.appendChild(img);
        choicesDiv.appendChild(choiceContainer);
    });

    if (choiceHistory.length) {
        const backButton = createBackButton();
        backButton.addEventListener('click', handleBackButtonClick);
        choicesDiv.appendChild(backButton);
    }
}

function createChoiceButton(choice) {
    const btn = document.createElement('button');
    btn.textContent = choice.getAttribute('description');
    btn.classList.add('choice-button');
    return btn;
}

function createChoiceImage(choice) {
    const img = document.createElement('img');
    const imageSrc = choice.getAttribute('image');
    if (imageSrc) {
        img.src = imageSrc;
        img.classList.add('img');
    }
    return img;
}

function handleChoiceSelection(choice) {
    addChoiceToHistory(choice.getAttribute('description'));
    addChoiceIdToHistory(choice.getAttribute('id'));

    const feedbackText = getFeedbackText(choice.getAttribute('id'));
    displayFeedback(feedbackText);

    const nextLevel = choice.querySelector(':scope > level2, :scope > level3, :scope > level4, :scope > level5, :scope > level6, :scope > level7');

    if (nextLevel) {
        choiceHistory.push(choice.parentNode);
        displayChoices(nextLevel);
    }
}

function createBackButton() {
    const backButton = document.createElement('button');
    backButton.textContent = "Voltar";
    backButton.classList.add('back-button');
    return backButton;
}

function handleBackButtonClick() {
    removeLastChoiceFromHistory();
    removeLastChoiceIdFromHistory();
    displayFeedback(""); // Limpa o feedback ao voltar
    const previousChoice = choiceHistory.pop();
    displayChoices(previousChoice);
}

function addChoiceToHistory(choice) {
    const li = document.createElement('li');
    li.textContent = choice;
    document.querySelector('#choice-history ul').appendChild(li);
}

function removeLastChoiceFromHistory() {
    const ul = document.querySelector('#choice-history ul');
    if (ul.lastChild) {
        ul.removeChild(ul.lastChild);
    }
}

function addChoiceIdToHistory(choiceId) {
    const li = document.createElement('li');
    li.textContent = choiceId;
    document.querySelector('#choice-id-history ul').appendChild(li);
}

function removeLastChoiceIdFromHistory() {
    const ul = document.querySelector('#choice-id-history ul');
    if (ul.lastChild) {
        ul.removeChild(ul.lastChild);
    }
}

function getFeedbackText(choiceId) {
    if (choiceId === 'A') {
        return "Feedback: Essa decisão resultou em uma maior disponibilidade de terras para a agricultura, permitindo uma plantação mais extensa. No entanto, essa ação teve um impacto significativo na biodiversidade da região, com a perda de habitats naturais e redução na diversidade de espécies.";
    } else if (choiceId === 'A1') {
        return "Feedback: Os fertilizantes químicos podem aumentar significativamente o crescimento das plantas, resultando em uma colheita inicialmente mais abundante. No entanto, o uso frequente de fertilizantes químicos podem prejudicar a qualidade do solo e contaminar os recursos hídricos da região a longo prazo.";
    } else if (choiceId === 'A1a') {
        return "Feedback: É uma estratégia que pode levar a lucros rápidos, no entanto, monoculturas de milho e soja podem esgotar rapidamente o solo e aumentar a suscetibilidade a pragas específicas dessas culturas.";
    } else if (choiceId === 'A1a1') {
        return "Feedback: Você conseguirá proteger suas culturas de pragas e doenças de forma eficaz. Isso pode resultar em uma colheita saudável e abundante. No entanto, o uso excessivo de pesticidas químicos pode apresentar impactos negativos ao meio ambiente, prejudicando a biodiversidade e contaminando a água e o solo.";
    } else if (choiceId === 'A1a1a') {
        return "Feedback: Os animais, como cavalos ou bois, podem ser usados para puxar arados, colheitadeiras e outros equipamentos agrícolas, minimizando a dependência de combustíveis fósseis e reduzindo a poluição do ar. No entanto, esse método pode ser mais demorado e requer treinamento e cuidados adequados com os animais.";
    } else if (choiceId === 'A1a1b') {
        return "Feedback: Optar pela colheita manual reduz o impacto no solo e plantas, promovendo a sustentabilidade em sua fazenda. Esta abordagem pode ser mais trabalhosa, mas resulta em menor compactação do solo e menos danos às plantas.";
    } else if (choiceId === 'A1a2') {
        return "Feedback: Inserir predadores naturais em seu plantio para controle de pragas ajuda a manter o equilíbrio ecológico em sua fazenda. Evitando o uso de pesticidas químicos prejudiciais ao meio ambiente, preservando a biodiversidade e promovendo uma agricultura sustentável.";
    } else if (choiceId === 'A1a2a') {
        return "Feedback: Os animais, como cavalos ou bois, podem ser usados para puxar arados, colheitadeiras e outros equipamentos agrícolas, minimizando a dependência de combustíveis fósseis e reduzindo a poluição do ar. No entanto, esse método irá demorar e requer treinamento e cuidados adequados com os animais.";
    } else if (choiceId === 'A1a2b') {
        return "Feedback: A colheita manual reduz o impacto no solo e nas plantas, promovendo a sustentabilidade em sua fazenda. Esta abordagem pode ser mais trabalhosa, mas resulta em menor compactação do solo e menos danos às plantas.";
    } else if (choiceId === 'A1b') {
        return "Feedback: Plantar legumes e frutas acaba por preservar o solo e a diversidade de culturas. Essas culturas são conhecidas por melhorar a qualidade do solo e são uma opção mais sustentável, contribuindo para a saúde do ecossistema.";
    } else if (choiceId === 'A1b1') {
        return "Feedback: Você conseguirá proteger suas culturas de pragas e doenças de forma eficaz. Isso pode resultar em uma colheita mais saudável e abundante. No entanto, o uso excessivo de pesticidas químicos pode ter impactos negativos no meio ambiente, prejudicando a biodiversidade e contaminando o solo e a água.";
    } else if (choiceId === 'A1b1a') {
        return "Feedback: Os animais, como cavalos ou bois, podem ser usados para puxar arados, colheitadeiras e outros equipamentos agrícolas, minimizando a dependência de combustíveis fósseis e reduzindo a poluição do ar. No entanto, esse método pode ser mais demorado e requer treinamento e cuidados adequados com os animais.";
    } else if (choiceId === 'A1b1b') {
        return "Feedback: Optar pela colheita manual reduz o impacto no solo e nas plantas, promovendo a sustentabilidade em sua fazenda. Esta abordagem pode ser mais trabalhosa, mas resulta em menor compactação do solo e menos danos às plantas.";
    } else if (choiceId === 'A1b2') {
        return "Feedback: Inserir predadores naturais em seu plantio é uma abordagem de controle de pragas que ajuda a manter o equilíbrio ecológico em sua fazenda. Isso evita o uso de pesticidas químicos prejudiciais ao meio ambiente, preservando a biodiversidade e promovendo uma agricultura sustentável.";
    } else if (choiceId === 'A1b2a') {
        return "Feedback: Os animais, como cavalos ou bois, podem ser usados para puxar arados, colheitadeiras e outros equipamentos agrícolas, minimizando a dependência de combustíveis fósseis e reduzindo a poluição do ar. No entanto, esse método pode ser mais demorado e requer treinamento e cuidados adequados com os animais.";
    } else if (choiceId === 'A1b2b') {
        return "Feedback: Optar pela colheita manual reduz o impacto no solo e nas plantas, promovendo a sustentabilidade em sua fazenda. Esta abordagem pode ser mais trabalhosa, mas resulta em menor compactação do solo e menos danos às plantas.";
    } else if (choiceId === 'A2') {
        return "Feedback: Você optou pela compostagem, compensando assim o desmatamento. Essa abordagem ajuda a manter a saúde do solo a longo prazo, preservando o equilíbrio ambiental e promovendo a sustentabilidade em sua fazenda.";
    } else if (choiceId === 'A2a') {
        return "Feedback: Monoculturas de milho e soja podem levar a lucros rápidos, no entanto, acabam por esgotar rapidamente o solo e aumentar a suscetibilidade a pragas específicas dessas culturas.";
    } else if (choiceId === 'A2a1') {
        return "Feedback: Você conseguirá proteger suas culturas de pragas e doenças de forma eficaz. Resultando em uma colheita saudável e abundante. No entanto, o uso excessivo de pesticidas químicos pode ter impactos negativos no meio ambiente, prejudicando a biodiversidade e contaminando o solo e a água.";
    } else if (choiceId === 'A2a1a') {
        return "Feedback: Animais como cavalos ou bois, podem ser usados para puxar arados, colheitadeiras e outros equipamentos agrícolas, minimizando a dependência de combustíveis fósseis e reduzindo a poluição do ar. Porém, o treinamento e cuidados adequados com os animais podem demorar para apresentar resultados positivos.";
    } else if (choiceId === 'A2a1b') {
        return "Feedback: A colheita manual reduz o impacto no solo e nas plantas, promovendo a sustentabilidade em sua fazenda. Esta abordagem pode ser mais trabalhosa, mas resulta em menor compactação do solo e menos danos às plantas.";
    } else if (choiceId === 'A2a2') {
        return "Feedback: Inserir predadores naturais em seu plantio é uma abordagem de controle de pragas que ajuda a manter o equilíbrio ecológico em sua fazenda. Isso evita o uso de pesticidas químicos prejudiciais ao meio ambiente, preservando a biodiversidade e promovendo uma agricultura sustentável.";
    } else if (choiceId === 'A2a2a') {
        return "Feedback: Cavalos ou bois podem ser usados para puxar arados, colheitadeiras e outros equipamentos agrícolas, minimizando a dependência de combustíveis fósseis e reduzindo a poluição do ar. No entanto, esse método pode ser mais demorado e requer treinamento e cuidados adequados com os animais.";
    } else if (choiceId === 'A2a2b') {
        return "Feedback: Optar pela colheita manual reduz o impacto no solo e nas plantas, promovendo a sustentabilidade em sua fazenda. Esta abordagem pode ser mais trabalhosa, mas resulta em menor compactação do solo e menos danos às plantas.";
    } else if (choiceId === 'A2b') {
        return "Feedback: Plantar legumes e frutas acaba por promover a preservação do solo e a diversidade de culturas. Essas culturas são conhecidas por melhorar a qualidade do solo e são uma opção mais sustentável, contribuindo para a saúde do ecossistema.";
    } else if (choiceId === 'A2b1') {
        return "Feedback: Você conseguirá proteger suas culturas de pragas e doenças de forma eficaz. Isso pode resultar em uma colheita mais saudável e abundante. No entanto, o uso excessivo de pesticidas químicos pode ter impactos negativos no meio ambiente, prejudicando a biodiversidade e contaminando o solo e a água.";
    } else if (choiceId === 'A2b1a') {
        return "Feedback: Os animais, como cavalos ou bois, podem ser usados para puxar arados, colheitadeiras e outros equipamentos agrícolas, minimizando a dependência de combustíveis fósseis e reduzindo a poluição do ar. No entanto, esse método pode ser mais demorado e requer treinamento e cuidados adequados com os animais.";
    } else if (choiceId === 'A2b1b') {
        return "Feedback: Optar pela colheita manual reduz o impacto no solo e nas plantas, promovendo a sustentabilidade em sua fazenda. Tal abordagem é trabalhosa, mas resulta em menor compactação do solo e menos danos às plantas.";
    } else if (choiceId === 'A2b2') {
        return "Feedback: Inserir predadores naturais em seu plantio é uma abordagem de controle de pragas que ajuda a manter o equilíbrio ecológico em sua fazenda. Isso evita o uso de pesticidas químicos prejudiciais ao meio ambiente, preservando a biodiversidade e promovendo uma agricultura sustentável.";
    } else if (choiceId === 'A2b2a') {
        return "Feedback: Os animais, como cavalos ou bois, podem ser usados para puxar arados, colheitadeiras e outros equipamentos agrícolas, minimizando a dependência de combustíveis fósseis e reduzindo a poluição do ar. No entanto, esse método pode ser mais demorado e requer treinamento e cuidados adequados com os animais.";
    } else if (choiceId === 'A2b2b') {
        return "Feedback: Optar pela colheita manual irá reduzir o impacto no solo e nas plantas, promovendo a sustentabilidade em sua fazenda. Esta abordagem é trabalhosa, mas resulta em menor compactação do solo e menos danos às plantas.";
    } else if (choiceId === 'B') {
        return "Você escolheu limpar completamente a área florestal. Isso pode ter consequências ambientais negativas.";
    } else {
        return "Feedback genérico para outras escolhas.";
    }
}

function displayFeedback(text) {
    const feedbackTextElement = document.getElementById('feedback-text');
    feedbackTextElement.textContent = text;
}
