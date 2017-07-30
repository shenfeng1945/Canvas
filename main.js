
let canvas = document.querySelector('.myCanvas')
let { clientWidth, clientHeight } = document.documentElement
let navWidth = document.getElementsByClassName('nav')[0].clientWidth
canvas.width = clientWidth - navWidth
canvas.height = clientHeight
//应该可以只要一个空对象
let prePoint = {}
let preTriPoint = {}
let preSquPoint = {}
let preCirPoint = {}
$('.nav').on('click', '.point', function (e) {
    let $div = $(e.currentTarget)
    $('.nav .point').removeClass('active')
    $div.addClass('active')
})
$('.line').on('click', 'div', function (e) {
    let $div = $(e.currentTarget)
    $div.addClass('active').siblings('.active').removeClass('active')
})
//页面加载成功即可画画
$(window).on('load', draw)
$('.tools > .draw').on('click', draw)
$('.tools > .eraser').on('click', eraser)
$('.tools > .clear').on('click', clear)
$('.shapes > .triangle').on('click', triangle)
$('.shapes > .squareness').on('click', square)
$('.shapes > .circle').on('click', circle)
$('.line').on('click', 'div', lineWidth)
$('.color > ul').on('click', 'li', strokeStyle)
let result = 1
let colorResult = 'black'

//下载
download.addEventListener('click',function(){
   downloadCanvas(this,canvas,'test.png')
})
function downloadCanvas(link,canvas,filename){
    link.href = canvas.toDataURL()
    link.download = filename
}
//预览
$('.download .preview').on('click', function () {
    var data = canvas.toDataURL("image/png");
    var newWindow = window.open('about:blank', 'image from canvas');
    newWindow.document.write("<img src='" + data + "' alt='from canvas'/>");
})
//轮廓颜色
function strokeStyle(e) {
    let $li = $(e.currentTarget)
    let index = $li.index()
    colorResult = $li.data('value')
    $li.addClass('active').siblings('.active').removeClass('active')
}
//画笔宽度
function lineWidth(e) {
    let $div = $(e.currentTarget)
    let index = $div.index()
    //因为第一个div前有个p标签，所以其index为1
    if (index === 1) {
        result = 1
    } else if (index === 2) {
        result = 2
    } else if (index === 3) {
        result = 3
    }
    return result
}


//绘图
function draw(e) {
    off()
    $('.myCanvas').on('mousedown', preDrawLine)
    $('.myCanvas').on('mouseup', function () {
        $('.myCanvas').off('mousemove', drawLine)
        prePoint = null
    })
}
function preDrawLine() {
    $('.myCanvas').on('mousemove', drawLine)
}
function drawLine(e) {
    let drawX = e.offsetX
    let drawY = e.offsetY + 5
    if (prePoint) {
        if (canvas.getContext) {
            let context = canvas.getContext('2d')
            context.beginPath()
            context.strokeStyle = colorResult
            context.lineWidth = result
            context.moveTo(prePoint.preX, prePoint.preY)
            context.lineTo(drawX, drawY)
            context.stroke()
        }
    }
    prePoint = { 'preX': drawX, 'preY': drawY }
}

//橡皮檫
function eraser() {
    off()
    $('.myCanvas').on('mousedown', preEraser)
    $('.myCanvas').on('mouseup', function () {
        $('.myCanvas').off('mousedown', preEraser)
    })
}
function preEraser() {
    $('.myCanvas').on('mousemove', clearParts)
}
function clearParts(e) {
    let eraserX = e.offsetX
    let eraserY = e.offsetY + 5
    if (canvas.getContext) {
        let context = canvas.getContext('2d')
        context.clearRect(eraserX - result * 5, eraserY - result * 5, result * 10, result * 10)
    }
}
//清空
function clear() {
    off()
    if (canvas.getContext) {
        let context = canvas.getContext('2d')
        context.clearRect(0, 0, canvas.width, canvas.height)
    }
}
//三角形
function triangle() {
    off()
    $('.myCanvas').on('mousedown', preTriangle)
    $('.myCanvas').on('mouseup', appearTriangle)
}
function preTriangle(e) {
    let preTriX = e.offsetX
    let preTriY = e.offsetY + 5
    preTriPoint = { preTriX, preTriY }
}
function appearTriangle(e) {
    let appearTriX = e.offsetX
    let appearTriY = e.offsetY + 5
    if (canvas.getContext) {
        let context = canvas.getContext('2d')
        context.beginPath()
        context.lineWidth = result
        context.strokeStyle = colorResult
        context.moveTo(preTriPoint.preTriX, preTriPoint.preTriY)
        context.lineTo(appearTriX, preTriPoint.preTriY)
        context.lineTo(appearTriX, appearTriY)
        context.lineTo(preTriPoint.preTriX, preTriPoint.preTriY)
        context.stroke()
    }
    preTriPoint = null
}
//矩形
function square() {
    off()
    $('.myCanvas').on('mousedown', preSquare)
    $('.myCanvas').on('mouseup', appearSquare)
}
function preSquare(e) {
    let preSquX = e.offsetX
    let preSquY = e.offsetY + 5
    preSquPoint = { preSquX, preSquY }
}
function appearSquare(e) {
    let appearX = e.offsetX
    let appearY = e.offsetY + 6
    if (canvas.getContext) {
        let context = canvas.getContext('2d')
        context.beginPath()
        context.lineWidth = result
        context.strokeStyle = colorResult
        context.moveTo(preSquPoint.preSquX, preSquPoint.preSquY)
        context.lineTo(appearX, preSquPoint.preSquY)
        context.lineTo(appearX, appearY)
        context.lineTo(preSquPoint.preSquX, appearY)
        context.lineTo(preSquPoint.preSquX, preSquPoint.preSquY)
        context.stroke()
    }
    preSquPoint = null
}
//圆形
function circle() {
    off()
    $('.myCanvas').on('mousedown', preCircle)
    $('.myCanvas').on('mouseup', appearCircle)
}
function preCircle(e) {
    let preCirX = e.offsetX
    let preCirY = e.offsetY + 5
    preCirPoint = { preCirX, preCirY }
}
function appearCircle(e) {
    let appearX = e.offsetX
    let appearY = e.offsetY + 5
    let distanceX = appearX - preCirPoint.preCirX
    let distanceY = appearY - preCirPoint.preCirY
    if (canvas.getContext) {
        let context = canvas.getContext('2d')
        context.beginPath()
        context.linewidth = result
        context.strokeStyle = colorResult
        context.arc(preCirPoint.preCirX, preCirPoint.preCirY, Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2)), 0, Math.PI * 2, true)
        context.stroke()
    }
    preCirPoint = null
}

function off() {
    //取消绘画
    $('.myCanvas').off('mousedown', preDrawLine)
    $('.myCanvas').off('mousemove', drawLine)
    //取消橡皮檫
    $('.myCanvas').off('mousedown', preEraser)
    $('.myCanvas').off('mousemove', clearParts)
    //取消三角形
    $('.myCanvas').off('mousedown', preTriangle)
    $('.myCanvas').off('mouseup', appearTriangle)
    //取消矩形
    $('.myCanvas').off('mousedown', preSquare)
    $('.myCanvas').off('mouseup', appearSquare)
    //取消圆形
    $('.myCanvas').off('mousedown', preCircle)
    $('.myCanvas').off('mouseup', appearCircle)
}
