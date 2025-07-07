function calculateBMI() {
    let height = document.getElementById("height").value;
    let weight = document.getElementById("weight").value;

    if (height === "" || weight === "" || height <= 0 || weight <= 0) {
        alert("Please enter valid height and weight!");
        return;
    }

    height = parseFloat(height);
    weight = parseFloat(weight);

    let bmi = (weight / ((height / 100) ** 2)).toFixed(1);
    let category = getBMICategory(bmi);
    let healthyRange = getHealthyWeightRange(height);

    document.getElementById("bmi-result").innerText = bmi;
    document.getElementById("bmi-category").innerText = category;
    document.getElementById("healthy-range").innerText = healthyRange;
}

function getBMICategory(bmi) {
    if (bmi < 18.5) return "Underweight";
    else if (bmi < 24.9) return "Normal weight";
    else if (bmi < 29.9) return "Overweight";
    else return "Obese";
}

function getHealthyWeightRange(height) {
    let minWeight = ((18.5 * (height / 100) ** 2)).toFixed(1);
    let maxWeight = ((24.9 * (height / 100) ** 2)).toFixed(1);
    return `${minWeight} kg - ${maxWeight} kg`;
}
