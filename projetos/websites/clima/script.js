function ftoc() {

    const tmp = document.getElementById("temphere").textContent; 
    const value = parseFloat(tmp);

    document.getElementById("temphere").textContent = tmp.includes("C") 
        ? `${((value * 9/5) + 32).toFixed(1)}°F` 
        : `${((value - 32) * 5/9).toFixed(1)}°C`;
}

function find(){
    
}