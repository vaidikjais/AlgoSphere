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

    async function bubbleSort() {

        const sortButton = document.querySelector(".sort");
        sortButton.disabled = true;
        sortButton.classList.add("disabled");
        
        let bars = document.getElementsByClassName("bar");
        
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                let speed = 1000 - document.getElementById("speed").value;


                bars[j].style.backgroundColor = "orange";
                bars[j + 1].style.backgroundColor = "orange";
                await new Promise(resolve => setTimeout(resolve, speed));

                if (array[j] > array[j + 1]) {
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                    
                    bars[j].style.height = `${array[j] * 3}px`;
                    bars[j + 1].style.height = `${array[j + 1] * 3}px`;

                    // Update the numbers inside bars
                    bars[j].querySelector(".bar-number").textContent = array[j];
                    bars[j + 1].querySelector(".bar-number").textContent = array[j + 1];
                }

                bars[j].style.backgroundColor = "rgba(200, 18, 18, 0.788)";
                bars[j + 1].style.backgroundColor = "rgba(200, 18, 18, 0.788)";
            }
            bars[array.length - i - 1].style.backgroundColor = "rgba(63, 152, 22, 0.788)";
        }

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
    document.querySelector(".sort").addEventListener("click", bubbleSort);
    document.querySelector(".reset").addEventListener("click", resetArray);
    document.getElementById("element").addEventListener("change", handleUserInput);
});
