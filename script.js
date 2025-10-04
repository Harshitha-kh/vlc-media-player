
const speedUp = document.querySelector("#speedup");
const speedDown = document.querySelector("#speeddown");
const volUp = document.querySelector("#volup");
const volDown = document.querySelector("#voldown");
const videoBtn = document.querySelector("#videobtn");
const videoInput = document.querySelector("#videoinput");
const videoPlayer = document.querySelector("#main");
const toast = document.querySelector(".toast");

const container = document.querySelector(".progress-container");
const fill = document.querySelector(".progress-fill");
const circle = document.querySelector(".progress-circle");

const playBtn = document.querySelector(".play i");
const forwardBtn = document.querySelector(".fa-forward-fast");
const backwardBtn = document.querySelector(".fa-backward-fast");
const fullScreenEle = document.querySelector("#fullScreen");

const currentTimeElem = document.getElementById("currentTime");
const totalTimeElem = document.getElementById("totalTime");


function getVideo() {
  return document.querySelector("video");
}


function showToast(message) {
  toast.textContent = message;
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
  }, 1000);
}


function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? "0" + sec : sec}`;
}


speedUp.addEventListener("click", () => {
  const video = getVideo();
  if (!video || video.playbackRate >= 3) return;
  video.playbackRate += 0.5;
  showToast(video.playbackRate + "X");
});

speedDown.addEventListener("click", () => {
  const video = getVideo();
  if (!video || video.playbackRate <= 0.5) return;
  video.playbackRate -= 0.5;
  showToast(video.playbackRate + "X");
});


volUp.addEventListener("click", () => {
  const video = getVideo();
  if (!video || video.volume >= 0.99) return;
  video.volume = Math.min(video.volume + 0.1, 1);
  showToast(Math.round(video.volume * 100) + "%");
});

volDown.addEventListener("click", () => {
  const video = getVideo();
  if (!video || video.volume <= 0.01) return;
  video.volume = Math.max(video.volume - 0.1, 0);
  showToast(Math.round(video.volume * 100) + "%");
});


videoBtn.addEventListener("click", () => videoInput.click());

videoInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  
  const oldVideo = getVideo();
  if (oldVideo) videoPlayer.removeChild(oldVideo);

 
  const videoElement = document.createElement("video");
  videoElement.src = URL.createObjectURL(file);
  videoElement.setAttribute("class", "video");
  videoElement.style.width = "100%";
  videoPlayer.appendChild(videoElement);

  videoElement.volume = 0.3;
  videoElement.play();

 
  videoElement.addEventListener("loadedmetadata", () => {
    totalTimeElem.textContent = formatTime(videoElement.duration);
  });

  
  videoElement.addEventListener("timeupdate", () => {
    currentTimeElem.textContent = formatTime(videoElement.currentTime);

    const progress = (videoElement.currentTime / videoElement.duration) * 100;
    fill.style.width = progress + "%";

    const circleX = (videoElement.currentTime / videoElement.duration) * container.offsetWidth;
    circle.style.left = circleX + "px";
  });
});


playBtn.addEventListener("click", () => {
  const video = getVideo();
  if (!video) return;

  if (video.paused) {
    video.play();
    playBtn.classList.remove("fa-play");
    playBtn.classList.add("fa-pause");
  } else {
    video.pause();
    playBtn.classList.remove("fa-pause");
    playBtn.classList.add("fa-play");
  }
});


forwardBtn.addEventListener("click", () => {
  const video = getVideo();
  if (!video) return;
  video.currentTime += 10;
});

backwardBtn.addEventListener("click", () => {
  const video = getVideo();
  if (!video) return;
  video.currentTime -= 10;
});


fullScreenEle.addEventListener("click", () => {
  if (videoPlayer.requestFullscreen) {
    videoPlayer.requestFullscreen();
  }
});


container.addEventListener("click", (e) => {
  const video = getVideo();
  if (!video) return;

  const rect = container.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  video.currentTime = (clickX / container.offsetWidth) * video.duration;
});













 