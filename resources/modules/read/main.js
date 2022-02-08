const pointedContent = localStorage.getItem("markdown");

if (!pointedContent)
  throw new Error("break");


document.body.innerHTML = "";



class MarkdownParser {
  constructor(pointedContent){
    this.inner   = document.createElement("section");
    this.inner.textContent = pointedContent;
    this.parseNode( this.inner );
  }

  parseNode(node){
    console.log(node);


  }

  toHTML(){
    return this.inner;
  }

  static MARKS = [
    {
      name: "bold",
      reg: /[^\\]\*\*(.+?)[^\\]\*\*/g,
      replacer: (full, group) => {
        const boldNode = document.createElement("b");
        boldNode.textContent = group;
        return boldNode;
      }

    }
  ]
}


const inner = new MarkdownParser(pointedContent).toHTML();
document.body.append(inner);
