function checkForURL(inputText) {
    console.log("::: Running checkForURL :::", inputText);

    if(inputText.match(/^[http://|https://]?www\.([a-z0-9]+)(\.[a-z0-9]+)+.*$/)) {
        return true;
    } else {
        return false;
    }
}

export { checkForURL };
