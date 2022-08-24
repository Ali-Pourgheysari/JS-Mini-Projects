const container = document.querySelector(".container"),
mainVideo = container.querySelector("video"),
progBar = container.querySelector(".progress-bar"),
skipForward = container.querySelector(".skip-forward"),
skipBackward = container.querySelector(".skip-backward"),
volumeBtn = container.querySelector(".volume"),
volumeRange = container.querySelector("input"),
playBackBtn = container.querySelector(".playback-speed span"),
playBackList = container.querySelector(".speed-options"),
playPauseBtn = container.querySelector(".play-pause i"),
picInPicBtn = container.querySelector(".pic-in-pic span"),
videoTimeLine = container.querySelector(".video-timeline"),
fullScreenBtn = container.querySelector(".fullscreen i"),
currTime = container.querySelector(".current-time"),
vidDuration = container.querySelector(".video-duration"),
progressTime = videoTimeLine.querySelector("span"),
insertBtn = document.querySelector(".insert button");
let preVolume = 0.5, time;

const hideControls = () => {
    if (mainVideo.paused) return;
    time = setTimeout(() => {
        container.classList.remove("show-controls");
    }, 3000);
}

container.addEventListener("mousemove", () => {
    container.classList.add("show-controls");
    clearTimeout(time);
    hideControls();
});

videoTimeLine.addEventListener("click", e => {
    let videoWidth = videoTimeLine.clientWidth;
    mainVideo.currentTime = (e.offsetX / videoWidth) * mainVideo.duration;
});

const draggableProcessBar = e => {
    let videoWidth = videoTimeLine.clientWidth;
    progBar.style.width = `${e.offsetX}px`;
    mainVideo.currentTime = (e.offsetX / videoWidth) * mainVideo.duration;
    currTime.innerText = formatedTime(mainVideo.currentTime);
}

videoTimeLine.addEventListener("mousedown", () => {
    container.addEventListener("mousemove", draggableProcessBar);
});

container.addEventListener("mouseup", () => {
    container.removeEventListener("mousemove", draggableProcessBar);
});

fullScreenBtn.addEventListener("click", () => {
    container.classList.toggle("fullscreen");
    if (document.fullscreenElement)
    {
        fullScreenBtn.classList.replace("fa-compress", "fa-expand");
        return document.exitFullscreen();
    }
    fullScreenBtn.classList.replace("fa-expand", "fa-compress");
    container.requestFullscreen();
});

picInPicBtn.addEventListener("click", () => {
    mainVideo.requestPictureInPicture();
});

playBackBtn.addEventListener("click", () => {
    playBackList.classList.toggle("show");
});

document.addEventListener("click", e => {
    if(e.target.className !== "material-symbols-rounded")
    {
        playBackList.classList.remove("show");
    }
});

playBackList.querySelectorAll("li").forEach(Option => {
    Option.addEventListener("click", () => {
        mainVideo.playbackRate = Option.dataset.speed;
        playBackList.querySelector(".active").classList.remove("active");
        Option.classList.add('active');
    });
});

volumeBtn.addEventListener("click", () => {
    if (mainVideo.volume != 0)
    {
        preVolume = mainVideo.volume;
        mainVideo.volume = 0;
        volumeBtn.querySelector("i").classList.replace("fa-volume-high", "fa-volume-xmark");
    }
    else
    {
        mainVideo.volume = preVolume;
        volumeBtn.querySelector("i").classList.replace("fa-volume-xmark", "fa-volume-high");
    }
});

volumeRange.addEventListener("input", e => {
    mainVideo.volume = e.target.value; 
    volumeBtn.querySelector("i").classList.replace("fa-volume-xmark", "fa-volume-high");
    if (e.target.value == 0)   
    {
        mainVideo.volume = 0
        volumeBtn.querySelector("i").classList.replace("fa-volume-high", "fa-volume-xmark");
    }
});

skipForward.addEventListener("click", () => {
    mainVideo.currentTime += 5;
});

skipBackward.addEventListener("click", () => {
    mainVideo.currentTime -= 5;
});

const formatedTime = time => {
    let seconds = Math.floor(time % 60),
    minutes = Math.floor(time / 60) % 60,
    hours = Math.floor(time / 3600);

    seconds = seconds < 10 ? `0${seconds}` : seconds;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    hours = hours < 10 ? `0${hours}` : seconds;

    if (hours == 0) {
        return `${minutes}:${seconds}`;
    }
    return `${hours}:${minutes}${seconds}`;
}

videoTimeLine.addEventListener("mousemove", e => {
    progressTime.style.left = `${e.offsetX}px`;
    let hoverTime = (e.offsetX / videoTimeLine.clientWidth) * mainVideo.duration;
    progressTime.innerText = formatedTime(hoverTime);
});

mainVideo.addEventListener("loadeddata", e => {
    vidDuration.innerText = formatedTime(e.target.duration);
});

mainVideo.addEventListener("timeupdate", e => {
    let {currentTime, duration} = e.target;
    let percentage = (currentTime / duration) * 100;
    progBar.style.width = `${percentage}%`;
    currTime.innerText = formatedTime(mainVideo.currentTime);
});

playPauseBtn.addEventListener("click", () => {
    mainVideo.paused ? mainVideo.play() : mainVideo.pause();
});

mainVideo.addEventListener("play", () => {
    playPauseBtn.classList.replace("fa-play", "fa-pause");
});

mainVideo.addEventListener("pause", () => {
    playPauseBtn.classList.replace("fa-pause", "fa-play");
});
