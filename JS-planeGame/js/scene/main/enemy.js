class Enemy extends GuaImage {
    constructor(game, missile) {
        super(game, 'enemy' + rnd(1, 5))
        this.missile = missile
        
        this.setup()
    }

    setup() {
        this.x = rnd(0, this.canvasW - 50)
        this.y = -30
        this.speed = rnd(1, 5)
    }

    update() {
        // 移动敌机
        this.y += this.speed
        if(this.y > this.canvasH) {
            // 下面一堆操作，是为了随机飞机种类等参数
            this.setup()
            var name = 'enemy' + rnd(1, 5)
            this.texture = this.game.textureByName(name)
            this.w = this.texture.width / this.scale
            this.h = this.texture.height / this.scale
        }
        // 检查子弹与飞机矩形碰撞，重置敌机参数参数
        
        
        // var a = this.rectCollisionDetection(this.player)
        // log(this.player.missile)
        // this.missileY += this.player.missile.speed
    }
    rectCollisionDetection = function(player) {

        return this.x < player.missile.x + player.missile.w  &&
            this.x + this.w > player.missile.x &&
            this.y < this.missileY + player.missile.h &&
            this.h + this.y > this.missileY
    }

}
