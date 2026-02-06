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

    showNextQuestion(1);
});


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
    fireworks();
}


function particleStorm(){

    for(let i=0;i<100;i++){

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


function fireworks(){

    for(let i=0;i<5;i++){
        setTimeout(particleStorm,i*300);
    }
}


// ================= CELEBRATION =================

function celebrate(){

    document
      .querySelectorAll(".question-section")
      .forEach(q=>q.classList.add("hidden"));


    document.getElementById("celebration")
      .classList.remove("hidden");


    document.getElementById("celebrationTitle").textContent =
        "I Love You Supriya ❤️";


    document.getElementById("celebrationMessage").textContent =
        "You made Raj the happiest 💖";


    document.getElementById("celebrationEmojis").textContent =
        "💍💘🥰💕✨";


    startFinalExplosion();
}


// ================= NO BUTTON =================

const noMessages=[
 "Think again 🤔",
 "You love me 💕",
 "Are you sure 😏",
 "Come on 😜",
 "Okay fine ❤️"
];

let noIndex=0,noTry=0;


function handleNoClick(e){

    const btn = e.target;
    const bubble = document.getElementById("noMessageBubble");

    noTry++;


    if(noTry>=5){

        btn.textContent="Okay Yes ❤️";
        btn.onclick=handleYesClick;

        bubble.textContent="I knew it 😜❤️";
        bubble.classList.remove("hidden");

        return;
    }


    moveButton(btn);


    bubble.textContent = noMessages[noIndex++ % noMessages.length];
    bubble.classList.remove("hidden");

    setTimeout(()=>{
        bubble.classList.add("hidden");
    },1500);
}


function moveButton(btn){

    const x = Math.random()*(window.innerWidth-100);
    const y = Math.random()*(window.innerHeight-100);

    btn.style.position="fixed";
    btn.style.left=x+"px";
    btn.style.top=y+"px";
}
