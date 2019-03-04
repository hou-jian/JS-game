class Player extends GuaImage {
    constructor(game) { 
        super(game, 'player')
        this.x = 100
        this.y = 200
        this.speed = 8
    }
    update(g) {
        // 移动飞机hero
        g.registerAction('a', () => {
            this.moveLeft()
        })
        g.registerAction('d', () => {
            this.moveRight()
        })
        g.registerAction('w', () => {
            this.moveUp()
        })
        g.registerAction('s', () => {
            this.moveDown()
        })
    }
    moveLeft() {
        this.x -= this.speed
    }
    moveRight() {
        this.x += this.speed
    }
    moveUp() {
        this.y -= this.speed
    }
    moveDown() {
        this.y += this.speed
    }

}
