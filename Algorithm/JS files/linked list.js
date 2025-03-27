document.addEventListener("DOMContentLoaded", function () {
    const listWrapper = document.querySelector("#list-wrapper");
    const linkedListContainer = document.getElementById("linked-list-container");
    const valueInput = document.getElementById("value-input");
    const indexInput = document.getElementById("index-input");
    const insertBtn = document.getElementById("insert-btn");
    const deleteBtn = document.getElementById("delete-btn");
    const clearBtn = document.getElementById("clear-btn");
    const messageBox = document.getElementById("error-message");

    function showErrorMessage(message) {
        messageBox.textContent = message;
        messageBox.style.opacity = "1";
        setTimeout(() => {
            messageBox.style.opacity = "0";
        }, 3000);
    }

    class Node {
        constructor(value) {
            this.value = value;
            this.next = null;
        }
    }

    class LinkedList {
        constructor() {
            this.head = null;
            this.size = 0;
        }

        insert(value, index) {
            if (value === "" || isNaN(value) || index === "" || isNaN(index)) {
                showErrorMessage("❌ Please enter a valid value and index!");
                return;
            }
            index = parseInt(index);

            if (index < 0) {
                showErrorMessage("❌ Invalid index! Index must be 0 or greater.");
                return;
            }
            if (this.size === 0 && index !== 0) {
                showErrorMessage("❌ List is empty. You can only insert at index 0.");
                return;
            }
            if (index > this.size) {
                showErrorMessage("❌ Index out of bounds!");
                return;
            }

            let newNode = new Node(value);
            if (index === 0) {
                newNode.next = this.head;
                this.head = newNode;
            } else {
                let temp = this.head;
                let prev = null;
                let i = 0;

                while (temp && i < index) {
                    prev = temp;
                    temp = temp.next;
                    i++;
                }
                prev.next = newNode;
                newNode.next = temp;
            }
            this.size++;
            this.render();
        
        }

        delete(index) {
            if (index === "" || isNaN(index)) {
                showErrorMessage("❌ Please enter a valid index!");
                return;
            }
            index = parseInt(index);

            if (index < 0) {
                showErrorMessage("❌ Invalid index! Index must be 0 or greater.");
                return;
            }
            if (!this.head) {
                showErrorMessage("❌ List is empty. Nothing to delete.");
                return;
            }
            if (index >= this.size) {
                showErrorMessage("❌ Index out of bounds! No deletion occurred.");
                return;
            }

            if (index === 0) {
                this.head = this.head.next;
            } else {
                let temp = this.head;
                let prev = null;
                let i = 0;

                while (temp && i < index) {
                    prev = temp;
                    temp = temp.next;
                    i++;
                }
                prev.next = temp.next;
            }
            this.size--;
            this.render();
        }

        render() {
            linkedListContainer.innerHTML = "";
            let temp = this.head;
            let index = 0;

            while (temp) {
                let nodeWrapper = document.createElement("div");
                nodeWrapper.classList.add("node-wrapper");

                let indexLabel = document.createElement("div");
                indexLabel.classList.add("index-label");
                indexLabel.textContent = index;
                indexLabel.style.textAlign = "center";
                indexLabel.style.marginBottom = "5px";

                let nodeElement = document.createElement("div");
                nodeElement.classList.add("node");
                nodeElement.textContent = temp.value;

                nodeWrapper.appendChild(indexLabel);
                nodeWrapper.appendChild(nodeElement);
                linkedListContainer.appendChild(nodeWrapper);

                if (temp.next) {
                    let arrow = document.createElement("span");
                    arrow.classList.add("arrow");
                    arrow.innerHTML = " → ";
                    linkedListContainer.appendChild(arrow);
                } else {
                    let nullNode = document.createElement("span");
                    nullNode.classList.add("null-node");
                    nullNode.textContent = "null";
                    linkedListContainer.appendChild(nullNode);
                }
                temp = temp.next;
                index++;
            }

            valueInput.value = "";
            indexInput.value = "";

            checkOverflow();
        }

        clearList() {
            this.head = null;
            this.size = 0;
            this.render();
        }
    }

    const linkedList = new LinkedList();

    insertBtn.addEventListener("click", function () {
        let value = valueInput.value.trim();
        let index = indexInput.value.trim();
        linkedList.insert(value, index);
    });

    deleteBtn.addEventListener("click", function () {
        let index = indexInput.value.trim();
        linkedList.delete(index);
        indexInput.value = "";
    });

    clearBtn.addEventListener("click", function () {
        linkedList.clearList();
    });

    valueInput.addEventListener("input", function () {
        this.value = this.value.replace(/[^0-9]/g, "");
    });


    function checkOverflow(){
    
        if(linkedListContainer.scrollWidth > listWrapper.clientWidth){
          listWrapper.style.overflowX = "auto";
          listWrapper.scrollLeft = (linkedListContainer.scrollWidth - listWrapper.clientWidth) / 2;
        }
        else 
          listWrapper.style.overflowX = "hidden";
    }
});
