/* 1. DOM Elements Selection */
const allMenus = document.querySelectorAll('.dropdown-menu');
const fromAmountInput = document.getElementById('from-amount');
const fromCurrencySelect = document.getElementById('from-currency');
const toCurrencySelect = document.getElementById('to-currency');

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

/* 2. Main Logic: Header Dropdown Handler */
function headerDropdownMenu(id, event) {
    if (event) event.stopPropagation();
    const menu = document.getElementById(id);
    allMenus.forEach(m => { if (m.id !== id) m.style.display = 'none'; });
    if (menu) menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
}

/* 3. Currency & Icons Update */
function updateIcons() {
    const selects = [
        { sel: 'from-currency', icon: 'from-icon' },
        { sel: 'to-currency', icon: 'to-icon' }
    ];
    selects.forEach(item => {
        const select = document.getElementById(item.sel);
        const icon = document.getElementById(item.icon);
        const option = select.options[select.selectedIndex];
        if (option && icon) icon.src = option.getAttribute('data-img');
    });
}

/* 4. Exchange & Calculations */
function calculateExchange() {
    const fromVal = parseFloat(document.getElementById('from-amount').value) || 0;
    const fromCurr = document.getElementById('from-currency').value;
    const toCurr = document.getElementById('to-currency').value;
    const fromPrice = currentPrices[fromCurr] || 0;
    const toPrice = currentPrices[toCurr] || 0;
    const grossResult = (fromVal * fromPrice) / toPrice;
    const netResult = grossResult * 0.95; // 5% fee
    const toAmountDisplay = document.getElementById('to-amount');
    if (toAmountDisplay) toAmountDisplay.innerText = netResult.toFixed(8);
}

/* 5. Wallet & UI Management */
function selectCurrency(name, img, balance) {
    const headerImg = document.getElementById('selected-currency-img');
    const headerBalance = document.getElementById('selected-balance');
    if (headerImg) headerImg.src = img;
    if (headerBalance) headerBalance.innerText = balance;
    headerDropdownMenu('currency-menu');
}

function openWalletTab(action) {
    headerDropdownMenu('wallet-menu');
}

function showTab(tabId) {
    document.querySelectorAll('.crypto-grid').forEach(c => c.style.display = 'none');
    document.getElementById('address-box').style.display = 'none';
    document.getElementById('withdraw-input-box').style.display = 'none';
    document.getElementById('exchange-box').style.display = 'none';
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

    if (tabId === 'exchange') {
        document.getElementById('exchange-box').style.display = 'block';
    } else {
        const targetTab = document.getElementById(tabId);
        if (targetTab) targetTab.style.display = 'grid';
    }
}

/* 6. Helpers & Listeners */
function setMax() {
    const userBalance = 0.00174269;
    document.getElementById('from-amount').value = userBalance;
    checkMinimumLimit();
    calculateExchange();
}

window.onclick = function(event) {
    const isClickInside = event.target.closest('.dropdown-menu');
    const isClickOnButton = event.target.closest('[onclick]');
    if (!isClickInside && !isClickOnButton) {
        allMenus.forEach(m => m.style.display = 'none');
    }
};

/* Event Listeners Initialization */
document.addEventListener('DOMContentLoaded', () => {
    if(fromAmountInput) fromAmountInput.addEventListener('input', () => { calculateExchange(); checkMinimumLimit(); });
    if(fromCurrencySelect) fromCurrencySelect.addEventListener('change', () => { updateIcons(); calculateExchange(); });
    if(toCurrencySelect) toCurrencySelect.addEventListener('change', () => { updateIcons(); calculateExchange(); });
});
