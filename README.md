# Stock Market Prediction SEPM Project

## Project Description
This project is a Stock Market Prediction web application that uses a dummy Convolutional Neural Network (CNN) model alongside real stock data fetched from the Alpha Vantage API. The backend is built with Flask, serving a REST API and static frontend files. The frontend is a simple web interface that allows users to input a stock symbol and view predicted stock prices from both the CNN model and the API data visualized using Chart.js.

## Technologies Used
- Python 3
- Flask (Backend web framework)
- Flask-CORS (Cross-Origin Resource Sharing support)
- NumPy (Numerical computations)
- Requests (HTTP requests)
- Alpha Vantage API (Real stock market data)
- HTML, CSS, JavaScript (Frontend)
- Chart.js (Frontend chart rendering)

## Setup Instructions

### Backend Setup
1. Ensure Python 3 is installed on your system.
2. Install required Python packages:
   ```bash
   pip install flask flask-cors numpy requests
   ```
3. The backend code is located in the `backend/` directory, with the main app in `app.py`.
4. The backend serves the frontend static files from the `frontend/` directory.

### Frontend Setup
- The frontend consists of static files located in the `frontend/` directory:
  - `index.html`
  - `style.css`
  - `script.js`
- No additional setup is required for the frontend as it is served by the Flask backend.

## Running the Application
1. From the root project directory, run the backend Flask app:
   ```bash
   python backend/app.py
   ```
2. Open a web browser and navigate to:
   ```
   http://127.0.0.1:5000/
   ```
3. The frontend interface will load, allowing you to enter a stock symbol and get predictions.

## Usage Instructions
- Enter a valid stock symbol (e.g., AAPL, MSFT) in the input box.
- Click the "Predict" button.
- The app will display two charts:
  - CNN Model Prediction (dummy data simulating a CNN prediction)
  - Real stock price data fetched from Alpha Vantage API
- A simple next day price change prediction is also displayed based on the API data.

## Notes on the Dummy CNN Model and API Key
- The CNN model used here is a dummy function generating random walk data to simulate predictions.
- Real stock data is fetched from Alpha Vantage API using a user-provided API key.
- The API key is currently hardcoded in the backend (`backend/app.py`) as `'4N27YCYR0B5X920P'`. You may replace it with your own key for better usage limits.

## Dependencies and Libraries
- Flask
- Flask-CORS
- NumPy
- Requests
- Chart.js (loaded via CDN in frontend)

## License
This project is provided as-is for educational purposes.
