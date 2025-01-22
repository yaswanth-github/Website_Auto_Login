// Default state
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ extensionEnabled: true });
  updateIcon(true);
});

// Update the browser action icon
function updateIcon(isEnabled) {
  const iconPath = isEnabled
      ? {
            128: "icons/logo-on-128.png"
        }
      : {
            128: "icons/logo-off-128.png"
        };

  chrome.browserAction.setIcon({ path: iconPath });
}

// Listen for toggle events from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "toggleExtension") {
      chrome.storage.local.get("extensionEnabled", (result) => {
          const newState = !result.extensionEnabled;
          chrome.storage.local.set({ extensionEnabled: newState });
          updateIcon(newState);
          sendResponse({ enabled: newState });
      });
      return true; // Required for async sendResponse
  }
});
