const image = new Image();
image.src = '/Images/PlatUpDate.png';

class Platform {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = image.width;
    this.height = image.height;
    this.image = new Image();
    this.image.src = '/Images/PlatUpDate.png';
  }

  draw() {
    /*     ctx.fillStyle = 'green';
    ctx.fillRect(this.x, this.y, this.width, this.height); */
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
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
