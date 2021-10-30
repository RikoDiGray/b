const area = document.querySelector("section.area");
const timeText = document.querySelector(".timer");
const scores = document.querySelector(".score");
const errTxt = document.querySelector(".err");
var level = 1;

const symbols = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J',
                 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'];

const areaSize = {
    h: 595,
    w: 1380
};


var err = 0;

var score = 0;
var best = 0;

var timerInit = null;

function timer(interval = 1000) {
    var m = 9;
    var s = 59;
    m = (m < 10) ? "0" + m : m
    var txt = '';
    timerInit = setInterval(() => {
        s = (s < 10) ? "0" + s : s;
        if(s <= 0) {
            m--;
            m = (m < 10) ? "0" + m : m;
            s = 59;
        }
        if(m <= 0) {
            m = 0;
        }
        txt = `${m}:${s}`;
        timeText.innerText = txt;
        if(txt == "0-1:60") {
            stop();
        }
        if(m == 8 && s == 59) {changeLevel("2"); alert("Level was changed on 2")}
        if(m == 7 && s == 59) {changeLevel("3"); alert("Level was changed on 3")}
        if(m == 6 && s == 59) {changeLevel("4"); alert("Level was changed on 4")}
        if(m == 5 && s == 59) {changeLevel("5"); alert("Level was changed on 5")}
        if(m == 4 && s == 59) {changeLevel("6"); alert("Level was changed on 6")}
        s--;
    }, interval);
}
timer();

function generate(txtColor, bgColor, y, x, symbol) {
    y = Math.floor(Math.random() * areaSize.h);
    x = Math.floor(Math.random() * areaSize.w - 200);
    symbol = symbols[Math.floor(Math.random() * symbols.length)];
    const item = document.createElement("div");
    item.classList.add("item");
    item.innerText = symbol;
    item.style.color = txtColor;
    item.style.backgroundColor = bgColor;
    // position
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    area.prepend(item);

    setTimeout(() => {
        item.remove();
        errTxt.innerText = err;
    }, 3000);
    err++;
    errTxt.innerText = err;
}

window.onkeyup = function(event) {
    var items = document.querySelectorAll(".item");
    var sym = '';
    if(items.length >= 1) {
        sym = event.key.toUpperCase();
        for(i = 0; i < items.length; i++) {
            if(sym == items[i].innerText) {
                items[i].remove();
                score++;
                if(best < score) {
                    best++;
                    localStorage.setItem("best", best);
                }
                scores.innerText = score;
                localStorage.setItem("score", score);
            }
        }
    }
}


var startInit = null;

function start(interval = 1000) {
    startInit = setInterval(() => {
        generate();
    }, interval);
}

generate()
start();


function changeLevel(lvl, ms) {
    switch(lvl) {
        case "2":
            ms = 750
            break;
        case "3":
            ms = 560
            break;
        case "4":
            ms = 320
            break;
        case "5":
            ms = 170
            break;
        case "6":
            ms = 80
            break;
        default:
            ms = 1000;
            break;
    }
    clearInterval(startInit);
    start(ms);
}


function stop() {
    clearInterval(timerInit);
    clearInterval(startInit);
    timeText.innerText = "10:00";
}