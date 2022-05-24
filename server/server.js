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

let filteredTickers = [...tickers];

function getQuotes(socket, interval = FETCH_INTERVAL) {
  const quotes = filteredTickers.map((ticker) => ({
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

let timer;

function trackTickers(socket, interval = FETCH_INTERVAL) {
  timer = setInterval(() => {
    getQuotes(socket, interval);
  }, interval);
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

socketServer.on('connection', (socket) => {
  let interval;
  let paused = false;

  getInitialQuotes(socket);

  socket.on('start', () => {
    clearInterval(timer);
    trackTickers(socket);
  });

  socket.on('pause', () => {
    paused = true;
    clearInterval(timer);
  });

  socket.on('resume', () => {
    paused = false;
    trackTickers(socket, interval);
  });

  socket.on('set interval', (response) => {
    interval = response;
    clearInterval(timer);

    if (!paused) {
      trackTickers(socket, interval);
    }
  });

  socket.on('watch-unwatch', (response) => {
    const { ticker, bool } = response;

    if (bool) {
      filteredTickers = filteredTickers.filter((e) => e !== ticker);
      return;
    }

    filteredTickers.push(ticker);
  });

  socket.on('disconnect', () => {
    clearInterval(timer);
    interval = FETCH_INTERVAL;
    filteredTickers = [...tickers];
    socket.removeAllListeners('connection');
  });
});

server.listen(PORT, () => {
  console.log(`Streaming service is running on http://localhost:${PORT}`);
});
