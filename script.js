const gridViewTab = document.getElementById('gridViewTab');
const listViewTab = document.getElementById('listViewTab');
const dataContainer = document.getElementById('dataContainer');
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
      <img src="${crypto.image}" alt="${crypto.name}">
      <h3>${crypto.name}</h3>
      <p>Price: $${crypto.current_price}</p>
      <p>Market Cap: $${crypto.market_cap}</p>
      <p>24h Change: ${crypto.price_change_percentage_24h}%</p>
    `;
    dataContainer.appendChild(card);
  });
}

function renderListView() {
  dataContainer.innerHTML = `
    <table>
      <tr>
        <th>Name</th>
        <th>Price</th>
        <th>Market Cap</th>
        <th>24h Change</th>
      </tr>
      ${cryptocurrencyData.map(crypto => `
        <tr>
          <td><img src="${crypto.image}" alt="${crypto.name}"> ${crypto.name}</td>
          <td>$${crypto.current_price}</td>
          <td>$${crypto.market_cap}</td>
          <td>${crypto.price_change_percentage_24h}%</td>
        </tr>
      `).join('')}
    </table>
  `;
}

async function init() {
  cryptocurrencyData = await fetchData();
  renderGridView();

  gridViewTab.addEventListener('click', () => {
    gridViewTab.classList.add('active');
    listViewTab.classList.remove('active');
    renderGridView();
  });

  listViewTab.addEventListener('click', () => {
    listViewTab.classList.add('active');
    gridViewTab.classList.remove('active');
    renderListView();
  });
}

init();