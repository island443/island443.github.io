

const songs = [
  "assets/music/1.mp3",
  "assets/music/2.mp3",
  "assets/music/3.mp3",
  "assets/music/4.mp3",
  "assets/music/5.mp3",
  "assets/music/6.mp3" // 第6首歌
];

let current = 0;
let audio;
let savedState = null; // 保存原歌状态
let inAbout = false;    // 是否在about.html

function initPlayer(a){
  audio = a;
  audio.src = songs[current];
  audio.play().catch(()=>{});
  audio.onended = () => next();
}

// 播放/暂停
function playPause(){
  if(audio.paused) audio.play();
  else audio.pause();
}

// 下一首
function next(){
  if(inAbout){
    // about.html 内只播放第6首，不循环
    current = 5;
  } else {
    // 普通页面循环1~5
    current = (current + 1) % 5; // 只循环前5首
  }
  audio.src = songs[current];
  audio.play();
}

// 上一首
function prev(){
  if(inAbout){
    current = 5;
  } else {
    current = (current - 1 + 5) % 5;
  }
  audio.src = songs[current];
  audio.play();
}

// 切换到指定歌曲并可选保存/恢复原状态
function switchSong(index, saveCurrent = false){
  if(saveCurrent){
    savedState = {index: current, time: audio.currentTime, paused: audio.paused};
  }
  current = index;
  audio.src = songs[current];
  audio.currentTime = 0; // 第6首从头播放
  audio.play();
}

// 恢复原歌
function restoreSong(){
  if(savedState){
    current = savedState.index;
    audio.src = songs[current];
    audio.currentTime = savedState.time;
    if(!savedState.paused) audio.play();
    savedState = null;
  }
}

// 监听父页面发送的消息
window.addEventListener('message', (e)=>{
  if(e.data === 'about-enter'){
    inAbout = true;        // 标记在about
    switchSong(5, true);   // 保存原歌并切第6首
  }
  if(e.data === 'about-exit'){
    inAbout = false;       // 标记离开about
    restoreSong();         // 恢复原歌
  }
});
