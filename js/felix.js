var DEFAULT_REFRESH_RATE_MILLIS = 1000;
var running = true;
var refreshRateMillis = DEFAULT_REFRESH_RATE_MILLIS;

var SMALL_ROOM = {
    host: 'http://69.38.192.54:83',
    path: '/cgi-bin/CGIProxy.fcgi',
    cmdParam: '?cmd=snapPicture2',
    userParam: '&usr=small',
    passwordParam: '&pwd=Armstrong'
};

var TINY_ROOM = {
    host: 'http://69.38.192.54:99',
    path: '/cgi-bin/CGIProxy.fcgi',
    cmdParam: '?cmd=snapPicture2',
    userParam: '&usr=tiny',
    passwordParam: '&pwd=Pippen'
};

function generateImageUrl(camera, timeStamp) {
    var url =
        camera.host
        + camera.path
        + camera.cmdParam
        + camera.userParam
        + camera.passwordParam;

    url += '&t=' + timeStamp;

    return url;
}

function felix() {
    var target = document.getElementById('felix');

    var time = new Date();
    time.setSeconds(time.getSeconds() - 30);
    time = time.getTime();

    target.src = generateImageUrl(SMALL_ROOM, time);
}

function stream() {
    if (!running) {
        return;
    }

    felix();
    setTimeout(stream, refreshRateMillis);
}

function updateRefreshRate() {
    var newRate = Number(this.value);
    if (Number.isInteger(newRate)) {
        console.log(newRate);
        refreshRateMillis = newRate;
    }
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

    $('#refreshRate').val(refreshRateMillis);
    $('#refreshRate').blur(updateRefreshRate);
});
