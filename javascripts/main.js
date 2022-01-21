/* eslint-disable no-undef */
/* eslint-disable no-new */

class App {
  constructor() {
    this.view = new View();
    this.controller = new Controller(this.view);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new App();
});
