document.addEventListener("DOMContentLoaded", function () {
    // Get references to buttons and input fields
    const findPairsBtn = document.getElementById("find-pairs-btn");
    const resetBtn = document.getElementById("reset-btn");
    const randomArrayBtn = document.getElementById("random-array-btn");
    const arrayInput = document.getElementById("array-input");
    const targetInput = document.getElementById("target-input");
    const visualizationContainer = document.getElementById("visualization-container");
    const popupMessage = document.getElementById("popup-message");
    const errorMessage = document.getElementById("error-message");
  
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
  
    // Generate a random sorted array
    randomArrayBtn.addEventListener("click", function () {
      let arr = [];
      let size = window.innerWidth < 1000 ? 8 : 10;
  
      for (let i = 0; i < size; i++) {
        arr.push(Math.floor(Math.random() * 50) + 1); // Generate random numbers
      }
  
      arr.sort((a, b) => a - b); // Sort the array for Two Pointers
      arrayInput.value = arr.join(",");
      targetInput.value = Math.floor(Math.random() * 80) + 10; // Random target sum
    });
  
    // Function to visualize the Two Pointers algorithm
    function visualizeTwoPointers() {
      let array = arrayInput.value.split(",").map(Number);
      let target = parseInt(targetInput.value);
  
      if (array.length === 0 || array.some(isNaN) || isNaN(target)) {
        showErrorMessage("Please enter a valid array and target value!");
        return;
      }
      let isSorted = array.every((num, i, arr) => i === 0 || arr[i - 1] <= num);
  
      if (!isSorted) {
        showErrorMessage("Error: The array is not sorted!");
        return;
      } 
  
  
  
      // Clear previous visualization
      visualizationContainer.innerHTML = "";
  
      const maxSize = window.innerWidth < 1000 ? 8 : 10;
  
      if (array.length > maxSize) {
        showErrorMessage(`You can enter a maximum of ${maxSize} elements.`);
        return;
      }
  
  
      // Create array elements for visualization
      let arrayContainer = document.createElement("div");
      arrayContainer.classList.add("array-container");
  
      array.forEach((num, index) => {
        let element = document.createElement("div");
        element.classList.add("array-element");
        element.textContent = num;
        element.setAttribute("data-index", index);
        arrayContainer.appendChild(element);
      });
      
  
      visualizationContainer.appendChild(arrayContainer);
  
      let left = 0,
        right = array.length - 1;
      let elements = document.querySelectorAll(".array-element");
  
      function movePointers() {
  
        if (left >= right){
          showPopup("No pair found!");
          return;
  
        }; // Stop when pointers meet or cross
  
        elements[left].classList.add("left-pointer");
        elements[right].classList.add("right-pointer");
  
        setTimeout(() => {
          let sum = array[left] + array[right];
  
          if (sum === target) {
            elements[left].classList.add("pair-found");
            elements[right].classList.add("pair-found");
            showPopup(`Pair found: ${array[left]} + ${array[right]} = ${target}`);
            return; // Stop further execution
          }
  
  
          elements[left].classList.remove("left-pointer");
          elements[right].classList.remove("right-pointer");
  
          if (sum < target) left++;
          else right--;
  
          movePointers(); // Continue searching
        }, 1000); // Delay for visualization
  
      }
  
      movePointers();
    }
  
    findPairsBtn.addEventListener("click", visualizeTwoPointers);
  
    resetBtn.addEventListener("click", () => {
      visualizationContainer.innerHTML = "";
      arrayInput.value = "";
      targetInput.value = "";
    });
  
    
    speedSlider.addEventListener("input", function () {
        speed = 2000 - this.value;
    });
  });
  