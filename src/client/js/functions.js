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
        return {
            code: 501,
            message: 'Error while send Request to server.'
        };
    }
}

/* Display the alert message */
function displayAlert(message, status = 'danger', contSelector = "#messages") {
    const allStatus = ['success', 'danger', 'info', 'warning'];
    // why 2 if try remove nested if and provide empty selector. so this method 0 possible of errors and no need try which will take performance equal for 2 if or a bit smaller
    if (contSelector && allStatus.includes(status)) {
        const messagesCont = document.querySelector(contSelector);

        if (messagesCont) {
            // clear the data for empty calls
            messagesCont.innerHTML = '';
            if (message) {
                messagesCont.innerHTML = `
                <div class="alert ${status}">
                    <div class="message">${message}</div>
                    <div class="close_btn" onclick="Client.removeAlertMsg(event)">X</div>
                </div>
            `;
                return true;
            } else {
                // if clear only
                return false;
            }
        }

    }
    return null;
}

/* remove the alert message */
function removeAlertMsg(event) {
    const targetAlert = event.currentTarget.closest('div.alert');
    if (targetAlert) {
        targetAlert.remove();
    }
}

/* update UI with server data or clear the old data in null */
function updateUI(data = null) {
    const mainCont = document.querySelector("#server_result");

    const agreement = document.querySelector("#server_result #agreement");
    const subjectivity = document.querySelector("#server_result #subjectivity");
    const confidence = document.querySelector("#server_result #confidence");
    const irony = document.querySelector("#server_result #irony");
    const sentiment = document.querySelector("#server_result #sentiment");
    const url = document.querySelector("#server_result #url");
    const sample = document.querySelector("#sample");


    if (mainCont && agreement && subjectivity && confidence && irony && sentiment && url && sample) {
        if (data) {
            // add the loaded data
            agreement.innerText = ((typeof(data.agreement) !== 'undefined') ? data.agreement : '');
            subjectivity.innerText = ((typeof(data.subjectivity) !== 'undefined') ? data.subjectivity : '');
            confidence.innerText = ((typeof(data.confidence) !== 'undefined') ? data.confidence : '');
            irony.innerText = ((typeof(data.irony) !== 'undefined') ? data.irony : '');
            sentiment.innerText = ((typeof(data.sentiment) !== 'undefined') ? data.sentiment : '');
            url.innerText = ((typeof(data.url) !== 'undefined') ? data.url : '');
            sample.innerText = ((typeof(data.sample) !== 'undefined') ? data.sample : '');
            mainCont.style.display = 'block';
        } else {
            // clear data on null calling for ux (if error for example clear old data)
            agreement.innerText = '';
            subjectivity.innerText = '';
            confidence.innerText = '';
            irony.innerText = '';
            sentiment.innerText = '';
            url.innerText = '';
            sample.innerText = '';

            // hide container when clear for better UX
            mainCont.style.display = 'none';
        }
        return true;
    }
    return false;
}



export {
    displayAlert,
    sendJSONPostAjaxAsync,
    updateUI,
    removeAlertMsg
};