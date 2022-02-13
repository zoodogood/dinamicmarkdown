class Visualizer {
  #original;

  constructor(node){
    this.node = node.cloneNode(true);
    this.#original = node;
  }

  async visualize(){
    const nestiing = [];

    const parse = (node, ref) => {

      if (node.nodeType === 3)
        return ref.push(node.textContent);

      if (node.nodeType === 1){
        const nestiing = [];
        ref.push(nestiing);
        nestiing.node = node;
        [...node.childNodes].forEach(node => parse(node, nestiing));
        return;
      }

      throw new Error("Unknow type");
    }

    [...this.node.childNodes].forEach(node => parse(node, nestiing));
    nestiing.node = this.node;

    
  }
}
