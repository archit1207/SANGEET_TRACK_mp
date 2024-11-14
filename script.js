console.log("WELCOME TO SANGEET TRACK");

//Initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/krishna.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar'); 
let gif = document.getElementById('gif'); 
let masterSongname = document.getElementById('masterSongname'); 
let songItem = Array.from(document.getElementsByClassName('songItem'));

//song list (array)
let songs = [
    {songName: "On & On" ,filePath:"songs/on&on.mp3", coverPath: "cover/on&on.jpeg"},
    {songName: "Desperate" ,filePath:"songs/desperate.mp3", coverPath: "cover/desperate.jpeg"},
    {songName: "Like Rain" ,filePath:"songs/like-rain.mp3", coverPath: "cover/like-rain.jpeg"},
    {songName: "Morning Drift" ,filePath:"songs/mo-drift.mp3", coverPath: "cover/morning-drift.jpeg"},
    {songName: "Red Light" ,filePath:"songs/red-light.mp3", coverPath: "cover/red-light.jpeg"},
    {songName: "Royality" ,filePath:"songs/royality.mp3", coverPath: "cover/royality.jpeg"},
    {songName: "Stars in the Sky" ,filePath:"songs/star-in-sky.mp3", coverPath: "cover/stars-in-sky.jpeg"},
    {songName: "Underrated" ,filePath:"songs/underrated.mp3", coverPath: "cover/underrated.png"},
    {songName: "Vibe" ,filePath:"songs/vibe.mp3", coverPath: "cover/vibe.jpeg"},
]

songItem.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

//handle Play/Pause click button
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity=0;
    }
})

//Listen to Event
audioElement.addEventListener('timeupdate', ()=>{
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100 ;
})

const makeAllPlays = ()=>{
    
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');

    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongname.innerText = songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
    })

})


document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=9){
        songIndex=0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongname.innerText = songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<0){
        songIndex=0;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongname.innerText = songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})