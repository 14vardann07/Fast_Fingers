var oneElement;
let figurejumpingEl = document.getElementById('figurejumping')
let backButton = document.getElementById('backButton')
let backButton1 = document.getElementById('backButton1')
let backButton2 = document.getElementById('backButton2')
let playButton = document.getElementById('play')
let centerEl = document.getElementById('center')
let chooseEl = document.getElementById('choose')
let keyboard_gameButton = document.getElementById('keyboard_game')
let keyboardEl = document.getElementById('keyboard')
let typing_gameButton = document.getElementById('typing_game')
let typingEl = document.getElementById('typing')
let countEl = document.getElementById('count-down')
let startCount = document.getElementById("start-count")
let inputEl = document.getElementById("input")
let wordp = document.getElementById("text")
let scoreEl = document.getElementById("your-score")
let timeEl = document.getElementById("time-typing")
let HighscoreEl = document.getElementById("high-score")
let GameOverEl = document.getElementById("game-over")
let ScoreIS = document.getElementById("score1")




playButton.addEventListener("click", playbutton)
keyboard_gameButton.addEventListener("click", keyboardGame)
typing_gameButton.addEventListener("click", typingGame)
backButton.addEventListener("click", keyboardbackbutton)
backButton1.addEventListener("click", typingbackbutton)
backButton2.addEventListener("click", gameoverbackbutton)

function playbutton() {
    centerEl.style.display = "none"
    chooseEl.style.display = "block"
}


function keyboardGame() {
    chooseEl.style.display = "none"
    figurejumpingEl.style.display = "none"
    backButton.style.display = "block"
    keyboardEl.style.display = "block"
    gameKeyboard()
}


function keyboardbackbutton() {
    oneElement.classList.remove("selected")
    backButton.style.display = "none"
    keyboardEl.style.display = "none"
    chooseEl.style.display = "block"
    figurejumpingEl.style.display = "block"
}


function typingGame() {
    chooseEl.style.display = "none"
    figurejumpingEl.style.display = "none"
    countEl.style.display = "block"
    startCount.innerHTML = 3
    let id = setInterval(function () {
        if (startCount.innerHTML < 1) {
            clearInterval(id)
            generalGame()
        }
        startCount.innerHTML = startCount.innerHTML - 1
    }, 500)

}


function typingbackbutton() {
    typingEl.style.display = "none"
    chooseEl.style.display = "block"
    figurejumpingEl.style.display = "block"
}

function gameoverbackbutton() {
    GameOverEl.style.display = "none"
    chooseEl.style.display = "block"
    figurejumpingEl.style.display = "block"
}

function gameKeyboard() {
    let oneletter = randomItem(letterArr)
    oneElement = document.getElementById(oneletter)
    oneElement.classList.add("selected");

    document.addEventListener("keyup", function (event) {
        if (event.code == oneletter) {
            oneElement.classList.remove("selected");
            oneletter = randomItem(letterArr);
            oneElement = document.getElementById(oneletter)
            oneElement.classList.add("selected");
        } else {
            let falseEl = document.getElementById(event.code)
            falseEl.classList.add("hit")
            setTimeout(function () {
                falseEl.classList.remove("hit")
            }, 100)
        }

    })
}


function generalGame() {
    let score = 0
    let time = 10
    let hScore;

    if (!localStorage.score) {
        localStorage.score = 0
    }
    hScore = localStorage.score
    HighscoreEl.innerHTML = hScore
    timeEl.innerHTML = time;
    scoreEl.innerHTML = score;
    countEl.style.display = "none"
    backButton.style.display = "block"
    typingEl.style.display = "block"
    timeEl.innerHTML = time
    let vayrkyan = setInterval(function () {
        if (timeEl.innerHTML < 2) {
            clearInterval(vayrkyan)
            GameOverEl.style.display = "block"
            typingEl.style.display = "none"
            ScoreIS.innerHTML = score
        }
        time--;
        if (time >= 0)
            timeEl.innerHTML = time
    }, 1000)




    let oneword = randomItem(wordsArr)
    wordp.innerHTML = oneword;
    inputEl.addEventListener("keypress", function (e) {
        if (e.code == "Enter" && inputEl.value != "") {
            if (inputEl.value == oneword) {
                score++;

                scoreEl.innerHTML = score;

                inputEl.value = ""
                oneword = randomItem(wordsArr)
                wordp.innerHTML = oneword;
                time += 4
                timeEl.innerHTML = time;
                if (score > hScore) {
                    hScore = score;
                    HighscoreEl.innerHTML = hScore
                    localStorage.score = hScore

                }
            } else {
                time -= 2
                if (time >= 0)
                    timeEl.innerHTML = time;
                oneword = randomItem(wordsArr)
                wordp.innerHTML = oneword;
                inputEl.value = ""
            }
        }
    })


}



function randomItem(arr) {
    let index = Math.floor(Math.random() * arr.length)
    return arr[index]
}
