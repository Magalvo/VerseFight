class Background {
  constructor({ position, imgSrc, canvas }) {
    this.position = position;
    this.width = 733;
    this.height = 706;
    this.image = new Image();
    this.image.src = imgSrc;
    this.canvas = canvas;
  }
  draw() {
    ctx.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height);
  }

  updateBackground() {
    this.draw();
  }
}
