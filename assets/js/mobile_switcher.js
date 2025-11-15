function isMobileDevice() {
    let w = window.innerWidth;
    let h = window.innerHeight;
    let cond1 = (w<h)
    let cond2 = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    return cond1 | cond2
  }

  if (isMobileDevice()) {
    window.location.href = 'index-mobile.html';
  } else {
    window.location.href = 'index-desktop.html';
  }