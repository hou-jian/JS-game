class GuaScene {
    constructor(game) {
        this.game = game
        this.elements = []
    }
    addElement(img) {
        this.elements.push(img)
    }
    draw() {
        for (let i = 0; i < this.elements.length; i++) {
            var e = this.elements[i]
            this.game.drawImage(e)
        }
    }
    update() {
        for (let i = 0; i < this.elements.length; i++) {
            var e = this.elements[i]
            e.update(this.game)
        }
    }
}