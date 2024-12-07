export const BraketFormatChecker = (text) => {

    // Define the regular expression pattern to match text in {{ }}
    const regex = /\{\{(.*?)\}\}/g;

    // Find all matches
    let matches = [];
    let match;
    while (match = regex.exec(text)) {
        // Split each match by ": " and store as key-value pairs in an object
        const [key, value] = match[1].split(": ").map(str => str.trim());
        matches.push({ [key]: value });
    }

    // Output the extracted data
    return matches
}