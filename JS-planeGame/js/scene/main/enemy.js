class Enemy extends GuaImage {
    constructor(game) { 
        var n = rnd(1, 6)
        super(game, 'enemy' + n)
        this.setup()
    }
    setup() {
        this.x = rnd(0, this.canvasW - 50)
        this.y = 0
        this.speed = rnd(1, 5)
    }
    update() {
        // 移动敌机
        this.y += this.speed
        if(this.y > this.canvasH) {
            this.setup()
        }
        
    }
    
}
