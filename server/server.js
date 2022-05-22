'use strict';
const express = require('express');
const http = require('http');
const io = require('socket.io');
const cors = require('cors');

const FETCH_INTERVAL = 5000;
const PORT = process.env.PORT || 4000;

const tickers = [
  'AAPL', // Apple
  'GOOGL', // Alphabet
  'MSFT', // Microsoft
  'AMZN', // Amazon
  'FB', // Facebook
  'TSLA', // Tesla
];

function randomValue(min = 0, max = 1, precision = 0) {
  const random = Math.random() * (max - min) + min;
  return random.toFixed(precision);
}

function utcDate() {
  const now = new Date();
  return new Date(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    now.getUTCSeconds()
  );
}

let filteredTickers = [];

function getInitialQuotes(socket, interval = FETCH_INTERVAL) {
  const initialQuotes = tickers.map((ticker) => ({
    ticker,
    exchange: 'NASDAQ',
    price: randomValue(100, 300, 2),
    change: 'n/a',
    change_percent: 'n/a',
    dividend: randomValue(0, 1, 2),
    yield: randomValue(0, 2, 2),
    last_trade_time: utcDate(),
  }));

  socket.emit('initial', initialQuotes, interval);
}

function getQuotes(socket, interval = FETCH_INTERVAL) {
  const quotes = tickers
    .filter((e) => filteredTickers.indexOf(e) === -1)
    .map((ticker) => ({
      ticker,
      exchange: 'NASDAQ',
      price: randomValue(100, 300, 2),
      change: randomValue(0, 200, 2),
      change_percent: randomValue(0, 1, 2),
      dividend: randomValue(0, 1, 2),
      yield: randomValue(0, 2, 2),
      last_trade_time: utcDate(),
    }));

  socket.emit('ticker', quotes, interval);
}

function trackTickers(socket, interval = FETCH_INTERVAL) {
  // every N seconds
  const timer = setInterval(() => {
    getQuotes(socket, interval);
  }, interval);

  socket.on('start', () => clearInterval(timer));
  socket.on('disconnect', () => {
    socket.removeAllListeners('connection');
    clearInterval(timer);
  });
}

const app = express();
app.use(cors());
const server = http.createServer(app);

const socketServer = io(server, {
  cors: {
    origin: '*',
  },
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

let interval;

socketServer.on('connection', (socket) => {
  getInitialQuotes(socket);

  socket.on('start', (response) => {
    if (response) {
      interval = response;
    }
    trackTickers(socket, interval);
  });

  socket.on('watch-unwatch', (response) => {
    const { ticker, bool } = response;

    if (bool) {
      filteredTickers.push(ticker);
      socket.emit('start', interval);
      return;
    }

    filteredTickers = filteredTickers.filter((e) => e !== ticker);
    socket.emit('start', interval);
  });

  socket.on('reset', () => {
    interval = FETCH_INTERVAL;
    filteredTickers = [];
  });
});

server.listen(PORT, () => {
  console.log(`Streaming service is running on http://localhost:${PORT}`);
});
