const express = require('express');
const path = require('path');
const stocks = require('./stocks');

const app = express();
app.use(express.static(path.join(__dirname, 'static')));

app.get('/stocks', async (req, res) => {
  try {
    const stockSymbols = await stocks.getStocks();
    res.send({ stockSymbols });
  } catch (error) {
    console.error('Error fetching stock symbols:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/stocks/:symbol', async (req, res) => { //Returns the list of available stocks (stocks array)
  const { params: { symbol } } = req;
  console.log(symbol)
  console.log(stocks.FAILUE_RATE)
  stockInfo = await stocks.getStocks() // Generates data points for a specific stock at a given timestamp
  console.log(stockInfo)
  try {
    if (Math.random() < stocks.FAILUE_RATE) {
      throw new Error('Failed to generate stock data');
    }
    if (!stockInfo.includes(symbol)) {
      throw new Error(`Unknown stock ${symbol}`);
    }
    stockData = await stocks.getStockPoints(symbol, new Date()) 

    res.send(stockData);
  } catch (error) {
    console.error(`Error generating stock data for ${symbol}:`, error);
    res.status(500).send('Failed to generate requested stock data'); // If stock data retrieval fails for 10% this error message is displayed
  }
});

app.listen(3000, () => console.log('Server is running!'));