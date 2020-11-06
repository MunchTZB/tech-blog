import memoizeOne from 'memoize-one';

export interface IRect {
  x: number;
  y: number;
  height: number;
  width: number;
}

class Rect implements IRect {
  x: number;
  y: number;
  height: number;
  width: number;

  constructor(options: IRect) {
    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.height = options.height;
  }

  getBoundingRect() {
    return {
      left: this.x,
      top: this.y,
      right: this.x + this.width,
      bottom: this.y + this.height
    }
  }
}

interface BulletOptions extends IRect {
  velocity: number;
  angle: number;
}

const degrees2radians = memoizeOne((degrees: number) => degrees * (Math.PI / 180));
const getVelocityX = memoizeOne((v: number, r: number) => Math.cos(r) * v)
const getVelocityY = memoizeOne((v: number, r: number) => Math.sin(r) * v)

function checkCollide(rect1: Rect, rect2: Rect) {
  const dx = (rect1.x + rect1.width / 2) - (rect2.x + rect2.width / 2);
  const dy = (rect1.y + rect1.height / 2) - (rect2.y + rect2.height / 2);
  const width = (rect1.width + rect2.width) / 2;
  const height = (rect1.height + rect2.height) / 2;
  const crossWidth = width * dy;
  const crossHeight = height * dx;
  let collision: 'none' | 'left' | 'top' | 'right' | 'bottom' = 'none';
  if (Math.abs(dx) <= width && Math.abs(dy) <= height) {
    if (crossWidth > crossHeight) {
      collision = (crossWidth > -crossHeight) ? 'bottom' : 'left';
    } else {
      collision = (crossWidth > -crossHeight) ? 'right' : 'top';
    }
  }
  return collision;
}

class Bullet extends Rect implements BulletOptions {
  velocity = 2;
  angle = 0;

  constructor(options: Partial<BulletOptions>) {
    super({
      x: options.x || 0,
      y: options.y || 0,
      width: options.width || 4,
      height: options.height || 4
    })
    this.velocity = options.velocity || 0;
    this.angle = options.angle || 0;
  }

  get angleInRadians() {
    return degrees2radians(this.angle)
  }

  get velocityX() {
    return getVelocityX(this.velocity, this.angleInRadians)
  }

  get velocityY() {
    return getVelocityY(this.velocity, this.angleInRadians)
  }

  revertVerticalDirection() {
    this.angle = 360 - this.angle
  }

  revertHorizontalDirection() {
    this.angle = 180 - this.angle;
  }
}

interface BrickBreakCoreOptions {
  width: number;
  height: number;
  bulletOptions?: Partial<BulletOptions>;
}

export class BrickBreakCore implements BrickBreakCoreOptions {
  brickWidth = 21;
  brickHeight = 7;
  gutter = 10;
  padding = 20;
  paddleWidth = 30;
  paddleHeight = 4;
  width: number;
  height: number;
  bullet: Bullet;
  bricks: Rect[];
  paddle: Rect;
  score = 0;
  lose = false;
  paddleMoveDirection: 'none' | 'left' | 'right' = 'none'
  paddleMoveVelocity = 10;

  constructor(options: BrickBreakCoreOptions) {
    this.width = options.width;
    this.height = options.height;
    this.bricks = [];
    this.paddle = new Rect({
      x: this.width / 2 - this.paddleWidth / 2,
      y: this.height - this.paddleHeight,
      width: this.paddleWidth,
      height: this.paddleHeight
    })
    this.bullet = new Bullet(options.bulletOptions || {
      x: 0,
      y: 0,
      velocity: 4,
      angle: 30,
    });
    this.generateBricks()
    this.bindKeyboardEvent()
  }

  keydown = (e: KeyboardEvent) => {
    if (e.code === 'ArrowRight') {
      this.paddleMoveDirection = 'right'
    }
    if (e.code === 'ArrowLeft') {
      this.paddleMoveDirection = 'left'
    }
  }

  keyup = (e: KeyboardEvent) => {
    if (e.code === 'ArrowRight' && this.paddleMoveDirection === 'right') {
      this.paddleMoveDirection = 'none'
    }
    if (e.code === 'ArrowLeft' && this.paddleMoveDirection === 'left') {
      this.paddleMoveDirection = 'none'
    }
  }

  private bindKeyboardEvent() {
    window.addEventListener('keydown', this.keydown);
    window.addEventListener('keyup', this.keyup);
  }

  private generateBricks() {
    const brickAreaWidth = this.width - 2 * this.padding;
    const brickAreaHeight = this.height / 2 - this.padding;
    const columns = Math.floor((brickAreaWidth + this.gutter) / (this.brickWidth + this.gutter));
    const rows = Math.floor((brickAreaHeight + this.gutter) / (this.brickHeight + this.gutter));
    const firstBrickPositionX = this.padding + ((brickAreaWidth + this.gutter) % (this.brickWidth + this.gutter)) / 2;
    const firstBrickPositionY = this.padding + ((brickAreaHeight + this.gutter) % (this.brickHeight + this.gutter)) / 2;
    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        this.bricks.push(new Rect({
          width: this.brickWidth,
          height: this.brickHeight,
          x: firstBrickPositionX + i * (this.brickWidth + this.gutter),
          y: firstBrickPositionY + j * (this.brickHeight + this.gutter),
        }))
      }
    }
  }

  iterator() {
    this.bullet.x += this.bullet.velocityX;
    this.bullet.y -= this.bullet.velocityY;
    const bulletRect = this.bullet.getBoundingRect();
    if (this.paddleMoveDirection === 'left') {
      this.paddle.x -= this.paddleMoveVelocity;
      if (this.paddle.x <= 0) {
        this.paddle.x = 0
      }
    } else if (this.paddleMoveDirection === 'right') {
      this.paddle.x += this.paddleMoveVelocity;
      if (this.paddle.x >= this.width - this.paddle.width) {
        this.paddle.x = this.width - this.paddle.width
      }
    }
    // 判断砖块碰撞
    for (let i = 0; i < this.bricks.length; i++) {
      const brick = this.bricks[i];
      const collision = checkCollide(brick, this.bullet);
      if (collision === 'bottom' || collision === 'top') {
        this.bullet.revertVerticalDirection();
        this.bricks.splice(i, 1)
        break
      }
      if (collision === 'left' || collision === 'right') {
        this.bullet.revertHorizontalDirection();
        this.bricks.splice(i, 1)
        break
      }
    }
    // 判断Paddle碰撞
    const paddleCollision = checkCollide(this.paddle, this.bullet);
    if (paddleCollision === 'left' || paddleCollision === 'right') {
      this.bullet.revertHorizontalDirection();
    }
    if (paddleCollision === 'top' || paddleCollision === 'bottom') {
      this.bullet.revertVerticalDirection();
    }
    // 判断墙壁碰撞
    if (bulletRect.right >= this.width || bulletRect.left <= 0) {
      this.bullet.revertHorizontalDirection();
    }
    if (bulletRect.top <= 0) {
      this.bullet.revertVerticalDirection();
    }
    if (bulletRect.bottom >= this.height) {
      this.lose = true
    }
  }
}
