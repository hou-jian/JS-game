class GuaLabel {
    constructor(game, text) {
        this.game = game
        this.text = text
        this.canvasW = game.canvas.width
        this.canvasH = game.canvas.height
    }
    draw() {
        this.game.context.fillStyle = '#79bce7'
        this.game.context.fillRect(0, 0, this.canvasW, this.canvasH)
        

        // // 绘制文本
        this.game.context.fillStyle = '#000'
        this.game.context.fillText(this.text, 200, 350)
    }
    update() {

    }
}