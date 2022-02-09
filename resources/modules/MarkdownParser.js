

class MarkdownParser {
  constructor(pointedContent){
    this.inner = document.createElement("section");
    this.inner.textContent = pointedContent;
    this.parseNode( this.inner );
  }

  parseNode(node){
    if (node.classList.contains("no-parse"))
      return node;

    const marks = this.constructor.MARKS;
    const container = [];

    let content = node.textContent;

    let reg = marks.map(({ reg, name: groupName }) => `(?<${ groupName }>${ reg })`)
      .join("|");

    reg = new RegExp(reg);

    while (true){
      const match = content.match(reg);
      if (match === null)
        break;



      if (match.index){
        container.push(content.substring( 0, match.index ));
        content = content.slice( match.index );
      }
      content = content.replace(match[0], "");

      const innerContent = match.filter(Boolean).at(-1);
      const {replacer} = this.#fetchMark(match.groups);

      let parsed = replacer(innerContent);

      if (parsed instanceof HTMLElement)
        this.parseNode(parsed);

      container.push( parsed );
    }

    container.push(content);
    node.innerHTML = "";

    container.forEach(item => node.append(item));
    return node;
  }


  toHTML(){
    return this.inner;
  }

  #fetchMark(groups){
    const groupName = Object.entries(groups)
      .find(([name, value]) => value)
      .at(0);

    return this.constructor.MARKS.find(mark => mark.name === groupName);
  }


  static MARKS = [
    {
      name: "escaping",
      reg: `\\\\\\\\`,
      replacer: (content) => {
        const node = document.createElement("span");
        node.className = "escaping no-parse";
        node.textContent = content;
        return node;
      }

    },
    {
      name: "bold",
      reg: `(?<!\\\\)\\*\\*(.+?)(?<!\\\\)\\*\\*`,
      replacer: (content) => {
        const node = document.createElement("b");
        node.textContent = content;
        return node;
      }

    }
  ]
}
