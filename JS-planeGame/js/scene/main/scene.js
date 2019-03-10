class Scene extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
    }
    setup() {
        // 添加背景
        this.bg = new Bg(this.game)
        // addElement在父类,用于自动添加img等其他操作
        this.addElement(this.bg)

        // 添加云
        this.yun0 = new Yun(this.game)
        this.addElement(this.yun0)

        // 批量添加敌机
        this.NumberOfEnemies = 5
        this.enemies()

        // 添加玩家飞机
        this.player = new Player(this.game)
        this.addElement(this.player)
    }
    enemies() {
        // 用于添加所有敌机
        var es = []
        for (let i = 0; i < this.NumberOfEnemies; i++) {
            var e = new Enemy(this.game)            
            this.addElement(e)
            es.push(e)
        }
        this.enemies = es
    }
    update() {
        // 每帧更新父类的update()
        super.update()
    }
}