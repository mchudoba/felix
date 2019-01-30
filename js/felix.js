var DEFAULT_REFRESH_RATE_MILLIS = 500;

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

$(function () {
    var refreshRateMillis = getRefreshRateMillis();
    setInterval(felix, refreshRateMillis);

    $('input[name="theme"]').change(toggleTheme);
});
