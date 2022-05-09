export default class AudioHandler {
  audioCtx = new window.AudioContext();
  source;
  nodes = [];

  static create() {
    return new AudioHandler();
  }

  mount(mediaEl) {
    this.source = this.audioCtx.createMediaElementSource(mediaEl);
    return this;
  }

  appendNode(node, options) {
    if (typeof node === "function") {
      const newNode = new node(this.audioCtx, options);
      this.nodes.push(newNode);
    } else if (typeof node === "object") {
      this.nodes.push(node);
    }
    return this;
  }

  connect() {
    this.source.connect(this.nodes[0]);
    for (let i = 1; i < this.nodes.length; i++) {
      this.nodes[i - 1].connect(this.nodes[i]);
    }
    this.nodes[this.nodes.length - 1].connect(this.audioCtx.destination);
  }
}

/* 아주 간단한 오디오 핸들러
const videoEl = document.createElement("video");kg
AudioHandler.create()
  .mount(videoEl)
  .appendNode(GainNode, { gain: 2 })
  .connect();
*/
