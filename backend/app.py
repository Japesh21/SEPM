from flask import Flask, request, jsonify
import random
import requests
import numpy as np
from flask_cors import CORS

app = Flask(__name__, static_folder='../frontend', static_url_path='')
CORS(app)

model_name = "stock prediction"

# Dummy CNN model function to generate prediction data (simulate)
def cnn_predict(stock_name):
    # Generate dummy time series data for prediction graph
    days = list(range(1, 31))
    prices = np.cumsum(np.random.randn(30)) + 100  # random walk around 100
    return {'days': days, 'prices': prices.tolist()}

# Fetch stock data from Alpha Vantage API (you can replace with your API key)
ALPHA_VANTAGE_API_KEY = '4N27YCYR0B5X920P'  # User provided API key
def fetch_stock_data(stock_name):
    url = f'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol={stock_name}&apikey={ALPHA_VANTAGE_API_KEY}'
    response = requests.get(url)
    if response.status_code != 200:
        return None
    data = response.json()
    if 'Time Series (Daily)' not in data:
        return None
    time_series = data['Time Series (Daily)']
    dates = sorted(time_series.keys())[-30:]
    prices = [float(time_series[date]['4. close']) for date in dates]
    return {'dates': dates, 'prices': prices}

@app.route('/')
def serve_index():
    return app.send_static_file('index.html')

@app.route('/<path:path>')
def serve_static(path):
    return app.send_static_file(path)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    stock_name = data.get('stock_name', '').upper()
    # Get CNN prediction data
    cnn_data = cnn_predict(stock_name)
    # Get API stock data
    api_data = fetch_stock_data(stock_name)
    if api_data is None:
        return jsonify({'error': 'Failed to fetch stock data from API'}), 500
    return jsonify({
        'model': model_name,
        'stock': stock_name,
        'cnn_prediction': cnn_data,
        'api_data': api_data
    })

if __name__ == '__main__':
    app.run(debug=True)
