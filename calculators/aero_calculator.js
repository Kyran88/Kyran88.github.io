document.getElementById('power2').addEventListener('input', function() {
    const power2 = parseFloat(document.getElementById('power2').value);
    document.getElementById('ftp').value = power2;
});

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
        <div class="card">
            <div class="card-header">
                <h3>Results</h3>
            </div>
            <div class="card-body">
                <h5 class="card-title">Improvements</h5>
                <p class="card-text">Cda Improvement: ${cdaImprovement.toFixed(2)}%</p>
                <p class="card-text">Speed Improvement: ${speedImprovement.toFixed(2)}%</p>
                <p class="card-text">Power Saving: ${powerSaving.toFixed(2)} W</p>
                <p class="card-text">Time Saving over 10 miles: ${minutes} minutes ${seconds} seconds</p>
                <h5 class="card-title">Performance Breakdown at FTP (${ftp} W)</h5>
                <p class="card-text">Position 1 Time: ${minutesAtFTP1} minutes ${secondsAtFTP1} seconds</p>
                <p class="card-text">Position 2 Time: ${minutesAtFTP2} minutes ${secondsAtFTP2} seconds</p>
                <p class="card-text">Time Saving: ${minutesAtFTP} minutes ${secondsAtFTP} seconds</p>
                <h5 class="card-title">This Improvement Means</h5>
                <p class="card-text">${cdaImprovement.toFixed(2)}% better aerodynamic efficiency</p>
                <p class="card-text">${speedImprovement.toFixed(2)}% increase in speed at the same power</p>
                <h5 class="card-title">Equivalent Savings Over Distances</h5>
                <p class="card-text">Time saving of ${minutes180km} minutes ${seconds180km} seconds over 180km</p>
                <p class="card-text">Time saving of ${minutes90km} minutes ${seconds90km} seconds over 90km</p>
                <p class="card-text">Time saving of ${minutes40km} minutes ${seconds40km} seconds over 40km</p>
            </div>
        </div>
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
            <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body>
            <div class="container mt-5">
                <h1 class="text-center">Aero Calculator Results</h1>
                <div class="card mb-3">
                    <div class="card-header">
                        <h2>Test 1</h2>
                    </div>
                    <div class="card-body">
                        <p>Power: ${power1} W</p>
                        <p>Cda: ${cda1}</p>
                        <p>Speed: ${speed1} kph</p>
                        <p>Crr: ${crr1}</p>
                        <p>Weight: ${weight1} kg</p>
                        <p>Efficiency: ${efficiency1} %</p>
                        <p>Density: ${density1} kg/m³</p>
                    </div>
                </div>
                <div class="card mb-3">
                    <div class="card-header">
                        <h2>Test 2</h2>
                    </div>
                    <div class="card-body">
                        <p>Power: ${power2} W</p>
                        <p>Cda: ${cda2}</p>
                        <p>Speed: ${speed2} kph</p>
                        <p>Crr: ${crr2}</p>
                        <p>Weight: ${weight2} kg</p>
                        <p>Efficiency: ${efficiency2} %</p>
                        <p>Density: ${density2} kg/m³</p>
                    </div>
                </div>
                <div class="card mb-3">
                    <div class="card-header">
                        <h2>FTP</h2>
                    </div>
                    <div class="card-body">
                        <p>FTP: ${ftp} W</p>
                    </div>
                </div>
                <div class="card mb-3">
                    <div class="card-header">
                        <h2>Results</h2>
                    </div>
                    <div class="card-body">
                        ${resultsHTML}
                    </div>
                </div>
                <div class="card mb-3">
                    <div class="card-header">
                        <h2>Chart</h2>
                    </div>
                    <div class="card-body">
                        <img src="${chartImage}" alt="Chart" class="img-fluid">
                    </div>
                </div>
            </div>
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

function exportToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text("Aero Calculator Results", 10, 10);
    
    doc.setFontSize(12);
    let y = 20;
    
    function addSection(title, content) {
        doc.setFontSize(14);
        doc.text(title, 10, y);
        y += 6;
        doc.setFontSize(12);
        content.forEach(line => {
            doc.text(line, 10, y);
            y += 6;
        });
        y += 4;
    }
    
    addSection("Test 1", [
        `Power: ${document.getElementById('power1').value} W`,
        `CdA: ${document.getElementById('cda1').value}`,
        `Speed: ${document.getElementById('speed1').value} kph`,
        `Crr: ${document.getElementById('crr1').value || 0.004}`,
        `Weight: ${document.getElementById('weight1').value || 90} kg`,
        `Efficiency: ${document.getElementById('efficiency1').value || 0.95} %`,
        `Density: ${document.getElementById('density1').value || 1.225} kg/m³`
    ]);
    
    addSection("Test 2", [
        `Power: ${document.getElementById('power2').value} W`,
        `CdA: ${document.getElementById('cda2').value}`,
        `Speed: ${document.getElementById('speed2').value} kph`,
        `Crr: ${document.getElementById('crr2').value || 0.004}`,
        `Weight: ${document.getElementById('weight2').value || 90} kg`,
        `Efficiency: ${document.getElementById('efficiency2').value || 0.95} %`,
        `Density: ${document.getElementById('density2').value || 1.225} kg/m³`
    ]);
    
    addSection("FTP", [`FTP: ${document.getElementById('ftp').value} W`]);
    
    addSection("Results", [
        document.getElementById('results').innerText
    ]);
    
    doc.save("Aero_Calculator_Results.pdf");
}

// Add a button for exporting to PDF
document.addEventListener("DOMContentLoaded", function() {
    const button = document.createElement("button");
    button.className = "btn btn-success mt-3";
    button.textContent = "Download PDF";
    button.onclick = exportToPDF;
    document.querySelector(".container").appendChild(button);
});
