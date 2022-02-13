let hover = document.getElementsByClassName('hover-letter');
for (let i=0; i<hover.length; i++) {
    hover[i].innerHTML = hover[i].innerHTML.replace(/(.)/g, '<span>$1</span>');
}

if (window.devicePixelRatio !== 1) { // Костыль для определения иных устройств, с коэффициентом отличным от 1       
  var dpt = window.devicePixelRatio;
  var widthM = window.screen.width * dpt;
  var widthH = window.screen.height * dpt;
  document.write('<meta name="viewport" content="width=' + widthM+ ', height=' + widthH + '">');
}
