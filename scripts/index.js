console.log('JS Loaded');

const canvas = document.getElementById('arena');
const ctx = canvas.getContext('2d');

/* canvas.width = 1024;
canvas.height = 576; */

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillRect(0, 0, canvas.width, canvas.height);

const player = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  velocity: {
    x: 0,
    y: 0
  },
  offset: {
    x: 0,
    y: 0
  },
  color: 'blue'
});

const enemy = new Sprite({
  position: {
    x: 400,
    y: 100
  },
  velocity: {
    x: 0,
    y: 0
  },
  offset: {
    x: 50,
    y: 0
  },
  color: 'red'
});

const base1 = new Platform(canvas.width / 2 / 2, canvas.height / 2, 600, 40);

const base2 = new Platform(canvas.width / 4, canvas.height / 4, 200, 20);
const base3 = new Platform(
  canvas.width / 4,
  canvas.height - canvas.height / 4,
  200,
  20
);
const base4 = new Platform(
  canvas.width - canvas.width / 4,
  canvas.height / 4,
  200,
  20
);
const base5 = new Platform(
  canvas.width - canvas.width / 4,
  canvas.height - canvas.height / 4,
  200,
  20
);

const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  w: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  },
  ArrowLeft: {
    pressed: false
  }
};

function rectangleCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.position.x &&
    rectangle1.attackBox.position.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  );
}

// stays on top of platform

/* function platformColision({ player, platform }) {
  if (
    player.position.y + player.height <= platform.y &&
    player.position.y + player.gravity + player.height >= platform.y &&
    player.position.x >= platform.x &&
    player.position.x <= platform.x + platform.width
  ) {
    player.velocity = 0;
  }
} */

/* const enemies = [];

function drawPlatforms() {
  enemies.push(base1);
  enemies.forEach(el => el.draw());
  /*  base2.draw();
  base3.draw();
  base4.draw();
  base5.draw(); 
} */

function animate() {
  window.requestAnimationFrame(animate);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();
  //drawPlatforms();
  base1.draw();
  base2.draw();
  base3.draw();
  base4.draw();
  base5.draw();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  //player movement
  if (keys.a.pressed && player.lastKey === 'a') {
    player.velocity.x = -5;
  } else if (keys.d.pressed && player.lastKey === 'd') {
    player.velocity.x = 5;
  }

  //enemy movement
  if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
    enemy.velocity.x = -5;
  } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
    enemy.velocity.x = 5;
  }

  //detect for colision - attack
  if (
    rectangleCollision({
      rectangle1: player,
      rectangle2: enemy
    }) &&
    player.isAttacking
  ) {
    player.isAttacking = false;
    console.log('Player Attacking!');
  }

  if (
    rectangleCollision({
      rectangle1: enemy,
      rectangle2: player
    }) &&
    enemy.isAttacking
  ) {
    enemy.isAttacking = false;
    console.log('Enemy Attacking!');
  }
  //enemies.forEach(el => player.collision(el));

  //base1.detectOnTop(player);

  player.detectOnTop(base1);
  player.detectOnBottom(base1);

  player.detectOnTop(base2);
  player.detectOnBottom(base2);

  player.detectOnTop(base3);
  player.detectOnBottom(base3);

  player.detectOnTop(base4);
  player.detectOnBottom(base4);

  player.detectOnTop(base5);
  player.detectOnBottom(base5);

  enemy.detectOnTop(base1);
  enemy.detectOnBottom(base1);

  enemy.detectOnTop(base2);
  enemy.detectOnBottom(base2);

  enemy.detectOnTop(base3);
  enemy.detectOnBottom(base3);

  enemy.detectOnTop(base4);
  enemy.detectOnBottom(base4);

  enemy.detectOnTop(base5);
  enemy.detectOnBottom(base5);

  //base1.detectOnBottom(player);
}

animate();

//EVENT_LISTENERS

//------------------------------ KEY DOWN (MOVE) ----------------------------//
window.addEventListener('keydown', event => {
  event.preventDefault();
  switch (event.key) {
    //Player Keys
    case 'd':
      keys.d.pressed = true;
      player.lastKey = 'd';
      break;
    case 'a':
      keys.a.pressed = true;
      player.lastKey = 'a';
      break;
    case 'w':
      player.velocity.y = -20;
      break;
    case ' ':
      player.attack();
      break;

    //Enemy Keys
    case 'ArrowRight':
      keys.ArrowRight.pressed = true;
      enemy.lastKey = 'ArrowRight';
      break;
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = true;
      enemy.lastKey = 'ArrowLeft';
      break;
    case 'ArrowUp':
      enemy.velocity.y = -20;
      break;
    case 'ArrowDown':
      enemy.attack();
      break;
  }
});

//------------------------------ KEY UP (STOP) -----------------------------//
window.addEventListener('keyup', event => {
  event.preventDefault();
  switch (event.key) {
    case 'd':
      keys.d.pressed = false;
      break;
    case 'a':
      keys.a.pressed = false;
      break;
  }
  //Enemy Keys
  switch (event.key) {
    case 'ArrowRight':
      keys.ArrowRight.pressed = false;
      break;
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false;
      break;
  }
});
