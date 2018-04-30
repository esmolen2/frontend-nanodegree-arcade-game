// Enemies our player must avoid
const Enemy = function(speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.spriteWidth = 98;
    this.spriteHeight = 66;
    this.xStart = function () {
        return Math.floor(Math.random() * -600) - 97;
    };
    this.x = this.xStart();
    this.yStart = function () {
        let yStart;
        const randomizer = Math.floor(Math.random() * 3) + 1;
        randomizer == 1 ? yStart = 63  :
        randomizer == 2 ? yStart = 145 : yStart = 229;
        return yStart;
    };
    this.y = this.yStart();
    this.speed = speed;
};

const allEnemies = [];

const enemy1 = new Enemy(100);

allEnemies.push(enemy1);

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 600) {
        this.x = this.x + (this.speed * dt);
    } else {
        this.x = this.xStart();
        this.y = this.yStart();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
    constructor() {
      this.sprite = 'images/char-boy.png';
      this.spriteWidth = 67;
      this.spriteHeight = 76;
      this.xStart = 202;
      this.yStart = 385;
      this.x = this.xStart;
      this.y = this.yStart;
    }

    handleInput(key) {
        if (key == 'left') {
            this.x -= 101;
        } else if (key == 'right') {
            this.x += 101;
        } else if (key == 'up') {
            this.y -= 85;
        } else if (key == 'down') {
            this.y += 85;
        }
    }

    checkCollisions() {
        let playerBoxX = this.x + 17;
        let playerBoxY = this.y + 63;
        allEnemies.forEach(function(enemy) {
            let enemyBoxX = enemy.x + 1;
            let enemyBoxY = enemy.y + 77;
            if (playerBoxX < enemyBoxX + enemy.spriteWidth && // check left side of player
                playerBoxX + player.spriteWidth > enemyBoxX && // check right side of player
                playerBoxY < enemyBoxY + enemy.spriteHeight && // check top side of player
                player.spriteHeight + playerBoxY > enemyBoxY) { // check bottom side of player
                  console.log('collision!!!!');
            }
        });
    }

    update() {
      this.xMin = 0;
      this.xMax = 404;
      if (this.x < this.xMin) {
          this.x = this.xMin;
      };
      if (this.x > this.xMax) {
          this.x = this.xMax;
      };
      this.yMin = 45;
      this.yMax = 385;
      if (this.y < this.yMin) {
          this.y = this.yStart;
          this.x = this.xStart;
      };
      if (this.y > this.yMax) {
          this.y = this.yMax;
      };
      this.checkCollisions();
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

const player = new Player();

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
