'use strict';

const Canvas = new class {
  constructor() {
    this.tileSize = 16;
    this.canvas = document.querySelector('canvas');
    this.context = this.canvas.getContext('2d');
    this.canvas.width = this.canvas.height = devicePixelRatio * this.tileSize * 28;
    this.canvas.style.width = this.canvas.style.height = this.tileSize * 28 + 'px';
    this.context.scale(devicePixelRatio, devicePixelRatio);

    addEventListener('mousedown', e => this.onMouseEvent(e));
    addEventListener('mouseup', e => this.onMouseEvent(e));
    addEventListener('mousemove', e => this.onMouseEvent(e));

    this.tiles = new Array(28 * 28).fill(0);
    this.draw();
  }

  draw() {
    const context = this.context;
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, this.tileSize * 28, this.tileSize * 28);
    context.strokeStyle = '#000000';
    for (let i = 1; i < 28; i++) {
      context.beginPath();
      context.moveTo(this.tileSize * i, 0);
      context.lineTo(this.tileSize * i, this.tileSize * 28);
      context.stroke();
      context.beginPath();
      context.moveTo(0, this.tileSize * i);
      context.lineTo(this.tileSize * 28, this.tileSize * i);
      context.stroke();
    }
    context.fillStyle = '#000000';
    for (let i = 0; i < this.tiles.length; i++) {
      if (this.tiles[i] === 1) {
        const x = this.tileSize * (i % 28);
        const y = this.tileSize * (i / 28 | 0);
        context.fillRect(x, y, this.tileSize, this.tileSize);
      }
    }
  }

  clearTiles() {
    this.tiles.fill(0);
    this.draw();
  }

  onMouseEvent({ buttons, clientX, clientY, movementX, movementY }) {
    if (buttons === 1) {
      const { left, top } = this.canvas.getBoundingClientRect();
      const accuracy = 10;
      for (let i = 0; i < accuracy; i++) {
        const progress = i / accuracy;
        const x = clientX - movementX * (1 - progress);
        const y = clientY - movementY * (1 - progress);
        const tileX = (x - left) / this.tileSize | 0;
        const tileY = (y - top) / this.tileSize | 0;
        const tileIndex = tileX + 28 * tileY;
        if (0 <= tileX && tileX < 28 && 0 <= tileY && tileY < 28) {
          this.tiles[tileIndex] = 1;
        }
      }
      this.draw();
    }
  }
};

const Graph = new class {
  constructor() {
    this.bars = [...document.querySelectorAll('.bar')];
    this.displays = [...document.querySelectorAll('.bar > .display')];
  }

  setValues(values) {
    for (let i = 0; i < this.displays.length; i++) {
      this.displays[i].style.transform = `scaleX(${values[i]})`;
    }
  }
}

addEventListener('keydown', async ({ key }) => {
  if (key === 'Backspace') {
    Canvas.clearTiles()
  }
});

setInterval(async () => {
  const response = await fetch('predict', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(Canvas.tiles)
  });
  const prediction = await response.json();
  Graph.setValues(prediction);
}, 80);