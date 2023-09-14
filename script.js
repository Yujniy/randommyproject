// Обработчик кнопки активации
document.getElementById("activate-button").addEventListener("click", function () {
    const activationKey = document.getElementById("activation-key").value;
    
    // Пример проверки ключа активации
    if (activationKey.toLowerCase() === "тесторобот") {
        // Если ключ верный, скройте контейнер активации и покажите контейнер генератора
        document.querySelector(".activation-container").style.display = "none";
        document.querySelector(".generator-container").style.display = "block";
    } else {
        // Если ключ неверный, выведите сообщение об ошибке
        alert("Неверный ключ активации.");
    }
});

// Обработчик кнопки генерации случайных чисел
document.getElementById("generate-button").addEventListener("click", function () {
    const minValue = parseInt(document.getElementById("min-value").value);
    const maxValue = parseInt(document.getElementById("max-value").value);
    const numResults = parseInt(document.getElementById("num-results").value);
    const excludeEndpoints = document.getElementById("exclude-endpoints").checked;
    const unique = document.getElementById("unique").checked;

    if (isNaN(minValue) || isNaN(maxValue) || isNaN(numResults) || numResults > 10) {
        alert("Пожалуйста, введите корректные значения.");
        return;
    }

    if (excludeEndpoints && minValue >= maxValue) {
        alert("Минимальное значение не может быть больше или равно максимальному.");
        return;
    }

    let results = [];

    while (results.length < numResults) {
        let randomNumber = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;

        if (excludeEndpoints && (randomNumber === minValue || randomNumber === maxValue)) {
            continue;
        }

        if (unique && results.includes(randomNumber)) {
            continue;
        }

        results.push(randomNumber);
    }

    document.getElementById("result").innerText = results.join(", ");
});

// Обработчик кнопки копирования результата
document.getElementById("copy-button").addEventListener("click", function () {
    const resultText = document.getElementById("result").innerText;

    if (resultText) {
        const tempInput = document.createElement("input");
        tempInput.value = resultText;
        document.body.appendChild(tempInput);
        tempInput.select();
        try {
            document.execCommand("copy");
            alert("Результат скопирован в буфер обмена: " + resultText);
        } catch (err) {
            console.error("Копирование не удалось: ", err);
            alert("Копирование не удалось. Пожалуйста, скопируйте вручную.");
        } finally {
            document.body.removeChild(tempInput);
        }
    } else {
        alert("Сгенерируйте результат для копирования пожалуйста!");
    }
});
