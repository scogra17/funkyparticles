
function run() {
  const BIRD_COUNT = Number(document.getElementById('particle_count').value);

  const MAX_X_POSITION = 400;
  const MAX_Y_POSITION = 400;
  // const X_STEP_SIZE = Number(document.getElementById('step_size').value);
  // const Y_STEP_SIZE = Number(document.getElementById('step_size').value);
  const X_STEP_SIZE = 10;
  const Y_STEP_SIZE = 10;

  const LOOPS = 1000;

  const INTERVAL_MS = 100; //ms
  // const COHESION = Number(document.getElementById('cohesion').value);
  const COHESION = 1;

  let cartesianMixin = {
    distance(pos1, pos2) {
      let x_distance = pos1[0] - pos2[0];
      let y_distance = pos1[1] - pos2[1];
      let d = Math.sqrt(( x_distance ** 2) + (y_distance ** 2 ));
      return d;

    }
  }

  let BirdPrototype = {
    constructor: function(initialPosition, id) {
      this._position = initialPosition;
      this._id = id;
    },
    displayPosition: function() {
      console.log(`id: ${this._id}, position: ${this._position}`);
    },
    closestNeighbor: function(birds) {
      let closest;
      let closestDistance = 1000;
      for (let i = 0; i < birds.length; i += 1) {
        let neighbor = birds[i];
        if (neighbor._id === this._id) {
          continue;
        }
        let d = this.distance(this._position, neighbor._position);
        // console.log(`bird: ${this._id}, neighbor: ${neighbor._id}, distance: ${d}`);
        if (d < closestDistance) {
          closest = neighbor;
        }
      }
      return closest;
    },
    updatePosition: function(birds) {
      let neighbor = this.closestNeighbor(birds);
      // console.log(`bird: ${this._id}, neighbor: ${neighbor._id}`);
      let x_bias = neighbor._position[0] - this._position[0];
      let x_bias_directional = x_bias > 0 ? 1 : -1;
      // let x_bias = 0;
      let y_bias = neighbor._position[1] - this._position[1];
      let y_bias_directional = y_bias > 0 ? 1 : -1;
      // let y_bias = 0;
      this._position[0] += x_bias_directional*COHESION + (Math.random() > 0.5 ? -X_STEP_SIZE : X_STEP_SIZE);
      this._position[1] += y_bias_directional*COHESION + (Math.random() > 0.5 ? -Y_STEP_SIZE : Y_STEP_SIZE);
      // use a combination of the closest bird and some randomness

    },
    addToDom: function() {
      let element = document.getElementById("new");
      let bird = document.createElement("div");
      bird.classList.add("bird");
      bird.id = String(this._id);
      element.appendChild(bird);
    },
    updateOnDom: function() {
      let bird = document.getElementById(String(this._id));
      bird.style["left"] = `${this._position[0].toFixed(0)}px`;
      bird.style["top"] = `${this._position[1].toFixed(0)}px`;
    }
  }

  Object.assign(BirdPrototype, cartesianMixin);

  let FlockPrototype = {
    constructor: function(id) {
      this._id = id;
      this._birds = [];
    },
    addBird: function(bird) {
      this._birds.push(bird);
    },
    displayPositions: function() {
      this._birds.forEach(bird => {
        bird.displayPosition();
      })
    },
    updatePositions: function() {
      this._birds.forEach(bird => {
        bird.updatePosition(this._birds);
      })
    },
    updateOnDom: function() {
      this._birds.forEach(bird => {
        bird.updateOnDom();
      })
    }
  }

  let flock = Object.create(FlockPrototype);
  flock.constructor(1);

  for (let i = 1; i <= BIRD_COUNT; i += 1) {
    let bird = Object.create(BirdPrototype);
    bird.constructor([MAX_X_POSITION, MAX_Y_POSITION], i);
    bird.addToDom();
    flock.addBird(bird);
  }

  let count = LOOPS;

  function myLoop() {
    setTimeout(function() {
      flock.updatePositions();
      flock.updateOnDom();
      count -= 1;
      if (count > 0) {
        myLoop();
      }
    }, INTERVAL_MS)
  }

  myLoop();

}
