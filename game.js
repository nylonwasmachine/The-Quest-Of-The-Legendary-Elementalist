const beginButton = document.getElementById("begin-button");
const startScreen = document.getElementById("start-screen");
const elementScreen = document.getElementById("element-screen");

beginButton.addEventListener("click", function () {
startScreen.classList.add("hidden");
elementScreen.classList.remove("hidden");
});
