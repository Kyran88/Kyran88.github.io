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

    // Determine phenotype
    let phenotype = '';
    let highestCategory = '';
    let highestValue = 0;
    
    const categories = {
        'Sprinter': parseFloat(wkg5s),
        'Pursuiter': parseFloat(wkg1m),
        'Time Trialist/Climber': Math.max(parseFloat(wkg5m), parseFloat(wkgFtp)),
        'All-Rounder': (parseFloat(wkg5s) + parseFloat(wkgFtp)) / 2,
        'General Cyclist': power1h ? parseFloat(wkg1h) : 0
    };
    
    for (const [category, value] of Object.entries(categories)) {
        if (value > highestValue) {
            highestValue = value;
            highestCategory = category;
        }
    }

    phenotype = highestCategory;

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

    // Normalize and prioritize the highest phenotype in the chart
    const totalPower = Object.values(categories).reduce((acc, val) => acc + val, 0);
    const percentageData = Object.entries(categories).map(([category, value]) => {
        return category === phenotype ? (value / totalPower) * 150 : (value / totalPower) * 100;
    });

    // Destroy existing chart if it exists
    if (chart) {
        chart.destroy();
    }

    // Create bar chart
    const ctx = document.getElementById('powerChart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(categories),
            datasets: [{
                label: 'Percentage of Rider Type (%)',
                data: percentageData,
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
                        text: 'Percentage (%)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Rider Type'
                    }
                }
            },
            plugins: {
                legend: {
                    display: true
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.raw.toFixed(2)}%`;
                        }
                    }
                }
            }
        }
    });
}
