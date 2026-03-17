// =======================
// 🎮 GAME FLOW
// =======================

let gameFlow = [
    { type: "quiz" },
    { type: "memory" },
    { type: "reaction" },
    { type: "quiz" } // weitere Quiz-Runde möglich
];

let flowIndex = 0;

// =======================
// 📌 START FUNCTION
// =======================

function startNext(){
    if(flowIndex >= gameFlow.length){
        reveal(); // alles geschafft
        return;
    }

    const step = gameFlow[flowIndex];
    flowIndex++;

    switch(step.type){
        case "quiz":
            current = 0;
            showQuestion();
            break;
        case "memory":
            startMemory();
            break;
        case "reaction":
            startReactionGame();
            break;
    }
}

// =======================
// ❓ QUIZ
// =======================

let questions = [
    { q:"Wie heißt die Hauptstadt von Irland?", a:["Belfast","Dublin","Cork"], correct:1 },
    { q:"In welchem Land liegt Stonehenge?", a:["Irland","England","Schottland"], correct:1 },
    { q:"Welche Farbe hat die irische Flagge NICHT?", a:["Orange","Grün","Blau"], correct:2 }
];

let current = 0;

function showQuestion(){
    let q = questions[current];
    let html = `<h2>${q.q}</h2>`;
    q.a.forEach((answer,index)=>{
        html += `<button onclick="answer(${index})">${answer}</button>`;
    });
    document.getElementById("screen").innerHTML = html;
}

function answer(index){
    if(index === questions[current].correct){
        current++;
        if(current >= questions.length){
            startNext(); // weiter zum nächsten Flow-Step
        } else {
            showQuestion();
        }
    } else {
        alert("Nicht ganz 😜");
    }
}

// =======================
// 🃏 MEMORY GAME
// =======================

function startMemory(){
    const cards = ["🍎","🍌","🍎","🍌"]; // Beispiel-Emojis, anpassen
    let shuffled = cards.sort(() => 0.5 - Math.random());
    let flipped = [];
    let matched = [];

    let html = "<div class='memory-grid'>";
    shuffled.forEach((card,i)=>{
        html += `<div class='card' data-index='${i}' onclick='flipCard(${i})'></div>`;
    });
    html += "</div>";
    document.getElementById("screen").innerHTML = html;

    window.flipCard = function(i){
        if(flipped.length >= 2 || matched.includes(i)) return;

        flipped.push(i);
        document.querySelectorAll(".card")[i].textContent = shuffled[i];

        if(flipped.length === 2){
            if(shuffled[flipped[0]] === shuffled[flipped[1]]){
                matched.push(flipped[0], flipped[1]);
                flipped = [];
                if(matched.length === shuffled.length){
                    alert("Memory abgeschlossen 🎉");
                    startNext();
                }
            } else {
                setTimeout(()=>{
                    flipped.forEach(idx => document.querySelectorAll(".card")[idx].textContent = "");
                    flipped = [];
                }, 800);
            }
        }
    }
}

// =======================
// ⏱ REACTION GAME
// =======================

function startReactionGame(){
    document.getElementById("screen").innerHTML = `
        <h2>Klicke so schnell du kannst!</h2>
        <button id="startReaction">Start</button>
        <div id="circle" style="display:none;width:100px;height:100px;background:#cbb8ff;border-radius:50%;position:absolute;"></div>
    `;

    let startTime;
    const circle = document.getElementById("circle");

    document.getElementById("startReaction").onclick = ()=>{
        document.getElementById("startReaction").style.display="none";
        setTimeout(()=>{
            const x = Math.random()*(window.innerWidth-100);
            const y = Math.random()*(window.innerHeight-100);
            circle.style.left = x+"px";
            circle.style.top = y+"px";
            circle.style.display = "block";
            startTime = Date.now();
        }, 1000 + Math.random()*2000);
    }

    circle.onclick = ()=>{
        const time = Date.now()-startTime;
        alert(`Super! Deine Reaktionszeit: ${time}ms`);
        startNext();
    }
}

// =======================
// 🎨 START & END IMAGES
// =======================

const startImages = [
    { src: "DSCF5081.jpg", styleClass: "img_top" },
    { src: "DSCF3972.jpg", styleClass: "img_left" },
    { src: "DSCF2395.jpg", styleClass: "img_right" }
];

const endImages = [
    { src: "end1.jpg", styleClass: "img_top" },
    { src: "end2.jpg", styleClass: "img_left" },
    { src: "end3.jpg", styleClass: "img_right" }
];

function setImages(imageArray){
    const imgs = document.querySelectorAll(".images-top img");
    imgs.forEach((img,index)=>{
        if(imageArray[index]){
            img.src = imageArray[index].src;
            img.className = "img";  // alte Klassen löschen
            img.classList.add(imageArray[index].styleClass);
        }
    });
}

// =======================
// 🎉 REVEAL / SURPRISE
// =======================

function reveal(){
    launchConfetti();
    document.querySelector(".images-top").style.display = "block";
    setImages(endImages);

    document.getElementById("screen").innerHTML = `
        <h2>Überraschung 🎉</h2>
        <div class="ticket">
            <h3>2x Ticket für Calum Scott</h3>
            <p>Live in Leipzig 🎤</p>
            <p>Mit einem deiner Lieblingsmenschen ❤️</p>
        </div>
        <p>Happy Birthday, Julchen 💜</p>
    `;

    startSong();
}

// =======================
// 🎵 MUSIC & CONFETTI
// =======================

function startSong(){
    let song = document.getElementById("song");
    if(song){
        song.currentTime = 3; // Start bei 0:03
        song.play().catch(()=>{});
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

// =======================
// 🚀 START GAME AUTOMATISCH
// =======================

window.onload = ()=>{
    document.querySelector(".images-top").style.display = "block";
    setImages(startImages);
};