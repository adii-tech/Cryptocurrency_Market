const gridViewTab = document.getElementById('gridViewTab');
const listViewTab = document.getElementById('listViewTab');
const dataContainer = document.getElementById('dataContainer');
const dataContainer01 = document.getElementById('sec');
let cryptocurrencyData = [];

async function fetchData() {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en');
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);

  }
}

function renderGridView() {
  dataContainer.innerHTML = '';
  cryptocurrencyData.forEach(crypto => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
  
      <div class="grid">
            <div class="divg1">
               <img src = "${crypto.image}" alt="${crypto.name}"/>
               <div class="coin">
                <div class="coinSign">${crypto.symbol}</div>
                <div class="coinName">${crypto.name}</div>
              </div>
            </div>
            <div class="divg2">
              <p><span>${crypto.price_change_percentage_24h}%<span></p>
            </div>
            <div class="divg3">$ ${crypto.current_price}</div>
            <div class="divg4">Total Volume: ${crypto.total_volume}</div>
            <div class="divg5">Market Cap:$ ${crypto.market_cap}</div>
        </div>
    `;
    dataContainer01.appendChild(card);
  });
}

function renderListView() {
  dataContainer.innerHTML = `
      ${cryptocurrencyData.map(crypto => `
        <div class="list-data">
        <div class="list-list">
            <div class="div1">
               <img src = "${crypto.image}" alt="${crypto.name}"/>
               <div class="coin">
                <div class="coinSign">${crypto.symbol}</div>
                <div class="coinName">${crypto.name}</div>
              </div>
            </div>
            <div class="div2">
              <p><span>${crypto.price_change_percentage_24h}%</span></p>
            </div>
            <div class="div3">$ ${crypto.current_price}</div>
            <div class="div4">${crypto.total_volume}</div>
            <div class="div5">$ ${crypto.market_cap}</div>
        </div>
      </div>
      `).join('')}
  `;
}

async function init() {
  cryptocurrencyData = await fetchData();
  renderGridView();

  const line = document.createElement('div');
  line.classList.add('line1');
  
  gridViewTab.addEventListener('click', () => {
    renderGridView();
    gridViewTab.classList.add('active');
    listViewTab.classList.remove('active');
    gridViewTab.appendChild(line);
    listViewTab.removeChild(line);
    
  });

  listViewTab.addEventListener('click', () => {
    renderListView();
    listViewTab.classList.add('active');
    gridViewTab.classList.remove('active');
    listViewTab.appendChild(line);
    gridViewTab.removeChild(line);
    
  });
}

init();