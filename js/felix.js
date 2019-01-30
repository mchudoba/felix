function felix() {
    var target = document.getElementById('felix');
    var src = target.src;
    var timeNumber = Date.now();
    var splitArray = src.split('&t=');
    if (splitArray.length === 1) {
        src = src + '&t=' + timeNumber;
    }
    else {
        src = splitArray[0] + '&t=' + timeNumber;
    }

    src += '&pwd=Armstrong';
    target.src = src;
}

$(function () {
    setInterval(felix, 5000);
});
