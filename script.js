const speedUp=document.querySelector("#speedup");
const speedDown=document.querySelector("#speeddown");
const volUp=document.querySelector("#volup");
const volDown=document.querySelector("#voldown");
const videoBtn=document.querySelector("#videobtn");
const videoInput=document.querySelector("#videoinput");
const videoPlayer=document.querySelector("#main");
const toast = document.querySelector(".toast");


const speedUpHandler = function() {
    const videoElement = document.querySelector("video");
    if(videoElement==null) {
        return;
    }
    if(videoElement.playbackRate>3) {
        return;
    }
    const increaseSpeed = videoElement.playbackRate + 0.5;
    videoElement.playbackRate = increaseSpeed;
    // toast
    showToast(increaseSpeed + "X");
}
const speedDownHandler = () => {
    const videoElement = document.querySelector("video");
    if(videoElement==null) {
        return;
    }
    if(videoElement.playbackRate>0) {
        const decreaseSpeed = videoElement.playbackRate - 0.5;
        videoElement.playbackRate = decreaseSpeed;
        showToast(decreaseSpeed + "X");
    }
   
} 
const volUpHandler = () => {
    const videoElement = document.querySelector("video");
    if(videoElement==null) {
        return;
    }
    if(videoElement.volume >= 0.99) {
        return;
    }
    const increseVol = videoElement.volume + 0.1;
    videoElement.volume = increseVol;
    const percentage = (increseVol*100)+"%";
    showToast(percentage);
    
}
const volDownHandler = () => {
    const videoElement = document.querySelector("video");
    if(videoElement==null) {
        return;
    }
    if(videoElement.volume <= 0.1) {
        videoElement.volume=0;
        return;
    }
    const decreaseVol = videoElement.volume - 0.1;
    videoElement.volume = decreaseVol;
    const percentage = (decreaseVol*100) + "%"
    showToast(percentage);
    
}
const handleInput= () => {
    console.log("input clicked");
    videoInput.click();
}
const acceptInputHandler = (obj) => {
    const selectedVideo = obj.target.files[0];
    const link=URL.createObjectURL(selectedVideo);
    const videoElement=document.createElement("video");
    videoElement.src=link;
    videoElement.setAttribute("class","video");
    videoPlayer.appendChild(videoElement);
    videoElement.controls=true;
    videoElement.play();
    videoElement.volume=0.3;
    
   
}
function showToast(message) {
    toast.textContent = message;
    toast.style.display = "block";
    setTimeout(() => {
        toast.style.display = "none";
    },1000);
}

speedUp.addEventListener("click", speedUpHandler);
speedDown.addEventListener("click",speedDownHandler);
volUp.addEventListener("click", volUpHandler);
volDown.addEventListener("click",volDownHandler);

videoBtn.addEventListener("click",handleInput);
videoInput.addEventListener("change", acceptInputHandler);


// controls

function handleFullScreen() {
    videoPlayer.requestFullscreen();
}

const fullScreenEle = document.querySelector("#fullScreen");
fullScreenEle.addEventListener("click", handleFullScreen);

 