document.addEventListener("DOMContentLoaded", () => {
    const inputArray = document.getElementById("array");
    const windowSize = document.getElementById("window-size");
    const startButton = document.getElementById("start");
    const nextButton = document.getElementById("next");
    const resetButton = document.getElementById("reset");
    const visualization = document.getElementById("visualization");
    const randomArrayButton = document.getElementById("randomArrayButton");
    const errorMessage = document.getElementById("error-message");

    let array = [];
    let windowLength = 0;
    let currentIndex = 0;
    let maxArraySize = window.innerWidth < 1000 ? 8 : 12;

    function showErrorMessage(message) {
        errorMessage.textContent = message;
        errorMessage.style.opacity = "1";
        setTimeout(() => {
            errorMessage.style.opacity = "0";
        }, 3000);
    }

    startButton.addEventListener("click", () => {
        array = inputArray.value.split(",").map(Number);
        windowLength = parseInt(windowSize.value);
        currentIndex = 0;

        if (array.length > maxArraySize) {
            showErrorMessage("Array size should not exceed ${maxArraySize} elements.");
            return;
        }

        if (windowLength > array.length) {
            showErrorMessage("Window size cannot be greater than the number of array elements.");
            return;
        }

        nextButton.disabled = false;
        renderArray();
        highlightWindow();
    });

    nextButton.addEventListener("click", () => {
        if (currentIndex + windowLength < array.length) {
            currentIndex++;
            renderArray();
            highlightWindow();
        }
        if (currentIndex + windowLength >= array.length) {
            nextButton.disabled = true;
        }
    });

    resetButton.addEventListener("click", () => {
        inputArray.value = "";
        windowSize.value = "";
        visualization.innerHTML = "";
        nextButton.disabled = true;
    });

    function renderArray() {
        visualization.innerHTML = "";

        if (inputArray.value === "" || windowSize.value === "") {
            showErrorMessage("Enter values!!");
            return;
        }

        array.forEach((element, index) => {
            const div = document.createElement("div");
            div.className = "array-element";
            div.textContent = element;
            div.dataset.index = index;
            visualization.appendChild(div);
        });
    }

    function highlightWindow() {
        const elements = document.querySelectorAll(".array-element");
        elements.forEach(element => element.classList.remove("window-element"));

        for (let i = currentIndex; i < currentIndex + windowLength && i < array.length; i++) {
            elements[i].classList.add("window-element");
        }
    }

    // ✅ Fixed: Random Array Generator
    if (randomArrayButton) {
        randomArrayButton.addEventListener("click", () => {
            maxArraySize = window.innerWidth < 1000 ? 8 : 12;
            let randomArray = generateRandomArray(maxArraySize, 50);
            inputArray.value = randomArray.join(',');
        });

        function generateRandomArray(size, max) {
            let arr = [];
            while (arr.length < size) {
                let num = Math.floor(Math.random() * max) + 1;
                if (!arr.includes(num)) {
                    arr.push(num);
                }
            }
            return arr;
   }}
});