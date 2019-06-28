var e = function(selector) {
    return document.querySelector(selector)
}

var es = function(selector) {
    return document.querySelectorAll(selector)
}

var bindEvent = function(element, event, callback) {
    element.addEventListener(event, callback)
}

var log = console.log.bind(console)

var rnd = function(start, end) {
    return Math.floor(Math.random() * (end - start) + start)
}
// 事件节流函数
var throttle = function(fn, gapTime) {
    var _lastTime = null
    return function() {
        var context = this
        var args = arguments
        var _nowTime = + new Date()
        if(_nowTime - _lastTime > gapTime || !_lastTime) {
            fn.apply(context, args)
            _lastTime = _nowTime
        }
    }
}