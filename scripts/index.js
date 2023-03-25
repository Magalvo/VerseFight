console.log('JS Loaded');

const canvas = document.getElementById('arena');
const ctx = canvas.getContext('2d');

//Default Canvas
canvas.width = 1024;
canvas.height = 576;

//Full Screen Width
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillRect(0, 0, canvas.width, canvas.height);

// Player Ensatiation
const player = new Sprite({
  position: {
    x: canvas.width / 2 - 150,
    y: 100
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

//Enemy Ensasiation
const enemy = new Sprite({
  position: {
    x: canvas.width / 2 + 200,
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

// Platforms Ensatiations
const base1 = new Platform(
  canvas.width / 2 - 144,
  canvas.height / 2 + 50,
  350,
  24
);

const base2 = new Platform(canvas.widht / 4 - 100, canvas.height / 4, 200, 24);

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

// Winning Conditions
function determineWinner({ player, enemy, timmerId }) {
  clearTimeout(timmerId);
  document.getElementById('displayText').style.display = 'flex';
  player.velocity.y = 100;
  player.velocity.x = 0;
  enemy.velocity.y = 100;
  enemy.velocity.x = 0;

  if (player.health === enemy.health) {
    console.log('Tie');
    document.getElementById('displayText').innerHTML = 'TIE';
  } else if (player.health > enemy.health) {
    document.getElementById('displayText').innerHTML = 'Player 1 Wins';
  } else if (player.health < enemy.health) {
    document.getElementById('displayText').innerHTML = 'Player 2 Wins';
  }
}

let timer = 60;
let timmerId;
function decreaseTimer() {
  if (timer > 0) {
    timmerId = setTimeout(decreaseTimer, 1000);
    timer--;
    document.getElementById('timer').innerHTML = timer;
  }

  if (timer === 0) {
    determineWinner({ player, enemy });
  }
}
decreaseTimer();

const background = new Background({
  position: {
    x: 0,
    y: 0
  },
  imgSrc: '../Images/fundo_com_loja.png',
  canvas: {
    width: canvas.width,
    height: canvas.height
  }
});

function animate() {
  window.requestAnimationFrame(animate);
  background.updateBackground();
  base1.draw();
  base2.draw();
  player.update();
  enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  //player movement reset
  if (keys.a.pressed && player.lastKey === 'a') {
    player.velocity.x = -5;
  } else if (keys.d.pressed && player.lastKey === 'd') {
    player.velocity.x = 5;
  }

  //enemy movement reset
  if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
    enemy.velocity.x = -5;
  } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
    enemy.velocity.x = 5;
  }

  // Player Winning Conditions and Life Bar Mechanics
  if (
    rectangleCollision({
      rectangle1: player,
      rectangle2: enemy
    }) &&
    player.isAttacking
  ) {
    player.isAttacking = false;
    enemy.health -= 20;
    document.getElementById('enemyHealth').style.width = enemy.health + '%';
    console.log('Player Attacking!');
  } else if (enemy.position.y + enemy.height >= canvas.height) {
    enemy.health -= 100;
    document.getElementById('enemyHealth').style.width = enemy.health + '%';
  }

  // Enemy Winning Conditions and Life Bar Mechanics
  if (
    rectangleCollision({
      rectangle1: enemy,
      rectangle2: player
    }) &&
    enemy.isAttacking
  ) {
    enemy.isAttacking = false;
    player.health -= 20;
    document.getElementById('playerHealth').style.width = player.health + '%';
    console.log('Enemy Attacking!');
  } else if (player.position.y + player.height >= canvas.height) {
    player.health -= 100;
    document.getElementById('playerHealth').style.width = player.health + '%';
  }

  if (enemy.health <= 0 || player.health <= 0) {
    determineWinner({ player, enemy, timmerId });
  }

  // Platform Colision Detection
  if (
    player.position.y + player.height <= base1.y &&
    player.position.y + player.height + player.velocity.y >= base1.y &&
    player.position.x + player.width >= base1.x &&
    player.position.x <= base1.x + base1.width
  ) {
    player.velocity.y = 0;
  }

  if (
    enemy.position.y + enemy.height <= base1.y &&
    enemy.position.y + enemy.height + enemy.velocity.y >= base1.y &&
    enemy.position.x + enemy.width >= base1.x &&
    enemy.position.x <= base1.x + base1.width
  ) {
    enemy.velocity.y = 0;
  }
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
  //Player Keys
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
