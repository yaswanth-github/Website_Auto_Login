chrome.storage.local.get(['selectedUser'], function (result) {
    const selectedUser = result.selectedUser;

    if (selectedUser) {
        chrome.storage.local.get(['credentials'], function (data) {
            const credentials = data.credentials || {};
            const currentUrl = window.location.href;

            // Match credentials for the current URL
            for (const site in credentials) {
                if (currentUrl.includes(site)) {
                    const user = credentials[site][selectedUser];
                    if (user) {
                        // Autofill based on the site
                        if (site.includes('ums.lpu.in/lpuums/')) {
                            document.getElementById('txtU').value = user.username;
                            document.getElementById('TxtpwdAutoId_8767').value = user.password;
                            document.getElementById('iBtnLogins150203125').click();
                        } else if (site.includes('ums.lpu.in/Placements/')) {
                            document.getElementById('txtUserName').value = user.username;
                            document.getElementById('txtPassword').value = user.password;
                            document.getElementById('Button1').click();
                        } else if (site.includes('internet.lpu.in/')) {
                            document.querySelector('input[name="username"]').value = user.username;
                            document.querySelector('input[name="password"]').value = user.password;
                            document.getElementById('loginbtn').disabled = false;
                            document.getElementById('loginbtn').click();
                        }
                        console.log(`Login attempted on ${site} with: ${selectedUser}`);
                    }
                    break;
                }
            }
        });
    }
});
