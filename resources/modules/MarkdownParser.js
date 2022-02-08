let NO_ESCAPE = ``;

class MarkdownParser {
  constructor(pointedContent){
    this.inner   = document.createElement("section");
    this.inner.textContent = pointedContent;
    this.parseNode( this.inner );
  }

  parseNode(node){
    const marks = this.constructor.MARKS;
    const container = [];

    let reg = marks.map(({reg}) => `\\*?${ reg }`)
      .join("|");

    reg = new RegExp(reg, "g");

    console.log(reg);
    console.log([..."123**f**123".matchAll(reg)]);

    node.innerHTML = "";
    container.forEach(node.append);
  }


  toHTML(){
    return this.inner;
  }


  static MARKS = [
    {
      name: "bold",
      reg: `\\*\\*(.+?)[^\\\\]\\*\\*`,
      replacer: (full, group) => {
        const boldNode = document.createElement("b");
        boldNode.textContent = group;
        return boldNode;
      }

    }
  ]
}


delete NO_ESCAPE;
