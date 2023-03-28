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
    x: 50,
    y: 0
  },
  color: 'blue',
  imageSrc: '/Images/Fantasy Warrior/Sprites/Idle.png',
  framesMax: 10,
  scale: 2.5,
  offset: {
    x: 170,
    y: 150
  },
  sprites: {
    idle: {
      imageSrc: '/Images/Fantasy Warrior/Sprites/Idle.png',
      framesMax: 10
    },
    run: {
      imageSrc: '/Images/Fantasy Warrior/Sprites/Run.png',
      framesMax: 8
    },
    jump: {
      imageSrc: '/Images/Fantasy Warrior/Sprites/Jump.png',
      framesMax: 3
    },
    fall: {
      imageSrc: '/Images/Fantasy Warrior/Sprites/Fall.png',
      framesMax: 3
    },
    attack1: {
      imageSrc: '/Images/Fantasy Warrior/Sprites/Attack1.png',
      framesMax: 7
    },
    death: {
      imageSrc: '/Images/Fantasy Warrior/Sprites/Death.png',
      framesMax: 7
    },
    hit: {
      imageSrc: '/Images/Fantasy Warrior/Sprites/Death.png',
      framesMax: 4
    }
  },
  attackBox: {
    offset: {
      x: -100,
      y: 0
    },
    width: 100,
    height: 50
  }
});

//Enemy Ensasiation
const enemy = new Sprite({
  position: {
    x: canvas.width / 2 + 100,
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
  color: 'red',
  imageSrc: '/Images/Wizard Pack/Idle.png',
  framesMax: 6,
  scale: 1.4,
  offset: {
    x: 170,
    y: 100
  },
  sprites: {
    idle: {
      imageSrc: '/Images/Wizard Pack/Idle.png',
      framesMax: 6
    },
    run: {
      imageSrc: '/Images/Wizard Pack/Run.png',
      framesMax: 8
    },
    jump: {
      imageSrc: '/Images/Wizard Pack/Jump.png',
      framesMax: 2
    },
    fall: {
      imageSrc: '/Images/Wizard Pack/Fall.png',
      framesMax: 2
    },
    attack1: {
      imageSrc: '/Images/Wizard Pack/Attack1.png',
      framesMax: 8
    },
    death: {
      imageSrc: '/Images/Fantasy Warrior/Sprites/Death.png',
      framesMax: 7
    },
    hit: {
      imageSrc: '/Images/Fantasy Warrior/Sprites/Death.png',
      framesMax: 4
    }
  },
  attackBox: {
    offset: {
      x: 120,
      y: 30
    },
    width: 100,
    height: 50
  }
});

// Platforms Ensatiations
let base1 = new Platform(
  canvas.width / 2 - 144,
  canvas.height / 2 + 50,
  350,
  24
);

let base2 = new Platform(
  canvas.width / 4 - 200,
  canvas.height / 4 + 100,
  100,
  24
);

let shop = new Element({
  position: {
    x: canvas.width - 475,
    y: canvas.height / 4 + 290
  },
  imageSrc: '/Images/shop.png',
  scale: 1.75,
  framesMax: 6
});

/* let shop2 = new Element({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: '/Images/shop inverted.png',
  scale: 1.75,
  framesMax: 6
}); */

let base3 = new Platform(canvas.width - 400, canvas.height / 4 + 100, 100, 24);

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

/* function restart() {
  player.position.x = canvas.width / 2 - 150;
  player.position.y = 100;
  player.velocity.x = 0;
  player.velocity.y = 0;
  player.offset.x = 0;
  player.offset.y = 0;
  player.color = 'blue';

  enemy.position.x = canvas.width / 2 + 100;
  enemy.position.y = 100;
  enemy.velocity.x = 0;
  enemy.velocity.y = 0;
  enemy.offset.x = 50;
  enemy.offsey.y = 0;
  enemy.color = 'red';

  timer = 10;

  animate();
} */

// Winning Conditions
function determineWinner({ player, enemy, timmerId }) {
  clearTimeout(timmerId);
  document.getElementById('displayText').style.display = 'flex';
  /* player.velocity.y = 0;
  player.velocity.x = 0;
  enemy.velocity.y = 0;
  enemy.velocity.x = 0; */

  if (player.health === enemy.health) {
    console.log('Tie');

    document.getElementById('displayText').innerHTML = 'TIE';

    /* console.log(restart()); */
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

let backgroundShop = new Background({
  position: {
    x: 0,
    y: 0
  },
  imgSrc: '../Images/game_background_shop_fitted.png',
  canvas: {
    width: canvas.width,
    height: canvas.height
  }
});

let backgroundForest = new Background({
  position: {
    x: 0,
    y: 0
  },
  imgSrc: '../Images/background-forest.png',
  canvas: {
    width: canvas.width,
    height: canvas.height
  }
});

/* let mapSelect;

function start(map) {
  if (map === 'forest') {
    mapSelect = 'forest';
    gravity = 0.2;
  } else if (map === 'shop') {
    mapSelect = 'shop';
    gravity = 0.7;
  }
  animate();
} */

function animate() {
  window.requestAnimationFrame(animate);

  //if (mapSelect === 'shop') {
  backgroundShop.updateBackground();
  /*   } else if (mapSelect === 'forest') { */
  /* backgroundForest.updateBackground(); */
  /*  shop2.update(); */
  shop.update();
  base1.draw();
  base2.draw();
  base3.draw();

  player.update();
  enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  //player movement reset

  if (keys.a.pressed && player.lastKey === 'a') {
    player.velocity.x = -5;
    player.switchSprite('run');
  } else if (keys.d.pressed && player.lastKey === 'd') {
    player.velocity.x = 5;
    player.switchSprite('run');
  } else {
    player.switchSprite('idle');
  }

  // player jumping
  if (player.velocity.y < gravity) {
    player.switchSprite('jump');
    this.position = 346;
  } else if (player.velocity.y > gravity) {
    player.switchSprite('fall');
  }
  console.log(player.position.y);
  //enemy movement reset
  if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
    enemy.velocity.x = -5;
    enemy.switchSprite('run');
  } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
    enemy.velocity.x = 5;
    enemy.switchSprite('run');
  } else {
    enemy.switchSprite('idle');
  }

  // enemy jumping
  if (enemy.velocity.y < 0.7) {
    enemy.switchSprite('jump');
  } else if (enemy.velocity.y > 0.7) {
    enemy.switchSprite('fall');
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
    /* restart(); */
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
    /* restart(); */
  }

  if (enemy.health <= 0 || player.health <= 0) {
    determineWinner({ player, enemy, timmerId });
  }

  // Platform Colision Detection

  //--------- Platform 1 ---------
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

  //---------- Platform 2---------
  if (
    player.position.y + player.height <= base2.y &&
    player.position.y + player.height + player.velocity.y >= base2.y &&
    player.position.x + player.width >= base2.x &&
    player.position.x <= base2.x + base2.width
  ) {
    player.velocity.y = 0;
  }

  if (
    enemy.position.y + enemy.height <= base2.y &&
    enemy.position.y + enemy.height + enemy.velocity.y >= base2.y &&
    enemy.position.x + enemy.width >= base2.x &&
    enemy.position.x <= base2.x + base2.width
  ) {
    enemy.velocity.y = 0;
  }

  //---------- Platform 3 ---------
  if (
    player.position.y + player.height <= base3.y &&
    player.position.y + player.height + player.velocity.y >= base3.y &&
    player.position.x + player.width >= base3.x &&
    player.position.x <= base3.x + base3.width
  ) {
    player.velocity.y = 0;
  }

  if (
    enemy.position.y + enemy.height <= base3.y &&
    enemy.position.y + enemy.height + enemy.velocity.y >= base3.y &&
    enemy.position.x + enemy.width >= base3.x &&
    enemy.position.x <= base3.x + base3.width
  ) {
    enemy.velocity.y = 0;
  }
}

function animate2() {
  window.requestAnimationFrame(animate2);

  //if (mapSelect === 'shop') {
  backgroundForest.updateBackground();
  /*   } else if (mapSelect === 'forest') { */
  /* backgroundForest.updateBackground(); */
  /*  shop2.update(); */
  //shop.update();
  base1.draw();
  base2.draw();
  base3.draw();

  player.update();
  enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  //player movement reset

  if (keys.a.pressed && player.lastKey === 'a') {
    player.velocity.x = -5;
    player.switchSprite('run');
  } else if (keys.d.pressed && player.lastKey === 'd') {
    player.velocity.x = 5;
    player.switchSprite('run');
  } else {
    player.switchSprite('idle');
  }

  // player jumping
  if (player.velocity.y < gravity) {
    player.switchSprite('jump');
    this.position = 346;
  } else if (player.velocity.y > gravity) {
    player.switchSprite('fall');
  }
  console.log(player.position.y);
  //enemy movement reset
  if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
    enemy.velocity.x = -5;
    enemy.switchSprite('run');
  } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
    enemy.velocity.x = 5;
    enemy.switchSprite('run');
  } else {
    enemy.switchSprite('idle');
  }

  // enemy jumping
  if (enemy.velocity.y < 0.7) {
    enemy.switchSprite('jump');
  } else if (enemy.velocity.y > 0.7) {
    enemy.switchSprite('fall');
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
    /* restart(); */
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
    /* restart(); */
  }

  if (enemy.health <= 0 || player.health <= 0) {
    determineWinner({ player, enemy, timmerId });
  }

  // Platform Colision Detection

  //--------- Platform 1 ---------
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

  //---------- Platform 2---------
  if (
    player.position.y + player.height <= base2.y &&
    player.position.y + player.height + player.velocity.y >= base2.y &&
    player.position.x + player.width >= base2.x &&
    player.position.x <= base2.x + base2.width
  ) {
    player.velocity.y = 0;
  }

  if (
    enemy.position.y + enemy.height <= base2.y &&
    enemy.position.y + enemy.height + enemy.velocity.y >= base2.y &&
    enemy.position.x + enemy.width >= base2.x &&
    enemy.position.x <= base2.x + base2.width
  ) {
    enemy.velocity.y = 0;
  }

  //---------- Platform 3 ---------
  if (
    player.position.y + player.height <= base3.y &&
    player.position.y + player.height + player.velocity.y >= base3.y &&
    player.position.x + player.width >= base3.x &&
    player.position.x <= base3.x + base3.width
  ) {
    player.velocity.y = 0;
  }

  if (
    enemy.position.y + enemy.height <= base3.y &&
    enemy.position.y + enemy.height + enemy.velocity.y >= base3.y &&
    enemy.position.x + enemy.width >= base3.x &&
    enemy.position.x <= base3.x + base3.width
  ) {
    enemy.velocity.y = 0;
  }
}

//animate();

/* function initialization(map) {
  if (map === 'forest') {
    mapSelect = forest;
    gravity = 0.2;
  } else if (map === 'shop') {
    mapSelect = shop;
    gravity = 0.7;
  }
  animate();
} */

//EVENT_LISTENERS

const shopBtn = document.getElementById('shopBtn');
const forestBtn = document.getElementById('forestBtn');
const navBar = document.getElementById('navBar');
const startScreen = document.getElementById('startScreen');

shopBtn.addEventListener('click', () => {
  navBar.style.display = 'none';
  startScreen.style.display = 'none';

  animate();
});

forestBtn.addEventListener('click', () => {
  navBar.style.display = 'none';
  startScreen.style.display = 'none';

  animate2();
});

//------------------------------ KEY DOWN (MOVE) ----------------------------//
window.addEventListener('keydown', event => {
  event.preventDefault();

  if (player.health > 0 /* || timer !== 0 */) {
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
        if (player.health > 0) {
          player.velocity.y = -20;
        }
        break;
      case 's':
        if (player.health > 0) {
        }
        player.attack();

        break;
    }
  }

  if (enemy.health > 0 /* || timer !== 0 */) {
    switch (event.key) {
      case 'ArrowRight':
        keys.ArrowRight.pressed = true;
        enemy.lastKey = 'ArrowRight';
        break;
      case 'ArrowLeft':
        keys.ArrowLeft.pressed = true;
        enemy.lastKey = 'ArrowLeft';
        break;
      case 'ArrowUp':
        if (enemy.health > 0) {
          enemy.velocity.y = -20;
        }
        break;
      case 'ArrowDown':
        enemy.attack();
        break;
    }
  }
});

/* addEventListener('click', event => {

 document.getElementById('forest-btn').style = 

 
}) */

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
