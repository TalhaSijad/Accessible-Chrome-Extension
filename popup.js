$(document).ready(function() {
  if (!!Cookies.get('Dark-Mode-for-Accessibility-Assistant', 'Enabled')) {
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

document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('toggleDarkMode');
  checkPageButton.addEventListener('click', function() {
    chrome.tabs.getSelected(null, function(tab) {
      chrome.tabs.executeScript({
        code: '('  + toggleDarkMode + ')()'
      });
    });
  }, false);
}, false);