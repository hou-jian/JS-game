class Enemy extends GuaImage {
    constructor(game, player) {
        super(game, 'enemy' + rnd(1, 5))
        this.player = player

        this.setup()
    }

    setup() {
        this.x = rnd(0, this.canvasW - 50)
        this.y = -30
        this.speed = rnd(1, 5)
    }

    update() {
        // log('player中的子弹', this.player.missiles)

        // 移动敌机
        this.y += this.speed
        if(this.y > this.canvasH) {
            // 重置并随机敌机参数
            this.resetParameters()
        }
        // 检查子弹与飞机矩形碰撞，重置敌机参数参数

        var ms = this.player.missiles
        if(ms.length > 0) {
            // log('this.player.missiles', this.player.missiles)
            for(let i = 0; i < ms.length; i++) {
                var a = this.rectCollisionDetection(ms[i])
                if(a) {
                    // 生成爆炸特效
                    var p = new GuaParticleSystem(this.game, ms[i].x, ms[i].y)
                    this.scene.addElement(p)
                    ms[i].kill()
                    ms.splice(i, 1)
                    this.resetParameters()

                }
            }
        }

        // var a = this.rectCollisionDetection(this.player)
        // log(this.missile)
        // this.missileY += this.missile.speed
    }
    resetParameters() {
        this.setup()
        var name = 'enemy' + rnd(1, 5)
        this.texture = this.game.textureByName(name)
        this.w = this.texture.width / this.scale
        this.h = this.texture.height / this.scale
    }
    rectCollisionDetection = function(missile) {

        return this.x < missile.x + missile.w &&
            this.x + this.w > missile.x &&
            this.y < missile.y + missile.h &&
            this.h + this.y > missile.y
    }

}
