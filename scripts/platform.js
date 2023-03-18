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

  colision(character) {
    if (
      character.position.y > this.y + character.height &&
      character.position.y < this.y &&
      character.position.x > this.x &&
      character.position.x < this.x + character.width
    ) {
      console.log('Collision');
      character.velocity = 0;
    }
  }
  /* detectOnTop(player) {
    let platformBottom = this.y - this.height;
    /* console.log(platformBottom);
    if (
      player.position.y > platformBottom &&
      player.position.x + player.width > this.x &&
      player.position.x < this.x + this.width &&
      player.position.y < this.y
    ) {
      console.log('Runing');
      // player.position.y = platformBottom;
      player.velocity.y = 0;
    }
  } */

  detectOnBottom(player) {
    if (
      player.position.y + player.height > this.y &&
      player.position.x + player.width > this.x &&
      player.position.x < this.x + this.width
    ) {
      console.log('Runing bottom');
      console.log(player.position.y + player.height > this.y);
      console.log(player.position.x + player.width > this.x);
      console.log(player.position.x < this.x + this.width);
      // player.position.y = platformBottom;
      player.velocity.y = 0;
    }
  }
}
