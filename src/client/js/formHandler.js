// Replace checkForName with a function that checks the URL
import { displayAlert, sendJSONPostAjaxAsync} from './functions';
import { checkForURL } from './urlChecker';

// If working on Udacity workspace, update this with the Server API URL e.g. `https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api`
// const serverURL = 'https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api'
const serverURL = 'https://localhost:8000/api'

const form = document.getElementById('urlForm');
form.addEventListener('submit', Client.handleSubmit);

async function handleSubmit(event) {
    event.preventDefault();

    // Get the URL from the input field
    const processURL = document.getElementById('name').value;

    // This is an example code that checks the submitted name. You may remove it from your code
    const validURL = checkForURL(processURL);
    
    // Check if the URL is valid
    if (validURL) {
        // If the URL is valid, send it to the server using the serverURL constant above
        const serverData = sendJSONPostAjaxAsync('/nlp', {url: processURL});
        if (serverData && serverData.code == 200) {

        } else {
            const errorMsg = (serverData && serverData.message) ? serverData.message : 'Unknown system error unable to process your request';
            displayAlert(errorMsg, 'danger');
        }
        
    } else {
        displayAlert('Please enter valid Public URL', 'warning');
    }
}

// Function to send data to the server

// Export the handleSubmit function
export { handleSubmit };

