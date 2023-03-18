let gravity = 0.7; //changes depending on the map (Moon, Mars, Earth)

//Creates the player
class Sprite {
  constructor({ position, velocity, color, offset }) {
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
    this.width = 50;
    this.lastKey;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y
      },
      offset,
      width: 100,
      height: 50
    };
    this.color = color;
    this.isAttacking;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

    //attack box
    if (this.isAttacking) {
      ctx.fillStyle = 'green';
      ctx.fillRect(
        this.attackBox.position.x,
        this.attackBox.position.y,
        this.attackBox.width,
        this.attackBox.height
      );
    }
  }

  //updtes every detail on the game
  update() {
    this.draw();
    this.attackBox.position.x = this.position.x - this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
    } else this['velocity']['y'] += gravity;
  }

  attack() {
    this.isAttacking = true;
    /* this.isAttacking = !this.isAttacking; */
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }

  collision(enemie) {
    if (
      this.position.y > enemie.y - this.height &&
      this.x > enemie.x &&
      this.x < enemie.x + this.width &&
      this.y > enemie.y
    ) {
      console.log('Collision');
    }
  }

  detectOnTop(obstacle) {
    if (
      this.position.y > obstacle.y - obstacle.height &&
      this.position.x + this.width > obstacle.x &&
      this.position.x < obstacle.x + obstacle.width &&
      this.position.y < obstacle.y + obstacle.height
    ) {
      this.velocity.y += 0.7;
      this.position.y += 10;
    }
  }

  detectOnBottom(obstacle) {
    if (
      this.position.y < obstacle.y - obstacle.height &&
      this.position.x + this.width > obstacle.x &&
      this.position.x < obstacle.x + obstacle.width &&
      this.position.y + this.height > obstacle.y + obstacle.height
    ) {
      this.velocity.y = 0;
    }
  }
}
