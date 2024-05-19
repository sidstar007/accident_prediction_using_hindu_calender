const panchang = require('./index').panchang
const panchangCallback = require('./index').panchangCallback

//panchang.calculate(date, panchangCallback)

// Assuming you have a CSV file named data.csv in the same directory as your JavaScript file

// Function to parse CSV data
function parseCSV(csv) {
    // Split the CSV into an array of rows
    const rows = csv.trim().split('\n');

    // Extract headers from the first row
    const headers = rows.shift().split(',');

    // Parse each row into an object
    const data = rows.map(row => {
        const values = row.split(',');
        return headers.reduce((obj, header, index) => {
            obj[header.trim()] = values[index].trim();
            return obj;
        }, {});
    });

    return data;
}

function convertDate(dateStr) {
    // Split the date string into day, month, and year parts
    var parts = dateStr.split("-");
    
    // Create a new Date object with the parts rearranged in the "yyyy-mm-dd" format
    var convertedDate = new Date(parts[2], parts[1] - 1, parts[0]); // Adjust month index here
    
    // Format the date to "yyyy-mm-dd"
    var formattedDate = convertedDate.getFullYear() + '-' + (convertedDate.getMonth() + 1).toString().padStart(2, '0') + '-' + convertedDate.getDate().toString().padStart(2, '0');
    
    return formattedDate;
}

// Function to fetch and read the CSV file
const fs = require('fs');

function saveToCSV(csvData, newData) {
    // Write the modified data back to the CSV file
    const newCSV = [csvData.headers.join(',')];
    csvData.data.forEach(row => {
        const newRow = [row['Date'], row['No_of_Accidents']];
        newData.forEach(item => {
            newRow.push(item); // Add Hindu calendar data
        });
        newCSV.push(newRow.join(','));
    });

    fs.writeFileSync('./dataset/accidents_by_date_2.csv', newCSV.join('\n'));
}

async function readCSVFile(filePath) {
    try {
        // Read the CSV file using fs.readFile
        const csvText = await fs.promises.readFile(filePath, 'utf-8');

        // Parse the CSV data
        const csvData = parseCSV(csvText);

        // Do something with the parsed data
        //console.log(csvData);

        csvData.forEach(element => {
            var newDate = convertDate(element.Date)
            //console.log(element.Date, newDate)
            var dateString = new Date(newDate)
            //console.log(element.Date)
            dateString.setHours(1, 1, 1, 1)
            //console.log(dateString)
            //console.log(dateString)
            //panchang.calculate(dateString, panchangCallback)
            var panchangVal = panchang.calculate(dateString, panchangCallback)
            console.log(panchangVal)
            /*const newData = [
                panchangVal.Tithi,
                panchangVal.Nakshatra,
                panchangVal.Karna,
                panchangVal.Yoga,
                panchangVal.Ayanamsa,
                panchangVal.Raasi
            ];*/
            //console.log(newData)
           //saveToCSV(csvData, newData);
        });


    } catch (error) {
        console.error('Error reading CSV file:', error);
    }
}


// Usage: Call readCSVFile with the path to your CSV file
readCSVFile('./dataset/accidents_by_date.csv');