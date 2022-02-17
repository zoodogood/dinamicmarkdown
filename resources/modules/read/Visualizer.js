class Visualizer {
  #originalNode;

  constructor(node){
    this.node = node.cloneNode(false);
    this.#originalNode = node;
  }

  async visualize(){
    const nesting = this.#getNesting();
    this.#recreate(nesting);
  }


  #getNesting(){
    const nesting = [];

    const parse = (node, ref) => {

      if (node.nodeType === 3)
        return ref.push(node.textContent);

      if (node.nodeType === 1){
        const nesting = [];
        ref.push(nesting);
        nesting.node = node;
        [...node.childNodes].forEach(node => parse(node, nesting));
        return;
      }

      throw new Error("Unknow type");
    }

    [...this.#originalNode.childNodes].forEach(node => parse(node, nesting));
    nesting.node = this.#originalNode;
    return nesting;
  }


  async #recreate(nesting){
    const restoreNode = (node, parent) => {
      node.classList.add("restored");
      parent.append(node);
    }


    
  }


}
