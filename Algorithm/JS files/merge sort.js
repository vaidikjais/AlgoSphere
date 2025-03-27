document.addEventListener("DOMContentLoaded", function () {
    let array = [];
    let isSorting = false;

    const merge_sort_container = document.getElementById("merge_sort_container");
    const errorMessage = document.getElementById("error-message"); // ✅ Fixed access to errorMessage

    function generateArray() {
        merge_sort_container.innerHTML = "";
        errorMessage.textContent = ""; // ✅ Clear error when generating random array
        array = Array.from({ length: 6 }, () => Math.floor(Math.random() * 100) + 10);
        createRow([array]);
    }

    function createRow(segments) {
        let row = document.createElement("div");
        row.className = "row";
        segments.forEach(segment => {
            let segmentDiv = document.createElement("div");
            segmentDiv.className = "segment";
            segment.forEach(num => {
                let box = document.createElement("div");
                box.className = "box";
                box.textContent = num;
                segmentDiv.appendChild(box);
            });
            row.appendChild(segmentDiv);
        });
        merge_sort_container.appendChild(row);
    }

    async function divideAndVisualize(arr, left, right) {
        if (!isSorting || left >= right) return;

        let mid = Math.floor((left + right) / 2);
        let leftSegment = arr.slice(left, mid + 1);
        let rightSegment = arr.slice(mid + 1, right + 1);
        
        createRow([leftSegment, rightSegment]);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        await divideAndVisualize(arr, left, mid);
        await divideAndVisualize(arr, mid + 1, right);
    }

    async function mergeSort(arr, left, right) {
        if (!isSorting || left >= right) return;

        let mid = Math.floor((left + right) / 2);

        await mergeSort(arr, left, mid);
        await mergeSort(arr, mid + 1, right);
        
        await merge(arr, left, mid, right);

        createRow([arr.slice(left, right + 1)]);
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    async function merge(arr, left, mid, right) {
        let n1 = mid - left + 1;
        let n2 = right - mid;

        let L = arr.slice(left, mid + 1);
        let R = arr.slice(mid + 1, right + 1);

        let i = 0, j = 0, k = left;

        while (i < n1 && j < n2) {
            if (!isSorting) return;

            if (L[i] <= R[j]) {
                arr[k] = L[i];
                i++;
            } else {
                arr[k] = R[j];
                j++;
            }
            k++;
        }

        while (i < n1) {
            if (!isSorting) return;
            arr[k] = L[i];
            i++;
            k++;
        }

        while (j < n2) {
            if (!isSorting) return;
            arr[k] = R[j];
            j++;
            k++;
        }
    }

    async function startMergeSort() {

        const sortButton = document.querySelector(".sort");
        sortButton.disabled = true;
        sortButton.classList.add("disabled");

        if (array.length > 6) {
            errorMessage.textContent = "⚠️ Error: Maximum of 6 elements allowed!";
            return;
        }

        isSorting = true;
        merge_sort_container.innerHTML = "";
        createRow([array]);

        await new Promise(resolve => setTimeout(resolve, 1000));

        await divideAndVisualize(array, 0, array.length - 1);
        await mergeSort(array, 0, array.length - 1);

        sortButton.disabled = false;
        sortButton.classList.remove("disabled");

        isSorting = false;
    }

    function resetArray() {
        isSorting = false;
        array = [];
        merge_sort_container.innerHTML = "";
        errorMessage.textContent = ""; // ✅ Clear error message on reset
        document.getElementById("element").value = "";
    }

    function handleUserInput() {
        const input = document.getElementById("element").value.trim();
        if (!input) return;

        let elements = input.split(",").map(num => parseInt(num.trim())).filter(num => !isNaN(num));

        if (elements.length > 6) {
            showErrorMessage("You can enter a maximum of 6 elements.");
        }
        else 
        {
            hideErrorMessage();
            array = elements;
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
    document.querySelector(".sort").addEventListener("click", startMergeSort);
    document.querySelector(".reset").addEventListener("click", resetArray);
    document.getElementById("element").addEventListener("change", handleUserInput);
});
