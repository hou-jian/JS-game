class Yun extends GuaImage {
    constructor(game) {
        // 随机云种类 
        var n = rnd(1, 5)
        super(game, 'yun' + n) 
        this.setup()
    }
    setup() {
        // log('texture', this.texture)
        // 随机云
        // this.texture = this.game.textureByName('yun' + rnd(1, 5)) 图片宽高有点问题先注释
        this.x = rnd(0, this.canvasW - 50)
        this.y = -50
        this.speed = 1
    }
    update() {
        this.y += this.speed
        if(this.y > this.canvasH) {
            this.setup()
        }
        
    }
    
}
