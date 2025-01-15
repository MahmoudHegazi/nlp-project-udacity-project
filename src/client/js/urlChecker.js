function checkForURL(inputText) {
    console.log("::: Running checkForURL :::", inputText);
    // for more dynamic make www\. optional
    const urlPattern = /^(https?:\/\/)?(www\.)?[a-z0-9-]+(\.[a-z]{2,6})+.*$/i;
    if (urlPattern.test(inputText)) {
        return true;
    } else {
        return false;
    }
}

export {
    checkForURL
};