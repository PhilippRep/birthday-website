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
            alert("Memory abgeschlossen! 🎉 Jetzt geht's zur Speed-Challenge!");
            showOnly("speed-container");
            startSpeedChallenge();

        }, 300);
    }
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
        <p><br>Happy Birthday, Julchen</b> 💜</p>
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
  showOnly("memory-container");

  // Bilder ausblenden
  document.querySelector(".images-top").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
   // dein Memory-Code
});

// ======================
// KLICK SPEED CHALLENGE
// ======================

function startSpeedChallenge() {showOnly("speed-container");
  const speedContainer = document.getElementById("speed-container");
  const clickBtn = document.getElementById("speed-click-btn");
  const countSpan = document.getElementById("click-count");
  const timerSpan = document.getElementById("timer");

  let clicks = 0;
  let seconds = 5; // Dauer der Challenge
  const minClicks = 30;
  const maxClicks = 50;

  // Container sichtbar machen
  speedContainer.style.display = "block";

  // Klick-Button reset
  countSpan.textContent = "0";
  clicks = 0;

  clickBtn.disabled = false;

  const interval = setInterval(() => {
    seconds--;
    timerSpan.textContent = seconds;
    if (seconds <= 0) {
      clearInterval(interval);
      clickBtn.disabled = true;

      // Erfolg prüfen
      if (clicks >= minClicks && clicks <= maxClicks) {
        alert(`Super! Du hast ${clicks} Klicks geschafft! Weiter zum Button Game 🎉`);
        speedContainer.style.display = "none";
        startMovingGame();
      } else {
        alert(`Schade 😢 Du hattest ${clicks} Klicks. Versuch's noch einmal!`);
        startSpeedChallenge(); // nochmal starten
      }
    }
  }, 1000);

  // Klick-Handler
  clickBtn.onclick = () => {
    clicks++;
    countSpan.textContent = clicks;
  };
}
// ======================
// MOVING BUTTON GAME (HARD MODE 😈)
// ======================

function startMovingGame() {showOnly("move-container");
  const container = document.getElementById("move-container");
  const btn = document.getElementById("move-btn");
  const area = document.getElementById("move-area");
  const counter = document.getElementById("hit-count");

  let hits = 0;
  const targetHits = 4;

  let size = 1; // Startgröße
  let speed = 1; // Geschwindigkeit

  container.style.display = "block";
  counter.textContent = "0";

  function moveButton() {
    const maxX = area.clientWidth - btn.offsetWidth;
    const maxY = area.clientHeight - btn.offsetHeight;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    btn.style.left = x + "px";
    btn.style.top = y + "px";
  }

  function spawnFakeButton() {
    const fake = document.createElement("button");
    fake.textContent = "😜";
    fake.classList.add("fake-btn");

    const maxX = area.clientWidth - 60;
    const maxY = area.clientHeight - 40;

    fake.style.left = Math.random() * maxX + "px";
    fake.style.top = Math.random() * maxY + "px";

    fake.onclick = (e) => {
      e.preventDefault();
      alert("Falsch 😜");
    };

    area.appendChild(fake);

    // Fake Button nach kurzer Zeit entfernen
    setTimeout(() => {
      fake.remove();
    }, 1500);
  }

  // Startposition
  moveButton();

  // Bewegung
  btn.onmouseover = () => {
    for (let i = 0; i < speed; i++) moveButton();
  };

  btn.ontouchstart = () => {
    for (let i = 0; i < speed; i++) moveButton();
  };

  // Klick
  btn.onclick = (e) => {
    e.preventDefault();

    hits++;
    counter.textContent = hits;

    // 🔻 wird kleiner
    size -= 0.15;
    if (size < 0.5) size = 0.5;
    btn.style.transform = `scale(${size})`;

    // ⚡ wird schneller
    speed++;

    // 👻 Fake Buttons spawnen
    spawnFakeButton();

    moveButton();

    if (hits >= targetHits) {
      alert("DU HAST IHN GEFANGEN 😈🔥 Weiter zum Emoyi Catcher!");

      container.style.display = "none";
      showOnly("quiz-container");
      startEmojiCatcher();
    }
  };
}

function showOnly(id) {
  document.querySelectorAll(".container").forEach(c => {
    c.style.display = "none";
  });
  document.getElementById(id).style.display = "block";
}

// Emoyi Catcher Mini Game
function startEmojiCatcher() { showOnly("emoji-container");
  const area = document.getElementById("emoji-area");
  const countSpan = document.getElementById("emoji-count");
  let caught = 0;
  const target = 5;
  let activeEmojis = [];

  countSpan.textContent = caught;

  function spawnEmoji() {
    const emoji = document.createElement("div");
    emoji.className = "emoji";
    emoji.textContent = ["🍀","🎉","💜","⭐","🍓"][Math.floor(Math.random()*5)];
    emoji.style.left = Math.random() * (area.clientWidth - 40) + "px";
    emoji.style.top = "0px";
    area.appendChild(emoji);
    activeEmojis.push(emoji);

    const fallSpeed = Math.random() * 2 + 1; // 1-3 px/frame

    function fall() {
      const top = parseFloat(emoji.style.top);
      if (top >= area.clientHeight - 40) {
        // Emoji verpasst
        emoji.remove();
        activeEmojis = activeEmojis.filter(e => e!==emoji);
        return;
      }
      emoji.style.top = top + fallSpeed + "px";
      requestAnimationFrame(fall);
    }
    fall();

    // Klick
    emoji.onclick = () => {
      caught++;
      countSpan.textContent = caught;
      emoji.remove();
      activeEmojis = activeEmojis.filter(e => e!==emoji);

      // Schwierigkeit erhöhen
      spawnEmoji();
      if (caught >= target) {
        alert("Super! Du hast die Emojis gefangen! 🎉 Weiter zum Memory Flash!");
        showOnly("quiz-container");
        startFlashGame();
      }
    };
  }

  // Start Emojis spawnen
  for (let i=0;i<3;i++) spawnEmoji();
  // Alle 1,5 Sekunden ein neues Emoji
  const spawnInterval = setInterval(() => {
    if (caught >= target) clearInterval(spawnInterval);
    spawnEmoji();
  }, 1500);
}

function startFlashGame() {
  showOnly("flash-container");

  const flashSequenceDiv = document.getElementById("flash-sequence");
  const flashButtonsDiv = document.getElementById("flash-buttons");
  const progressSpan = document.getElementById("flash-progress");

  const symbols = ["🐶","🌴","🎁","☀️","🍓","🎂"];
  const targetLength = 5; // Anzahl der Symbole, die gemerkt werden müssen
  let sequence = [];
  let userInput = [];
  let index = 0;

  progressSpan.textContent = index;

  // Buttons erstellen
  flashButtonsDiv.innerHTML = "";
  symbols.forEach(sym => {
    const btn = document.createElement("button");
    btn.textContent = sym;
    btn.onclick = () => {
      userInput.push(sym);
      if (sym === sequence[userInput.length - 1]) {
        index++;
        progressSpan.textContent = index;
        if (userInput.length === sequence.length) {
          alert("Super! 🎉 Du hast die Sequenz richtig! Weiter zum Puzzle!");
          showOnly("quiz-container");
          startPuzzle();
        }
      } else {
        alert("Falsch 😢 Versuch es nochmal!");
        startFlashGame(); // Neustart
      }
    };
    flashButtonsDiv.appendChild(btn);
  });

  // Sequenz erzeugen
  sequence = [];
  for (let i = 0; i < targetLength; i++) {
    const random = symbols[Math.floor(Math.random() * symbols.length)];
    sequence.push(random);
  }

  // Sequenz anzeigen nacheinander
  flashSequenceDiv.textContent = "";
  let i = 0;
  const interval = setInterval(() => {
    flashSequenceDiv.textContent = sequence[i];
    i++;
    if (i >= sequence.length) {
      clearInterval(interval);
      setTimeout(() => {
        flashSequenceDiv.textContent = ""; // ausblenden
      }, 800);
    }
  }, 800);

  // Reset User Input
  userInput = [];
  index = 0;
  progressSpan.textContent = index;
}
let draggedPiece = null;
let correctCount = 0;

function startPuzzle() {
    showOnly("puzzle-container");

    const puzzleGrid = document.getElementById("puzzle-grid");
    const puzzlePiecesContainer = document.getElementById("puzzle-pieces");
    const puzzleCount = document.getElementById("puzzle-count");

    puzzleGrid.innerHTML = "";
    puzzlePiecesContainer.innerHTML = "";
    puzzleCount.textContent = "0";

    correctCount = 0; // ✅ Reset beim Neustart

    const imagePath = "/static/DSCF5081.jpg"; // <--- dein Bild
    const rows = 2;
    const cols = 3;

    const img = new Image();
    img.src = imagePath;
    img.onload = function() {
        const pieceWidth = img.width / cols;
        const pieceHeight = img.height / rows;

        // Slots erstellen
        for (let i = 0; i < rows * cols; i++) {
            const slot = document.createElement("div");
            slot.classList.add("puzzle-slot");
            slot.dataset.index = i;
            slot.addEventListener("dragover", e => e.preventDefault());
            slot.addEventListener("drop", dropPiece);
            puzzleGrid.appendChild(slot);
        }

        // Pieces aus Canvas schneiden
        const pieces = [];
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const canvas = document.createElement("canvas");
                canvas.width = pieceWidth;
                canvas.height = pieceHeight;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, c * pieceWidth, r * pieceHeight, pieceWidth, pieceHeight, 0, 0, pieceWidth, pieceHeight);

                const pieceImg = new Image();
                pieceImg.src = canvas.toDataURL();
                pieceImg.classList.add("puzzle-piece");
                pieceImg.draggable = true;
                pieceImg.dataset.index = r * cols + c;

                pieceImg.addEventListener("dragstart", dragStart);
                pieceImg.addEventListener("touchstart", touchStart, {passive:false});
                pieceImg.addEventListener("touchmove", touchMove, {passive:false});
                pieceImg.addEventListener("touchend", touchEnd);

                pieces.push(pieceImg);
            }
        }

        // Shuffle und anzeigen
        pieces.sort(() => Math.random() - 0.5).forEach(p => puzzlePiecesContainer.appendChild(p));
    };
}

// Drag & Drop
function dragStart(e) { draggedPiece = this; }
function dropPiece(e) {
    e.preventDefault();
    if (draggedPiece && this.children.length === 0) {
        this.appendChild(draggedPiece);
        draggedPiece.style.width = "100%";
        draggedPiece.style.height = "100%";
        correctCount++;
        document.getElementById("puzzle-count").textContent = correctCount;
        draggedPiece = null;
    }
}

// Touch Events
let touchOffsetX = 0, touchOffsetY = 0;
function touchStart(e) {
    e.preventDefault();
    draggedPiece = this;
    const touch = e.touches[0];
    const rect = this.getBoundingClientRect();
    touchOffsetX = touch.clientX - rect.left;
    touchOffsetY = touch.clientY - rect.top;
    this.style.position = "absolute";
    this.style.zIndex = "1000";
    document.body.appendChild(this);
    moveAt(touch.clientX, touch.clientY);
}

function touchMove(e) {
    e.preventDefault();
    const touch = e.touches[0];
    moveAt(touch.clientX, touch.clientY);
}

function moveAt(x, y) {
    draggedPiece.style.left = (x - touchOffsetX) + "px";
    draggedPiece.style.top = (y - touchOffsetY) + "px";
}

function touchEnd(e) {
    draggedPiece.style.position = "";
    draggedPiece.style.zIndex = "";
    let placed = false;
    document.querySelectorAll(".puzzle-slot").forEach(slot => {
        const rect = slot.getBoundingClientRect();
        const pieceRect = draggedPiece.getBoundingClientRect();
        if (
            pieceRect.left + pieceRect.width/2 > rect.left &&
            pieceRect.left + pieceRect.width/2 < rect.right &&
            pieceRect.top + pieceRect.height/2 > rect.top &&
            pieceRect.top + pieceRect.height/2 < rect.bottom &&
            slot.children.length === 0
        ) {
            slot.appendChild(draggedPiece);
            draggedPiece.style.width = "100%";
            draggedPiece.style.height = "100%";
            correctCount++;
            document.getElementById("puzzle-count").textContent = correctCount;
            placed = true;
        }
    });
    if (!placed) document.getElementById("puzzle-pieces").appendChild(draggedPiece);
    draggedPiece = null;
}