class Yun extends GuaImage {
    constructor(game) {
        // 随机云种类 
        super(game, 'yun' + rnd(1, 5)) 
        this.setup()
    }
    setup() {        
        this.x = rnd(0, this.canvasW - this.w)
        this.y = -50
        this.speed = 1
    }
    update() {
        this.y += this.speed
        // 过界重置参数
        if(this.y > this.canvasH) {
            this.resetParameters()
        }
    }
    resetParameters() {
        this.setup()
        var name = 'yun' + rnd(1, 5)
        this.texture = this.game.textureByName(name)
        this.w = this.texture.width / this.scale
        this.h = this.texture.height / this.scale
    }
    
}
