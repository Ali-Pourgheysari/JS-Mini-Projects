const inputTxt = document.querySelector(".txt");
let correctWord, timer;

let initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if (maxTime > 0) return document.querySelector(".time b").innerText = --maxTime;
        clearInterval(timer);
        alert(`Time off! ${correctWord.toUpperCase()} is the correct answer`);
        initGame();
    }, 1000);
}

let initGame = () => {
    initTimer(30);
    let randword = words[Math.floor(Math.random() * words.length)];
    let letterArray = randword.word.split("");
    for (let i = 0; i < letterArray.length; i++) {
        let j = Math.floor(Math.random() * i);
        [letterArray[i], letterArray[j]] = [letterArray[j], letterArray[i]];        
    }
    let shuffledword = letterArray.join("");
    document.querySelector(".Word").innerText = shuffledword;
    document.querySelector(".hint").innerText = "Hint: " + randword.hint;
    correctWord = randword.word.toLowerCase();
    inputTxt.value = "";
    inputTxt.setAttribute("maxlength", correctWord.length);
}

let submit = () => {
    if (!inputTxt.value) return alert("Please enter a word first");
    if (inputTxt.value.toLowerCase() !== correctWord) return alert(`Oops ${inputTxt.value.toUpperCase()} is not the correct answer!`);
    alert(`Congrats! ${inputTxt.value.toUpperCase()} is the correct answer`);
    initGame();
}
initGame();