let firstYesDone = false;
let maxTriggered = false;


// ================= INIT =================

window.addEventListener("DOMContentLoaded", () => {

    document.title = "Raj ❤️ Supriya";

    document.getElementById("valentineTitle").textContent =
        "Supriya, my love 💖";


    document.getElementById("question1Text").textContent =
        "Hey Supriya 💖, This is Raj... Will you be my Valentine? 😘";


    document.getElementById("question2Text").textContent =
        "How much do you love me? 😘";


    document.getElementById("question3Text").textContent =
        "So… Will you be mine forever? ❤️";


    createFloatingElements();
    setupMusicPlayer();
    initLoveMeter();
    startCountdown();

    showNextQuestion(1);
});


// ================= COUNTDOWN =================

function startCountdown(){

    const target = new Date("Feb 14, 2026 00:00:00").getTime();

    const el = document.createElement("p");
    el.id = "countdown";
    el.style.color = "#ff1744";
    el.style.fontWeight = "bold";
    el.style.marginBottom = "10px";

    document.querySelector(".container").prepend(el);


    setInterval(()=>{

        const now = new Date().getTime();
        const diff = target - now;

        if(diff < 0){
            el.textContent = "💖 Happy Valentine’s Day 2026 💖";
            return;
        }

        const d = Math.floor(diff/(1000*60*60*24));
        const h = Math.floor((diff%(1000*60*60*24))/(1000*60*60));
        const m = Math.floor((diff%(1000*60*60))/(1000*60));
        const s = Math.floor((diff%(1000*60))/1000);

        el.textContent =
          `⏳ Valentine 2026 in: ${d}d ${h}h ${m}m ${s}s`;

    },1000);
}


// ================= MUSIC =================

function setupMusicPlayer(){

    const btn = document.getElementById("musicToggle");
    const music = document.getElementById("bgMusic");

    if(!music) return;

    music.load();

    btn.addEventListener("click",()=>{

        if(music.paused){

            music.play();
            btn.textContent = "⏸️ Pause Music";

        }else{

            music.pause();
            btn.textContent = "🎵 Play Music";
        }
    });
}


// ================= FLOATING =================

function createFloatingElements() {

    const container = document.querySelector(".floating-elements");
    if (!container) return;

    ["❤️","💖","💕","💘"].forEach(h => {

        const div = document.createElement("div");
        div.className = "heart";
        div.innerHTML = h;

        setRandomPosition(div);
        container.appendChild(div);
    });
}


function setRandomPosition(el) {

    el.style.left = Math.random() * 100 + "vw";
    el.style.animationDelay = Math.random() * 3 + "s";
    el.style.animationDuration =
        10 + Math.random() * 15 + "s";
}


// ================= NAVIGATION =================

function showNextQuestion(num){

    document.querySelectorAll(".question-section")
        .forEach(q => q.classList.add("hidden"));

    document.getElementById(`question${num}`)
        .classList.remove("hidden");
}


function goToFinal(){
    showNextQuestion(3);
}


function finalYes(){
    celebrate();
}


// ================= YES =================

function handleYesClick(){

    if(!firstYesDone){

        firstYesDone = true;
        particleStorm();
    }

    showNextQuestion(2);
}


// ================= LOVE METER =================

let loveMeter, loveValue, extraLove;

function initLoveMeter(){

    loveMeter = document.getElementById("loveMeter");
    loveValue = document.getElementById("loveValue");
    extraLove = document.getElementById("extraLove");

    if(!loveMeter) return;

    loveMeter.value = 100;
    loveValue.textContent = 100;


    loveMeter.addEventListener("input",()=>{

        const v = +loveMeter.value;

        loveValue.textContent = v;


        if(v > 100){

            extraLove.classList.remove("hidden");

            if(v > 9000){
                extraLove.textContent = "MAX LOVE 💍🔥";
            }
            else if(v > 5000){
                extraLove.textContent = "Too Much Love 😍";
            }
            else{
                extraLove.textContent = "More Than 100% 😘";
            }

        }else{
            extraLove.classList.add("hidden");
        }


        if(v >= 10000 && !maxTriggered){

            maxTriggered = true;
            startFinalExplosion();
        }

        if(v < 9800) maxTriggered = false;
    });
}


// ================= EFFECTS =================

function startFinalExplosion(){

    particleStorm();
    heartRain();
    fireworks();
}


function particleStorm(){

    for(let i=0;i<80;i++){

        const p = document.createElement("div");

        p.innerHTML = Math.random()>0.5?"💖":"✨";

        p.style.position="fixed";
        p.style.left="50%";
        p.style.top="50%";
        p.style.zIndex=9999;

        document.body.appendChild(p);


        const x=(Math.random()-0.5)*800;
        const y=(Math.random()-0.5)*600;

        p.animate([
            {opacity:1},
            {transform:`translate(${x}px,${y}px) scale(0)`,opacity:0}
        ],{
            duration:1000
        });

        setTimeout(()=>p.remove(),1000);
    }
}


// ❤️ HEART RAIN
function heartRain(){

    const interval = setInterval(()=>{

        const h = document.createElement("div");

        h.innerHTML = "❤️";
        h.style.position="fixed";
        h.style.left=Math.random()*100+"vw";
        h.style.top="-20px";
        h.style.fontSize="24px";
        h.style.zIndex=9999;

        document.body.appendChild(h);

        h.animate([
            {transform:"translateY(0)"},
            {transform:"translateY(110vh)"}
        ],{
            duration:4000
        });

        setTimeout(()=>h.remove(),4000);

    },200);


    setTimeout(()=>clearInterval(interval),10000);
}


function fireworks(){

    for(let i=0;i<5;i++){
        setTimeout(particleStorm,i*400);
    }
}


// ================= TYPEWRITER =================

function typeWriter(el,text,speed=60){

    let i=0;
    el.textContent="";

    const timer=setInterval(()=>{

        if(i<text.length){
            el.textContent+=text[i++];
        }else{
            clearInterval(timer);
        }

    },speed);
}


// ================= CELEBRATION =================

function celebrate(){

    document
      .querySelectorAll(".question-section")
      .forEach(q=>q.classList.add("hidden"));


    document.getElementById("celebration")
      .classList.remove("hidden");


    const title = document.getElementById("celebrationTitle");
    const msg = document.getElementById("celebrationMessage");


    typeWriter(title,"I Love You Supriya ❤️",70);

    setTimeout(()=>{

        typeWriter(
          msg,
          "You are my world… my happiness… my forever 💖 Raj",
          50
        );

    },1500);


    document.getElementById("celebrationEmojis").textContent =
        "💍💘🥰💕✨";


    startFinalExplosion();
}


// ================= NO BUTTON =================

// Better Teasing Messages
const noMessages=[
 "First No? 😏 Really?",
 "Try again babe 💕",
 "Not allowed ❌😂",
 "My heart is breaking 💔",
 "Last chance 😤❤️",
 "I know you love me 😘",
 "Stop teasing 😭💖",
 "Okay click Yes now 😍"
];

let noIndex=0,noTry=0;


// Bubble Position
function positionBubble(btn,b){

    const r = btn.getBoundingClientRect();

    b.style.left = r.left + r.width/2 + "px";
    b.style.top = r.bottom + 8 + "px";
}


// Main No Handler
function handleNoClick(e){

    const btn = e.target;
    const bubble = document.getElementById("noMessageBubble");

    noTry++;


    if(noTry>=6){

        btn.textContent="Okay Yes ❤️";
        btn.onclick=handleYesClick;

        bubble.textContent="I knew it 😜❤️";
        bubble.classList.remove("hidden");

        return;
    }


    moveButton(btn);


    // Sync popup after move
    setTimeout(()=>{
        positionBubble(btn,bubble);
    },50);


    bubble.textContent = noMessages[noIndex++ % noMessages.length];

    bubble.classList.remove("hidden");


    setTimeout(()=>{
        bubble.classList.add("hidden");
    },1500);
}


// Smart Movement
function moveButton(btn){

    let speed =
      noTry < 3 ? 250 :
      noTry < 5 ? 120 :
      40;


    btn.style.transition=`all ${speed}ms ease-out`;


    const x = Math.random()*(window.innerWidth-120);
    const y = Math.random()*(window.innerHeight-120);

    btn.style.position="fixed";
    btn.style.left=x+"px";
    btn.style.top=y+"px";
}
