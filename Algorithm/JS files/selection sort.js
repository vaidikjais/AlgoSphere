document.addEventListener("DOMContentLoaded", function () {
    let array = [];
    const container = document.getElementById("bars");
    const errorMessage = document.getElementById("error-message");

    function generateArray() {
        container.innerHTML = "";
        const maxElements = window.innerWidth < 1000 ? 8 : 15;
        array = Array.from({ length: maxElements }, () => Math.floor(Math.random() * 100) + 10);
        renderBars();
    }

    function renderBars() {
        container.innerHTML = "";
        array.forEach(value => {
            const bar = document.createElement("div");
            bar.classList.add("bar");
            bar.style.height = `${value * 3}px`;

            // Add number inside the bar
            const number = document.createElement("span");
            number.classList.add("bar-number");
            number.textContent = value;
            bar.appendChild(number);

            container.appendChild(bar);
        });
    }

    async function selectionSort() {

        const sortButton = document.querySelector(".sort");
        sortButton.disabled = true;
        sortButton.classList.add("disabled");

        let bars = document.getElementsByClassName("bar");

        for (let i = 0; i < array.length - 1; i++) {
            let min_idx = i;
            bars[min_idx].style.backgroundColor = "rgba(18, 18, 224, 0.733)"; // Highlight the initial minimum

            for (let j = i + 1; j < array.length; j++) {
                let speed = 1000 - document.getElementById("speed").value;

                bars[j].style.backgroundColor = "orange"; // Highlight comparison
                await new Promise(resolve => setTimeout(resolve, speed));

                if (array[j] < array[min_idx]) {
                    // Reset previous min back to default if it's not already sorted
                    bars[min_idx].style.backgroundColor = "rgba(200, 18, 18, 0.788)";
                    await new Promise(resolve => setTimeout(resolve, speed));
                    min_idx = j;
                    bars[min_idx].style.backgroundColor = "rgba(18, 18, 224, 0.733)"; // New min
                } else {
                    bars[j].style.backgroundColor = "rgba(200, 18, 18, 0.788)"; // Reset comparison bar
                }
            }

            if (min_idx !== i) {
                [array[i], array[min_idx]] = [array[min_idx], array[i]];

                bars[i].style.height = `${array[i] * 3}px`;
                bars[min_idx].style.height = `${array[min_idx] * 3}px`;

                bars[i].querySelector(".bar-number").textContent = array[i];
                bars[min_idx].querySelector(".bar-number").textContent = array[min_idx];
            }
            bars[min_idx].style.backgroundColor = "rgba(200, 18, 18, 0.788)"; 
            bars[i].style.backgroundColor = "rgba(63, 152, 22, 0.788)"; // Mark as sorted
        }

        bars[array.length - 1].style.backgroundColor = "rgba(63, 152, 22, 0.788)"; // Last element sorted

        sortButton.disabled = false;
        sortButton.classList.remove("disabled");
    }

    function resetArray() {
        array = [];
        container.innerHTML = "";
        document.getElementById("element").value = ""; // Clear input field

        const sortButton = document.querySelector(".sort");
        sortButton.disabled = false;
        sortButton.classList.remove("disabled");
    }

    function handleUserInput() {
        const input = document.getElementById("element").value.trim();
        if (!input) return;

        let elements = input.split(",").map(num => parseInt(num.trim())).filter(num => !isNaN(num));
        const maxElements = window.innerWidth < 1000 ? 8 : 15;

        if (elements.length > maxElements) {
            showErrorMessage(`You can enter a maximum of ${maxElements} elements.`);
        }
        else 
        {
            hideErrorMessage();
            array = elements;
            renderBars();
        }
    }

    function showErrorMessage(message) {
        errorMessage.textContent = message;
        errorMessage.style.opacity = "1";
    }

    function hideErrorMessage(){
        errorMessage.style.opacity = "0";
    }


    document.querySelector(".random").addEventListener("click", generateArray);
    document.querySelector(".sort").addEventListener("click", selectionSort);
    document.querySelector(".reset").addEventListener("click", resetArray);
    document.getElementById("element").addEventListener("change", handleUserInput);
});
