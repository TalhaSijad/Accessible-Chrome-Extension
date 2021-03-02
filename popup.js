$(document).ready(function() {
  // If there is a Cookie stored for Dark Mode.
  if (!!Cookies.get('Dark-Mode-for-Accessibility-Assistant', 'Enabled')) {
    // Toggle the dark attribute against the body tag to trigger the CSS.
    document.body.classList.toggle('dark');
  }
});

function toggleDarkMode() {
  if (!!Cookies.get('Dark-Mode-for-Accessibility-Assistant', 'Enabled')) {
    Cookies.remove('Dark-Mode-for-Accessibility-Assistant');
  } else {
    Cookies.set('Dark-Mode-for-Accessibility-Assistant', 'Enabled')
  }

  location.reload();
}

function toggleElementHighlight(opt) {
  if (opt === 1) {
    var inputs = document.getElementsByTagName('input');

    for (i = 0; i < inputs.length; i++) {
        inputs[i].setAttribute("style", "border: 3px solid green");
    }  
  } else {
    var buttons = document.getElementsByTagName('button');

    for (i = 0; i < buttons.length; i++) {
        buttons[i].setAttribute("style", "border: 3px solid red");
    }  
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // Dark Mode:
  var toggleDarkModeBtn = document.getElementById('toggleDarkMode');

  toggleDarkModeBtn.addEventListener('click', function() {
    chrome.tabs.getSelected(null, function(tab) {
      chrome.tabs.executeScript({
        code: '('  + toggleDarkMode + ')()'
      });
    });
  }, false);

  // Highlighting Elements:
  var highlightElementPicker = document.getElementById('highlightElementPicker');

  highlightElementPicker.addEventListener('change', function() {
    let opt = $('#highlightElementPicker').find(":selected").val()

    chrome.tabs.getSelected(null, function(tab) {
      chrome.tabs.executeScript({
        code: '('  + toggleElementHighlight + ')(' + opt + ')'
      });
    });
  }, false);

  // Reset Button:
  var resetElementPicker = document.getElementById('resetElements');

  resetElementPicker.addEventListener('click', function() {
    chrome.tabs.getSelected(null, function(tab) {
      chrome.tabs.executeScript({
        code: 'location.reload()'
      });
    });
  }, false);
}, false);

// Screen Reader:
$(document).keyup(function(e) {
  speechSynthesis.cancel();
  let element = '';

  // If the button pressed is the Tab key.
  if (e.key == 'Tab') {
    if ($(e.target).attr('aria-label')) {
      element += $(e.target).attr('aria-label');
    } else if ($('label[for="' + $(e.target).attr('id') + '"]').text() != "") {
      element += ". " + $('label[for="' + $(e.target).attr('id') + '"]').text();
    } else {
      element += $(e.target).text();
    }

    if ($(e.target)[0].nodeName == "A") {
      element += ". Link";
    } else if ($(e.target)[0].nodeName == "INPUT") {
      element += ". Input";
    } else if ($(e.target)[0].nodeName == "BUTTON" || $(e.target).attr('role') == 'button') {
      element += ". Button";
    }

    let readElement = new SpeechSynthesisUtterance(element);
    window.speechSynthesis.speak(readElement);
  }
});