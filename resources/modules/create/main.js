const sections = {
  "plainText": document.getElementById("plainText"),
  "controll":  document.getElementById("textControll")
};


sections.plainText.querySelector("button").onclick = clickEvent => {
  const plainContent = sections.plainText.querySelector("textarea").value;

  if (!plainContent)
    throw new Error("b");

  const controllTextareaNode = sections.controll.querySelector("textarea");
  controllTextareaNode.removeAttribute("disabled");
  controllTextareaNode.value = placePointers( plainContent );

  const buttonNode = document.createElement("button");
  buttonNode.textContent = "Сохранить визуализацию в локальное хранилище";

  buttonNode.onclick = localStorage.setItem("markdown", controllTextareaNode.value);


  sections.controll.append(buttonNode);
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
