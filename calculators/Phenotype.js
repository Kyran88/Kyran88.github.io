let chart; // Global variable to store the chart instance

function calculatePhenotype() {
    // Get input values
    const weight = parseFloat(document.getElementById('weight').value);
    const power5s = parseFloat(document.getElementById('power5s').value);
    const power1m = parseFloat(document.getElementById('power1m').value);
    const power5m = parseFloat(document.getElementById('power5m').value);
    const power20m = parseFloat(document.getElementById('power20m').value);
    const power1h = parseFloat(document.getElementById('power1h').value) || 0; // Optional

    // Input validation
    if (!weight || weight <= 0 || !power5s || !power1m || !power5m || !power20m) {
        alert('Please fill in all required fields with valid numbers.');
        return;
    }

    // Calculate power-to-weight ratios (W/kg)
    const wkg5s = (power5s / weight).toFixed(2);
    const wkg1m = (power1m / weight).toFixed(2);
    const wkg5m = (power5m / weight).toFixed(2);
    const ftp = (power20m * 0.95).toFixed(2); // FTP is 95% of 20min power
    const wkgFtp = (ftp / weight).toFixed(2);
    const wkg1h = power1h ? (power1h / weight).toFixed(2) : 'N/A';

    // Determine phenotype (simplified logic)
    let phenotype = '';
    if (wkg5s > 20 && wkg1m > 8) {
        phenotype = 'Sprinter';
    } else if (wkg5m > 5.5 && wkgFtp > 4.5) {
        phenotype = 'Climber/Time Trialist';
    } else if (wkg5s > 15 && wkgFtp > 4) {
        phenotype = 'All-Rounder';
    } else if (power1h && wkg1h > 3.5) {
        phenotype = 'Endurance Specialist';
    } else {
        phenotype = 'General Cyclist (Balanced or Developing)';
    }

    // Display results
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h2>Results</h2>
        <p>Weight: ${weight} kg</p>
        <p>5s Peak Power: ${power5s} W (${wkg5s} W/kg)</p>
        <p>1min Power: ${power1m} W (${wkg1m} W/kg)</p>
        <p>5min Power: ${power5m} W (${wkg5m} W/kg)</p>
        <p>FTP (est.): ${ftp} W (${wkgFtp} W/kg)</p>
        ${power1h ? `<p>1hr Power: ${power1h} W (${wkg1h} W/kg)</p>` : ''}
        <p><strong>Phenotype: ${phenotype}</strong></p>
    `;

    // Prepare data for chart
    const powerData = [wkg5s, wkg1m, wkg5m, wkgFtp];
    const labels = ['5s', '1min', '5min', 'FTP'];
    if (power1h) {
        powerData.push(wkg1h);
        labels.push('1hr');
    }

    // Destroy existing chart if it exists
    if (chart) {
        chart.destroy();
    }

    // Create bar chart
    const ctx = document.getElementById('powerChart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Power-to-Weight (W/kg)',
                data: powerData,
                backgroundColor: 'rgba(54, 162, 235, 0.7)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Watts per Kilogram (W/kg)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Test Duration'
                    }
                }
            },
            plugins: {
                legend: {
                    display: true
                }
            }
        }
    });
}
​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​
