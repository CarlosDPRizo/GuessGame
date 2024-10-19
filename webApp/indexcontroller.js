document.getElementById('guess-word-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        guessWord();
    }
  });

function sortWord() {
    document.getElementById('all-attempts').classList.add('d-none');
    document.getElementById('all-attempts').innerHTML = '';
    document.getElementById('guess-word-input').classList.add('d-none');
    document.getElementById('sort-word-button').classList.add('loading');
    document.getElementById('sort-word-button').disabled = true;
    document.getElementById('sort-word-button').innerText = 'Sorteando palavra...';
    document.getElementById('surrender-button').classList.add('d-none');
    qtdAttempts = 0;
    document.getElementById('attempts').innerText = "";
    document.getElementById('tips').innerText = "";

    fetch("http://127.0.0.1:5000/apis/get-word")
        .then(response => response.json())
            .then(json => {
                const word = json;
                console.log('WORD', word);

                document.getElementById('guess-word-input').classList.remove('d-none');
                document.getElementById('all-attempts').classList.remove('d-none');
                document.getElementById('sort-word-button').classList.remove('loading');
                document.getElementById('sort-word-button').disabled = false;
                document.getElementById('sort-word-button').innerText = 'Sortear palavra';
                document.getElementById('surrender-button').classList.remove('d-none');
                document.getElementById('tips').innerText = "A palavra sorteada possui " + word[0] + " letras.";
                document.getElementById('tips').classList.remove('d-none');
            })
}

let qtdAttempts = 0;

function guessWord() {
    const inputValue = document.getElementById('guess-word-input').value;

    fetch("http://127.0.0.1:5000/apis/guess-word/" + inputValue)
        .then(response => response.json())
            .then(json => {
                const result = json;

                insertRow(inputValue, result);

                qtdAttempts = qtdAttempts + 1;
                document.getElementById('attempts').innerText = "Tentativas: " + qtdAttempts;
            });
}

function surrender() {
    fetch("http://127.0.0.1:5000/apis/surrender/")
        .then(response => response.json())
            .then(json => {
                const result = json;
                insertRow(result, 100, true);
            });
}

function insertRow(textValue, percentValue, surrender = false) {
    document.getElementById('guess-word-input').value = '';

    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');

    const textSpan = document.createElement('span');
    textSpan.textContent = textValue;

    const percentSpan = document.createElement('span');
    percentSpan.textContent = percentValue + "%";

    rowDiv.appendChild(textSpan);
    rowDiv.appendChild(percentSpan);

    document.getElementById('all-attempts').appendChild(rowDiv);
    document.getElementById('attempts').classList.remove('d-none');
    document.getElementById('all-attempts').classList.remove('d-none');

    if (surrender == false && percentValue == 100) {
        alert("Você acertou!");
    }
}