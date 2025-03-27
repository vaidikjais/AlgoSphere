document.addEventListener("DOMContentLoaded", function () {
    let array = [];
    const container = document.getElementById("bars");
    const errorMessage = document.getElementById("error-message");
    let delay = 1000;

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function generateArray() {
        container.innerHTML = "";
        const maxElements = window.innerWidth < 1000 ? 8 : 15;
        array = Array.from({ length: maxElements }, () => Math.floor(Math.random() * 100) + 10);
        renderBars();
    }

    function renderBars() {
        container.innerHTML = "";
        array.forEach((value, index) => {
            const bar = document.createElement("div");
            bar.classList.add("bar");
            bar.style.height = `${value * 3}px`;
            bar.dataset.index = index;

            const number = document.createElement("span");
            number.classList.add("bar-number");
            number.textContent = value;
            bar.appendChild(number);

            container.appendChild(bar);
        });
    }

    function updateBars(low, high) {
        let bars = document.getElementsByClassName("bar");
        for (let i = low; i <= high; i++) {
            if (!bars[i].classList.contains("sorted")) {
                bars[i].style.height = `${array[i] * 3}px`;
                bars[i].querySelector(".bar-number").textContent = array[i];
            }
        }
    }

    async function partition(low, high) {
        let pivot = array[low];
        let i = low + 1;
        let j = high;
        let bars = document.getElementsByClassName("bar");

        if (bars[low].classList.contains("sorted")) return low;

        bars[low].classList.add("pivot");
        await sleep(delay);

        while (i <= j) {
            while (i <= high && array[i] < pivot) {
                if (!bars[i].classList.contains("sorted")) {
                    bars[i].classList.add("left-pointer");
                    await sleep(delay);
                    bars[i].classList.remove("left-pointer");
                }
                i++;
            }
            
            
                bars[i].classList.add("left-pointer");
                await sleep(delay);
            

            while (j > low && array[j] > pivot) {
                if (!bars[j].classList.contains("sorted")) {
                    bars[j].classList.add("right-pointer");
                    await sleep(delay);
                    bars[j].classList.remove("right-pointer");
                }
                j--;
            }

            
                bars[j].classList.add("right-pointer");
                await sleep(delay);
            

            if (i < j) {
                [array[i], array[j]] = [array[j], array[i]];
                
                await sleep(delay);

                updateBars(low, high);
                await sleep(delay);
                bars[i].classList.remove("left-pointer");
                bars[j].classList.remove("right-pointer");
                await sleep(delay);
            }
        }

        [array[low], array[j]] = [array[j], array[low]];
         
        updateBars(low,high);
        await sleep(delay);
        
        bars[i].classList.remove("left-pointer");
        bars[j].classList.remove("right-pointer");
        bars[low].classList.remove("pivot");
        bars[j].classList.add("sorted");

        
        await sleep(delay);
        return j;
    }

    async function quickSort(low, high) {
        if (low <= high) {
            let pIndex = await partition(low, high);
            await quickSort(low, pIndex - 1);
            await quickSort(pIndex + 1, high);
        }
    }

    async function startQuickSort() {
        
        const sortButton = document.querySelector(".sort");
        sortButton.disabled = true;
        sortButton.classList.add("disabled");

        await quickSort(0, array.length - 1);

        sortButton.disabled = false;
        sortButton.classList.remove("disabled");
    }

    function resetArray() {
        array = [];
        container.innerHTML = "";
        document.getElementById("element").value = "";
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
    document.querySelector(".sort").addEventListener("click", startQuickSort);
    document.querySelector(".reset").addEventListener("click", resetArray);
    document.getElementById("element").addEventListener("change", handleUserInput);
});
