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
        this.setup()
        
    }
    setup() {
        // 英雄机默认位置
        this.x = (this.canvasW - this.w) / 2
        this.y = (this.canvasH - this.h) / 2
        // 速度
        this.speed = config.player_speed
        // 子弹冷却
        this.cooldown = config.player_cooldown
        // 存放子弹类(用于与敌机碰撞检查)
        this.missiles = []
        // 多少帧切换一次英雄机图片(实现动画)
        this.count = 6
        // 存放player图片
        this.players = []
        for(let i = 1; i <= 3; i++) {
            this.players.push(this.game.textureByName('player' + i))
        }
        this.index = 1 //控制e动画帧

        // -触摸切换
        // 是否按下鼠标
        this.mouseDownOrUp = false
        var canvas = this.game.canvas
        // 鼠标按下/抬起状态切换
        this.mouseDownOrUpToggle(canvas)
        // 控制是否计算鼠标与英雄机坐标偏移
        this.stateControl = true
        this.touchMod(canvas)
    }
    update() {
        // -为了动态设置参数,需要在这里多加几行
        // 速度
        this.speed = config.player_speed
        // 控制子弹冷却
        this.cooldown--

        // -英雄机动画
        this.playerAnimation()

        // -英雄机wasd控制移动
        this.playerMove()
        // -子弹超出边界删除
        // [删的是当前类(player)中的保存的子弹类(用于与敌机碰撞检查),
        // 子弹类自身也会删除自己，在missile类中查看]
        this.removeMissile()
        // -触摸/鼠标模式自动发射子弹
        if(this.mouseDownOrUp) {
            // 发射子弹
            this.fire()
        }
    }
    touchMod(canvas) {
        // 这里的计算量不大，为了顺畅没有用节流函数(可能会出现问题，待测试)
        canvas.addEventListener('mousemove', (event) => {
        
            // 当前光标坐标
            var x = event.offsetX
            var y = event.offsetY
            // 鼠标按住，才执行
            if(this.mouseDownOrUp) {
                // 只算一次坐标偏移值
                if(this.stateControl) {
                    this.offsetX = x - this.x
                    this.offsetY = y - this.y
                    this.stateControl = false
                }
                // 英雄机随鼠标移动
                this.x = x - this.offsetX
                this.y = y - this.offsetY
            }
            // 鼠标抬起了标记需要计算偏移
            if(!this.mouseDownOrUp) {
                this.stateControl = true
            }
        })
    }
    mouseDownOrUpToggle(canvas) {
        canvas.addEventListener('mousedown', () => {
            this.mouseDownOrUp = true
        })
        canvas.addEventListener('mouseup', () => {
            this.mouseDownOrUp = false
        })
    }

    playerAnimation() {
        this.count--
        if(this.count <= 0) {
            this.count = 6
            this.texture = this.players[this.index]
            this.index++
            this.index = this.index % this.players.length
        }
    }
    playerMove() {
        var g = this.game
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
