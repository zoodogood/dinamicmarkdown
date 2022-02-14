const sections = {
  "plainText": document.getElementById("plainText"),
  "controll":  document.getElementById("textControll")
};

sections.plainText.querySelector(".buttonOpen").onclick = clickEvent => {
  const content = sections.plainText.querySelector("textarea").value;
  let controllNode = initTextarea(content);

  sections.controll.querySelector("#textControll > button")
    .style.display = "block";

  document.querySelector("#buttonCreate").style.animation = "checkClick 1s";

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



function initTextarea(content){
  const node = sections.controll.querySelector("textarea");
  node.removeAttribute("disabled");
  node.value = placePointers( content );

  return node;
}


function initLink(){

  const node = document.createElement("a");
  const button = document.createElement("button");


  button.textContent = "Перейти к визуализации";
  button.className = "hasSuperBorder";

  node.setAttribute("href", "path/read.html");
  node.append(button);

  sections.controll.append(node);
}

let detect = new MobileDetect(window.navigator.userAgent)
if (detect.mobile()) 
  document.querySelector("textarea").style.max_width = "300px";