// Fetch saved credentials and populate dropdown
chrome.storage.local.get(['credentials'], function (data) {
  const credentials = data.credentials || {};
  const userSelect = document.getElementById('userSelect');
  const siteSelect = document.getElementById('siteSelect');

  // Populate site dropdown
  Object.keys(credentials).forEach(site => {
      let option = document.createElement('option');
      option.value = site;
      option.textContent = site;
      siteSelect.appendChild(option);
  });

  // Update users for selected site
  siteSelect.addEventListener('change', function () {
      const site = siteSelect.value;
      userSelect.innerHTML = '';
      if (credentials[site]) {
          Object.keys(credentials[site]).forEach(user => {
              let option = document.createElement('option');
              option.value = user;
              option.textContent = user;
              userSelect.appendChild(option);
          });
      }
  });
});

// Save selected user and site
document.getElementById('saveButton').addEventListener('click', function () {
  const site = document.getElementById('siteSelect').value;
  const selectedUser = document.getElementById('userSelect').value;

  if (site && selectedUser) {
      chrome.storage.local.set({ selectedUser, selectedSite: site }, function () {
          alert('Selected user and site saved for auto-login');
      });
  } else {
      alert('Please select both site and user');
  }
});

// Add new user credentials for a specific site
document.getElementById('addButton').addEventListener('click', function () {
  const site = prompt('Enter the website URL:');
  const username = prompt('Enter the username:');
  const password = prompt('Enter the password:');

  if (site && username && password) {
      chrome.storage.local.get(['credentials'], function (data) {
          const credentials = data.credentials || {};
          if (!credentials[site]) credentials[site] = {};

          credentials[site][username] = { username, password };

          chrome.storage.local.set({ credentials }, function () {
              alert('User added successfully for the site');
              window.location.reload(); // Refresh to update dropdown
          });
      });
  } else {
      alert('All fields are required');
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const toggleExtension = document.getElementById("toggleExtension");

  // Initialize the toggle state
  chrome.storage.local.get("extensionEnabled", (result) => {
      toggleExtension.checked = result.extensionEnabled || false;
  });

  // Update the state when the toggle is changed
  toggleExtension.addEventListener("change", () => {
      chrome.runtime.sendMessage({ action: "toggleExtension" }, (response) => {
          console.log("Extension enabled:", response.enabled);
      });
  });
});
