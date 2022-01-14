class View {
  constructor() {
    this.main = document.querySelector('main');
    this.header = document.querySelector('header');
    this.createContainerElements();
    this.fillContainerElements();
    this.displayHomeElements();
  }

  createContainerElements() {
    this.title = this.createElement({tag: 'h1', textContent: 'Particles'});
    this.canvas = this.createElement({tag: 'canvas', attributes: {width: '500px', height: '400px'}});
    this.dropdown = this.createElement({tag: 'select'});
    this.controlBar = this.createElement({tag: 'ul'});
    this.displayPanel = this.createElement({tag: 'div'});
    this.infoPanel = this.createElement({tag: 'div'});
  }

  fillContainerElements() {
    this.fillDropdown();
    this.fillControlBar();
    this.fillInfoPanel();
    this.fillDisplayPanel();
  }

  fillDropdown(options=['random', 'swarm']) {
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
    this.restartBtn = this.createElement({tag: 'a', textContent: 'restart', attributes: {href:'#'}});
    this.controlBar.append(this.restartBtn);
  }

  fillInfoPanel() {
    this.infoPanelTitle = this.createElement({tag: 'h2', textContent: 'Info'});
    this.infoPanel.append(this.infoPanelTitle);
  }

  fillDisplayPanel() {
    this.displayPanel.append(this.canvas, this.controlBar);
  }

  displayHomeElements = function() {
    this.clearElementChildren(this.main);
    this.main.append(this.displayPanel, this.infoPanel);
    this.header.append(this.title, this.dropdown);
  }

  // handlers
  bindSelectParticleMotion(handler) {
    this.dropdown.addEventListener('change', (e) => {
      e.preventDefault();
      handler(e.target.value);
    })
  }

  bindRestartCanvas(handler) {
    this.restartBtn.addEventListener('click', (e) => {
      e.preventDefault();
      handler();
    })
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