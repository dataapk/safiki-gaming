/* 1. DOM Elements Selection */
const allMenus = document.querySelectorAll('.dropdown-menu');

/* --- API & Global Variables --- */
let currentPrices = { "ada": 200, "btc": 100, "eth": 0, "usdt": 1, "doge": 0, "trx": 0 };
let timeLeft = 30;

/* --- API Functions --- */
async function fetchLiveRates() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=cardano,bitcoin,ethereum,tether,dogecoin,tron&vs_currencies=usd');
        const data = await response.json();
        currentPrices = {
            "ada": data.cardano.usd, "btc": data.bitcoin.usd, "eth": data.ethereum.usd,
            "usdt": data.tether.usd, "doge": data.dogecoin.usd, "trx": data.tron.usd
        };
        calculateExchange();
    } catch (error) { console.error("Error fetching rates:", error); }
}

setInterval(fetchLiveRates, 60000);
fetchLiveRates();

/* --- Core Functions (সবগুলো এখানে আছে) --- */

function headerDropdownMenu(id, event) {
    if (event) event.stopPropagation();
    const menu = document.getElementById(id);
    allMenus.forEach(m => { if (m.id !== id) m.style.display = 'none'; });
    if (menu) menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
}

function updateIcons() {
    const fromSelect = document.getElementById('from-currency');
    const fromIcon = document.getElementById('from-icon');
    if (fromSelect && fromIcon) fromIcon.src = fromSelect.options[fromSelect.selectedIndex].getAttribute('data-img');
    
    const toSelect = document.getElementById('to-currency');
    const toIcon = document.getElementById('to-icon');
    if (toSelect && toIcon) toIcon.src = toSelect.options[toSelect.selectedIndex].getAttribute('data-img');
}

function calculateExchange() {
    const fromVal = parseFloat(document.getElementById('from-amount').value) || 0;
    const fromCurr = document.getElementById('from-currency').value;
    const toCurr = document.getElementById('to-currency').value;
    const fromPrice = currentPrices[fromCurr] || 0;
    const toPrice = currentPrices[toCurr] || 0;
    const grossResult = (fromVal * fromPrice) / toPrice;
    const netResult = grossResult * 0.95; 
    const toAmountDisplay = document.getElementById('to-amount');
    if (toAmountDisplay) toAmountDisplay.innerText = netResult.toFixed(8);
}

function checkMinimumLimit() {
    // তোমার আগের কোড থেকে আনা মিনিমাম লিমিট চেক লজিক
    const fromCurrency = document.getElementById('from-currency').value;
    const price = currentPrices[fromCurrency] || 1;
    const minAmount = 10 / price;
    const amountInput = parseFloat(document.getElementById('from-amount').value) || 0;
    const minAmountElement = document.getElementById('min-amount');
    if (minAmountElement) minAmountElement.innerText = `Min: ${minAmount.toFixed(4)} ${fromCurrency.toUpperCase()}`;
}

function setMax() {
    const userBalance = 0.00174269; 
    document.getElementById('from-amount').value = userBalance;
    checkMinimumLimit();
    calculateExchange();
}

function swapCoins() {
    const fromSelect = document.getElementById('from-currency');
    const toSelect = document.getElementById('to-currency');
    let temp = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = temp;
    updateIcons();
    calculateExchange();
}

function closeExchange() {
    document.getElementById('exchange-box').style.display = 'none';
}

function processExchange() {
    const amount = document.getElementById('from-amount').value;
    alert("Exchange processed for " + amount);
}

function showTab(tabId) {
    document.querySelectorAll('.crypto-grid').forEach(c => c.style.display = 'none');
    document.getElementById('address-box').style.display = 'none';
    document.getElementById('withdraw-input-box').style.display = 'none';
    document.getElementById('exchange-box').style.display = 'none';
    const target = document.getElementById(tabId);
    if (target) target.style.display = 'grid';
}

window.onclick = function(event) {
    const isClickInside = event.target.closest('.dropdown-menu');
    const isClickOnButton = event.target.closest('[onclick]');
    if (!isClickInside && !isClickOnButton) {
        allMenus.forEach(m => m.style.display = 'none');
    }
};
