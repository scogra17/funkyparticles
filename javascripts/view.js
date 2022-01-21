class View {
  constructor() {
    this.main = document.querySelector('main');
    this.header = document.querySelector('header');
    this.createContainerElements();
    this.fillContainerElements();
    this.displayHomeElements();
  }

  createContainerElements() {
    this.title = this.createElement({tag: 'h1', textContent: 'funky particles'});
    this.canvas = this.createElement({tag: 'canvas', attributes: {width: '500px', height: '400px'}});
    this.dropdown = this.createElement({tag: 'select'});
    this.controlBar = this.createElement({tag: 'ul'});
    this.displayPanel = this.createElement({tag: 'div', id: 'display-panel'});
  }

  fillContainerElements() {
    this.fillDropdown();
    this.fillControlBar();
    this.fillDisplayPanel();
  }

  fillDropdown(options = ['random', 'swarm']) {
    this.dropdownPlaceholder = this.createElement({
      tag: 'option',
      textContent: 'Select behavior',
      attributes: { value: '', selected: null },
    });
    this.dropdown.appendChild(this.dropdownPlaceholder);

    let elem;
    options.forEach((opt) => {
      elem = this.createElement(
        { tag: 'option', textContent: opt, attributes: { value: opt } },
      );
      this.dropdown.appendChild(elem);
    });
  }

  fillControlBar() {
    this.restartBtn = this.createElement({tag: 'a', classes: ['btn'], textContent: 'restart', attributes: {href:'#'}});
    this.playPauseBtn = this.createElement({tag: 'a', classes: ['btn'], textContent: 'pause', attributes: {href:'#'}});
    this.addParticleBtn = this.createElement({tag: 'a', classes: ['btn'], textContent: 'add particle', attributes: {href:'#'}});
    this.controlBar.append(
      this.restartBtn,
      this.playPauseBtn,
      this.addParticleBtn
    );
  }

  fillDisplayPanel() {
    this.displayPanel.append(this.canvas, this.controlBar);
  }

  togglePlayPause(paused) {
    if (paused) {
      this.playPauseBtn.textContent = 'play';
    } else {
      this.playPauseBtn.textContent = 'pause';
    }
  }

  displayHomeElements = function() {
    this.clearElementChildren(this.main);
    this.main.append(this.displayPanel);
    this.header.append(this.title, this.dropdown);
  }

  // handlers
  bindSelectParticleMotion(handler) {
    this.dropdown.addEventListener('change', (event) => {
      event.preventDefault();
      handler(event.target.value);
    });
  }

  bindPauseCanvas(handler) {
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

  // utility functions

  clearElementChildren(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  createElement(elem) {
    const element = document.createElement(elem.tag);
    if (elem.classes) elem.classes.forEach((c) => element.classList.add(c));
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