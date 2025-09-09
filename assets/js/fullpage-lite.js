(function(){
  const fullpage = document.querySelector('.fullpage');
  if(!fullpage) return;

  let isScrolling = false;
  const sections = fullpage.querySelectorAll('.section');
  let currentIndex = 0;

  function scrollToIndex(index){
    if(index<0 || index>=sections.length) return;
    isScrolling = true;
    sections[index].scrollIntoView({behavior:'smooth'});
    currentIndex = index;
    setTimeout(()=>{isScrolling=false;},600);
  }

  window.addEventListener('wheel', e=>{
    if(isScrolling) return;
    if(e.deltaY>0) scrollToIndex(currentIndex+1);
    else if(e.deltaY<0) scrollToIndex(currentIndex-1);
  });

  // touch
  let startY=0;
  window.addEventListener('touchstart', e=>{
    startY=e.touches[0].clientY;
  });
  window.addEventListener('touchend', e=>{
    if(isScrolling) return;
    let endY = e.changedTouches[0].clientY;
    if(startY-endY>30) scrollToIndex(currentIndex+1);
    else if(endY-startY>30) scrollToIndex(currentIndex-1);
  });

  // 可选：键盘方向键
  window.addEventListener('keydown', e=>{
    if(isScrolling) return;
    if(e.key==='ArrowDown') scrollToIndex(currentIndex+1);
    else if(e.key==='ArrowUp') scrollToIndex(currentIndex-1);
  });
})();