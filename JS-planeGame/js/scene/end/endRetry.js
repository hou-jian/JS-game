class EndRetry extends GuaImage {
    constructor(game, endBgY) {
        // 默认加载第一张重玩图片
        super(game, 'retry1')
        this.x = (this.canvasW - this.w) / 2
        this.y = endBgY - (this.h / 2)
    }
    
    update() {
        
    }
    // 根据布尔值切换按钮图片
    toggleTexture(boole) {
        if(boole) {
            this.texture =  this.game.textureByName('retry2')
            this.game.canvas.style.cursor = 'pointer'
        } else {
            this.texture =  this.game.textureByName('retry1')
            this.game.canvas.style.cursor = 'default'
        }
    }
    
}