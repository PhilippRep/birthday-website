// =======================
// 📸 BILDER HIER ÄNDERN
// =======================

const startImages = [
    { src: "DSCF5081.jpg", style: { top:"5vh", left:"50%", transform:"translateX(-50%)" } },
    { src: "DSCF3972.jpg", style: { bottom:"0px", left:"5%" } },
    { src: "DSCF2395.jpg", style: { bottom:"0px", right:"5%" } }
];

function setImages(images) {
    const imgs = document.querySelectorAll(".images-top img");
    document.querySelector(".images-top").style.display = "block";
    imgs.forEach((img, i) => {
        if(!images[i]) return;
        img.src = images[i].src;
        img.style.cssText = "";
        Object.keys(images[i].style).forEach(key => img.style[key] = images[i].style[key]);
    });
}

function goToMemory() {
    // Startseite ausblenden
    document.getElementById("start-container").style.display = "none";

    // Bilder ausblenden
    document.querySelector(".images-top").style.display = "none";

    // Memory-Container anzeigen
    document.getElementById("memory-container").style.display = "block";
}

// DOM ready
document.addEventListener("DOMContentLoaded", () => {
    setImages(startImages);
});

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

        <img class="poster" src="ticket.jpg">
        <p><b>Happy Birthday, Julchen</b> 💚</p>
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

function startSpeedChallenge() {
  showOnly("speed-container");

  const speedContainer = document.getElementById("speed-container");
  const clickBtn = document.getElementById("speed-click-btn");
  const countSpan = document.getElementById("click-count");
  const timerSpan = document.getElementById("timer");

  let clicks = 0;
  let seconds = 5; // Dauer
  const minClicks = 35;
  const maxClicks = 50;

  countSpan.textContent = "0";
  clicks = 0;
  clickBtn.disabled = false;

  // ⚡ Stelle sicher, dass der Button sichtbar ist bevor wir touchstart binden
  requestAnimationFrame(() => {
    clickBtn.addEventListener("click", addClick);
    clickBtn.addEventListener("touchstart", addClick, {passive:false});
  });

  function addClick(e) {
    e.preventDefault();
    clicks++;
    countSpan.textContent = clicks;
  }

  const interval = setInterval(() => {
    seconds--;
    timerSpan.textContent = seconds;
    if (seconds <= 0) {
      clearInterval(interval);
      clickBtn.disabled = true;
      clickBtn.removeEventListener("click", addClick);
      clickBtn.removeEventListener("touchstart", addClick);

      if (clicks >= minClicks && clicks <= maxClicks) {
        alert(`Super! Du hast ${clicks} Klicks geschafft! Weiter zum Button Game 🎉`);
        speedContainer.style.display = "none";
        startMovingGame();
      } else {
        alert(`Schade 😢 Du hattest ${clicks} Klicks. Versuch's noch einmal!`);
        startSpeedChallenge();
      }
    }
  }, 1000);
}

  // Klick-Handler
clickBtn.addEventListener("click", () => { clicks++; countSpan.textContent = clicks; });
clickBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    clicks++;
    countSpan.textContent = clicks;
}, {passive:false});

// ======================
// MOVING BUTTON GAME (HARD MODE 😈)
// ======================

function startMovingGame() {
  showOnly("move-container");

  const container = document.getElementById("move-container");
  const btn = document.getElementById("move-btn");
  const area = document.getElementById("move-area");
  const counter = document.getElementById("hit-count");

  let hits = 0;
  const targetHits = 4;
  let size = 1;
  let speed = 1;

  container.style.display = "block";
  counter.textContent = "0";

  // ⚡ Wichtiger Fix: Button bewegen NACHDEM Container sichtbar ist
  requestAnimationFrame(() => moveButton());

  function moveButton() {
    const maxX = area.clientWidth - btn.offsetWidth;
    const maxY = area.clientHeight - btn.offsetHeight;
    btn.style.left = Math.random() * maxX + "px";
    btn.style.top = Math.random() * maxY + "px";
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
    setTimeout(() => fake.remove(), 1500);
  }

  // Bewegung
  const moveHandler = (e) => {
    e.preventDefault();
    for (let i = 0; i < speed; i++) moveButton();
  };

  btn.onmouseover = moveHandler;
  btn.ontouchstart = moveHandler;

  btn.onclick = (e) => {
    e.preventDefault();
    hits++;
    counter.textContent = hits;

    size -= 0.15;
    if (size < 0.5) size = 0.5;
    btn.style.transform = `scale(${size})`;
    speed++;
    spawnFakeButton();
    moveButton();

    if (hits >= targetHits) {
      alert("DU HAST IHN GEFANGEN 😈🔥 Weiter zum Emoji Catcher!");
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
  correctCount = 0;

  const imagePath = "DSCF5081.jpg"; // Hochkantbild
  const rows = 2;
  const cols = 3;

  const img = new Image();
  img.src = imagePath;
  img.onload = function() {
    const pieceWidth = img.width / cols;
    const pieceHeight = img.height / rows;

    // --- Slots erstellen ---
    for (let i = 0; i < rows * cols; i++) {
      const slot = document.createElement("div");
      slot.classList.add("puzzle-slot");
      slot.dataset.index = i;
      slot.addEventListener("dragover", e => e.preventDefault());
      slot.addEventListener("drop", dropPiece);
      puzzleGrid.appendChild(slot);
    }

    // --- Pieces erstellen ---
    const pieces = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const piece = document.createElement("div");
        piece.classList.add("puzzle-piece");
        piece.draggable = true;
        piece.dataset.index = r * cols + c;

        // Bild als Hintergrund setzen
        piece.style.width = pieceWidth + "px";
        piece.style.height = pieceHeight + "px";
        piece.style.backgroundImage = `url(${imagePath})`;
        piece.style.backgroundPosition = `-${c * pieceWidth}px -${r * pieceHeight}px`;
        piece.style.backgroundSize = `${img.width}px ${img.height}px`;

        // Drag & Touch Events
        piece.addEventListener("dragstart", dragStart);
        piece.addEventListener("touchstart", touchStart, {passive:false});
        piece.addEventListener("touchmove", touchMove, {passive:false});
        piece.addEventListener("touchend", touchEnd);

        pieces.push(piece);
      }
    }

    // Pieces mischen
    pieces.sort(() => Math.random() - 0.5);
    pieces.forEach(p => puzzlePiecesContainer.appendChild(p));
  };
}

// --- Drag & Drop ---
function dragStart(e) {
  draggedPiece = this;
}

function dropPiece(e) {
  e.preventDefault();
  if (!draggedPiece) return;

  const slotIndex = parseInt(this.dataset.index);
  const pieceIndex = parseInt(draggedPiece.dataset.index);

  // richtige Position prüfen
  if (slotIndex === pieceIndex) {
    this.appendChild(draggedPiece);
    draggedPiece.style.position = "relative";
    draggedPiece.style.left = "0";
    draggedPiece.style.top = "0";
    draggedPiece.style.cursor = "default";
    draggedPiece.draggable = false;
    correctCount++;
    document.getElementById("puzzle-count").textContent = correctCount;

    if (correctCount === 6) {
      setTimeout(() => alert("Puzzle fertig! 🎉"), 200);
    }
  }

  draggedPiece = null;
}

// --- Touch Support ---
function touchStart(e) {
  draggedPiece = this;
  e.preventDefault();
}

function touchMove(e) {
  if (!draggedPiece) return;
  e.preventDefault();
  const touch = e.touches[0];
  draggedPiece.style.position = "absolute";
  draggedPiece.style.left = touch.clientX - draggedPiece.offsetWidth/2 + "px";
  draggedPiece.style.top = touch.clientY - draggedPiece.offsetHeight/2 + "px";
  draggedPiece.style.zIndex = 1000;
}

function touchEnd(e) {
  if (!draggedPiece) return;
  // Prüfe Drop auf Slot
  const slots = document.querySelectorAll(".puzzle-slot");
  slots.forEach(slot => {
    const rect = slot.getBoundingClientRect();
    const x = e.changedTouches[0].clientX;
    const y = e.changedTouches[0].clientY;
    if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
      slot.dispatchEvent(new Event("drop", {bubbles:true, cancelable:true}));
    }
  });
  draggedPiece.style.position = "relative";
  draggedPiece.style.zIndex = 1;
  draggedPiece = null;
}

// --- Hilfsfunktion ---
function showOnly(id) {
  document.querySelectorAll(".container").forEach(c => {
    c.style.display = "none";
  });
  document.getElementById(id).style.display = "block";
}