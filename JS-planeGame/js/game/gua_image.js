class GuaImage {
    constructor(game, name) {
        this.game = game
        this.texture = game.textureByName(name)
        this.x = 0
        this.y = 0
        this.canvasW = game.canvas.width
        this.canvasH = game.canvas.height
        // 对图片进行缩小
        var scale = 720 / this.canvasW
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