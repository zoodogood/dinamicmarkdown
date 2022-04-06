function getListContent() {
  let fragment = new DocumentFragment();

  for(let i=1; i<=12; i++) {
    let li = document.createElement('li');
    fragment.append(li);
  }

  return fragment;
}

document.querySelector('ul').append(getListContent());