// =======================
// 📸 BILDER HIER ÄNDERN
// =======================

const startImages = [
    { src: "/static/DSCF5081.jpg", style: { top:"200px", left:"50%", transform: "translateX(-50%)" } },
    { src: "/static/DSCF3972.jpg", style: { bottom: "285px", right: "625px", transform: "none" } },
    { src: "/static/DSCF2395.jpg", style: { bottom:"285px", left: "625px", transform: "none"} }
];


// =======================
// 🔹 FUNKTION: Bilder setzen
// =======================

function setImages(imageArray){
    const imgs = document.querySelectorAll(".images-top img");
    const container = document.querySelector(".images-top");

    container.style.display = "block"; // sicherstellen dass sichtbar ist

    imgs.forEach((img, index)=>{
        if(imageArray[index]){
            img.src = imageArray[index].src;

            // Alle vorherigen Styles löschen
            img.style = "";

            // Neue Styles setzen
            Object.keys(imageArray[index].style).forEach(key=>{
                img.style[key] = imageArray[index].style[key];
            });
        }
    });
}

// =======================
// 🔹 START
// =======================

window.onload = () => {
    setImages(startImages);
}
// ======================
// MEMORY GAME
// ======================

const memoryCards = ["🐶","🐶","🌴","🌴","🎁","🎁","☀️","☀️","🍓","🍓","🎂","🎂"];;
let memoryGrid = document.getElementById("memoryGrid");
let startMemory = document.getElementById("startMemory");
let flipped = [];
let matched = 0;

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

document.addEventListener("DOMContentLoaded", () => {

    let memoryGrid = document.getElementById("memoryGrid");
    let startMemory = document.getElementById("startMemory");

    startMemory.addEventListener("click", () => {

        document.querySelector(".images-top").style.display = "none";
        memoryGrid.innerHTML = "";

        const cards = shuffle(memoryCards);

        cards.forEach((value) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.dataset.value = value;
            card.textContent = "";
            card.addEventListener("click", flipCard);
            memoryGrid.appendChild(card);
        });

        startMemory.style.display = "none";
    });

});

function flipCard() {
    if (flipped.length === 2 || this.classList.contains("flipped")) return;

    this.classList.add("flipped");
    this.textContent = this.dataset.value;
    flipped.push(this);

    if (flipped.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    const [first, second] = flipped;
    if (first.dataset.value === second.dataset.value) {
        matched += 2;
        first.style.background = "#7b64a5";
        second.style.background = "#7b64a5";
    } else {
        first.classList.remove("flipped");
        second.classList.remove("flipped");
        first.textContent = "";
        second.textContent = "";
    }
    flipped = [];

    if (matched === memoryCards.length) {
        setTimeout(() => {
            alert("Memory abgeschlossen! 🎉 Jetzt geht's zur Klick-Speed-Challenge!");
            document.getElementById("memory-container").style.display = "none";
            speedContainer.style.display = "block";
            startSpeedGame(); // startet die Challenge
        }, 300);
}

// ======================
// QUIZ LOGIC (wie vorher)
// ======================

let questions = [
    { q:"Wie heißt die Hauptstadt von Irland?", a:["Belfast","Dublin","Cork"], correct:1 },
    { q:"In welchem Land liegt Stonehenge?", a:["Irland","England","Schottland"], correct:1 },
    { q:"Welche Farbe hat die irische Flagge NICHT?", a:["Orange","Grün","Blau"], correct:2 },
    { q:"Du hast dir nun dein Geschenk verdient!", a:["Ruf Philipp 🗣️📢"], correct:0 },
    { q:"Hier gehts zum Geschenk?", a:["Klick hier"], correct:0 }
];

let current = 0;

function startQuiz() {
    showQuestion();
}

function showQuestion() {
    let q = questions[current];
    let html = `<h2>${q.q}</h2>`;
    q.a.forEach((answer,index) => {
        html += `<button onclick="answer(${index})">${answer}</button>`;
    });
    document.getElementById("screen").innerHTML = html;
}

function answer(index) {
    if(index === questions[current].correct){
        current++;
        if(current >= questions.length){
            reveal();
        } else {
            showQuestion();
        }
    } else {
        alert("Nicht ganz 😜");
    }
}

function reveal(){
    launchConfetti();


    document.getElementById("screen").innerHTML = `
        <h2>Überraschung 🎉</h2>

        <div class="ticket">
            <h3>2x Ticket für Calum Scott</h3>
            <p>Live in Leipzig 🎤</p>
            <p>Mit einem deiner Lieblingsmenschen ❤️</p>
        </div>

        <img class="poster" src="${posterPath}">
        <p>Happy <b>Birthday, Julchen</b> 💜</p>
`;

    startSong();
}

// =======================
// 🔹 Musik & Confetti (wie vorher)
// =======================

function startSong(){
    let song = document.getElementById("song");
    if(song){
        song.currentTime = 3; // start bei 0:03
        song.play().catch(()=>{}); // spielt bis zum Ende
    }
}

function launchConfetti(){
    let canvas = document.getElementById("confetti");
    let ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let pieces = [];
    for(let i=0;i<180;i++){
        pieces.push({ x:Math.random()*canvas.width, y:Math.random()*canvas.height, size:8, speed:Math.random()*3+2 });
    }

    function update(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        pieces.forEach(p=>{
            ctx.fillStyle = "#cbb8ff";
            ctx.fillRect(p.x,p.y,p.size,p.size);
            p.y += p.speed;
            if(p.y > canvas.height)p.y=0;
        });
        requestAnimationFrame(update);
    }

    update();
}

function goToMemory() {
    document.getElementById("start-container").style.display = "none";
    document.getElementById("memory-container").style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
   // dein Memory-Code
});

// ======================
// KLICK SPEED CHALLENGE
// ======================

const speedContainer = document.getElementById("speed-container");
const speedArea = document.getElementById("speed-area");
const startSpeed = document.getElementById("startSpeed");
const timeDisplay = document.getElementById("time");
const scoreDisplay = document.getElementById("score");

let speedTime = 10; // Sekunden
let speedScore = 0;
let speedInterval;

const emojis = ["⚡","🔥","💚","🎉","🌟"]; // zufällige Symbole

startSpeed.addEventListener("click", () => {
    startSpeed.style.display = "none";
    speedScore = 0;
    speedTime = 10;
    scoreDisplay.textContent = speedScore;
    timeDisplay.textContent = speedTime;

    nextEmoji();

    speedInterval = setInterval(() => {
        speedTime--;
        timeDisplay.textContent = speedTime;
        if(speedTime <= 0){
            clearInterval(speedInterval);
            speedArea.innerHTML = "";
            alert(`Zeit abgelaufen! Dein Score: ${speedScore}`);
            // Weiter zum Quiz
            speedContainer.style.display = "none";
            document.getElementById("quiz-container").style.display = "block";
            startQuiz();
        }
    }, 1000);
});

function nextEmoji() {
    speedArea.innerHTML = "";
    const emoji = document.createElement("div");
    emoji.classList.add("speed-emoji");
    emoji.textContent = emojis[Math.floor(Math.random()*emojis.length)];

    // zufällige Position
    const areaRect = speedArea.getBoundingClientRect();
    const x = Math.random() * (areaRect.width - 50);
    const y = Math.random() * (areaRect.height - 50);
    emoji.style.left = x + "px";
    emoji.style.top = y + "px";

    emoji.addEventListener("click", () => {
        speedScore++;
        scoreDisplay.textContent = speedScore;
        nextEmoji();
    });

    speedArea.appendChild(emoji);
}

const speedContainer = document.getElementById("speed-container");
const clickButton = document.getElementById("clickButton");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");

let score = 0;
let time = 10; // Sekunden
let timer;

function startSpeedGame() {
    score = 0;
    time = 10;
    scoreDisplay.textContent = score;
    timeDisplay.textContent = time;

    // Button klicken zählt Punkte
    clickButton.addEventListener("click", () => {
        score++;
        scoreDisplay.textContent = score;
    });

    // Timer runterzählen
    timer = setInterval(() => {
        time--;
        timeDisplay.textContent = time;
        if (time <= 0) {
            endSpeedGame();
        }
    }, 1000);
}

function endSpeedGame() {
    clearInterval(timer);

    const minClicks = 30; // Minimum für Erfolg
    const maxClicks = 60; // Max für Machbarkeit

    if (score >= minClicks && score <= maxClicks) {
        alert(`Super! Du hast ${score} Klicks geschafft! Weiter zum Quiz 🎉`);
        speedContainer.style.display = "none";
        document.getElementById("quiz-container").style.display = "block";
        startQuiz();
    } else if (score < minClicks) {
        alert(`Zu wenige Klicks (${score}) 😅 Versuche es nochmal!`);
        score = 0;
        time = 10;
        scoreDisplay.textContent = score;
        timeDisplay.textContent = time;
    } else {
        alert(`Zu viele Klicks (${score}) 😲 Du warst zu schnell! Versuche es nochmal!`);
        score = 0;
        time = 10;
        scoreDisplay.textContent = score;
        timeDisplay.textContent = time;
    }
}