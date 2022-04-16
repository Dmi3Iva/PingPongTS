import {random, randomChoice} from "./utils";

interface PingPongGameConfig {
    wallWidth: number;
    ballRadius: number;
}

class PingPongGame {

    static defaultConfig: PingPongGameConfig = {
        wallWidth: 10,
        ballRadius: 20
    }

    public config: PingPongGameConfig = PingPongGame.defaultConfig;
    public width: number;
    public height: number;
    private court: Court | null = null;
    private ball: Ball | null = null;
    private context: CanvasRenderingContext2D | null = null;
    private oldUpdate: number;


    constructor(context: CanvasRenderingContext2D, config: PingPongGameConfig = PingPongGame.defaultConfig) {
        this.config = config;
        this.context = context;
        this.width = document.body.clientWidth;
        this.height = document.body.clientHeight;
        this.court = new Court(this);
        this.ball = new Ball(this);
        this.oldUpdate = 0;
        this.start();
    }

    start() {
        this.update(0);
    }


    update(dt: number) {
        console.log('dt', dt);
        if (!this.ball) throw Error('Failed to update PingPongGame, ball unexpectedly null!');
        if (!this.context) throw Error('Failed to update PingPongGame, context unexpectedly null!');
        this.ball.update(dt);
        this.context.fillStyle = 'white';
        this.context.fillRect(0, 0, this.width, this.height);
        this.draw();
        requestAnimationFrame((newDt) => {
            this.update((newDt - this.oldUpdate) / 500);
            this.oldUpdate = newDt;
        });
    }

    draw() {
        if (this.court === null || this.ball === null || this.context === null) {
            // TODO:: add here log
            throw Error('PingPongGame draw method failed');
        }
        this.court.draw(this.context);
        this.ball.draw(this.context);
    }

}

class Court {

    private walls: { x: number, y: number, width: number, height: number }[];

    constructor(pingPongGame: PingPongGame) {
        const width = pingPongGame.width;
        const height = pingPongGame.height;
        const wallWidth = pingPongGame.config.wallWidth;
        this.walls = [];
        this.walls.push({x: 0, y: 0, width, height: wallWidth});
        this.walls.push({x: 0, y: height - wallWidth, width, height: wallWidth});
        this.walls.push({x: 0, y: 0, width: wallWidth, height});
        this.walls.push({x: width - wallWidth, y: 0, width: wallWidth, height});
    }

    draw(context: CanvasRenderingContext2D) {
        context.fillStyle = 'green';
        this.walls.forEach(wall => {
            context.fillRect(wall.x, wall.y, wall.width, wall.height);
        })
    }

}

class Ball {
    // TODO:: think about this values
    private pingPongGame: PingPongGame;
    private readonly radius: number;
    private minX: number;
    private minY: number;
    private maxX: number;
    private maxY: number;
    x: number;
    y: number;
    dx: number;
    private dy: number;

    constructor(pingPongGame: PingPongGame) {
        this.pingPongGame = pingPongGame;
        this.radius = pingPongGame.config.ballRadius;
        this.minX = pingPongGame.config.wallWidth + this.radius;
        this.minY = pingPongGame.config.wallWidth + this.radius;
        this.maxX = pingPongGame.width - pingPongGame.config.wallWidth - this.radius;
        this.maxY = pingPongGame.height - pingPongGame.config.wallWidth - this.radius;
        this.x = random(this.minX, this.maxX);
        this.y = random(this.minY, this.maxY);
        this.dx = (this.maxX - this.minX) / (random(1, 10) * randomChoice(1, -1));
        this.dy = (this.maxY - this.minY) / (random(1, 10) * randomChoice(1, -1));
    }

    update(dt: number) {
        console.log('old ball position', this.x, this.y, this.dx, this.dy);

        this.x = this.x + (this.dx * dt);
        this.y = this.y + (this.dy * dt);

        if ((this.dx > 0) && (this.x > this.maxX)) {
            this.x = this.maxX;
            this.dx = -this.dx;
        } else if ((this.dx < 0) && (this.x < this.minX)) {
            this.x = this.minX;
            this.dx = -this.dx;
        }

        if ((this.dy > 0) && (this.y > this.maxY)) {
            this.y = this.maxY;
            this.dy = -this.dy;
        } else if ((this.dy < 0) && (this.y < this.minY)) {
            this.y = this.minY;
            this.dy = -this.dy;
        }
        console.log('new ball position', this.x, this.y);
    }

    draw(context: CanvasRenderingContext2D) {
        // const w:number = this.radius * 2;
        // const h:number = this.radius * 2;
        context.fillStyle = 'black';
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
        context.fill();
        context.closePath();
    }

}

export default PingPongGame;
