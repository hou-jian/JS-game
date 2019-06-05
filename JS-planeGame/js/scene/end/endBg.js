class EndBg extends GuaImage {
    constructor(game) {        
        super(game, 'end_bg') 
        this.x = (this.canvasW - this.w) / 2
        this.y = (this.canvasH - this.h) / 2
    }
    update() {
        
    }
}