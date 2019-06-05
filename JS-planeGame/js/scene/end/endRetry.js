class EndRetry extends GuaImage {
    constructor(game, endBgY) {        
        super(game, 'retry')
        this.x = (this.canvasW - this.w) / 2
        this.y = endBgY - (this.h / 2)
    }
    
    update() {
        

    }
 
    
}