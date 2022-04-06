function getListContent() {
  let fragment = new DocumentFragment();

  for(let i=1; i<=12; i++) {
    let li = document.createElement('li');
    li.setAttribute('onclick', 'ChangeColor(this)')
    fragment.append(li);
  }

  return fragment;
}

document.querySelector('ul').append(getListContent());


function ChangeColor(Element) {
    if (Element.style.background == 'rgba(255, 255, 255, 0.2)') {
        Element.style.background = 'linear-gradient(90deg, #cfecd0, #a0cea7, #9ec0db)';
    }
    else Element.style.background = 'rgba(255, 255, 255, 0.2)';
}