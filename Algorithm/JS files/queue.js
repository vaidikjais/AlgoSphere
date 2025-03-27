document.addEventListener("DOMContentLoaded", function () {

    const enqueueBtn = document.querySelector(".enqueue");
    const dequeueBtn = document.querySelector(".dequeue");
    const emptyBtn = document.querySelector(".empty");
    const sizeBtn = document.querySelector(".size");
    const peekBtn = document.querySelector(".peek");
    const resetBtn = document.querySelector(".reset");

    const popupMessage = document.getElementById("popup-message");
    const queueContainer = document.getElementById("queue-container");
    const inputField = document.getElementById("element");

    let queue = [];

    function showPopup(message) {
        popupMessage.textContent = message;
        popupMessage.style.display = "block";
        setTimeout(() => {
            popupMessage.style.display = "none";
        }, 3000);
    }

    function enqueueElement() {
        const value = inputField.value.trim();
        if (value === ""){
            showPopup("Enter an element!!");
            return;
        }

        queue.push(value);
        inputField.value = "";

        // Create a new queue item
        const queueItem = document.createElement("div");
        queueItem.classList.add("queue-item");
        queueItem.textContent = value;

        queueContainer.appendChild(queueItem);
        setTimeout(() => queueItem.classList.add("show"), 50);

        showPopup(`Enqueue/Add : ${value}`);
        checkOverflow();
    }

    function dequeueElement() {
        if (queue.length === 0) {
            showPopup("Queue is empty!");
            return;
        }

        const firstItem = queueContainer.firstElementChild;
        if (firstItem) {
            setTimeout(() => firstItem.remove(), 500);
        }
        showPopup(`Dequeue/Remove : ${queue[0]}`);
        queue.shift();
        firstItem.classList.remove("show");
        checkOverflow();
    }

    function peekElement(){
        if(queue.length === 0){
            showPopup("Queue is empty!");
            return;
        }

        showPopup(`Front Element : ${queue[0]}`);
        
    }

    function emptyQueue(){
        if(queue.length === 0){
            showPopup("Queue is empty!");
            return;
        }
        showPopup("Queue is not empty!");
    }

    function sizeQueue(){
        
        if(queue.length === 0){
            showPopup(`Size : 0`);
            return;
        }
        showPopup(`Size : ${queue.length}`);
    }

    function checkOverflow(){
        
        const queueWrapper = document.querySelector(".queue-wrapper");

        if(queueContainer.scrollWidth > queueWrapper.clientWidth){
          queueWrapper.style.overflowX = "auto";
          queueWrapper.scrollLeft = (queueContainer.scrollWidth - queueWrapper.clientWidth) / 2;
        }
        else 
          queueWrapper.style.overflowX = "hidden";
    }

    function resetQueue(){
        queue = [];
        queueContainer.innerHTML = "";
    }


    enqueueBtn.addEventListener("click", enqueueElement);
    dequeueBtn.addEventListener("click", dequeueElement);
    emptyBtn.addEventListener("click", emptyQueue);
    sizeBtn.addEventListener("click", sizeQueue);
    peekBtn.addEventListener("click", peekElement);
    resetBtn.addEventListener("click", resetQueue);

});
