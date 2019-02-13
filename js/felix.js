var DEFAULT_REFRESH_RATE_MILLIS = 1000;
var running = true;
var refreshRateMillis = DEFAULT_REFRESH_RATE_MILLIS;

var host = 'http://69.38.192.54:83';
var path = '/cgi-bin/CGIProxy.fcgi';
var cmdParam = '?cmd=snapPicture2';
var userParam = '&usr=small';
var passwordParam = '&pwd=Armstrong';

function generateImageUrl(timeStamp) {
    var url = host + path + cmdParam + userParam + passwordParam;
    url += '&t=' + timeStamp;

    return url;
}

function felix() {
    var target = document.getElementById('felix');

    var time = new Date();
    time.setSeconds(time.getSeconds() - 30);
    time = time.getTime();

    target.src = generateImageUrl(time);
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
