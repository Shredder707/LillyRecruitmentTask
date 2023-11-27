import { getStocks, getStockPoints } from './stocks.js'; //Imports these 2 functions from stocks.js
const canvas = document.getElementById('chart')
const ctx = canvas.getContext('2d')


function drawLine (start, end, style) {
  ctx.beginPath()
  ctx.strokeStyle = style || 'black'
  ctx.moveTo(...start)
  ctx.lineTo(...end)
  ctx.stroke()
}

function drawTriangle (apex1, apex2, apex3) {
  ctx.beginPath()
  ctx.moveTo(...apex1)
  ctx.lineTo(...apex2)
  ctx.lineTo(...apex3)
  ctx.fill()
}

drawLine([50, 50], [50, 550])
drawTriangle([35, 50], [65, 50], [50, 35])

drawLine([50, 550], [950, 550])
drawTriangle([950, 535], [950, 565], [965, 550])

// Asynchronously fetch and display stock data
async function fetchData() {
  try {
    // Get the list of available stocks
    const stocks = await getStocks();

    // Check if stocks are available
    if (stocks.length > 0) {
      // Fetch and display data for each stock
      for (const stock of stocks) {
        try {
          const stockData = await getStockPoints(stock, new Date());
          console.log(`Data for ${stock}:`, stockData);
        } catch (error) {
          console.error(`Error fetching data for ${stock}:`, error);
        }
      }

      // Hide the spinner after loading data
      document.querySelector('.spinner').style.display = 'none';
    } else {
      console.log('No available stocks.');
    }
  } catch (error) {
    console.error('Error fetching stocks:', error);
  }
}

// Call the fetchData function when the script is loaded
fetchData();