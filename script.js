let attempts = 0;
let currentIndex = 0;
let autoScratchInterval;
let numbers = [0, 0, 0, 0, 0];

function scratchNext() {
    numbers[currentIndex] = Math.floor(Math.random() * 10) + 1;
    document.getElementById('num' + (currentIndex + 1)).textContent = numbers[currentIndex];

    currentIndex++;
    if (currentIndex >= 5) {
        currentIndex = 0;
        attempts++;
        document.getElementById('attempts').textContent = `Raspagens: ${attempts}`;

        const resultElement = document.getElementById('result');
        if (isWinningCombination(numbers)) {
            resultElement.textContent = 'Parabéns! Você ganhou!';
            saveResult(numbers.join(', '), attempts);
            attempts = 0; // Reset attempts after winning
            numbers = [0, 0, 0, 0, 0];
        } else {
            resultElement.textContent = 'Tente novamente!';
        }
    }
}

function isWinningCombination(numbers) {
    let counts = {};
    numbers.forEach(num => {
        counts[num] = (counts[num] || 0) + 1;
    });
    return Object.values(counts).includes(4);
}

function startAutoScratch() {
    attempts = 0;
    currentIndex = 0;
    numbers = [0, 0, 0, 0, 0];
    document.getElementById('attempts').textContent = `Raspagens: ${attempts}`;
    autoScratchInterval = setInterval(scratchNext, 100); // Ajuste o intervalo conforme necessário
}

function saveResult(numbers, attempts) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'save_result.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            fetchResults();
        }
    };
    xhr.send(`numbers=${numbers}&attempts=${attempts}`);
}

function fetchResults() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'fetch_results.php', true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            document.getElementById('results').innerHTML = xhr.responseText;
        }
    };
    xhr.send();
}

document.getElementById('scratch-button').onclick = startAutoScratch;

// Fetch results initially
fetchResults();
