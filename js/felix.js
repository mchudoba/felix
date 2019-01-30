var DEFAULT_REFRESH_RATE_MILLIS = 500;
var running = true;

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

function stream() {
    if (!running) {
        return;
    }

    felix();

    var refreshRateMillis = getRefreshRateMillis();
    setTimeout(stream, refreshRateMillis);
}

function getRefreshRateMillis() {
    var refreshRateMillis = DEFAULT_REFRESH_RATE_MILLIS;

    var urlParams = new URLSearchParams(window.location.search);
    var rateParam = urlParams.get('rate');
    if (!!rateParam) {
        refreshRateMillis = rateParam;
    }

    $('#refreshRate').text(refreshRateMillis);

    return refreshRateMillis;
}

function toggleTheme() {
    if (this.value === 'dark') {
        $('.wrapper').addClass('dark');
        $('.wrapper').removeClass('light');
    } else if (this.value === 'light') {
        $('.wrapper').addClass('light');
        $('.wrapper').removeClass('dark');
    }
}

function playPause() {
    if (this.value === 'play') {
        running = true;
        stream();
    } else if (this.value === 'pause') {
        running = false;
    }
}

$(function () {
    stream();
    $('input[name="theme"]').change(toggleTheme);
    $('input[name="playback"]').change(playPause);
});
