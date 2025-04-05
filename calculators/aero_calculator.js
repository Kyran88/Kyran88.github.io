document.getElementById('power2').addEventListener('input', function() {
    const power2 = parseFloat(document.getElementById('power2').value);
    document.getElementById('ftp').value = power2;
});

function calculate() {
    // Helper: Convert seconds to mm:ss format
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = (seconds % 60).toFixed(0).padStart(2, '0');
        return `${mins}:${secs}`;
    }

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

    // Time savings over 10 miles
    const time1 = (16.0934 / speed1) * 3600;
    const time2 = (16.0934 / speed2) * 3600;
    const timeSaving = time1 - time2;

    // Performance at FTP
    const speedAtFTP1 = (ftp / power1) * speed1;
    const speedAtFTP2 = (ftp / power2) * speed2;
    const timeAtFTP1 = (16.0934 / speedAtFTP1) * 3600;
    const timeAtFTP2 = (16.0934 / speedAtFTP2) * 3600;
    const timeSavingAtFTP = timeAtFTP1 - timeAtFTP2;

    // Time savings over distances
    const timeSaving180km = (timeSavingAtFTP / 16.0934) * 180;
    const timeSaving90km = (timeSavingAtFTP / 16.0934) * 90;
    const timeSaving40km = (timeSavingAtFTP / 16.0934) * 40;

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
                <p class="card-text">Time Saving over 10 miles: ${formatTime(timeSaving)}</p>
                <br>
                <h5 class="card-title">Performance Breakdown at FTP (${ftp} W) over 10 miles (mm:ss):</h5>
                <p class="card-text">Position 1 Time: ${formatTime(timeAtFTP1)}</p>
                <p class="card-text">Position 2 Time: ${formatTime(timeAtFTP2)}</p>
                <p class="card-text">Time Saving: ${formatTime(timeSavingAtFTP)}</p>
                <br>
                <h5 class="card-title">This Improvement Means</h5>
                <p class="card-text">${cdaImprovement.toFixed(2)}% better aerodynamic efficiency</p>
                <p class="card-text">${speedImprovement.toFixed(2)}% increase in speed at the same power</p>
                <br>
                <h5 class="card-title">Equivalent Savings Over Distances (mm:ss)</h5>
                <p class="card-text">180km: ${formatTime(timeSaving180km)}</p>
                <p class="card-text">90km: ${formatTime(timeSaving90km)}</p>
                <p class="card-text">40km: ${formatTime(timeSaving40km)}</p>
            </div>
        </div>
    `;
    document.getElementById('results').innerHTML = resultsHTML;

    // Chart 1: Aerodynamics & Power
    const ctx1 = document.getElementById('chart1').getContext('2d');
    new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: ['Cda Improvement (%)', 'Speed Improvement (%)', 'Power Saving (W)'],
            datasets: [{
                label: 'Aerodynamics & Power',
                data: [cdaImprovement, speedImprovement, powerSaving],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    // Chart 2: Time Savings and FTP Times (with mm:ss tooltips)
    const ctx2 = document.getElementById('chart2').getContext('2d');
    new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: [
                'Time Saving (10mi)',
                'Time at FTP Pos 1',
                'Time at FTP Pos 2',
                'Time Saving at FTP'
            ],
            datasets: [{
                label: 'Time Metrics (mm:ss)',
                data: [timeSaving, timeAtFTP1, timeAtFTP2, timeSavingAtFTP],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const val = context.parsed.y;
                            return `${context.label}: ${formatTime(val)} (mm:ss)`;
                        }
                    }
                }
            }
        }
    });

    // Chart 3: Time Savings over Distances (with mm:ss tooltips)
    const ctx3 = document.getElementById('chart3').getContext('2d');
    new Chart(ctx3, {
        type: 'bar',
        data: {
            labels: ['40km', '90km', '180km'],
            datasets: [{
                label: 'Time Savings (mm:ss)',
                data: [timeSaving40km, timeSaving90km, timeSaving180km],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const val = context.parsed.y;
                            return `${context.label}: ${formatTime(val)} (mm:ss)`;
                        }
                    }
                }
            }
        }
    });
}
