class Missile extends GuaImage {
    constructor(game, name) {
        super(game, name)
        this.speed = config.missile_speed
    }
    update() {
        this.y -= this.speed
    }
}

class Player extends GuaImage {
    constructor(game) {
        super(game, 'player')
        this.x = 100
        this.y = 200
        this.speed = config.player_speed
        this.cooldown = config.player_cooldown

    }
    update(g) {
        this.speed = config.player_speed

        this.cooldown--
        // 移动飞机hero
        g.registerAction('a', () => {
            this.moveLeft()
        })
        g.registerAction('d', () => {
            this.moveRight()
        })
        g.registerAction('w', () => {
            this.moveUp()
        })
        g.registerAction('s', () => {
            this.moveDown()
        })
        g.registerAction('j', () => {
            this.fire()
        })
    }
    moveLeft() {
        this.x -= this.speed
    }
    moveRight() {
        this.x += this.speed
    }
    moveUp() {
        this.y -= this.speed
    }
    moveDown() {
        this.y += this.speed
    }
    fire() {
        if(this.cooldown <= 1) {
            this.cooldown = config.player_cooldown
            var x = this.x + this.w / 2
            var m = new Missile(this.game, 'missile1')
            m.x = x
            m.y = this.y
            this.scene.addElement(m)
        }

    }
}
