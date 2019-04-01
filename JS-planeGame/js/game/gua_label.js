class GuaLabel {
    constructor(game, text) {
        this.game = game
        this.text = text
    }
    draw() {
        // 绘制文本
        this.game.context.fillText(this.text, 100, 150)
    }
    update() {

    }
}