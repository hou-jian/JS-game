class Missile extends GuaImage {
    constructor(game, name) {
        super(game, name)
        this.speed = config.missile_speed
    }
    update() {
        this.y -= this.speed
        // 子弹超出范围删除自身
        if(this.y <= 0) {
            this.kill()
        }
    }
    kill() {
        this.scene.removeThing(this)
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

        // 存放子弹类
        this.missiles = []

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

        // 子弹超出边界删除
        this.removeMissile()
    }
    removeMissile() {
        for (let i = 0; i < this.missiles.length; i++) {
            var e = this.missiles[i]
            if(e.y <= 0) {
                this.missiles.splice(i, 1)
            }
        }
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

            // 把子弹类添加给子弹数组(用于和敌机做矩形碰撞)
            this.missiles.push(m)
        }
    }
}
