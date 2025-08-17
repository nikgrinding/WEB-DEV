let calculation = localStorage.getItem('calculation') || "";
displayCalculation();
function updateCalculation(value) {
    calculation += value;
    setCalculation();
    displayCalculation();
}
function evaluateCalculation() {
    calculation = eval(calculation);
    setCalculation();
    displayCalculation();
}
function displayCalculation() {
    document.querySelector('.js-calculation').innerHTML = calculation;
}
function clearCalculation() {
    calculation = "";
    setCalculation();
    displayCalculation();
}
function setCalculation() {
    localStorage.setItem('calculation', calculation);
}