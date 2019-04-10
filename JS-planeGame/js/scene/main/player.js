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
        // 英雄默认位置
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
        // cooldown子弹冷却时间
        if(this.cooldown <= 1) {
            this.cooldown = config.player_cooldown

            // 子弹
            var m = new Missile(this.game, 'missile1')
            // 算出子弹的初始坐标
            m.x = this.x + (this.w / 2) - (m.w / 2)
            m.y = this.y - m.h
            // 添加到页面中(这里的scene是在gua_scene里挂上的)
            this.scene.addElement(m)
        }
    }
}
