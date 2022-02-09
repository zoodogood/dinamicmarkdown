

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

    reg = new RegExp( reg );

    while (true){
      const match = content.match(reg);
      if (match === null)
        break;


      if (match.index){
        const substring = content.substring( 0, match.index );
        content = content.slice( match.index );
        this.#cleanPlain({ substring, container });
      }



      content = content.replace(match[0], "");

      const innerContent = match.filter(Boolean).at(-1);
      const {replacer} = this.#fetchMark(match.groups);

      let parsed = replacer(innerContent, match);

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


  #cleanPlain({ substring, container }){

    while (true) {
      const index = substring.indexOf("\\");
      if (!~index)
        break;

      substring = substring.substring(index + 1);
      container.push(substring.slice(0, index));

      const node = document.createElement("span");
      node.className = "escaping no-parse no-visible";
      node.textContent = "\\";
      container.push(node);
    }

    if (substring)
      container.push(substring);
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
      reg: `(?<=\\\\)(\\\\)`,
      replacer: (content, match) => {
        const node = document.createElement("span");
        node.className = "escape no-parse";
        node.textContent = "\\";
        return node;
      }

    },
    {
      name: "escape_line",
      reg: `\\\\n`,
      replacer: (content) => "\n"
    },
    {
      name: "h1",
      reg: `(?:\\n|^)(?<!\\\\)#\\s(.+?)(?:\\n|$)`,
      replacer: (content) => {
        const node = document.createElement("h1");
        node.textContent = content;
        return node;
      }

    },
    {
      name: "h2",
      reg: `(?:\\n|^)(?<!\\\\)#{2}\\s(.+?)(?:\\n|$)`,
      replacer: (content) => {
        const node = document.createElement("h2");
        node.textContent = content;
        return node;
      }

    },
    {
      name: "h3",
      reg: `(?:\\n|^)(?<!\\\\)#{3}\\s(.+?)(?:\\n|$)`,
      replacer: (content) => {
        const node = document.createElement("h3");
        node.textContent = content;
        return node;
      }

    },
    {
      name: "h4",
      reg: `(?:\\n|^)(?<!\\\\)#{4}\\s(.+?)(?:\\n|$)`,
      replacer: (content) => {
        const node = document.createElement("h4");
        node.textContent = content;
        return node;
      }

    },
    {
      name: "h5",
      reg: `(?:\\n|^)(?<!\\\\)#{5}\\s(.+?)(?:\\n|$)`,
      replacer: (content) => {
        const node = document.createElement("h5");
        node.textContent = content;
        return node;
      }

    },
    {
      name: "h6",
      reg: `(?:\\n|^)(?<!\\\\)#{6}\\s(.+?)(?:\\n|$)`,
      replacer: (content) => {
        const node = document.createElement("h6");
        node.textContent = content;
        return node;
      }

    },
    {
      name: "quote",
      reg: `(?:\\n|^)(?<!\\\\)\\>\\s(.+?)(?:\\n|$)`,
      replacer: (content) => {
        const node = document.createElement("q");
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

    },
    {
      name: "code",
      reg: `(?<!\\\\)\`([^\`\n]+?)\``,
      replacer: (content) => {
        const node = document.createElement("pre");
        node.className = "no-parse";
        node.textContent = content;
        return node;
      }

    },
    {
      name: "italic",
      reg: `(?<!\\\\)\\*(.+?)(?<!\\\\)\\*`,
      replacer: (content) => {
        const node = document.createElement("i");
        node.textContent = content;
        return node;
      }

    },
    {
      name: "italic2",
      reg: `(?<!\\\\)_(.+?)(?<!\\\\)_`,
      replacer: (content) => {
        const node = document.createElement("i");
        node.textContent = content;
        return node;
      }

    },
    {
      name: "codeblock",
      reg: `(?<!\\\\)\`\`\`([a-zA-Z]+?\\n)?([^\`]+?)\`\`\``,
      replacer: (content, {groups}) => {
        const node = document.createElement("code");
        node.className = "no-parse";
        node.textContent = content;

        const lang = groups.codeblock.match(/(?<=```)[a-zA-Z]+?(?=\n)/);
        if (lang)
          hljs.highlightElement(node);

        return node;
      }

    }
  ]

  static addMark(mark){
    if (typeof mark !== "object")
      throw new Error("must be Object");

    const MUST_HAVE_LIST = [
      ["name", "string"],
      ["replacer", "function"],
      ["reg", "string"]
    ];

    const errorsList = MUST_HAVE_LIST
      .filter(([property, type]) => !(property in mark) || typeof mark[property] !== type)
      .map(([property, type]) => `mark must have the ${ property } (${ type })`);

    if (errorsList.length)
      throw new Error(errorsList.join(" & "));

    this.MARKS.push(mark);
  }
}
