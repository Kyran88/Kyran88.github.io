
function processFile() {
    const fileUpload = document.getElementById('fileUpload').files[0];
    if (!fileUpload) {
        alert("Please upload an Excel file.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);

        displayResults(json);
    };
    reader.readAsArrayBuffer(fileUpload);
}

function displayResults(data) {
    const tableBody = document.getElementById('resultsTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ""; // Clear previous results

    data.forEach(row => {
        const age = row['Age'];
        const distance = row['Distance (km)'];
        const time = row['Time (minutes:seconds)'];
        const [minutes, seconds] = time.split(':').map(Number);
        const totalTimeInMinutes = minutes + (seconds / 60);
        const handicap = calculateHandicap(age, distance, totalTimeInMinutes);

        const newRow = tableBody.insertRow();
        newRow.insertCell(0).innerText = age;
        newRow.insertCell(1).innerText = distance;
        newRow.insertCell(2).innerText = time;
        newRow.insertCell(3).innerText = handicap.toFixed(2);
    });
}

function calculateHandicap(age, distance, time) {
    return (time / distance) * (1 + (age / 100));
}
