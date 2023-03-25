class Platform {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw() {
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  colision(player) {
    if (
      player.position.y + player.velocity + player.height >= this.y &&
      player.position.y + player.height <= this.y &&
      player.position.x + player.width >= this.x &&
      player.position.x <= this.x + this.width
    ) {
      console.log('Collision');
      this.velocity = 0;
    }
  }

  activate(character) {
    this.draw();
    this.colision(character);
  }
}
