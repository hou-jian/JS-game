class PlayButton extends GuaImage {
    constructor(game) {
        super(game, 'play1')
        this.x = (this.canvasW - this.w) / 2
        this.y = (this.canvasH - this.h) / 2
    }
    update() {

    }
    // 根据布尔值切换按钮图片
    toggleTexture(boole) {
        if(boole) {
            this.texture = this.game.textureByName('play2')
            this.game.canvas.style.cursor = 'pointer'
        } else {
            this.texture = this.game.textureByName('play1')
            this.game.canvas.style.cursor = 'default'
        }
    }
}