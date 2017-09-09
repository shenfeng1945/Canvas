let canvas = document.querySelector('.myCanvas')
let { clientWidth, clientHeight } = document.documentElement
let navWidth = document.getElementsByClassName('nav')[0].clientWidth
canvas.width = clientWidth - navWidth
canvas.height = clientHeight
let prePoint = {}
let preShapePoint={}
let result = 1
let colorResult = 'black'
//页面加载成功即可画画
$(function () {
    draw()
    $('.tools > .draw').on('click', draw)
    $('.tools > .eraser').on('click', eraser)
    $('.tools > .clear').on('click', clear)
    $('.shapes > .triangle').on('click', triangle)
    $('.shapes > .squareness').on('click', square)
    $('.shapes > .circle').on('click', circle)
    $('.line').on('click', 'div', lineWidth)
    $('.color > ul').on('click', 'li', strokeStyle)
    $('.nav').on('click', '.point', toolAndShapeStyle)
    $('.line').on('click', 'div', lineStyle)
    $('#download').on('click',download)
    $('.preview').on('click',preview)
})
function lineStyle(e) {
    let $div = $(e.currentTarget)
    $div.addClass('active').siblings('.active').removeClass('active')
}
function toolAndShapeStyle(e) {
    let $div = $(e.currentTarget)
    $div.closest('.nav').find('.point').removeClass('active')
    $div.addClass('active')
}
//下载
function download(){
    downloadCanvas(this, canvas, 'test.png')
}
function downloadCanvas(link, canvas, filename) {
    link.href = canvas.toDataURL()
    link.download = filename
}
//预览
function preview(){
    var data = canvas.toDataURL("image/png");
    var newWindow = window.open('about:blank', 'image from canvas');
    newWindow.document.write("<img src='" + data + "' alt='from canvas'/>");
}
//轮廓颜色
function strokeStyle(e) {
    let $li = $(e.currentTarget)
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
function preRecord(e){
    let preX = e.offsetX
    let preY = e.offsetY + 5
    preShapePoint = { preX, preY }
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
    $('.myCanvas').on('mousedown', preRecord)
    $('.myCanvas').on('mouseup', appearTriangle)
}

function appearTriangle(e) {
    let appearTriX = e.offsetX
    let appearTriY = e.offsetY + 7
    if (canvas.getContext) {
        let context = canvas.getContext('2d')
        context.beginPath()
        context.lineWidth = result
        context.strokeStyle = colorResult
        context.moveTo(preShapePoint.preX, preShapePoint.preY)
        context.lineTo(appearTriX, preShapePoint.preY)
        context.lineTo(appearTriX, appearTriY)
        context.lineTo(preShapePoint.preX, preShapePoint.preY)
        context.stroke()
    }
    preShapePoint = null
}
//矩形
function square() {
    off()
    $('.myCanvas').on('mousedown', preRecord)
    $('.myCanvas').on('mouseup', appearSquare)
}
function appearSquare(e) {
    let appearX = e.offsetX
    let appearY = e.offsetY + 7
    if (canvas.getContext) {
        let context = canvas.getContext('2d')
        context.beginPath()
        context.lineWidth = result
        context.strokeStyle = colorResult
        context.moveTo(preShapePoint.preX, preShapePoint.preY)
        context.lineTo(appearX, preShapePoint.preY)
        context.lineTo(appearX, appearY)
        context.lineTo(preShapePoint.preX, appearY)
        context.lineTo(preShapePoint.preX, preShapePoint.preY)
        context.stroke()
    }
    preShapePoint = null
}
//圆形
function circle() {
    off()
    $('.myCanvas').on('mousedown', preRecord)
    $('.myCanvas').on('mouseup', appearCircle)
}
function appearCircle(e) {
    let appearX = e.offsetX
    let appearY = e.offsetY + 5
    let distanceX = appearX - preShapePoint.preX
    let distanceY = appearY - preShapePoint.preY
    if (canvas.getContext) {
        let context = canvas.getContext('2d')
        context.beginPath()
        context.linewidth = result
        context.strokeStyle = colorResult
        context.arc(preShapePoint.preX, preShapePoint.preY, Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2)), 0, Math.PI * 2, true)
        context.stroke()
    }
    preShapePoint = null
}

function off() {
    //取消绘画
    $('.myCanvas').off('mousedown', preDrawLine)
    $('.myCanvas').off('mousemove', drawLine)
    //取消橡皮檫
    $('.myCanvas').off('mousedown', preEraser)
    $('.myCanvas').off('mousemove', clearParts)
    //取消三角形
    $('.myCanvas').off('mousedown', preRecord)
    $('.myCanvas').off('mouseup', appearTriangle)
    //取消矩形
    // $('.myCanvas').off('mousedown', preRecord)
    $('.myCanvas').off('mouseup', appearSquare)
    //取消圆形
    // $('.myCanvas').off('mousedown', preRecord)
    $('.myCanvas').off('mouseup', appearCircle)
}
