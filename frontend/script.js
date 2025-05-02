const cnnCtx = document.getElementById('cnn-chart').getContext('2d');
const apiCtx = document.getElementById('api-chart').getContext('2d');
let cnnChart = null;
let apiChart = null;

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('prediction-form');
    const resultDiv = document.getElementById('result');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        resultDiv.textContent = 'Predicting...';

        const stockNameInput = document.getElementById('stock-name');
        const stockName = stockNameInput.value.trim();

        try {
            const response = await fetch('http://127.0.0.1:5000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ stock_name: stockName })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            resultDiv.textContent = `Model: ${data.model}\nStock: ${data.stock}`;

            // Render CNN prediction graph
            if (cnnChart) {
                cnnChart.destroy();
            }
            cnnChart = new Chart(cnnCtx, {
                type: 'line',
                data: {
                    labels: data.cnn_prediction.days,
                    datasets: [{
                        label: 'CNN Predicted Price',
                        data: data.cnn_prediction.prices,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        fill: false,
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        x: { title: { display: true, text: 'Day' } },
                        y: { title: { display: true, text: 'Price' } }
                    }
                }
            });

            // Render API stock data graph
            if (apiChart) {
                apiChart.destroy();
            }
            apiChart = new Chart(apiCtx, {
                type: 'line',
                data: {
                    labels: data.api_data.dates,
                    datasets: [{
                        label: 'Prediction',
                        data: data.api_data.prices,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        fill: false,
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        x: { title: { display: true, text: 'Date' } },
                        y: { title: { display: true, text: 'Price' } }
                    }
                }
            });

            // Calculate next day prediction change
            const prices = data.api_data.prices;
            let predictionText = '';
            if (prices.length >= 2) {
                const change = prices[prices.length - 1] - prices[prices.length - 2];
                const direction = change > 0 ? 'increase' : (change < 0 ? 'decrease' : 'remain the same');
                predictionText = `Next day it will ${direction} by ${Math.abs(change).toFixed(2)}`;
            } else {
                predictionText = 'Not enough data to predict next day change.';
            }
            document.getElementById('prediction-text').textContent = predictionText;

        } catch (error) {
            resultDiv.textContent = 'Error: ' + error.message;
        }
    });
});
