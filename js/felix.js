function felix() {
    var target = document.getElementById('felix');
    var src = target.src;

    var time = new Date();
    time.setSeconds(time.getSeconds() - 30);
    time = time.getTime();

    var splitArray = src.split('&t=');
    if (splitArray.length === 1) {
        src = src + '&t=' + time;
    } else {
        src = splitArray[0] + '&t=' + time;
    }

    src += '&pwd=Armstrong';
    target.src = src;
}

$(function () {
    setInterval(felix, 500);

    $('input[name="theme"]').change(function() {
        if (this.value === 'dark') {
            $('.wrapper').css('background-color', '#2b2b2b');
        } else if (this.value === 'light') {
            $('.wrapper').css('background-color', '#ffffff');
        }
    });
});
