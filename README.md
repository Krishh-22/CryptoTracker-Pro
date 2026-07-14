# 🪙 CryptoTracker Pro

A modern full-stack cryptocurrency tracking platform built with **React**, **FastAPI**, and the **CoinGecko API**. The application provides live cryptocurrency prices, interactive charts, portfolio tracking, watchlists, and market analytics in a clean, responsive interface.

---

# ✨ Features

### 📈 Live Cryptocurrency Market
- Live prices of the top 25 cryptocurrencies
- Real-time market updates
- Automatic refresh every 30 seconds
- Search cryptocurrencies by name or symbol

### 📊 Market Analytics
- Total tracked coins
- Gainers vs Losers
- Live market status
- Last updated timestamp

### 🪙 Coin Details
- Current price
- 24-hour change
- Market Cap
- 24-hour High & Low
- Trading Volume
- Circulating Supply
- Market Rank
- Interactive 7-Day Price Chart

### ⭐ Watchlist
- Add coins to watchlist
- Remove coins from watchlist
- Persistent state using React Context API

### 💼 Portfolio
- Add investments
- Track quantity & buy price
- Current portfolio valuation
- Profit/Loss calculation
- Portfolio allocation pie chart
- Remove investments

### 🎨 User Experience
- Responsive UI
- Loading screen
- Error handling with Retry
- Toast notifications
- Custom 404 page
- Modern dashboard design

---

# 🛠 Tech Stack

## Frontend

- React
- React Router DOM
- Axios
- Tailwind CSS
- Recharts
- React Toastify

## Backend

- FastAPI
- Python
- HTTPX
- Uvicorn

## API

- CoinGecko API

---

# 📂 Project Structure

```
CryptoTracker-Pro/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   └── App.jsx
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── services/
│   │   └── main.py
│
├── README.md
└── .gitignore
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/CryptoTracker-Pro.git
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## Backend

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv .venv
```

Activate it:

### Windows

```bash
.venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run FastAPI:

```bash
uvicorn app.main:app --reload
```

Backend runs at:

```
http://127.0.0.1:8000
```

---

# 📡 API Endpoints

## Get Market Data

```
GET /market
```

Returns the top 25 cryptocurrencies.

---

## Get 7-Day Price History

```
GET /coin/{coin_id}/history
```

Returns historical price data for the selected cryptocurrency.

---

# 📈 Future Improvements

- User Authentication
- Database Integration
- Price Alerts
- Dark/Light Theme
- Trending Coins
- Global Market Statistics
- Favorites Synchronization
- News Integration

---

# 👨‍💻 Author

**Krishna**

Built as a full-stack cryptocurrency tracking application to strengthen skills in:

- React
- FastAPI
- REST APIs
- State Management
- Data Visualization
- Frontend Development
- Backend Development

---