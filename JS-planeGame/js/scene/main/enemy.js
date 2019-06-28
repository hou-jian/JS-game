class Enemy extends GuaImage {
    constructor(game, player) {
        super(game, 'enemy' + rnd(1, 6))
        this.player = player
        this.end = null
        this.setup()
    }

    setup() {
        this.x = rnd(0, this.canvasW - 50)
        this.y = -100
        this.speed = rnd(2, 6)
        // 多少帧切换一次图片(实现动画)
        this.count = 8
        this.index = 1 //图片切换下标
        // 保存用于切换图片，实现动画
        this.enemys = []
        this.enemys.push(this.game.textureByName(this.name))
        this.enemys.push(this.game.textureByName(this.name + '_2'))
    }

    update() {
       
        // 控制多少帧切换一次图片(实现动画)
        this.count--
        if(this.count <= 0) {
            this.count = 8
            this.texture = this.enemys[this.index]
            this.index = (this.index + 1) % this.enemys.length
        }
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
    // 子弹与敌机碰撞检查
    missileAndEnemy_Detection() {
        var ms = this.player.missiles
        if(ms.length > 0) {
            for(let i = 0; i < ms.length; i++) {
                var a = this.rectCollisionDetection(ms[i])
                // a为true,即敌机与子弹相撞
                if(a) {
                    // 生成爆炸特效
                    var p = new GuaParticleSystem(this.game, ms[i].x, ms[i].y)
                    this.scene.addElement(p)
                    // 该发生碰撞的子弹类删除自身
                    ms[i].kill()
                    // player(英雄机)类中保存的子弹类(用于检查碰撞)，同样需要删除
                    ms.splice(i, 1)
                    // 重置参数
                    this.resetParameters()
                    // 分数+10
                    this.game.score += 10
                }
            }
        }
    }
    // 英雄机和敌机碰撞检查
    // 撞了切换场景到scene_end.js
    playerAndEnemy_Detection() {
        var a = this.rectCollisionDetection(this.player)
        // 撞到了a为true
        if(a) {
            var s = new SceneEnd(this.game, this.player.x, this.player.y)
            this.game.replaceScene(s)
        }
    }
    // 重置参数
    resetParameters() {
        // 添加一个新敌机类
        var e = new Enemy(this.game, this.player)
        // this.scene是在生成敌机类时挂上的(在gua_scene里)，以使用其方法
        this.scene.addElement(e)
        // 删除当前类自己
        this.scene.removeThing(this)
    }

    // 矩形碰撞检查
    rectCollisionDetection = function(rect) {
        return this.x < rect.x + rect.w &&
            this.x + this.w > rect.x &&
            this.y < rect.y + rect.h &&
            this.h + this.y > rect.y
    }

}
