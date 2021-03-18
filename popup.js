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
    Cookies.set('Dark-Mode-for-Accessibility-Assistant', 'Enabled');
  }

  location.reload();
}

function toggleElementHighlight(opt) {
  if (opt === 1) {
    var inputs = document.getElementsByTagName('input');

    for (i = 0; i < inputs.length; i++) {
      inputs[i].setAttribute("style", "border: 3px solid green");
    }  
  } else if (opt == 2) {
    var buttons = document.getElementsByTagName('button');

    for (i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute("style", "border: 3px solid red");
    }  
  } else {
    var links = document.getElementsByTagName('a');

    for (i = 0; i < links.length; i++) {
      links[i].setAttribute("style", "border: 3px solid blue");
    }
  }
}

function toggleScreenReaderStatus() {
  let status = ''

  if (!!Cookies.get('Screen-Reader-for-Accessibility-Assistant', 'Enabled')) {
    Cookies.remove('Screen-Reader-for-Accessibility-Assistant');
    status = "Screen reader for accessibility assistant is now disabled."
  } else {
    Cookies.set('Screen-Reader-for-Accessibility-Assistant', 'Enabled')
    status = "Screen reader for accessibility assistant is now enabled."
  }

  let announceStatus = new SpeechSynthesisUtterance(status);
  window.speechSynthesis.speak(announceStatus);

  location.reload();
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

  // Toggle Screen Reader Button:
  var toggleScreenReader = document.getElementById('toggleScreenReader');

  toggleScreenReader.addEventListener('click', function() {
    chrome.tabs.getSelected(null, function(tab) {
      chrome.tabs.executeScript({
        code: '('  + toggleScreenReaderStatus + ')()'
      });
    });
  }, false);
}, false);

// document.addEventListener("visibilitychange", function() {
//   if (document.visibilityState === 'visible') {
//     console.log("hello?")
//     let title = new SpeechSynthesisUtterance("loaded mate");
//     window.speechSynthesis.speak(title);
//   }
// });

// function handleVisibilityChange() {
//   if(document.hidden) {
//     // the page is hidden
//   } else {
//     readPageTitle();
//   }
// }

// $("#tabs").tabs({
//   select: function(event, ui) {
//       alert("PRESSED TAB!");
//   }
// });

// document.addEventListener("visibilitychange", handleVisibilityChange, false);

function readPageTitle() {
  speechSynthesis.cancel();
  let title = new SpeechSynthesisUtterance(document.title);
  window.speechSynthesis.speak(title);
}

// Screen Reader:
$(document).keyup(function(e) {
  speechSynthesis.cancel();
  let element = '';

  // If the user has the Screen Reader enabled.
  if (!!Cookies.get('Screen-Reader-for-Accessibility-Assistant', 'Enabled')) {
    // If the button pressed is the Tab key, or Shift+Tab.
    if (e.key == 'Tab') {
      // Highlight the current element.
      $(e.target).css('box-shadow', '0 0 5px 5px #ffcb3d');

      // Remove the highlight after 1 second.
      setTimeout(function () {
        $(e.target).css('box-shadow', '');
      }, 1000);

      // The following checks are for parent tags.
      if ($(e.target).parents('nav').length) {
        element += "Navigation. ";
      } else if ($(e.target).parents('li').length) {
        element += "List item. ";
      } else if ($(e.target).parents('h1').length) {
        element += "Heading 1. ";
      } else if ($(e.target).parents('h2').length) {
        element += "Heading 2. ";
      } else if ($(e.target).parents('h3').length) {
        element += "Heading 3. ";
      } else if ($(e.target).parents('h4').length) {
        element += "Heading 4. ";
      } else if ($(e.target).parents('h5').length) {
        element += "Heading 5. ";
      } else if ($(e.target).parents('h6').length) {
        element += "Heading 6. ";
      }

      if ($(e.target).attr('aria-label')) {
        element += $(e.target).attr('aria-label');
      } else if ($(e.target).attr('title')) {
        element += $(e.target).attr('title');
      } else if ($('label[for="' + $(e.target).attr('id') + '"]').text()) {
        element += $('label[for="' + $(e.target).attr('id') + '"]').text();
      } else if ($(e.target).attr('alt')) {
        element += $(e.target).attr('alt');
      } else if ($(e.target).children("img").attr('alt')) {
        element += $(e.target).children("img").attr('alt');
      } else {
        element += $(e.target).text();
      }

      if ($(e.target).attr('placeholder')) {
        element += " with hint " + $(e.target).attr('placeholder');
      } else if ($(e.target).attr('aria-expanded')) {
        if ($(e.target).attr('aria-expanded') == "true") {
          element += ". Collapsible with state collapsed";
        } else {
          element += ". Collapsible with state uncollapsed";
        }
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
    } else if (e.key == "ArrowUp" || e.key == "ArrowDown") {
      console.log($(e.target)[0].value)  // ToDo
    }
  }

  if (e.ctrlKey && (e.key == "q")) {
    toggleScreenReaderStatus();
  }
});