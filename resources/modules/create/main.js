const sections = {
  "plainText": document.getElementById("plainText"),
  "controll":  document.getElementById("textControll")
};


sections.plainText.querySelector(".buttonOpen").onclick = clickEvent => {
  const plainContent = sections.plainText.querySelector("textarea").value;

  if (!plainContent)
    throw new Error("b");

  const controllTextareaNode = sections.controll.querySelector("textarea");
  controllTextareaNode.removeAttribute("disabled");
  controllTextareaNode.value = placePointers( plainContent );
  
  const divNode = sections.controll.querySelector("#divVisual")

  divNode.style.visibility = divNode.style.visibility !== "hidden" ? "hidden" : "visible";

  const buttonNode = sections.controll.querySelector(".buttonVisual")

  buttonNode.onclick = clickEvent => {
    localStorage.setItem("markdown", controllTextareaNode.value);
    const linkNode = document.createElement("a");
    linkNode.setAttribute("href", "path/read.html");
    linkNode.textContent = "Перейти к визуализации";

    sections.controll.append(linkNode);
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
