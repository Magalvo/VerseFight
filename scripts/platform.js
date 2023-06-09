class Platform {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.loaded = false;

    const image = new Image();

    image.addEventListener('load', () => {
      this.loaded = true;
      this.image = image;
      console.log('loaded');
    });
    image.src = '/Images/PlatUpDatev2.png';
    this.width = image.width;
    this.height = image.height;

    /* this.image.src = '/Images/PlatUpDateV2.png'; */
  }

  draw() {
    if (this.loaded) {
      // Draw the platform image
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
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
