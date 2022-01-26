// eslint-disable-next-line no-unused-vars
class View {
  constructor() {
    this.main = document.querySelector('main');
    this.createContainerElements();
    this.fillContainerElements();
    this.displayHomeElements();
  }

  createContainerElements() {
    this.title = this.createElement({tag: 'h1', id: 'title', textContent: 'funky particles'});
    this.canvas = this.createElement(
      {tag: 'canvas', attributes: {
        width: window.innerWidth,
        height: window.innerHeight,
      }
      });
    this.dropdown = this.createElement({tag: 'select', id: 'dropdown'});
    this.controlBar = this.createElement({tag: 'ul', id: 'control-bar'});
    this.header = this.createElement({tag: 'header', id: 'header'});
    this.displayPanel = this.createElement({tag: 'div', id: 'display-panel'});
  }

  fillContainerElements() {
    this.fillDropdown();
    this.fillControlBar();
    this.fillHeader();
    this.fillDisplayPanel();
  }

  fillDropdown(options = ['random', 'towards neighbor']) {
    let elem;
    options.forEach((opt) => {
      elem = this.createElement(
        { tag: 'option', textContent: opt, attributes: { value: opt } },
      );
      this.dropdown.appendChild(elem);
    });
  }

  fillControlBar() {
    this.restartBtn = this.createElement({tag: 'a', id: 'restart', classes: ['btn'], textContent: 'restart', attributes: {href:'#'}});
    this.playPauseBtn = this.createElement({tag: 'a', id: 'play-pause', classes: ['btn'], textContent: 'pause', attributes: {href:'#'}});
    this.addParticleBtn = this.createElement({tag: 'a', id: 'add', classes: ['btn'], textContent: 'add particle', attributes: {href:'#'}});
    this.controlBar.append(
      this.playPauseBtn,
      this.addParticleBtn,
      this.restartBtn,
      this.dropdown,
    );
  }

  fillHeader() {
    this.header.append(this.title, this.controlBar);
  }

  fillDisplayPanel() {
    this.displayPanel.append(this.canvas, this.header);
  }

  resizeCanvas(width, height) {
    this.canvas.setAttribute('width', width);
    this.canvas.setAttribute('height', height);
  }

  displayPlayPause(paused) {
    if (paused) {
      this.playPauseBtn.textContent = 'play';
    } else {
      this.playPauseBtn.textContent = 'pause';
    }
  }

  displayHomeElements = function() {
    this.clearElementChildren(this.main);
    this.main.append(this.displayPanel);
  }

  // handlers
  bindSelectParticleMotion(handler) {
    this.dropdown.addEventListener('change', (event) => {
      event.preventDefault();
      handler(event.target.value);
    });
  }

  bindPlayPauseCanvas(handler) {
    this.playPauseBtn.addEventListener('click', (event) => {
      event.preventDefault();
      handler();
    });
  }

  bindAddParticle(handler) {
    this.addParticleBtn.addEventListener('click', (event) => {
      event.preventDefault();
      handler();
    });
  }

  bindRestartCanvas(handler) {
    this.restartBtn.addEventListener('click', (event) => {
      event.preventDefault();
      handler();
    });
  }

  bindResizeWindow(handler) {
    window.addEventListener('resize', (event) => {
      event.preventDefault();
      handler(window.innerWidth, window.innerHeight);
    });
  }

  // utility functions

  clearElementChildren(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  createElement(elem) {
    const element = document.createElement(elem.tag);
    if (elem.classes) elem.classes.forEach((clss) => {
      element.classList.add(clss);
    });
    if (elem.id) element.id = elem.id;
    if (elem.attributes) {
      Object.keys(elem.attributes).forEach((a) => {
        element.setAttribute(a, elem.attributes[a]);
      });
    }
    if (elem.textContent) element.textContent = elem.textContent;
    if (elem.innerHTML) element.innerHTML = elem.innerHTML;
    return element;
  }
}