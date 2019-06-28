class ScorePanel extends GuaImage {
    constructor(game) {        
        super(game, 'scorePanel') 
        this.x = (this.canvasW - this.w) / 2
        this.y = (this.canvasH - this.h) / 2
        this.score = this.game.score
    }
    draw() {
        super.draw()
        
        this.game.context.font = "40px sans-serif"
        this.game.context.fillStyle = '#555'
        var score = {}
        score.x = this.x + (this.w / 1.7)
        score.y = this.y + (this.h / 1.3)
        this.game.context.fillText(`${this.score}`, score.x, score.y)

    }
    update() {
        
    }
}