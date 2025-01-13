let x = 0;
function displayAlert(message, status='danger', contSelector="#messages") {
    x += 1;
    console.log("x", x);

    const allStatus = ['success', 'danger', 'info', 'warning'];
    // why 2 if try remove nested if and provide empty selector. so this method 0 possible of errors and no need try which will take performance equal for 2 if or a bit smaller
    if (contSelector && allStatus.includes(status)) {
        const messagesCont = document.querySelector(contSelector);
        if (messagesCont) {
            messagesCont.innerHTML = `
                <div>
                    <div class="message">${message}</div>
                    <div class="close_btn">X</div>
                </div>
            `;
            return true;
        }
    }
    return false;
}

async function sendJSONPostAjaxAsync(url, data) {
    try {
        const res = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            // Body data type must match "Content-Type" header
            body: JSON.stringify(data)
        });
        return await res.json();

    } catch (error) {
        // this can considered typescript betwen client and backend
        return {code: 501, message: 'Error while send Request to server.'};
    }
}

export {
    displayAlert,
    sendJSONPostAjaxAsync
}