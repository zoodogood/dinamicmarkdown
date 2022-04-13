const sections = {
  "plainText": document.getElementById("plainText"),
  "controll":  document.getElementById("textControll")
};

sections.plainText.querySelector(".buttonOpen").onclick = clickEvent => {
  const content = sections.plainText.querySelector("textarea").value;
  let controllNode = initTextarea(content);

  sections.controll.querySelector("#textControll > button")
    .style.display = "block";

  const buttonNode = sections.controll.querySelector(".buttonVisual")

  buttonNode.onclick = clickEvent => {
    buttonNode.style.display = "none";
    localStorage.setItem("markdown", controllNode.value);
    initLink();
  }
};

function placePointers( content ){
  const POINTERS = {
    "\\%":      /%/g,

    "%p(350)":  /\,/g,
    "%p(800)":  /\./g,
    "%p(1050)": /\.\.\./g
  }

  const replacer = ([point, reg]) => content = content.replaceAll(reg, (match) => `${ match }${point}`);

  Object.entries( POINTERS ).forEach(replacer);
  return content;
}

const content = sections.controll.querySelector("textarea");

document.getElementById("firstButton").onclick = clickEvent => {
  content.value += "%p(350)";
}
document.getElementById("secondButton").onclick = clickEvent => {
  content.value += "%p(500)";
}
document.getElementById("threeButton").onclick = clickEvent => {
  content.value += "%p(800)";
}
document.getElementById("fourButton").onclick = clickEvent => {
  content.value += "%p(1050)";
}


function initTextarea(content){
  const node = sections.controll.querySelector("textarea");
  const node2 = sections.controll.querySelector("button");
  node.removeAttribute("disabled");
  node2.removeAttribute("disabled");
  node.value = placePointers( content );

  return node;
}

let count = 0
function initLink(){
  if ( count == 0 ) {
  const node = document.createElement("a");
  const button = document.createElement("button");


  button.textContent = "Перейти к визуализации";
  button.className = "hasSuperBorder";

  node.setAttribute("href", "path/read.html");
  node.append(button);

  sections.controll.append(node);

  count += 1

  }
}
