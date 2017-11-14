var obj = {}
!function () {
    var value = '#000000'
    Object.defineProperty(obj, 'value', {
        get: function () { return value },
        set: function (xx) {
            value = xx
            render()
        }
    })
}()
function render() {
    inputColor.value = obj.value
}
render()
$('#inputColor').on('input', function (e) {
    let value = $('#inputColor').val()
    obj.value = value
})
window.addEventListener('beforeunload',function(e){
    e.returnValue = '您可能有数据未保存'
})

