const fs = require('fs');

// Read the JSON file
fs.readFile('./data.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading JSON file:', err);
        return;
    }

    // Parse the JSON data into a JavaScript object
    let jsonData;
    try {
        jsonData = JSON.parse(data);
    } catch (parseErr) {
        console.error('Error parsing JSON data:', parseErr);
        return;
    }

    // Print the JSON data
    console.log(jsonData);
});
