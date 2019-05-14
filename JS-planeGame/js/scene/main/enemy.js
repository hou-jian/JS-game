class Enemy extends GuaImage {
    constructor(game, player) {
        super(game, 'enemy' + rnd(1, 5))
        this.player = player

        this.setup()
    }

    setup() {
        this.x = rnd(0, this.canvasW - 50)
        this.y = -100
        this.speed = rnd(1, 5)
    }

    update() {
        // 敌机移动
        this.y += this.speed
        if(this.y > this.canvasH) {
            // 重置并随机敌机参数
            this.resetParameters()
        }

        // 子弹与敌机碰撞检查
        this.missileAndEnemy_Detection()

        // 英雄机与敌机碰撞，游戏结束
        this.playerAndEnemy_Detection()
    }
    missileAndEnemy_Detection() {
        // 子弹与敌机碰撞检查
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
    }
    playerAndEnemy_Detection() {
        // 英雄机和敌机碰撞检查
        var a = this.rectCollisionDetection(this.player)
        if(a) {
            // log('撞到了')
            // 添加英雄机爆炸动画
            var animation = new GuaAnimation(this.game, 'explode', 9, this.player.x, this.player.y)
            this.scene.addElement(animation)
            // 删除英雄机
            this.player.scene.removeThing(this.player)
          
        }
    }
    resetParameters() {
        // 重置敌机参数
        this.setup()
        var name = 'enemy' + rnd(1, 5)
        this.texture = this.game.textureByName(name)
        this.w = this.texture.width / this.scale
        this.h = this.texture.height / this.scale
    }
    rectCollisionDetection = function(rect) {
        // 矩形碰撞检查
        return this.x < rect.x + rect.w &&
            this.x + this.w > rect.x &&
            this.y < rect.y + rect.h &&
            this.h + this.y > rect.y
    }

}
