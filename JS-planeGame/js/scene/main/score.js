class Score {
    constructor(game) {
        this.game = game
    }
    draw() {
        // // 绘制文本
        
        this.game.context.font="20px Arial"
        this.game.context.fillStyle = '#555'
        this.game.context.fillText(`分数: ${this.game.score}`, 20, 40)
    }
    update() {

    }
}