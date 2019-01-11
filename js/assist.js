var e = function(selector) {
    return document.querySelector(selector)
}

var es = function(selector) {
    return document.querySelectorAll(selector)
}
var bindEvent = function(element, event, callback) {
    element.addEventListener(event, callback)
}

var imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}

