import memoizeOne from 'memoize-one';

interface BulletOptions {
  width: number;
  height: number;
  velocity: number;
  angle: number;
  x: number;
  y: number;
}

const degrees2radians = memoizeOne((degrees: number) => degrees * (Math.PI / 180));
const getVelocityX = memoizeOne((v: number, r: number) => Math.cos(r) * v)
const getVelocityY = memoizeOne((v: number, r: number) => Math.sin(r) * v)

class Bullet implements BulletOptions {
  width = 2;
  height = 2;
  velocity = 2;
  angle = 0;
  x = 0;
  y = 0;

  constructor(options: Partial<BulletOptions>) {
    this.width = options.width || 4;
    this.height = options.height || 4;
    this.velocity = options.velocity || 0;
    this.angle = options.angle || 0;
    this.x = options.x || 0;
    this.y = options.y || 0;
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
}

interface BrickBreakCoreOptions {
  width: number;
  height: number;
  bulletOptions?: Partial<BulletOptions>;
}

export class BrickBreakCore implements BrickBreakCoreOptions {
  width: number;
  height: number;
  bullet: Bullet;

  constructor(options: BrickBreakCoreOptions) {
    this.width = options.width;
    this.height = options.height;
    this.bullet = new Bullet(options.bulletOptions || {
      x: this.width / 2,
      y: this.height,
      velocity: 2,
      angle: 30,
    });
  }

  iterator() {
    this.bullet.x += this.bullet.velocityX;
    this.bullet.y -= this.bullet.velocityY;
    if (this.bullet.x >= this.width || this.bullet.x <= 0) {
      this.bullet.angle = 180 - this.bullet.angle
    }
    if (this.bullet.y <= 0 || this.bullet.y >= this.height) {
      this.bullet.angle = 360 - this.bullet.angle
    }
  }
}
