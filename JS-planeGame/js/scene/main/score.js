class Score {
    constructor(game) {
        this.game = game
    }
    draw() {
        // // 绘制文本
        this.game.context.font="20px sans-serif"
        this.game.context.fillStyle = '#555'
        this.game.context.fillText(`Score: ${this.game.score}`, 20, 40)
    }
    update() {

    }
}