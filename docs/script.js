// =======================
// 📸 BILDER HIER ÄNDERN
// =======================

const startImages = [
    { src: "DSCF5081.JPG", style: { top:"20px", left:"20px", transform:"rotate(-5deg)" } },
    { src: "DSCF3972.jpg", style: { top:"40px", right:"20px", transform:"rotate(8deg)" } },
    { src: "DSCF2395.jpg", style: { bottom:"20px", left:"50%", transform:"translateX(-50%) rotate(-3deg)" } }
];

const endImages = [
    { src: "end1.jpg", style: { top:"30px", left:"50%", transform:"translateX(-50%) rotate(3deg)" } },
    { src: "end2.jpg", style: { bottom:"50px", right:"40px", transform:"rotate(-6deg)" } },
    { src: "end3.jpg", style: { top:"200px", left:"30px", transform:"rotate(5deg)" } }
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
};

// =======================
// 🔹 QUIZ START
// =======================

function startQuiz(){
    document.querySelector(".images-top").style.display = "none";
    showQuestion();
}

// =======================
// ❓ Quiz + Reveal (wie gehabt)
// =======================

let questions = [
    { q:"Wie heißt die Hauptstadt von Irland?", a:["Belfast","Dublin","Cork"], correct:1 },
    { q:"In welchem Land liegt Stonehenge?", a:["Irland","England","Schottland"], correct:1 },
    { q:"Welche Farbe hat die irische Flagge NICHT?", a:["Orange","Grün","Blau"], correct:2 },
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

    document.querySelector(".images-top").style.display = "block";
    setImages(endImages);

    document.getElementById("screen").innerHTML = `
        <h2>Überraschung 🎉</h2>

        <div class="ticket">
            <h3>2x Ticket für Calum Scott</h3>
            <p>Live in Leipzig 🎤</p>
            <p>Mit einem deiner Lieblingsmenschen ❤️</p>
        </div>

        <img class="poster" src="ticket.jpg">
        <p>Happy Birthday, Julchen 💜</p>
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