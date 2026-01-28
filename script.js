const messageInput = document.getElementById("message");
const keywordInput = document.getElementById("keyword");
const modeSelect = document.getElementById("mode");
const resultDiv = document.getElementById("result");
const actionBtn = document.getElementById("actionBtn");
const copyBtn = document.getElementById("copyBtn");

actionBtn.addEventListener("click", runCipher);
copyBtn.addEventListener("click", copyResult);

function runCipher() {
    const message = messageInput.value;
    const keyword = keywordInput.value.toLowerCase();
    const mode = modeSelect.value;

    if (!/^[a-zA-Z]+$/.test(keyword)) {
        resultDiv.innerText = "Bitte ein gültiges Schlüsselwort (nur Buchstaben) eingeben.";
        return;
    }

    let result = "";
    let keyIndex = 0;

    for (let i = 0; i < message.length; i++) {
        const char = message[i];
        const code = message.charCodeAt(i);

        if (/[a-zA-Z]/.test(char)) {
            const base = code >= 65 && code <= 90 ? 65 : 97;
            let shift = keyword[keyIndex % keyword.length].charCodeAt(0) - 97;

            if (mode === "decrypt") shift = -shift;

            result += String.fromCharCode(
                ((code - base + shift + 26) % 26) + base
            );

            keyIndex++;
        } else {
            result += char;
        }
    }

    resultDiv.innerText = result;
    resetCopyButton();
}

function copyResult() {
    const text = resultDiv.innerText;
    if (!text) return;

    // Fallback-Methode (funktioniert auch offline)
    const tempTextarea = document.createElement("textarea");
    tempTextarea.value = text;
    document.body.appendChild(tempTextarea);
    tempTextarea.select();
    tempTextarea.setSelectionRange(0, 99999); // mobile support

    document.execCommand("copy");
    document.body.removeChild(tempTextarea);

    copyBtn.innerText = "✔ Kopiert";
    copyBtn.classList.add("copied");

    setTimeout(resetCopyButton, 1500);
}

function resetCopyButton() {
    copyBtn.innerText = "📋 Kopieren";
    copyBtn.classList.remove("copied");
}
