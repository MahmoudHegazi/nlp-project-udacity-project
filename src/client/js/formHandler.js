// Replace checkForName with a function that checks the URL
import {
    displayAlert,
    sendJSONPostAjaxAsync,
    updateUI
} from './functions';
import {
    checkForURL
} from './urlChecker';

async function handleSubmit(event) {
    event.preventDefault();

    // Get the URL from the input field
    const processURL = document.getElementById('name').value;

    const formBtn = document.querySelector("#submitButton");
    const waiterTxt = document.querySelector("#waiter");

    if (formBtn && waiterTxt) {
        // hide the btn to not make use send more requests before this one completes using the btn
        formBtn.style.display = 'none';
        waiterTxt.style.display = 'block';

        // clear old data and hide the response container
        updateUI(null);

        // clear any old errors
        displayAlert(null);

        // This is an example code that checks the submitted name. You may remove it from your code
        const validURL = checkForURL(processURL);

        // Check if the URL is valid
        if (validURL) {
            // If the URL is valid, send it to the server using the serverURL constant above
            const serverData = await sendJSONPostAjaxAsync('/nlp', {
                url: processURL
            });
            if (serverData && serverData.code == 200) {

                /* display data in frontend and show the container only on success and new data loaded */
                updateUI(serverData.data);
            } else {
                const errorMsg = (serverData && serverData.message) ? serverData.message : 'Unknown system error unable to process your request';
                displayAlert(errorMsg, 'danger');
            }

        } else {
            displayAlert('Please enter valid Public URL', 'warning');
        }

        // hide wait message
        waiterTxt.style.display = 'none';

        // always even if error display the btn back (note within async it will run after the await incase of request sent)
        formBtn.style.display = 'block';

    } else {
        displayAlert('Error in the App interface, please try again later.', 'danger');
    }


}
// Function to send data to the server

document.addEventListener("DOMContentLoaded", (event) => {
    const form = document.getElementById('urlForm');
    form.addEventListener('submit', handleSubmit);
});

// Export the handleSubmit function
export {
    handleSubmit
};