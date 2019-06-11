// 子弹类，它属于player类，为了方便写一起了
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
        // this.scene是在生成子弹类时挂上的(在gua_scene里)，以使用其方法
        this.scene.removeThing(this)
    }
}



class Player extends GuaImage {
    constructor(game) {
        super(game, 'player1')
        // 英雄机默认位置
        this.x = 100
        this.y = 200
        // 速度
        this.speed = config.player_speed
        // 子弹冷却
        this.cooldown = config.player_cooldown
        // 存放子弹类(用于与敌机碰撞检查)
        this.missiles = []

        // 多少帧切换一次英雄机图片(实现动画)
        this.count = 8
        this.players = []
        for(let i = 1; i <= 3; i++) {
            this.players.push(this.game.textureByName('player' + i))

        }
        this.index = 1 //控制动画帧
    }
    update(g) {
        // 这是为了动态设置英雄机速度加的
        this.speed = config.player_speed
        // 子弹冷却
        this.cooldown--

        // 英雄机动画
        this.count--
        if(this.count <= 0) {
            this.count = 8
            this.texture = this.players[this.index]
            this.index++
            this.index = this.index % this.players.length
        }
        // 移动飞机hero
        // a的 keyCode = 65
        g.registerAction('65', () => {
            this.moveLeft()
        })
        // d
        g.registerAction('68', () => {
            this.moveRight()
        })
        // w
        g.registerAction('87', () => {
            this.moveUp()
        })
        // s
        g.registerAction('83', () => {
            this.moveDown()
        })
        // j发射子弹
        g.registerAction('74', () => {
            this.fire()
        })
        // 预留自动发射子弹
        if(false) {
            this.fire()
        }
        // 子弹超出边界自己删除(删的是当前类中的子弹类)
        this.removeMissile()
    }
    removeMissile() {
        for(let i = 0; i < this.missiles.length; i++) {
            var e = this.missiles[i]
            if(e.y <= 0) {
                this.missiles.splice(i, 1)
            }
        }
    }
    moveLeft() {
        // 限制边界
        if(this.x <= 0) {
            return
        }
        this.x -= this.speed


    }
    moveRight() {
        // 限制边界
        if(this.x >= (this.game.canvas.width - this.w)) {
            return
        }
        this.x += this.speed
    }
    moveUp() {
        // 限制边界
        if(this.y <= 0) {
            return
        }
        this.y -= this.speed
    }
    moveDown() {
        // 限制边界
        if(this.y >= (this.game.canvas.height - this.h)) {
            return
        }
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
