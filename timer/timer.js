var gIntervalThreeSeconds = 3000;
var gInterv1 = 5;
var gInterv2 = 3;
var gTimer;

function setupChromeNotify() {
  // request permission on page load
  /*  
    document.addEventListener('DOMContentLoaded', function () {
      if (Notification.permission !== 'granted') {
        Notification.requestPermission();
      }
    });
  */

  if (Notification.permission !== 'granted') {
    Notification.requestPermission();
  }
  debugger;
}

function StartTimer() {
  $('#btnTimer')
    .html('Stop');

  gTimer = setInterval(countDown.bind(null, '#timer1'), 1000);
}

function StopTimer() {
  $('#btnTimer')
    .html('Start');

  clearInterval(gTimer);
  gTimer = null;
  $('#timer1')
    .html(gInterv1);
  $('#timer2')
    .html(gInterv2);
}

function countDown(timerId) {
  var s = parseInt($(timerId)
    .text(), 10);
  if (s > 0) {
    $(timerId)
      .html(s - 1);
  } else { // s===0
    clearInterval(gTimer);
    gTimer = null;

    if (timerId === '#timer1') {
      //alert('Timer1 Out');
      chromeNotify('Timer, Timer1 Out');
      showOverlay('#ok1');
    } else {
      //alert('Timer2 Out');
      chromeNotify('Timer, Timer2 Out');
      showOverlay('#ok2');
    }
  }
}

function showOverlay(showButtonId) {
  $('#overlay')
    .show();
  $('#overlay button')
    .hide();

  $(showButtonId)
    .show()
    .focus();

}


/**
 * 使用 Web Notifications - Web APIs | MDN - https://goo.gl/e1m2BP
 * @param {any} title
 * @param {any} body
 */
function chromeNotify(title, body) {
  if (!Notification) {
    alert('Desktop notifications not available in your browser. Try Chromium.');
    return;
  }

  if (Notification.permission !== 'granted') {
    Notification.requestPermission();
  } else {
    var notification = new Notification(title, {
      // icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
      icon: 'https://raw.githubusercontent.com/arphen/arphen.user.js/master/img/outlook.png',
      body: body
    });

    notification.onshow = function () {
      setTimeout(function () {
        notification.close();
      }, gIntervalThreeSeconds); // close after 3 sec;
    };

    notification.onclick = function () {
      // window.open('http://stackoverflow.com/a/13328397/1269037')
      // switch to email tab
      // chrome.tabs - Google Chrome - https://goo.gl/ykUrga
      notification.close();
    };
  }
}

function main() {
  setupChromeNotify();

  StopTimer();

  $('#btnTimer')
    .on('click', function () {
      if ($(this)
        .html() === 'Start') {
        StartTimer();
      } else {
        StopTimer();
      }
    });

  $('#ok1')
    .on('click', function () {
      $('#overlay')
        .hide();
      gTimer = setInterval(countDown.bind(null, '#timer2'), 1000);
    });

  $('#ok2')
    .on('click', function () {
      $('#overlay')
        .hide();
      StopTimer();
      StartTimer();
    });

}
