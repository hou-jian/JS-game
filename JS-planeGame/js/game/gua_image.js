class GuaImage {
    constructor(game, name) {
        this.game = game
        this.texture = game.textureByName(name)
        this.x = 0
        this.y = 0
        // 算出缩放比例
        var scale = 720 / game.canvas.width
        this.canvasW = game.canvas.width
        this.canvasH = game.canvas.height
        this.w = this.texture.width / scale
        this.h = this.texture.height / scale
    }
    draw() {
        // game类中的方法，用于绘制图片
        this.game.drawImage(this)
    }

    update() {

    }
}