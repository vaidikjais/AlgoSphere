let running = false; 
let currentIteration = 0; // Unique ID for each run

document.addEventListener("DOMContentLoaded", () => {
    createGrid();
});

function createGrid() {
    const grid = document.getElementById("grid");
    if (!grid) return; // Prevents null error
    grid.innerHTML = ""; 

    for (let i = 1; i <= 100; i++) {
        let box = document.createElement("div");
        box.classList.add("box");
        box.innerText = i;
        box.id = `num-${i}`;
        grid.appendChild(box);
    }
}

async function startSieve() {
    running = false; 
    currentIteration++; 
    let iteration = currentIteration; 

    createGrid(); 
    running = true; 

    let speedInput = document.getElementById("speed");
    
    function getSpeed() {
        let speedValue = parseInt(speedInput.value);
        return 1000 - speedValue;  // Maps range correctly: Higher value = Faster
    }

    let isPrime = Array(101).fill(true);
    document.getElementById("num-1").classList.add("non-prime");
    isPrime[1] = false;
    await sleep(getSpeed());
    if (!running || iteration !== currentIteration) return; 

    for (let num = 2; num <= 10; num++) {
        if (!isPrime[num]) continue;

        let box = document.getElementById(`num-${num}`);
        box.classList.add("prime");
        await sleep(getSpeed());
        if (!running || iteration !== currentIteration) return; 

        let multiples = [];
        for (let multiple = num * 2; multiple <= 100; multiple += num) {
            multiples.push(document.getElementById(`num-${multiple}`));
        }

        multiples.forEach(box => box.classList.add("processing"));
        await sleep(getSpeed());
        if (!running || iteration !== currentIteration) return; 

        multiples.forEach(box => {
            box.classList.remove("processing");
            box.classList.add("non-prime");
            isPrime[parseInt(box.innerText)] = false;
        });

        await sleep(getSpeed());
        if (!running || iteration !== currentIteration) return; 

    }

    for (let num = 2; num <= 100; num++) {
        if (isPrime[num]) {
            let box = document.getElementById(`num-${num}`);
            if (box) {
                box.classList.add("prime");
            }
        }
    }


    document.querySelectorAll(".non-prime").forEach(box => {
        box.style.backgroundColor = "white"; 
        box.style.color = "black";
    });
}

function clearGrid() {
    running = false;
    currentIteration++; 
    createGrid();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
