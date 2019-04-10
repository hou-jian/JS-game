// 用来批量处理[飞机、云、文字...]
class GuaScene {
    constructor(game) {
        this.game = game
        this.elements = []
    }
    addElement(thing) {
        // 这个scene属性是game类所需的
        thing.scene = this
        this.elements.push(thing)
    }
    draw() {
        // 批量绘制到页面(绘制啥由自身决定)
        for(var e of this.elements) {
            e.draw()
        }
    }
    removeThing(_this) {
        // 删除东西(飞机、敌机、子弹...)
        var i = this.elements.indexOf(_this)
        this.elements.splice(i, 1)
    }
    delParticleSystem() {
        this.elements.forEach((e, index) => {
            // 爆炸持续时间结束，删除它
            if(e.duration <= 0) {
                this.elements.splice(index, 1)
            }
        })
    }
    update() {
        // log('gua', this.elements)
        // 批量更新数据(更新的数据由自身决定)
        for(var e of this.elements) {
            e.update(this.game)
        }
        // 持续帧数结束后，自动删掉飞机爆炸颗粒
        this.delParticleSystem()
    }

}