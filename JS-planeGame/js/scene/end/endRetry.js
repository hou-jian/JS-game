class EndRetry extends GuaImage {
    constructor(game, endBgY) {
        // 默认加载第一张重玩图片
        super(game, 'retry1')
        this.x = (this.canvasW - this.w) / 2
        this.y = endBgY - (this.h / 2)
    }
    
    update() {
        
    }
    toggleTexture(boole) {
        if(boole) {
            this.texture =  this.game.textureByName('retry2')
        } else {
            this.texture =  this.game.textureByName('retry1')
        }
    }
    
}