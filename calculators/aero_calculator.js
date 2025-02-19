function calculate() {
    // Get inputs for Test 1
    const power1 = parseFloat(document.getElementById('power1').value);
    const cda1 = parseFloat(document.getElementById('cda1').value);
    const speed1 = parseFloat(document.getElementById('speed1').value);
    const crr1 = parseFloat(document.getElementById('crr1').value) || 0.004;
    const weight1 = parseFloat(document.getElementById('weight1').value) || 90;
    const efficiency1 = parseFloat(document.getElementById('efficiency1').value) || 0.95;
    const density1 = parseFloat(document.getElementById('density1').value) || 1.225;

    // Get FTP
    const ftp = parseFloat(document.getElementById('ftp').value);

    // Set default power for Test 2 to FTP
    document.getElementById('power2').value = ftp;

    // Get inputs for Test 2
    const power2 = parseFloat(document.getElementById('power2').value);
    const cda2 = parseFloat(document.getElementById('cda2').value);
    const speed2 = parseFloat(document.getElementById('speed2').value);
    const crr2 = parseFloat(document.getElementById('crr2').value) || 0.004;
    const weight2 = parseFloat(document.getElementById('weight2').value) || 90;
    const efficiency2 = parseFloat(document.getElementById('efficiency2').value) || 0.95;
    const density2 = parseFloat(document.getElementById('density2').value) || 1.225;

    // Calculate improvements
    const cdaImprovement = ((cda1 - cda2) / cda1) * 100;
    const speedImprovement = ((speed2 - speed1) / speed1) * 100;
    const powerSaving = power1 - power2;

    // Calculate time savings over 10 miles (16.0934 km)
    const time1 = (16.0934 / speed1) * 3600;
    const time2 = (16.0934 / speed2) * 3600;
    const timeSaving = time1 - time2;
    const minutes = Math.floor(timeSaving / 60);
    const seconds = (timeSaving % 60).toFixed(2);

    // Calculate performance breakdown at FTP
    const speedAtFTP1 = (ftp / power1) * speed1;
    const speedAtFTP2 = (ftp / power2) * speed2;
    const timeAtFTP1 = (16.0934 / speedAtFTP1) * 3600;
    const timeAtFTP2 = (16.0934 / speedAtFTP2) * 3600;
    const minutesAtFTP1 = Math.floor(timeAtFTP1 / 60);
    const secondsAtFTP1 = (timeAtFTP1 % 60).toFixed(2);
    const minutesAtFTP2 = Math.floor(timeAtFTP2 / 60);
    const secondsAtFTP2 = (timeAtFTP2 % 60).toFixed(2);
    const timeSavingAtFTP = timeAtFTP1 - timeAtFTP2;
    const minutesAtFTP = Math.floor(timeSavingAtFTP / 60);
    const secondsAtFTP = (timeSavingAtFTP % 60).toFixed(2);

    // Calculate equivalent savings over different distances
    const timeSaving180km = (timeSavingAtFTP / 16.0934) * 180;
    const timeSaving90km = (timeSavingAtFTP / 16.0934) * 90;
    const timeSaving40km = (timeSavingAtFTP / 16.0934) * 40;

    const minutes180km = Math.floor(timeSaving180km / 60);
    const seconds180km = (timeSaving180km % 60).toFixed(2);
    const minutes90km = Math.floor(timeSaving90km / 60);
    const seconds90km = (timeSaving90km % 60).toFixed(2);
    const minutes40km = Math.floor(timeSaving40km / 60);
    const seconds40km = (timeSaving40km % 60).toFixed(2);

    // Display results
    const resultsHTML = `
        <p>Cda Improvement: ${cdaImprovement.toFixed(2)}%</p>
        <p>Speed Improvement: ${speedImprovement.toFixed(2)}%</p>
        <p>Power Saving: ${powerSaving.toFixed(2)} W</p>
        <p>Time Saving over 10 miles: ${minutes} minutes ${seconds} seconds</p>
        <p>Performance Breakdown at FTP (${ftp} W):</p>
        <p>Position 1 Time: ${minutesAtFTP1} minutes ${secondsAtFTP1} seconds</p>
        <p>Position 2 Time: ${minutesAtFTP2} minutes ${secondsAtFTP2} seconds</p>
        <p>Time Saving: ${minutesAtFTP} minutes ${secondsAtFTP} seconds</p>
        <p>This improvement means:</p>
        <p>${cdaImprovement.toFixed(2)}% better aerodynamic efficiency</p>
        <p>${speedImprovement.toFixed(2)}% increase in speed at the same power</p>
        <p>Equivalent saving over the following distances:</p>
        <p>Time saving of ${minutes180km} minutes ${seconds180km} seconds over 180km</p>
        <p>Time saving of ${minutes90km} minutes ${seconds90km} seconds over 90km</p>
        <p>Time saving of ${minutes40km} minutes ${seconds40km} seconds over 40km</p>
    `;
    document.getElementById('results').innerHTML = resultsHTML;

    // Create chart
    const ctx = document.getElementById('chart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Cda Improvement (%)', 'Speed Improvement (%)', 'Power Saving (W)', 'Time Saving (s)', 'Time Saving at FTP (s)'],
            datasets: [{
                label: 'Test Results',
                data: [cdaImprovement, speedImprovement, powerSaving, timeSaving, timeSavingAtFTP],
                backgroundColor: ['rgba(75, 192, 192, 0.2)'],
                borderColor: ['rgba(75, 192, 192, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Save chart as image
    const chartImage = chart.toBase64Image();

    // Export data
    exportData(resultsHTML, chartImage);
}

function exportData(resultsHTML, chartImage) {
    const power1 = document.getElementById('power1').value;
    const cda1 = document.getElementById('cda1').value;
    const speed1 = document.getElementById('speed1').value;
    const crr1 = document.getElementById('crr1').value || 0.004;
    const weight1 = document.getElementById('weight1').value || 90;
    const efficiency1 = document.getElementById('efficiency1').value || 0.95;
    const density1 = document.getElementById('density1').value || 1.225;

    const power2 = document.getElementById('power2').value;
    const cda2 = document.getElementById('cda2').value;
    const speed2 = document.getElementById('speed2').value;
    const crr2 = document.getElementById('crr2').value || 0.004;
    const weight2 = document.getElementById('weight2').value || 90;
    const efficiency2 = document.getElementById('efficiency2').value || 0.95;
    const density2 = document.getElementById('density2').value || 1.225;

    const ftp = document.getElementById('ftp').value;

    const data = `
        <html>
        <head>
            <title>Aero Calculator Results</title>
        </head>
        <body>
            <h1>Aero Calculator Results</h1>
            <h2>Test 1</h2>
            <p>Power: ${power1} W</p>
            <p>Cda: ${cda1}</p>
            <p>Speed: ${speed1} kph</p>
            <p>Crr: ${crr1}</p>
            <p>Weight: ${weight1} kg</p>
            <p>Efficiency: ${efficiency1} %</p>
            <p>Density: ${density1} kg/m³</p>
            <h2>Test 2</h2>
            <p>Power: ${power2} W</p>
            <p>Cda: ${cda2}</p>
            <p>Speed: ${speed2} kph</p>
            <p>Crr: ${crr2}</p>
            <p>Weight: ${weight2} kg</p>
            <p>Efficiency: ${efficiency2} %</p>
            <p>Density: ${density2} kg/m³</p>
            <h2>FTP</h2>
            <p>FTP: ${ftp} W</p>
            <h2>Results</h2>
            ${resultsHTML}
            <h2>Chart</h2>
            <img src="${chartImage}" alt="Chart">
        </body>
        </html>
    `;

    const blob = new Blob([data], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'aero_calculator_results.html';
    a.click();
    URL.revokeObjectURL(url);
}
