document.addEventListener("DOMContentLoaded", function () {
    const searchBtn = document.querySelector(".start-search");
    const resetBtn = document.querySelector(".reset");
    const popupMessage = document.getElementById("popup-message");
    const arrayContainer = document.getElementById("array-container");
    const randomArrayBtn = document.getElementById("random-array-btn");
    const speedSlider = document.getElementById("speed-slider");
    const errorMessage = document.getElementById("error-message");

    let speed = 1000;

    function showPopup(message) {
        popupMessage.textContent = message;
        popupMessage.style.display = "block";
        setTimeout(() => {
            popupMessage.style.display = "none";
        }, 2000);
    }

    function showErrorMessage(message) {
            errorMessage.textContent = message;
            errorMessage.style.opacity = "1";
            setTimeout(() => {
                errorMessage.style.opacity = "0";
            }, 3000);
        
    }
    

    function visualizeBinarySearch() {
        let arrayInput = document.getElementById("array-input");
        let targetInput = document.getElementById("target-input");

        let arrayStr = arrayInput.value.trim();
        let target = parseInt(targetInput.value);

        if (!arrayStr || isNaN(target)) {
            showErrorMessage("Please enter a valid array and target value!");
            return;
        } 
        
        
        let array = arrayStr.split(",").map(Number);
        let isSorted = array.every((num, i, arr) => i === 0 || arr[i - 1] <= num);

        if (!isSorted) {
            showErrorMessage("Error: The array is not sorted!");
            return;

        } 
        
        arrayContainer.innerHTML = "";

        const maxSize = window.innerWidth < 768 ? 8 : 12;

        if (array.length > maxSize) {
            showErrorMessage(`You can enter a maximum of ${maxSize} elements.`);
            return;
        } 
        array.forEach((num, index) => {
            let wrapper = document.createElement("div");
            wrapper.classList.add("array-item-wrapper");

            let indexElement = document.createElement("div");
            indexElement.classList.add("array-index");
            indexElement.textContent = index;

            let element = document.createElement("div");
            element.classList.add("array-item");
            element.textContent = num;

            wrapper.appendChild(indexElement);
            wrapper.appendChild(element);
            arrayContainer.appendChild(wrapper);

            setTimeout(() => {
                element.style.opacity = "1";
                indexElement.style.opacity = "1";
            }, 200);
        });

        let low = 0,
            high = array.length - 1;

            function showIndices(low, mid, high) {
                let lowIndexBtn = document.getElementById("low-index");
                let middleIndexBtn = document.getElementById("middle-index");
                let highIndexBtn = document.getElementById("high-index");
            
                if (lowIndexBtn && middleIndexBtn && highIndexBtn) {
                    lowIndexBtn.innerText = `Low (${low})`;
                    middleIndexBtn.innerText = `Middle (${mid})`;
                    highIndexBtn.innerText = `High (${high})`;
            
                    // Remove the 'hidden' class to make them visible
                    lowIndexBtn.classList.remove("hidden");
                    middleIndexBtn.classList.remove("hidden");
                    highIndexBtn.classList.remove("hidden");

                    document.getElementById("low-index").style.display = "inline-block";
                    document.getElementById("middle-index").style.display = "inline-block";
                    document.getElementById("high-index").style.display = "inline-block";
                }
            }
            
        function searchStep() {

            searchBtn.disabled = true;
            searchBtn.classList.add("disabled");

        
            if (low > high) {
                showPopup("Element not found!");
                searchBtn.disabled = false;
                searchBtn.classList.remove("disabled");
                return;
            }

            let mid = Math.floor((low + high) / 2);
            let elements = document.querySelectorAll(".array-item");

            elements.forEach(el => el.classList.remove("highlight", "found"));
            elements[mid].classList.add("highlight");

            showIndices(low, mid, high);

            setTimeout(() => {
                let midValue = array[mid];

                if (midValue === target) {
                    elements[mid].classList.add("found");
                    showPopup(`Element found at index ${mid}`);
                    searchBtn.disabled = false;
                    searchBtn.classList.remove("disabled");
                } else if (midValue < target) {
                    low = mid + 1;
                    searchStep();
                } else {
                    high = mid - 1;
                    searchStep();
                }
            }, speed);
        }

        searchStep();
    }

    if (randomArrayBtn) {
        randomArrayBtn.addEventListener("click", function () {
            let arr = [];
            let size = window.innerWidth < 768 ? 8 : 12;

            for (let i = 0; i < size; i++) {
                arr.push(Math.floor(Math.random() * 100) + 1);
            }

            arr.sort((a, b) => a - b);
            let arrayInput = document.getElementById("array-input");
            let targetInput = document.getElementById("target-input");

            if (arrayInput && targetInput) {
                arrayInput.value = arr.join(",");
                targetInput.value = arr[Math.floor(Math.random() * arr.length)];
            }
        });
    } 

    speedSlider.addEventListener("input", function () {
        speed = 2000 - this.value;
    });

    if (searchBtn) {
        searchBtn.addEventListener("click", visualizeBinarySearch);
    } 

    if (resetBtn) {
        searchBtn.disabled = false;
        searchBtn.classList.remove("disabled");
        resetBtn.addEventListener("click", () => location.reload());
    } 
});
