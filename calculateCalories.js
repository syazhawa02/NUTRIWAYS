document.getElementById("male").addEventListener("click", function () {
    document.getElementById("male").classList.add("selected");
    document.getElementById("female").classList.remove("selected");
});

document.getElementById("female").addEventListener("click", function () {
    document.getElementById("female").classList.add("selected");
    document.getElementById("male").classList.remove("selected");
});

function calculateCalories() {
    let height = parseFloat(document.getElementById("height_cal").value);
    let weight = parseFloat(document.getElementById("weight_cal").value);
    let age = parseFloat(document.getElementById("age_cal").value);
    let activityLevel = parseFloat(document.getElementById("activity").value);
    let isMale = document.getElementById("male").classList.contains("selected");

    if (isNaN(height) || isNaN(weight) || isNaN(age) || isNaN(activityLevel) || activityLevel < 1 || activityLevel > 5) {
        alert("Please enter valid inputs!");
        return;
    }

    let bmr;
    if (isMale) {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    let activityMultiplier = [1.2, 1.375, 1.55, 1.725, 1.9][activityLevel - 1];
    let totalCalories = (bmr * activityMultiplier).toFixed(0);
    let totalCarbs = (totalCalories * 0.55 / 4).toFixed(0);

    document.getElementById("total-calories").value = totalCalories + " kcal";
    document.getElementById("total-carbs").value = totalCarbs + " g";
}
