class PointerParser extends MarkdownParser {
  static MARKS = [
    {
      name: "pause",
      reg: `%p\\(.+?\\)`,
      replacer: (content) => {
        const node = document.createElement("data");
        content = Number.parseInt(content, 10) ?? 0;
        node.className = "point pause";
        node.setAttribute("value", content);
      }

    }
  ]
}
