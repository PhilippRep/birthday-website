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
    { q: "Warum sind Erdbeeren süßer bei Sonne?", a:["Mehr Wasser", "Mehr Zuckerbildung", "Weniger Säure"], correct: 1 },
    { q: "Hauptstadt von England?", a:["Manchester", "London", "Liverpool"], correct: 1 },
    { q: "Wie viele Geruchsrezeptoren hat ein Hund?", a:["50 Mio", "220 Mio", "500 Mio"], correct: 1 },
    { q: "Was ist ein Kiwi?", a:["Säugetier", "Vogel", "Reptil"], correct: 1 },
    { q: "Warum gelten Esel als stur?", a:["Faulheit", "Vorsicht", "Aggressivität"], correct: 1 },
    { q: "Wie viele Mägen hat eine Kuh?", a:["Vier", "Einen mit vier Kammern", "Zwei"], correct: 1 },
    { q: "Was bedeutet vegan?", a:["Kein Fleisch", "Keine tierischen Produkte", "Nur Gemüse"], correct: 1 },
    { q: "Welches Tier gilt als unterschätzt intelligent?", a:["Kuh", "Esel", "Schaf"], correct: 1 },
    { q: "Was ist der rote Teil der Erdbeere?", a:["Fruchtfleisch", "Scheinfrucht", "Samen"], correct: 1 },
    { q: "Warum war Titanic erfolgreich?", a:["Effekte", "Mix aus allem", "Keine Konkurrenz"], correct: 1 },
    { q: "Warum produzieren Kühe Methan?", a:["Luft", "Mikroorganismen", "Bewegung"], correct: 1 },
    { q: "Wie nennt man einen männlichen Esel?", a:["Bock", "Hengst", "Widder"], correct: 1 },
    { q: "Warum kaum Säugetiere in Neuseeland?", a:["Kälte", "Isolation", "Vulkane"], correct: 1 },
    { q: "Hauptstadt von Irland?", a:["Cork", "Dublin", "Galway"], correct: 1 },
    { q: "Warum riechen Hunde besser?", a:["Größere Nase", "Mehr Riechzellen", "Schnellere Atmung"], correct: 1 },
    { q: "Typische Landschaft Kreta?", a:["Wüste", "Berge & Strände", "Regenwald"], correct: 1 },
    { q: "Was verbindet viele Themen?", a:["Technik", "Natur", "Industrie"], correct: 1 },
    { q: "Was ist Loch Ness?", a:["Fluss", "See", "Gebirge"], correct: 1 },
    { q: "Warum Quarter-Life-Crisis?", a:["Geld", "Orientierung", "Gesundheit"], correct: 1 },
    { q: "Welche Hunderasse gilt als besonders intelligent?", a:["Pudel", "Border Collie", "Deutscher Schäferhund"], correct: 1 },
    { q: "Wie viele Zähne hat ein erwachsener Hund?", a:["40", "42", "44"], correct: 1 },
    { q: "Was bedeutet Vanlife?", a:["Im Van leben", "Urlaub machen", "Pendeln"], correct: 0 },
    { q: "Warum können Kühe schlecht Treppen gehen?", a:["Schlechte Sicht nach unten", "Zu schwere Körper", "Zu kurze Beine"], correct: 0 },
    { q: "Was passiert im Pansen?", a:["Fettverdauung", "Mikrobielle Gärung", "Eiweißabbau"], correct: 1 },
    { q: "Nationalfeiertag Irlands?", a:["St. Patrick’s Day", "Independence Day", "Green Day"], correct: 0 },
    { q: "Wie viele Hauptinseln hat Neuseeland?", a:["1", "2", "3"], correct: 1 },
    { q: "Warum war Kreta wichtig?", a:["Bodenschätze", "Handel", "Klima"], correct: 1 },
    { q: "Was ist ein Kilt?", a:["Hut", "Rock", "Jacke"], correct: 1 },
    { q: "Wie funktioniert ein Dudelsack?", a:["Luftsackdruck", "Elektronik", "Metall"], correct: 0 },
    { q: "Warum sind Esel trittsicher?", a:["Muskeln", "Vorsicht & Bau", "Gewicht"], correct: 1 },
    { q: "Zu welcher Familie gehören Erdbeeren?", a:["Rosengewächse", "Nachtschattengewächse", "Kürbisgewächse"], correct: 0 },
    { q: "Sind Erdbeeren echte Beeren?", a:["Ja", "Nein", "Nur im Sommer"], correct: 1 },
    { q: "Wo sitzen die Samen der Erdbeere?", a:["Innen", "Außen", "Im Kern"], correct: 1 },
    { q: "Was ist der Union Jack?", a:["Flagge Englands", "Flagge UK", "Militärflagge"], correct: 1 },
    { q: "Auf welcher Seite fährt man in England?", a:["Rechts", "Links", "Beidseitig"], correct: 1 },
    { q: "Typisches Instrument Schottlands?", a:["Geige", "Dudelsack", "Flöte"], correct: 1 },
    { q: "Kreta gehört zu welchem Land?", a:["Italien", "Griechenland", "Türkei"], correct: 1 },
    { q: "Welche Kultur war auf Kreta?", a:["Römer", "Minoer", "Ägypter"], correct: 1 },
    { q: "Wer sind die Māori?", a:["Einwanderer", "Ureinwohner", "Sprache"], correct: 1 },
    { q: "Warum viele Schafe?", a:["Klima", "Religion", "Zufall"], correct: 0 },
    { q: "Nachteil von Vanlife?", a:["Zu viel Platz", "Wenig Privatsphäre", "Zu viele Möbel"], correct: 1 },
    { q: "Wildcampen ist…", a:["Überall erlaubt", "Unterschiedlich geregelt", "Verboten"], correct: 1 },
    { q: "Welcher Film erschien 1997?", a:["Avatar", "Titanic", "Matrix"], correct: 1 },
    { q: "Welches Tier wurde 1997 berühmt?", a:["Dolly", "Timmy", "Babe"], correct: 0 },
    { q: "Welche Musik war typisch 1997?", a:["Pop/Boybands", "Klassik", "Jazz"], correct: 0 },
    { q: "Ende der 20er bedeutet?", a:["25–27", "27–29", "30–32"], correct: 1 },
    { q: "Typisch für Ende 20?", a:["Schule", "Lebensplanung", "Rente"], correct: 1 },
    { q: "Wichtiger Nährstoff?", a:["Vitamin C", "Vitamin B12", "Zucker"], correct: 1 },
    { q: "Ist Honig vegan?", a:["Ja", "Nein", "Manchmal"], correct: 1 },
    { q: "Warum ist pflanzliches Eisen schwerer aufzunehmen?", a:["Menge", "Chemische Form", "Abbau"], correct: 1 },
    { q: "Welcher Sinn ist bei Hunden am stärksten ausgeprägt?", a:["Sehsinn", "Geruchssinn", "Hörsinn"], correct: 1 },
    { q: "Wie wird Irland genannt?", a:["Grüne Insel", "Rote Insel", "Blaue Insel"], correct: 0 },
    { q: "Esel stammen ursprünglich aus…", a:["Europa", "Afrika", "Asien"], correct: 1 },
    { q: "Problem im Vanlife?", a:["Zu viel Strom", "Wasser", "Zu viel Platz"], correct: 1 },
    { q: "Warum Solarpanels?", a:["Deko", "Strom", "Internet"], correct: 1 },
    { q: "Was gab es 1997 NICHT?", a:["Internet", "Smartphones verbreitet", "Computer"], correct: 1 },
    { q: "Welche Farbe hat ein Eisbär wirklich?", a:["Weiß", "Schwarz", "Transparentes Fell über dunkler Haut"], correct: 2 },
    { q: "Wo befindet sich der Großteil der Masse einer Pflanze?", a:["Aus dem Boden", "Aus Wasser", "Aus CO₂ aus der Luft"], correct: 2 },
    { q: "Was ist Glas eigentlich?", a:["Festkörper", "Flüssigkeit", "Amorpher Feststoff (keine klare Kristallstruktur)"], correct: 2 },
    { q: "Was ist eine Tomate botanisch?", a:["Gemüse", "Beere", "Steinfrucht"], correct: 1 },
    { q: "Was passiert mit deinem Körper im Weltall ohne Schutz zuerst?", a:["Er friert sofort ein", "Er explodiert", "Er verliert schnell Sauerstoff und Bewusstsein tritt ein"], correct: 2 },
    { q: "Welches Tier hat technisch gesehen mehr Beine?", a:["Spinne", "Insekt", "Beide gleich viele"], correct: 0 },
    { q: "Was ist die häufigste chemische Verbindung im menschlichen Körper?", a:["Eiweiß", "Wasser", "Fett"], correct: 1 },
    { q: "Was ist die Hauptstadt der Türkei?", a:["Istanbul", "Ankara", "Izmir"], correct: 1 },
    { q: "Was ist näher verwandt mit einem Menschen?", a:["Affe", "Schwein", "Affen (Primaten)"], correct: 2 },
    { q: "Was ist ein Stern wie unsere Sonne?", a:["Brennendes Gas", "Kernfusionsreaktor", "Plasma-Kugel ohne Reaktion"], correct: 1 },
    { q: "Was ist der größte Teil eines Eisbergs?", a:["Über Wasser", "Unter Wasser", "Gleich verteilt"], correct: 1 },
    { q: "Was misst man in Kelvin?", a:["Energie", "Temperatur", "Druck"], correct: 1 },
    { q: "Was ist schneller: Licht oder Strom?", a:["Licht", "Strom", "Kommt darauf an, aber Licht ist die Referenzgeschwindigkeit"], correct: 2 },
    { q: "Was ist ein Virus?", a:["Lebewesen", "Nicht-lebendig, aber biologisch aktiv", "Bakterium"], correct: 1 },
    { q: "Was passiert mit Metall bei Kälte?", a:["Es dehnt sich aus", "Es zieht sich zusammen", "Es bleibt gleich"], correct: 1},
    { q: "Was ist die häufigste Farbe im Universum?", a:["Schwarz", "Beige (Cosmic Latte)", "Blau"], correct: 1 },
    { q: "Was ist ein Jahr astronomisch gesehen?", a:["365 Tage", "Eine Erdrotation", "Umlauf der Erde um die Sonne"], correct: 2 },
    { q: "Was ist die größte Wüste der Erde?", a:["Sahara", "Antarktis", "Gobi"], correct: 1 },
    { q: "Was ist ein Blitz physikalisch?", a:["Feuer", "Elektrische Entladung", "Plasma ohne Strom"], correct: 1 },
    { q: "Was ist näher an der Erde?", a:["Mond", "Satelliten", "Kommt darauf an – viele Satelliten sind näher"], correct: 2 },
    //Finale Fragen
    { q:"Du hast dir nun dein Geschenk verdient!", a:["Ruf Philipp 🗣️📢"], correct:0 },
    { q:"Hier gehts zum Geschenk?", a:["Klick hier"], correct:0 }
];


let current = 0;

function startQuiz() {
    current = 0;
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
  const minClicks = 50;
  const maxClicks = 70;

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
  const target = 20;
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
          alert("Super! 🎉 Du hast die Sequenz richtig! Weiter zum Quiz!");
          showOnly("quiz-container");
          startQuiz();
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
