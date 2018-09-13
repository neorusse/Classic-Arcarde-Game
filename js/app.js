let score = 0,
    displayScore = document.querySelector(".score"),
    scoreTag = displayScore.textContent,
    myScore = `${scoreTag} ${score}`;

displayScore.innerHTML = myScore;


// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.x = x;
    this.y = y + 55;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    this.move = 101;
    this.border = this.move * 5;
    this.resetPostion = -this.move;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // if enemy does not pass border
    if(this.x < this.border) {
        // move forward
        // Increment x by speed * dt
        this.x += this.speed * dt;
    }
    else {
        // reset position to start
        this.x = this.resetPostion;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Instance of our Enemy Class
const villain1 = new Enemy(-101, 0, 180);
const villain2 = new Enemy(-101, 83, 220);
const villain3 = new Enemy(-101, 83, 250);
const villain4 = new Enemy((-101*2.5), 166, 260);
// creating an empty allEnemies Array
const allEnemies = [];
// Pushing our villian object to our array
allEnemies.push(villain1, villain2, villain3, villain4);

// Superman Player class

class Superman {
    constructor() {
        this.sprite = 'images/char-pink-girl.png';
        this.move = 101;
        this.leap = 83;
        this.posX = this.move * 2;
        this.posY = (this.leap * 4) + 55;
        this.x = this.posX;
        this.y = this.posY;
        this.success = false;
    }

    // Draw Superman sprite on specified x and y co-ordination position
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // update Superman's x and y property according to imput
    handleInput(navInput) {
        switch(navInput) {
            case 'left':
                if (this.x > 0) {
                    this.x -= this.move;
                }
                break;
            case 'up':
                if (this.y > this.leap) {
                    this.y -= this.leap;
                }
                break;
            case 'right':
                if (this.x < this.move * 4) {
                    this.x += this.move;
                }
                break;
            case 'down':
                if (this.y < this.leap * 4) {
                    this.y += this.leap;
                }
                break;
        }

    }

    // update position
    update() {
        // check for collision
        for(let enemy of allEnemies) {
            // Did Player x and y collide with enemy?
            if (this.y === enemy.y && (enemy.x + enemy.move/2 > this.x && enemy.x < this.x + this.move/2) ) {
                minusOne();
                this.reset();
            }      
        }
        // check for win here
        if (this.y === 55) {
            addOne();
            this.success = true;
        }
    }

    // Reset Superman
    reset() {
        // set x and y to starting
        this.y = this.posY;
        this.x = this.posX;
    }
}

// Instance of our Superman Class
const player = new Superman();

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

// function to add one to score 

function addOne() {
    score += 1;
    myScore = `${scoreTag} ${score}`;
    displayScore.innerHTML = myScore;
}

// function to deduct one from score

function minusOne() {
    score -= 1;
    myScore = `${scoreTag} ${score}`;
    displayScore.innerHTML = myScore; 
}
