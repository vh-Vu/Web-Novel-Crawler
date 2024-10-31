document.addEventListener('DOMContentLoaded', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let currentTab = tabs[0];
        let currentUrl = currentTab.url;
        document.getElementById('url').innerHTML = currentUrl;
    });
});