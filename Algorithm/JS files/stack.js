document.addEventListener("DOMContentLoaded", function () {
    const pushBtn = document.querySelector(".push");
    const popBtn = document.querySelector(".pop");
    const emptyBtn = document.querySelector(".empty");
    const sizeBtn = document.querySelector(".size");
    const topBtn = document.querySelector(".top");
    const resetBtn = document.querySelector(".reset");


    const popupMessage = document.getElementById("popup-message");
    const stackContainer = document.getElementById("stack-container");
    const inputField = document.getElementById("element");
    const controls = document.querySelector(".controls");

    let stack = [];

    function showPopup(message) {
        popupMessage.textContent = message;
        popupMessage.style.display = "block";
        setTimeout(() => {
            popupMessage.style.display = "none";
        }, 3000);
    }

    function pushElement() {
        const value = inputField.value.trim();
        if (value === ""){
            showPopup("Enter a value!!");
            return;
        }

        stack.push(value);
        inputField.value = "";

        const stackItem = document.createElement("div");
        stackItem.classList.add("stack-item");
        stackItem.textContent = value;

        stackContainer.appendChild(stackItem); // First element goes to bottom
        setTimeout(() => stackItem.classList.add("show"), 50);

        showPopup(`Push/Add : ${value}`);

        updateLayout();
    }

    function popElement() {
        if (stack.length === 0) {
            showPopup("Stack is empty!");
            return;
        }

        stack.pop();
        const topItem = stackContainer.lastElementChild; // Remove from top
        if (topItem) {
            topItem.classList.remove("show");
            setTimeout(() => topItem.remove(), 500);
        }

        showPopup("Pop operation performed!");

        updateLayout();
    }

    function peekElement() {
        if (stack.length === 0) {
            showPopup("Stack is empty!");
            return;
        }
        showPopup(`Top element : ${stack[stack.length - 1]}`);
    }

    function emptyStack() {
        showPopup(stack.length === 0 ? "Stack is empty!" : "Stack is not empty!");
    }

    function sizeStack() {
        showPopup(`Size : ${stack.length}`);
    }

    function updateLayout() {
        const newHeight = stack.length * 50 + 150;
        stackContainer.style.height = `${newHeight}px`;

        controls.style.marginTop = `${newHeight}px`; // Move buttons down
    }

    function resetStack(){
        stack = [];
        stackContainer.innerHTML = "";
    }

    pushBtn.addEventListener("click", pushElement);
    popBtn.addEventListener("click", popElement);
    emptyBtn.addEventListener("click", emptyStack);
    sizeBtn.addEventListener("click", sizeStack);
    topBtn.addEventListener("click", peekElement);
    resetBtn.addEventListener("click", resetStack);
});
