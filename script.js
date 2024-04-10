document.addEventListener('DOMContentLoaded', init());
var isplaying;
var ismute;
var volumevalue;
var audio;
var songs;
var currentsong;
function init(){
    audio = document.getElementById('audio');
    volumevalue = 50;
    isplaying = false;
    currentsong = 1;
    songs = [
        {artist:"Bad Bunny", song: "BABY NUEVA", artwork:"https://upload.wikimedia.org/wikipedia/en/7/74/Bad_Bunny_-_Nadie_Sabe_Lo_Que_Va_a_Pasar_Ma%C3%B1ana.png", video:'https://site232404.tw.cs.unibo.it/babynueva.mp4',audio:'./babynueva.mp3', index: 1 },
        {artist:"Kid Yugi", song: "GRAMMELOT", artwork:"https://www.bohmagazine.it/wp-content/uploads/kid-yugi-the-globe-cover.jpg", video:'./grammelot.mp4',audio:'./grammelot.mp3', index: 2 },
        {artist:"Ye", song: "BACK TO ME", artwork:"https://ondarock.it/images/cover/vultures_1708529202.jpg", video:'./backtome.webm',audio:'./backtome.mp3', index: 3 },
        {artist:"Luchetto,Praci", song: "MARACAS", artwork:"https://images.genius.com/314c796f4fc17ddcc0634c4a15abb6f0.1000x1000x1.jpg", video:'https://site232404.tw.cs.unibo.it/maracas.mp4',audio:'./maracas.mp3', index: 4 },
    ]
    playbuttonlistener();
    mutebuttonlistener();
    volumelistener();
    playinglistener();
    progresslistener();
    songchanger();
}

function playbuttonlistener() {
    playbutton = document.getElementById('playpause');
    playbutton.addEventListener('click',function(){
        if(isplaying){
            audio.pause();
            playbutton.classList.remove('bi-pause-fill');
            playbutton.classList.add('bi-play-fill');
        }else{
            audio.play();
            playbutton.classList.add('bi-pause-fill');
            playbutton.classList.remove('bi-play-fill');
        }
        isplaying = !isplaying;
    });
}
function volumelistener(){
    volumeinput = document.getElementById('volume');
    volumeinput.addEventListener('input',function(){
        volumevalue = volumeinput.value;
        audio.volume = volumeinput.value/100;
    });
}


function mutebuttonlistener() {
    mutebutton = document.getElementById('mutebutton');
    volumeinput = document.getElementById('volume');
    mutebutton.addEventListener('click',function(){
        if(ismute){
            mutebutton.classList.remove('bi-volume-mute-fill');
            mutebutton.classList.add('bi-volume-up-fill');
            volumeinput.style.setProperty('--value', volumevalue);
            audio.volume = volumevalue/100;
        }else{
            mutebutton.classList.add('bi-volume-mute-fill');
            mutebutton.classList.remove('bi-volume-up-fill');
            volumeinput.style.setProperty('--value', 0);
            audio.volume = 0;
        }
        ismute = !ismute;

    });

}

function playinglistener() {
    const progresbar = document.getElementById('bar');
    audio.addEventListener('timeupdate', function() {
        const currentTimePercentage = (this.currentTime * 100) / this.duration;
        progresbar.style.setProperty('--value', currentTimePercentage);
        progresbar.value = currentTimePercentage; 
    });
}

function progresslistener() {
    const progresbar = document.getElementById('bar');

    progresbar.addEventListener('input', function() {
        const currentTime = (this.value * audio.duration) / 100;
        audio.currentTime = currentTime;
    });
}

function songchanger(){
    forward = document.getElementById('forward');
    back = document.getElementById('back');
    video = document.getElementById('video');
    artist = document.getElementById('artist');
    artwork = document.getElementById('artwork');
    song = document.getElementById('song');

    forward.addEventListener('click',function(){
        if(currentsong <= songs.length){
            currentsong++;
            songs.forEach(element => {
                if(element.index == currentsong){
                    artist.innerHTML = element.artist;
                    song.innerHTML = element.song;
                    artwork.src = element.artwork;
                    video.src = element.video;
                    audio.src = element.audio;
                    if(isplaying){
                        audio.play();
                    }
                }
            });
        }else{
            currentsong--;
        }
    });
    back.addEventListener('click',function(){
        if(currentsong >= 1){
            currentsong--;
            songs.forEach(element => {
                if(element.index == currentsong){
                    artist.innerHTML = element.artist;
                    song.innerHTML = element.song;
                    artwork.src = element.artwork;
                    video.src = element.video;
                    audio.src = element.audio;
                    if(isplaying){
                        audio.play();
                    }
                }
            });
        }else{
            currentsong++;
        }
    });


}
