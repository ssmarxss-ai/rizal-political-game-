let score = 0;
let timeLeft = 60;
let timer;
let currentLevel = 0;

const correctSound = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-game-bonus-reached-2065.mp3");

const levels = [
{
scramble: "LZEIOR SAJR",
answer: "JOSE RIZAL",
title: "Chapter 1: The Political Awakening",
content: "José Rizal emerged as a reformist intellectual shaped by colonial inequality. His education in Europe exposed him to liberal ideas of representation, equality, and civic dignity. Rather than violent revolution, Rizal believed that education and enlightenment were the foundation of political transformation."
},
{
scramble: "N O L I M E T A N G E R E",
answer: "NOLI ME TANGERE",
title: "Chapter 2: Political Critique in Noli",
content: "Noli Me Tangere was not merely fiction—it was political resistance. Through narrative, Rizal exposed friar dominance, systemic injustice, and racial discrimination. Literature became his instrument to awaken Filipino consciousness."
},
{
scramble: "E L F I L I B U S T E R I S M O",
answer: "EL FILIBUSTERISMO",
title: "Chapter 3: Radical Consequences",
content: "El Filibusterismo presented the darker outcome of denied reform. Rizal illustrated how oppression can radicalize individuals. He warned colonial authorities that injustice breeds revolution."
},
{
scramble: "L A L I G A F I L I P I N A",
answer: "LA LIGA FILIPINA",
title: "Chapter 4: Organized Reform",
content: "La Liga Filipina aimed to unite Filipinos under peaceful civic reform. It encouraged economic cooperation, education, and collective responsibility."
},
{
scramble: "D A P I T A N",
answer: "DAPITAN",
title: "Chapter 5: Reform in Exile",
content: "Even in exile, Rizal practiced reform. In Dapitan, he built schools and community systems—proving that political empowerment begins locally."
},
{
scramble: "C A L A M B A",
answer: "CALAMBA",
title: "Chapter 6: Roots of Injustice",
content: "Land disputes in Calamba shaped Rizal’s awareness of economic oppression and friar abuse of power."
},
{
scramble: "P R O P A G A N D A",
answer: "PROPAGANDA",
title: "Chapter 7: Intellectual Resistance",
content: "The Propaganda Movement demanded representation, secularization, and equal rights through journalism and reformist writing."
},
{
scramble: "R E P R E S E N T A T I O N",
answer: "REPRESENTATION",
title: "Chapter 8: Voice in Governance",
content: "Rizal believed taxation without representation was unjust. Filipinos deserved participation in governance."
},
{
scramble: "N A T I O N A L I S M",
answer: "NATIONALISM",
title: "Chapter 9: Civic Identity",
content: "Rizal’s nationalism was civic and inclusive. It sought dignity, equality, and shared responsibility."
},
{
scramble: "E D U C A T I O N",
answer: "EDUCATION",
title: "Chapter 10: Enlightenment First",
content: "Education was Rizal’s ultimate political weapon. Knowledge dismantles tyranny."
},
{
scramble: "R E F O R M",
answer: "REFORM",
title: "Chapter 11: Strategy Over Chaos",
content: "Rizal advocated gradual reform, believing moral readiness must precede independence."
},
{
scramble: "M A R T Y R",
answer: "MARTYR",
title: "Chapter 12: Political Martyrdom",
content: "Rizal’s execution intensified nationalist consciousness. His martyrdom immortalized his political philosophy."
}
];

function startGame() {
document.getElementById("startScreen").classList.add("hidden");
document.getElementById("gameScreen").classList.remove("hidden");
startTimer();
loadLevel();
}

function startTimer() {
timer = setInterval(() => {
timeLeft--;
document.getElementById("timer").textContent = timeLeft;
if (timeLeft <= 0) {
clearInterval(timer);
failGame();
}
}, 1000);
}

function loadLevel() {
if (currentLevel >= levels.length) {
winGame();
return;
}
document.getElementById("question").textContent = "Unscramble: " + levels[currentLevel].scramble;
}

function checkAnswer() {
const input = document.getElementById("answerInput").value.toUpperCase().trim();
if (input === levels[currentLevel].answer) {
score += 10;
document.getElementById("score").textContent = score;
correctSound.play();
showChapter();
launchConfetti();
} else {
alert("Incorrect! Try again.");
}
}

function showChapter() {
document.getElementById("questionContainer").classList.add("hidden");
document.getElementById("chapterContent").classList.remove("hidden");
document.getElementById("chapterTitle").textContent = levels[currentLevel].title;
document.getElementById("chapterText").textContent = levels[currentLevel].content;
}

function nextQuestion() {
currentLevel++;
document.getElementById("chapterContent").classList.add("hidden");
document.getElementById("questionContainer").classList.remove("hidden");
document.getElementById("answerInput").value = "";
loadLevel();
}

function winGame() {
clearInterval(timer);
alert("Congratulations! You completed all 12 Political Chapters!");
location.reload();
}

function failGame() {
alert("Time's up! History remains locked.");
location.reload();
}

function launchConfetti() {
for (let i = 0; i < 100; i++) {
let confetti = document.createElement("div");
confetti.style.position = "fixed";
confetti.style.width = "5px";
confetti.style.height = "5px";
confetti.style.background = "hsl(" + Math.random() * 360 + ",100%,50%)";
confetti.style.left = Math.random() * window.innerWidth + "px";
confetti.style.top = Math.random() * window.innerHeight + "px";
confetti.style.opacity = 1;
document.body.appendChild(confetti);
setTimeout(() => confetti.remove(), 1000);
}
}
