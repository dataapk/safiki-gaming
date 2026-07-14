/* 1. DOM Elements Selection & Global Variables */
const allMenus = document.querySelectorAll('.dropdown-menu');
let currentPrices = { "ada": 200, "btc": 100, "eth": 0, "usdt": 1, "doge": 0, "trx": 0 };
let timeLeft = 30;

/* 2. API & Rates Management */
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

/* 3. Icons Update Function (আপনার রিকোয়েস্ট অনুযায়ী) */
function updateIcons() {
    // FROM কারেন্সি ইমেজ আপডেট
    const fromSelect = document.getElementById('from-currency');
    const fromIcon = document.getElementById('from-icon');
    const fromOption = fromSelect.options[fromSelect.selectedIndex];
    if (fromOption && fromIcon) {
        fromIcon.src = fromOption.getAttribute('data-img');
    }

    // TO কারেন্সি ইমেজ আপডেট
    const toSelect = document.getElementById('to-currency');
    const toIcon = document.getElementById('to-icon');
    const toOption = toSelect.options[toSelect.selectedIndex];
    if (toOption && toIcon) {
        toIcon.src = toOption.getAttribute('data-img');
    }
    
    // ব্যালেন্স এবং লিমিটের আইকন আপডেট (যদি প্রয়োজন হয়)
    const balanceIcon = document.getElementById('balance-icon');
    if (balanceIcon && fromOption) balanceIcon.src = fromOption.getAttribute('data-img');
    
    console.log("Icons updated successfully");
}

/* 4. Exchange & Calculations */
function calculateExchange() {
    const fromVal = parseFloat(document.getElementById('from-amount').value) || 0;
    const fromCurr = document.getElementById('from-currency').value;
    const toCurr = document.getElementById('to-currency').value;

    const fromPrice = currentPrices[fromCurr] || 0;
    const toPrice = currentPrices[toCurr] || 0;
    
    const grossResult = (fromVal * fromPrice) / toPrice;
    const netResult = grossResult * 0.95; // ৫% ফি বাদ দিয়ে

    const toAmountDisplay = document.getElementById('to-amount');
    if (toAmountDisplay) toAmountDisplay.innerText = netResult.toFixed(8);
}

/* 5. Event Listeners (এটি ফাইলের শেষে রাখা ভালো) */
document.addEventListener('DOMContentLoaded', () => {
    const fromAmount = document.getElementById('from-amount');
    const fromCurr = document.getElementById('from-currency');
    const toCurr = document.getElementById('to-currency');

    if(fromAmount) fromAmount.addEventListener('input', () => { calculateExchange(); checkMinimumLimit(); });
    if(fromCurr) fromCurr.addEventListener('change', () => { updateIcons(); calculateExchange(); });
    if(toCurr) toCurr.addEventListener('change', () => { updateIcons(); calculateExchange(); });
});

/* [বাকি ফাংশনগুলো এখানে যথারীতি বসবে...] */
// নিশ্চিত করুন যে প্রতিটি ফাংশন যেন এই রকম হয়: function name() { ... } 
// এবং ফাইলের শেষে অতিরিক্ত কোনো } নেই।
