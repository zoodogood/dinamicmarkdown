const pointedContent = localStorage.getItem("markdown");

if (!pointedContent)
  throw new Error("break");


document.body.innerHTML = "";






const inner = new MarkdownParser(pointedContent)
  .toHTML();

console.log(inner);

new Visualizer(inner).visualize();
