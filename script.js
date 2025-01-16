document.getElementById('addButton').addEventListener('click', function() {
    const patternContainer = document.getElementById('patternContainer');
    const patternDiv = document.createElement('div');
    patternDiv.className = 'pattern';
    patternDiv.innerHTML = `
        <input type="text" class="pattern-input" placeholder="A">
        を
        <input type="text" class="pattern-output" placeholder="B">
        に変換
    `;
    patternContainer.appendChild(patternDiv);

    // 変換パターンが10個以上になったらスクロールバーを表示
    if (patternContainer.children.length > 10) {
        patternContainer.style.overflowY = 'scroll';
    }

    // 変換パターンの入力フィールドにイベントリスナーを追加
    const patternInputs = patternDiv.querySelectorAll('input');
    patternInputs.forEach(input => {
        input.addEventListener('change', updateScenario);
    });
});

document.getElementById('convertButton').addEventListener('click', updateScenario);

document.getElementById('rollDiceButton').addEventListener('click', function() {
    const result = Math.floor(Math.random() * 6) + 1;
    document.getElementById('diceResult').textContent = `結果: ${result}`;
});

function updateScenario() {
    const inputZone = document.getElementById('inputZone');
    let scenarioText = inputZone.value;

    const patterns = document.querySelectorAll('.pattern');
    patterns.forEach(pattern => {
        const patternInput = pattern.querySelector('.pattern-input').value;
        const patternOutput = pattern.querySelector('.pattern-output').value;
        if (patternInput && patternOutput) {
            const regex = new RegExp(patternInput, 'g');
            scenarioText = scenarioText.replace(regex, patternOutput);
        }
    });

    inputZone.value = scenarioText;
}
