
function toggleDropdown() {
    document.getElementById("dropdownMenu").classList.toggle("show");
    }
    
function redirectTo(url) {
    window.location.href = url;
    }

function closeDropdown() {
    let clicktimeout = setTimeout(() => {
        document.getElementById("dropdownMenu").classList.remove("show")
    }, 250);
}

window.onclick = function(event) {
    let clicktimeout = setTimeout(() => {
        if (!event.target.closest(".icon") && !event.target.closest(".dropdown")) {
            document.getElementById("dropdownMenu").classList.remove("show");
            }
    }, 250);
    }

const algorithms = ["Stack", "Queue", "Graph", "Tree", "Sorting"];
let index = 0;

function changeAlgorithm() {
    document.getElementById("rotating-text").textContent = algorithms[index];
    index = (index + 1) % algorithms.length;
}

// setInterval(changeAlgorithm, 3000);

document.addEventListener("DOMContentLoaded", () => {
    setInterval(changeAlgorithm, 3000);
});


function scrollToContainer() {
    const container = document.querySelector('.algo-container');
    if (container) {
        container.scrollIntoView({ behavior: 'smooth' });
    }
}
