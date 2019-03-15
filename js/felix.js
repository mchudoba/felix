var DEFAULT_REFRESH_RATE_MILLIS = 1000;
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

var running = true;
var refreshRateMillis = DEFAULT_REFRESH_RATE_MILLIS;
var currentCamera = SMALL_ROOM;

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

    target.src = generateImageUrl(currentCamera, time);
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

function toggleCamera() {
    if (this.value === 'small') {
        currentCamera = SMALL_ROOM;
    } else if (this.value === 'tiny') {
        currentCamera = TINY_ROOM;
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
    $('input[name="camera"]').change(toggleCamera);
    $('input[name="playback"]').change(playPause);

    $('#refreshRate').val(refreshRateMillis);
    $('#refreshRate').blur(updateRefreshRate);
});
