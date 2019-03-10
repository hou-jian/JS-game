class GuaScene {
    constructor(game) {
        this.game = game
        this.elements = []
    }
    addElement(img) {
        img.scene = this
        // 添加图片到数组中
        this.elements.push(img)
    }
    draw() {
        // 批量绘制到页面
        for (let i = 0; i < this.elements.length; i++) {
            var e = this.elements[i]
            // drawImage是game类的方法,根据参数绘制
            this.game.drawImage(e)
        }
    }
    update() {
        // 批量更新数据
        for (let i = 0; i < this.elements.length; i++) {
            var e = this.elements[i]
            e.update(this.game)
        }
    }
}