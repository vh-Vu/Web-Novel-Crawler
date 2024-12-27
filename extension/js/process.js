chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "updateProgress") {
        const statusElement = document.getElementById("status");
        const progressBarElement = document.getElementById("progress-bar");

        statusElement.textContent = message.message;
        if (message.progress !== undefined) {
            progressBarElement.style.width = message.progress + "%";
        }
    }
});