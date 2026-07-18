/* 1. DOM Elements Selection */
const allMenus = document.querySelectorAll('.dropdown-menu');

/* --- API & Global Variables --- */
/* --- গ্লোবাল ভেরিয়েবলসমূহ (এটি তোমার ফাইলের শুরুতে একবারই থাকবে)-- */

// ১. এটি মার্কেট রেট (ক্যালকুলেশনের জন্য)
let currentPrices = { 
    "ada": 1.5, 
    "btc": 65000, 
    "usdt": 1.0 
};

// ২.এটি ইউজারের ব্যক্তিগত ব্যালেন্স (ম্যাক্স বাটনের জন্য)
let userBalances = { 
    "ada": 1500.50, 
    "btc": 0.05, 
    "eth": 1.2, 
    "usdt": 2000.00, 
    "doge": 5000.00, 
    "trx": 3000.00 
};
let timeLeft = 30; // এখানে এটি ডিফাইন করে দাও
/* --- ব্যালেন্স এবং কারেন্সি আপডেট ডিসপ্লে --- */
function updateDisplayedBalance() {
    // ১. ইউজার বর্তমানে কোন কারেন্সি সিলেক্ট করে আছে তা নেওয়া
    const fromCurrency = document.getElementById('from-currency').value;
    
    // ২. আমাদের গ্লোবাল ডাটাবেস থেকে ব্যালেন্স খুঁজে নেওয়া
    const balance = userBalances[fromCurrency] || 0;
    
    // ৩. স্ক্রিনের যে এলিমেন্টে ব্যালেন্স দেখাবে সেটি খুঁজে বের করা
    // ধরে নিলাম তোমার এইচটিএমএল-এ <span id="user-balance">...</span> নামে একটা জায়গা আছে
    const balanceDisplay = document.getElementById('user-balance');
    
    if (balanceDisplay) {
        // ব্যালেন্সটি টেক্সট হিসেবে বসানো
        balanceDisplay.innerText = `Balance: ${balance} ${fromCurrency.toUpperCase()}`;
    }
}


/* --- ইভেন্ট লিসেনার: কারেন্সি পাল্টালেই যেন ব্যালেন্স আপডেট হয় --- */
document.getElementById('from-currency').addEventListener('change', function() {
    updateDisplayedBalance(); // ব্যালেন্স টেক্সট আপডেট করবে
    // এখানে চাইলে তুমি প্রাইস ক্যালকুলেশন ফাংশনটিও কল করতে পারো
    if (typeof calculateExchange === 'function') {
        calculateExchange();
    }
});

// API থেকে লাইভ রেট আনার ফাংশন
async function fetchLiveRates() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=cardano,bitcoin,ethereum,tether,dogecoin,tron&vs_currencies=usd');
        const data = await response.json();
        
        currentPrices = {
            "ada": data.cardano.usd,
            "btc": data.bitcoin.usd,
            "eth": data.ethereum.usd,
            "usdt": data.tether.usd,
            "doge": data.dogecoin.usd,
            "trx": data.tron.usd
        };
        console.log("Rates Updated:", currentPrices);
        
        // রেট আপডেট হলে সাথে সাথে ক্যালকুলেশন আপডেট করে দেবে
        calculateExchange(); 
    } catch (error) {
        console.error("Error fetching rates:", error);
    }
}

// ৬০ সেকেন্ড পর পর রেট আপডেট করার লজিক
setInterval(fetchLiveRates, 60000);
fetchLiveRates(); // প্রথমবার পেজ লোড হওয়ার সাথে সাথে কল হবে

/* 2. Main Logic: Header Dropdown Handler */
/* হেডার এবং নোটিফিকেশনের সব ড্রপডাউন হ্যান্ডেল করার জন্য সম্মিলিত ফাংশন */
/* ১. ড্রপডাউন মেনু হ্যান্ডলার (এটি সব মেনুর জন্যই কাজ করবে) */
/* 2. Main Logic: Header Dropdown Handler (Updated) */
function headerDropdownMenu(id, event) {
    if (event) event.stopPropagation();
    
    const menu = document.getElementById(id);
    const allMenus = document.querySelectorAll('.dropdown-menu');
    
    // অন্য সব মেনু বন্ধ করা
    allMenus.forEach(m => {
        if (m.id !== id) {
            m.style.display = 'none';
        }
    });

    if (menu) {
        // যদি মেনুটা এখন 'none' থাকে (অথবা এমটি স্ট্রিং), তবে সেটাকে খুলতে হবে
        if (menu.style.display === 'none' || menu.style.display === '') {
            // নোটিফিকেশনের জন্য flex, অন্যদের জন্য block
            menu.style.display = (id === 'notif-menu') ? 'flex' : 'block';
        } else {
            // যদি আগে থেকেই খোলা থাকে, তবে বন্ধ করে দিবে
            menu.style.display = 'none';
        }
    }
}

/* ২. কারেন্সি সিলেকশন ফাংশন */
function selectCurrency(name, img, balance) {
    const headerImg = document.getElementById('selected-currency-img');
    if (headerImg) {
        headerImg.src = img;
        headerImg.alt = name;
    }

    const headerBalance = document.getElementById('selected-balance');
    if (headerBalance) {
        headerBalance.innerText = balance;
    }

    // ড্রপডাউন মেনু ক্লোজ করা
    headerDropdownMenu('currency-menu');
}

/* ৩. গ্লোবাল ক্লিক হ্যান্ডলার (এটি ঠিক করো) */
document.addEventListener('click', function(event) {
    const allMenus = document.querySelectorAll('.dropdown-menu');
    
    // যদি ক্লিক করা এলিমেন্টটি ড্রপডাউনের ভেতরে হয়, তবে মেনু বন্ধ হবে না
    // এটি তোমার সব মেনুকে কাজ করতে সাহায্য করবে
    allMenus.forEach(m => {
        // যদি ক্লিকটা মেনুর ভেতরে না হয়, তাহলেই শুধু মেনু বন্ধ হবে
        if (!m.contains(event.target)) {
            m.classList.remove('show');
        }
    });
});

/* 4. Wallet Actions: ট্যাব ওপেন করা */
function openWalletTab(action) {
    console.log("Wallet Action: " + action);
    // এখানে তোমার ডিপোজিট/উইথড্র মোডাল বা পেজ নেভিগেশন লজিক হবে
    headerDropdownMenu('wallet-menu');
}

/* 5. Close on Outside Click (যে কোনো খালি জায়গায় ক্লিক করলে মেনু বন্ধ হবে) */
/* সম্পূর্ণ আপডেট করা উইন্ডো অনক্লিক হ্যান্ডলার */
window.onclick = function(event) {
    // ১. চেক করো ক্লিকটি কোনো ড্রপডাউন মেনুর ভেতরে হয়েছে কি না
    const isClickInsideMenu = event.target.closest('.dropdown-menu');
    
    // ২. চেক করো ক্লিকটি মেনু খোলার বাটনের ওপর হয়েছে কি না 
    // (যেকোনো এলিমেন্ট যেটাতে onclick ফাংশন আছে)
    const isClickOnButton = event.target.onclick !== null || event.target.closest('[onclick]');

    // ৩. যদি ক্লিক মেনুর ভেতরে না হয় এবং বাটনের ওপরও না হয়, তবেই সব মেনু বন্ধ হবে
    if (!isClickInsideMenu && !isClickOnButton) {
        allMenus.forEach(m => {
            m.style.display = 'none';
        });
    }
}
// ২. সর্টিং ফাংশন (Sort Amount & Alpha)
function sortAssets(type) {
    const menu = document.getElementById('currency-menu');
    const items = Array.from(menu.querySelectorAll('.currency-option'));

    items.sort((a, b) => {
        if (type === 'alpha') {
            const nameA = a.querySelector('.name').innerText;
            const nameB = b.querySelector('.name').innerText;
            return nameA.localeCompare(nameB);
        } else if (type === 'amount') {
            const valA = parseFloat(a.querySelector('.balance').innerText.replace('$', ''));
            const valB = parseFloat(b.querySelector('.balance').innerText.replace('$', ''));
            return valB - valA; // বড় থেকে ছোট (Descending)
        }
    });

    items.forEach(item => menu.appendChild(item));
}

// ৩. ফেভারিট ফিল্টার ফাংশন
function filterFavorites() {
    const headerIcon = document.getElementById('header-fav-icon');
    const items = document.querySelectorAll('.currency-option');
    
    headerIcon.classList.toggle('fas');
    headerIcon.classList.toggle('far');
    headerIcon.classList.toggle('active');

    const isFavMode = headerIcon.classList.contains('active');

    items.forEach(item => {
        const favBtn = item.querySelector('.fav-btn');
        const isFavorited = favBtn.classList.contains('active');

        if (isFavMode) {
            item.style.display = isFavorited ? 'flex' : 'none';
        } else {
            item.style.display = 'flex';
        }
    });
}

// ৪. হাইড এমটি (Hide Empty) ফাংশন
function filterAssets() {
    const isChecked = document.getElementById('hide-empty-check').checked;
    const items = document.querySelectorAll('.currency-option');
    
    items.forEach(item => {
        const balanceText = item.querySelector('.balance').innerText;
        const balance = parseFloat(balanceText.replace('$', ''));
        
        if (isChecked && balance === 0) {
            item.style.display = 'none';
        } else {
            item.style.display = 'flex';
        }
    });
}

// ৫. ইনডিভিজুয়াল ফেভারিট টগল ফাংশন
function toggleFavorite(element, event) {
    event.stopPropagation();
    element.classList.toggle('fas');
    element.classList.toggle('far');
    element.classList.toggle('active');
}
// ৫. WALLET DROPDOWN DEPOSIT WITHDRAW
let currentTab = 'deposit'; // ডিফল্ট ট্যাব

function showTab(tabId) {
    // ১. সব গ্রিড হাইড করা
    document.querySelectorAll('.crypto-grid').forEach(content => {
        content.style.display = 'none';
    });
    
    // ২. সব বক্স হাইড করা (address-box, withdraw-box, exchange-box)
    document.getElementById('address-box').style.display = 'none';
    document.getElementById('withdraw-input-box').style.display = 'none';
    document.getElementById('exchange-box').style.display = 'none';

    // ৩. বাটন থেকে 'active' ক্লাস সরানো
    document.querySelectorAll('.tab-btn').forEach(button => {
        button.classList.remove('active');
    });

    // ৪. লজিক: কোনটা শো করতে হবে
    if (tabId === 'exchange') {
        document.getElementById('exchange-box').style.display = 'block';
    } else {
        const targetTab = document.getElementById(tabId);
        if (targetTab) {
            targetTab.style.display = 'grid';
        }
    }

    // ৫. বাটনে 'active' ক্লাস যোগ করা
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
}


function selectCrypto(coinName, address) {
    // ১. বর্তমান ট্যাব (deposit/withdraw/exchange) লুকিয়ে ফেলা
    const activeGrid = document.getElementById(currentTab);
    if (activeGrid) {
        activeGrid.style.display = 'none';
    }
    
    // ২. অ্যাড্রেস বক্স দেখানো
    const addrBox = document.getElementById('address-box');
    if (addrBox) {
        addrBox.style.display = 'grid';
    }
    
    // ৩. ডাটা আপডেট করা
    const title = document.getElementById('coin-title');
    const addr = document.getElementById('wallet-address');
    if (title) title.innerText = coinName;
    if (addr) addr.innerText = address;
}

function goBack() {
    // ১. অ্যাড্রেস বক্স হাইড করা
    const addrBox = document.getElementById('address-box');
    if (addrBox) {
        addrBox.style.display = 'none';
    }
    
    // ২. বর্তমান ট্যাবটি আবার শো করা
    const activeGrid = document.getElementById(currentTab);
    if (activeGrid) {
        activeGrid.style.display = 'grid';
    }
}
// ১. অ্যাড্রেস বক্স হাইড করা
// নেটওয়ার্ক অনুযায়ী অ্যাড্রেস ডাটাবেস (সহজ ভার্সন)
const cryptoData = {
    'USDT': {
        'ERC20': '0x4FB74...0450252',
        'TRC20': 'TX12345...67890',
        'BEP20': '0xB1234...99999'
    }
    // অন্য কারেন্সিগুলো এখানে এভাবে যোগ করবে
};

function updateAddress() {
    const network = document.getElementById('network-select').value;
    const addressSpan = document.getElementById('wallet-address');
    
    // এখানে নেটওয়ার্ক অনুযায়ী অ্যাড্রেস আপডেট হবে
    addressSpan.innerText = cryptoData['USDT'][network]; 
}

function copyAddress() {
    const address = document.getElementById('wallet-address').innerText;
    navigator.clipboard.writeText(address);
    alert("Address Copied!");
}

function selectCrypto(coinName, address) {
    document.querySelectorAll('.crypto-grid').forEach(g => g.style.display = 'none');
    const addrBox = document.getElementById('address-box');
    addrBox.style.display = 'block';
    
    document.getElementById('coin-title').innerText = coinName + " Deposit";
    document.getElementById('wallet-address').innerText = address;
}

// উইথড্র সেকশন সিলেক্ট করার ফাংশন
function selectWithdraw(coinName) {
    // ১. উইথড্র মেইন গ্রিড লুকানো
    document.getElementById('withdraw').style.display = 'none';
    
    // ২. উইথড্র ইনপুট বক্স দেখানো
    document.getElementById('withdraw-input-box').style.display = 'block';
    
    // ৩. টাইটেল আপডেট
    document.getElementById('withdraw-coin-title').innerText = coinName + " Withdraw";
}

// উইথড্র থেকে ব্যাক করার ফাংশন
function goBackFromWithdraw() {
    document.getElementById('withdraw-input-box').style.display = 'none';
    document.getElementById('withdraw').style.display = 'grid';
}

// উইথড্র কনফার্ম বাটন ফাংশন
function processWithdraw() {
    const address = document.getElementById('withdraw-address').value;
    const password = document.getElementById('withdraw-password').value;
    
    if (address === "" || password === "") {
        alert("দয়া করে অ্যাড্রেস এবং পাসওয়ার্ড পূরণ করুন!");
        return;
    }
    
    // এখানে তোমার উইথড্র রিকোয়েস্ট পাঠানোর এপিআই কল বা লজিক বসাবে
    console.log("Withdraw Request:", { address, password });
    alert("আপনার উইথড্র রিকোয়েস্টটি সফলভাবে পাঠানো হয়েছে!");
}
// CLOSE ALL PAGE

function closeAll() {
    // সব গ্রিড এবং বক্স হাইড করে দেওয়া
    document.querySelectorAll('.crypto-grid').forEach(el => el.style.display = 'none');
    document.getElementById('address-box').style.display = 'none';
    document.getElementById('withdraw-input-box').style.display = 'none';
    
    // অথবা যদি তোমার পুরো ওয়ালেট সেকশনটা একটা মেইন ডিভ-এ থাকে, সেটা হাইড করতে পারো
    // document.getElementById('main-wallet-container').style.display = 'none';
}
// এক্সচেঞ্জ বক্স ওপেন করার জন্য
function openExchange() {
    // সব বক্স হাইড করা
    document.querySelectorAll('.crypto-grid').forEach(el => el.style.display = 'none');
    document.getElementById('address-box').style.display = 'none';
    document.getElementById('withdraw-input-box').style.display = 'none';
    
    // মেইন মেনু হাইড করা (যদি থাকে)
    const mainMenu = document.getElementById('main-menu');
    if (mainMenu) mainMenu.style.display = 'none';
    
    // এক্সচেঞ্জ বক্স দেখানো
    document.getElementById('exchange-box').style.display = 'block';
}

// এক্সচেঞ্জ থেকে ফিরে আসার জন্য
function goBackFromExchange() {
    document.getElementById('exchange-box').style.display = 'none';
    
    // আবার মেইন মেনু দেখানো
    const mainMenu = document.getElementById('main-menu');
    if (mainMenu) mainMenu.style.display = 'block';
    
    // ডিফল্ট ট্যাবটি আবার শো করা (যেমন: deposit)
    document.getElementById('deposit').style.display = 'grid';
}

// ১. এক্সচেঞ্জ বক্স ক্লোজ করার ফাংশন
function closeExchange() {
    document.getElementById('exchange-box').style.display = 'none';
    console.log("Exchange box closed");
}

// ২. সোয়াপ (Swap) কয়েন ফাংশন
function swapCoins() {
    const fromSelect = document.getElementById('from-currency');
    const toSelect = document.getElementById('to-currency');
    
    // ভ্যালু অদলবদল
    let temp = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = temp;
    
    // আইকন ও ক্যালকুলেশন আপডেট
    updateIcons();
    calculateExchange();
    console.log("Coins swapped");
}

// ৩. ম্যাক্স (Max) ব্যালেন্স সেট করার ফাংশন
function setMax() {
    // ১. ইউজার বর্তমানে কোন কারেন্সি সিলেক্ট করে আছে তা নেওয়া
    const fromCurrency = document.getElementById('from-currency').value;
    
    // ২. গ্লোবাল ডাটাবেস থেকে ব্যালেন্স নেওয়া
    // '|| 0' দেওয়ার মানে হলো, যদি ব্যালেন্স না পাওয়া যায় তবে এটি ০ ধরে নেবে
    const balance = userBalances[fromCurrency] || 0;
    
    // ৩. ইনপুট বক্সে ব্যালেন্সটি বসানো
    const amountInput = document.getElementById('from-amount');
    amountInput.value = balance;
    
    // ৪. ব্যালেন্স পরিবর্তনের সাথে সাথে এক্সচেঞ্জ ক্যালকুলেশন আপডেট করা
    if (typeof checkMinimumLimit === 'function') {
        checkMinimumLimit();
    }
    
    if (typeof calculateExchange === 'function') {
        calculateExchange();
    }
}


// ১. কারেন্সি অনুযায়ী রেট ও লিমিট আপডেট করার ফাংশন
function updateStatLimits() {
    const fromCurrency = document.getElementById('from-currency').value;
    const price = currentPrices[fromCurrency] || 1;
    
    // লিমিট (ডলারে)
    const minUSD = 5;
    const maxUSD = 20000;
    
    const minAmount = minUSD / price;
    const maxAmount = maxUSD / price;
    
    const currencyLabel = fromCurrency.toUpperCase();
    
    // UI-তে ভ্যালু বসানো
    const minEl = document.getElementById('stat-min');
    const maxEl = document.getElementById('stat-max');
    
    if(minEl) minEl.innerText = `${minAmount.toFixed(4)} ${currencyLabel}`;
    if(maxEl) maxEl.innerText = `${maxAmount.toFixed(2)} ${currencyLabel}`;
    
    console.log("Stat Limits updated for:", currencyLabel);
}
function checkMinimumLimit() {
    const fromCurrency = document.getElementById('from-currency').value; 
    const currencyName = fromCurrency.toUpperCase();
    const price = currentPrices[fromCurrency] || 1;
    const minAmount = 10 / price;
    
    let decimals = 4;
    if (fromCurrency === 'btc' || fromCurrency === 'eth') {
        decimals = 6;
    }

    const message = `Min: ${minAmount.toFixed(decimals)} ${currencyName} ($10)`;
    const minAmountElement = document.getElementById('min-amount');
    
    if (minAmountElement) {
        minAmountElement.innerText = message;
        
        const amountInput = parseFloat(document.getElementById('from-amount').value) || 0;
        
        if (amountInput > 0 && amountInput < minAmount) {
            minAmountElement.style.color = "red"; 
        } else {
            minAmountElement.style.color = "#ffffff"; 
        }
    } 
} // এটা ফাংশন বন্ধ করল

function validateExchange(amount, minLimit) {
    const minAmountElement = document.getElementById('min-amount');
    const exchangeBtn = document.querySelector('.exchange-btn'); // তোমার এক্সচেঞ্জ বাটন

    // মিনিমাম অ্যামাউন্ট ১০ ডলার হতে হবে (তোমার শর্ত অনুযায়ী)
    const MIN_LIMIT = 10.00; 

    if (amount < MIN_LIMIT) {
        // ১০ ডলারের কম হলে:
        minAmountElement.innerText = "Min: " + MIN_LIMIT + " USD (Required)";
        minAmountElement.style.color = "red"; // টেক্সট লাল করে দিবে
        minAmountElement.style.fontWeight = "bold";
        
        // বাটন ডিজেবল করে দেওয়া যাতে ভুল ট্রানজ্যাকশন না হয়
        exchangeBtn.disabled = true;
        exchangeBtn.style.opacity = "0.5";
        
        return false; // লজিক আটকে দিবে
    } else {
        // ১০ ডলারের বেশি হলে:
        minAmountElement.innerText = "Min: " + minLimit + " ADA"; // অরিজিনাল ভ্যালু ফিরে আসবে
        minAmountElement.style.color = "#ffffff"; // রঙ ঠিক করে দিবে
        
        // বাটন আবার সচল করে দেওয়া
        exchangeBtn.disabled = false;
        exchangeBtn.style.opacity = "1";
        
        return true; // সব ঠিক আছে
    }
}

// ৪. এক্সচেঞ্জ প্রসেসিং ফাংশন
function processExchange() {
    // ১. প্রয়োজনীয় ডেটা সংগ্রহ
    const fromCurrency = document.getElementById('from-currency').value;
    const amount = parseFloat(document.getElementById('from-amount').value);
    const currencyName = fromCurrency.toUpperCase();
    
    // লাইভ রেট ও মিনিমাম লিমিট ক্যালকুলেশন
    const price = currentPrices[fromCurrency] || 1;
    const minAmount = 10 / price; 

    // ২. ভ্যালিডেশন চেক (যদি অ্যামাউন্ট ভুল বা কম হয়)
    if (!amount || amount < minAmount) {
        // মেসেজে একটু স্পেস দেওয়ার জন্য ${currencyName} এর আগে স্পেস রাখা হয়েছে
        alert(`Exchange failed: Minimum amount is ${minAmount.toFixed(4)} ${currencyName}`);
        return; // এখানেই থেমে যাবে, এক্সচেঞ্জ হবে না
    }
    
    // ৩. যদি ভ্যালিডেশন পাস করে (সব ঠিক থাকে), তবে নিচের লজিক চলবে
    // এখানে তোমার এক্সচেঞ্জ হওয়ার আসল এপিআই বা ডাটাবেজ কোডটি বসাবে
    
    alert("Exchange successful for " + amount + " " + currencyName + "!");
    console.log("Exchange processed for " + amount + " " + currencyName);
    
    // এখানে তোমার ব্যালেন্স আপডেটের কোড বা অন্যান্য ফাংশন কল করতে পারো
}
// ৫. রেট আপডেট ও টাইমার ফাংশন (প্রতি ৩০ সেকেন্ড)
function startRateTimer() {
    setInterval(() => {
        timeLeft--;
        const timerDisplay = document.getElementById('rate-timer');
        if (timerDisplay) timerDisplay.innerText = timeLeft;
        
        if (timeLeft <= 0) {
            fetchLiveRates();
            timeLeft = 30;
        }
    }, 1000);
}

// পেজ লোড হওয়ার সময় সব ইনিশিয়ালাইজ করা
window.onload = function() {
    fetchLiveRates();
    startRateTimer();
};

// ক্যালকুলেশন ফাংশন (৫% ফি সহ আপডেট করা হয়েছে)
function calculateExchange() {
    const fromVal = parseFloat(document.getElementById('from-amount').value) || 0;
    const fromCurr = document.getElementById('from-currency').value;
    const toCurr = document.getElementById('to-currency').value;

    // রেট বের করা
    const fromPrice = currentPrices[fromCurr] || 0;
    const toPrice = currentPrices[toCurr] || 0;
    
    // কনভার্সন ফর্মুলা: (fromAmount * fromPrice) / toPrice
    const grossResult = (fromVal * fromPrice) / toPrice;
   
       //--- ৫% এক্সচেঞ্জ ফি ক্যালকুলেশন ---
       //নিচে ৫% ফি কেটে নেওয়ার লজিকটি দেওয়া হলো।
       //আমরা মোট রেজাল্ট থেকে ৫% বাদ দিচ্ছি (অর্থাৎ ৯৫% রেজাল্ট দেখাচ্ছি)।
   
    const feePercentage = 0.05; 
    const netResult = grossResult * (1 - feePercentage);

    // নিচে রেজাল্ট বসানো (ইউজার শুধু ফি কাটার পরের অ্যামাউন্টটিই দেখতে পাবে)
    const toAmountDisplay = document.getElementById('to-amount');
    if (toAmountDisplay) {
        toAmountDisplay.innerText = netResult.toFixed(8);
    }
}
function updateStats(fromCurr, toCurr, fromVal, calculatedMax) {
    // এখানে তোমার ব্যালেন্স এবং লিমিটগুলো আপডেট হচ্ছে
    document.getElementById('user-balance').innerText = userBalance + " " + fromCurr.toUpperCase();
    document.getElementById('min-amount').innerText = "31.40 " + fromCurr.toUpperCase();
    
    // নিচে ম্যাক্স অ্যামাউন্ট হিসেবে ক্যালকুলেটেড ভ্যালু বা তোমার লজিক অনুযায়ী মান বসাও
    document.getElementById('max-amount').innerText = calculatedMax + " " + fromCurr.toUpperCase();
}

// ইনপুট বা ড্রপডাউনে কিছু পরিবর্তন হলে ক্যালকুলেশন কল হবে
document.getElementById('from-amount').addEventListener('input', calculateExchange);
document.getElementById('from-currency').addEventListener('change', calculateExchange);
document.getElementById('to-currency').addEventListener('change', calculateExchange);
// এই ফাংশনটি তোমার জাভাস্ক্রিপ্ট ফাইলে যোগ করো
function updatecurrencyIcons() {
    // ১. FROM কারেন্সির জন্য (ড্রপডাউনের পাশে)
    const fromSelect = document.getElementById('from-currency');
    const fromIcon = document.getElementById('from-icon');
    const fromOption = fromSelect.options[fromSelect.selectedIndex];
    
    if (fromOption) {
        const imageUrl = fromOption.getAttribute('data-img');
        fromIcon.src = imageUrl;

        // ২. নতুন সংযোজন: ইনপুট বক্সের পাশের লোগো আপডেট করা
        // ধরে নিচ্ছি তোমার ইনপুট বক্সের পাশের লোগোর ID 'input-from-icon'
        const inputFromIcon = document.getElementById('input-from-icon');
        if (inputFromIcon) {
            inputFromIcon.src = imageUrl;
        }
    }

    // ৩. TO কারেন্সির জন্য
    const toSelect = document.getElementById('to-currency');
    const toIcon = document.getElementById('to-icon');
    const toOption = toSelect.options[toSelect.selectedIndex];
    if (toOption) {
        toIcon.src = toOption.getAttribute('data-img');
    }
    
    console.log("Icons updated successfully");
}
// ২. NOTIFICATIONA  profile menu START
// নোটিফিকেশনের জন্য আলাদা ফাংশন
// নোটিফিকেশনের জন্য আলাদা ফাংশন
function toggleNotifMenu(event) {
    event.stopPropagation();
    const menu = document.getElementById('notif-popup');
    const profile = document.getElementById('profile-popup');
    profile.style.display = 'none'; // অন্য মেনু বন্ধ
    menu.style.display = (menu.style.display === 'flex') ? 'none' : 'flex';
}

// প্রোফাইলের জন্য আলাদা ফাংশন
function toggleProfileMenu(event) {
    event.stopPropagation();
    const menu = document.getElementById('profile-popup');
    const notif = document.getElementById('notif-popup');
    notif.style.display = 'none'; // অন্য মেনু বন্ধ
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
}
// ==============================
// PROFILE SUB  START
// ==============================

function toggleProfileSubmenu(event) {

    event.stopPropagation();

    const submenu = document.getElementById("profile-submenu");
    const arrow = document.querySelector(".profile-arrow");

    if (submenu.style.display === "block") {

        submenu.style.display = "none";
        arrow.classList.remove("rotate");

    } else {

        submenu.style.display = "block";
        arrow.classList.add("rotate");

    }

}
// Open Account Information Page
function openAccountInfo() {

    // Hide other pages if needed
    const accountSection = document.getElementById("account-info-section");

    if(accountSection){

        accountSection.style.display = "block";

        // Load user data
        loadAccountInfo();

    } else {

        console.log("Account Information section not found");

    }

}

/* ---------- CLOSE ---------- */

function closeAccountInfo(){

    document.getElementById("account-info-section").style.display="none";

}

// Load User Information from Supabase
async function loadAccountInfo(){

    try {

        const {
            data: {
                user
            },
            error

        } = await supabase.auth.getUser();


        if(error){

            console.log(error);
            return;

        }


        if(user){


            // Email
            const emailBox = document.getElementById("user-email");

            if(emailBox){

                emailBox.value = user.email || "";

            }



            // User ID
            const userIdBox = document.getElementById("user-id");

            if(userIdBox){

                userIdBox.value = user.id || "";

            }


            // Mobile (from metadata)
            const mobileBox = document.getElementById("user-mobile");

            if(mobileBox){

                mobileBox.value =
                user.user_metadata?.phone || "";

            }


        }


    } catch(error){

        console.log(
            "Load Account Error:",
            error
        );

    }

}



// Change Email Button
function openChangeEmail(){

    alert("Change Email Flow Opening...");

}



// Update Mobile Number
function updateMobile(){

    alert("Mobile Update Flow Opening...");

}
/* ---------- FULL NAME ---------- */

function editFullName(){

    let box=document.getElementById("name-edit-box");

    if(box.style.display==="block"){

        box.style.display="none";

    }else{

        box.style.display="block";

    }

}


/* ---------- EMAIL ---------- */

function openChangeEmail(){

    let box=document.getElementById("email-edit-box");

    if(box.style.display==="block"){

        box.style.display="none";

    }else{

        box.style.display="block";

    }

}

/* ---------- MOBILE ---------- */

function editMobile(){

    let box=document.getElementById("mobile-edit-box");

    if(box.style.display==="block"){

        box.style.display="none";

    }else{

        box.style.display="block";

    }

}


/* ---------- ADDRESS ---------- */

function editAddress(){

    let box=document.getElementById("address-edit-box");

    if(box.style.display==="block"){

        box.style.display="none";

    }else{

        box.style.display="block";

    }

}


// Save Account Information
function saveAccountInfo(){

    alert("Account Information Saved");

}
// END  Account Information==========

// START OPEN KYC VERIFICATIONM=======
async function openKYCVerification() {

    // Hide other sections
    document.getElementById("account-info-section").style.display = "none";

    if (document.getElementById("transaction-section"))
        document.getElementById("transaction-section").style.display = "none";

    // Show KYC Section
    document.getElementById("kyc-section").style.display = "block";

    try {

        const {
    data: { user }
} = await supabaseClient.auth.getUser();

        if (!user) return;

        // Load profile information
        const { data, error } = await supabaseClient
            .from("profiles")
            .select(`
                full_name,
                user_id,
                country,
                kyc_status,
                kyc_document_type,
                kyc_document_number
            `)
            .eq("id", user.id)
            .single();

        if (error || !data) return;

        // Basic Information
        document.getElementById("kyc-fullname").textContent =
            data.full_name || "--";

        document.getElementById("kyc-userid").textContent =
            data.user_id || "--";

        document.getElementById("kyc-country").value =
            data.country || "Bangladesh";

        document.getElementById("kyc-document-type").value =
            data.kyc_document_type || "";

        document.getElementById("kyc-document-number").value =
            data.kyc_document_number || "";

        // Status Badge
        const status = (data.kyc_status || "not_verified").toLowerCase();

        const statusBox = document.getElementById("kyc-status");

        if (status === "approved") {

            statusBox.innerHTML =
                '<span class="kyc-approved"><i class="fas fa-check-circle"></i> Approved</span>';

        } else if (status === "pending") {

            statusBox.innerHTML =
                '<span class="kyc-pending"><i class="fas fa-clock"></i> Pending Review</span>';

        } else if (status === "rejected") {

            statusBox.innerHTML =
                '<span class="kyc-rejected"><i class="fas fa-times-circle"></i> Rejected</span>';

        } else {

            statusBox.innerHTML =
                '<span class="kyc-pending"><i class="fas fa-id-card"></i> Not Verified</span>';

        }

    } catch (err) {

        console.error("KYC Load Error:", err);

    }

}
function closeKYC(){

    const kycSection = document.getElementById("kyc-section");

    if(kycSection){

        kycSection.style.display = "none";

    }

}
// END OPEN KYC VERIFICATIONM=======
function openSecuritySettings() {

    alert("Security Settings - Coming Soon");

}
// প্রোফাইলের জন্য আলাদা ফাংশন

// ট্রানজেকশন লোড করার মেইন ফাংশন
function openTransaction() {
    // ১. প্রোফাইল পপআপটিকে পুরোপুরি হাইড করো
    document.getElementById('profile-popup').style.display = 'none';
    
    // ২. ট্রানজেকশন কন্টেইনারটিকে দেখাও
    const transSection = document.getElementById('transaction-history-section');
    transSection.style.display = 'block'; 
    
    // ৩. জেড-ইনডেক্স জোর করে বাড়িয়ে দাও
    transSection.style.zIndex = "99999"; 
}
function closeTransaction() {
    document.getElementById('transaction-history-section').style.display = 'none';
    // চাইলে এখানে আবার প্রোফাইল পপআপটিও খুলে দিতে পারো
    // document.getElementById('profile-popup').style.display = 'block';
}
async function fetchTransactions(type = 'deposits', filter = 'latest') {
    const container = document.getElementById('trans-list-container');
    container.innerHTML = '<p>Loading...</p>';

    try {
        // এখানে তোমার সুপারবেজ কোয়েরি হবে
        // const { data, error } = await supabaseClient.from('transactions').select('*').eq('type', type);
        
        // ডামি ডেটা (সুপারবেজ কানেক্ট করার পর এই অংশটা মুছে শুধু কোয়েরি রাখবে)
        const data = [
            { status: 'Paid', amount: '899.50', coin: 'USDT', date: '29 May 2026', txid: '0x2b35c...d1ad2' }
        ];

        container.innerHTML = ''; // লোডিং মুছে ফেলো
        data.forEach(item => {
            container.innerHTML += `
                <div class="trans-item">
                    <div class="item-left">
                        <span class="status">Status: <span class="paid">${item.status}</span></span>
                        <span class="amount">${item.amount} <img src="image/${item.coin.toLowerCase()}.png" width="15"></span>
                    </div>
                    <div class="item-right">
                        <span class="date">${item.date}</span>
                        <span class="tx-id">TX ID: ${item.txid}</span>
                    </div>
                </div>
            `;
        });
    } catch (err) {
        container.innerHTML = '<p>Error loading transactions.</p>';
    }
}

// ট্যাব সুইচ করার ফাংশন
function switchTransTab(type) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    fetchTransactions(type);
}
// ট্রানজেকশন লোড করার মেইন ফাংশন

function confirmLogout() {
    // Add your logout logic here
    window.location.href = 'logout.php'; 
}

// --- Outside Click Handler ---
window.addEventListener('click', (event) => {
    const notifPopup = document.getElementById('notif-popup');
    const profilePopup = document.getElementById('profile-popup');
    const logoutModal = document.getElementById('logout-confirm-popup');

    // Close notifications if clicking outside
    if (notifPopup && !notifPopup.contains(event.target) && !event.target.closest('.notif-icon-class')) {
        notifPopup.style.display = 'none';
    }

    // Close profile menu if clicking outside
    if (profilePopup && !profilePopup.contains(event.target) && !event.target.closest('.profile-icon-class')) {
        profilePopup.style.display = 'none';
    }
    
    // Optional: Close logout modal if clicking the background overlay
    if (event.target === logoutModal) {
        closeLogoutPopup();
    }
});
// --- Outside Click Handler ---
// হেডার আপডেট করার মূল ফাংশন
// ১. লগইন/লগআউট স্ট্যাটাস অনুযায়ী হেডার আপডেট করার ফাংশন
// =========================
// Header Login Status
// =========================

async function updateHeaderAuth() {

    console.log("updateHeaderAuth() Running");

    const { data } = await supabaseClient.auth.getUser();

    const user = data.user;

    const memberControls = document.getElementById("member-controls");
    const guestArea = document.getElementById("guest-actions-area");
    const userArea = document.getElementById("user-actions-area");

   console.log("Supabase User:", user);

// ===== DEBUG =====
// আপাতত সবসময় Header দেখাও
if (user) {

    if (memberControls) memberControls.style.display = "flex";
    if (userArea) userArea.style.display = "flex";
    if (guestArea) guestArea.style.display = "none";

} else {

    if (memberControls) memberControls.style.display = "none";
    if (userArea) userArea.style.display = "none";
    if (guestArea) guestArea.style.display = "flex";

   }
}

// =========================
// Logout Popup
// =========================

function showLogoutPopup() {

    document.getElementById("logout-confirm-popup").style.display = "flex";

}

function closeLogoutPopup() {

    document.getElementById("logout-confirm-popup").style.display = "none";

}


// =========================
// Logout
// =========================

async function performLogout() {

    // Supabase Logout
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
        alert(error.message);
        return;
    }

    // Local Storage Remove
    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("userName");

    // Close Popup
    closeLogoutPopup();

    // Header Update
    await updateHeaderAuth();

    // Redirect Home
    window.location.href = "https://dataapk.github.io/safiki-gaming/";

}
// =========================
// Logout
// =========================
function loginSuccess() {

    localStorage.setItem("userLoggedIn", "true");

    updateHeaderAuth();

    window.location.href = "index.html";

}
/* ===========================
   LOGIN SIGN UP FORM JS
=========================== */

function openLogin() {
    document.getElementById("loginModal").style.display = "flex";
    document.getElementById("signupModal").style.display = "none";
    document.body.style.overflow = "hidden";
}

function openSignup() {
    document.getElementById("signupModal").style.display = "flex";
    document.getElementById("loginModal").style.display = "none";
    document.body.style.overflow = "hidden";
}

function closeAuth(){

    document.getElementById("loginModal").style.display="none";

    document.getElementById("signupModal").style.display="none";

    document.getElementById("forgotModal").style.display="none";

    document.body.style.overflow="auto";

}

function switchSignup() {
    document.getElementById("loginModal").style.display = "none";
    document.getElementById("signupModal").style.display = "flex";
}

function switchLogin(){

    document.getElementById("signupModal").style.display="none";

    document.getElementById("forgotModal").style.display="none";

    document.getElementById("loginModal").style.display="flex";

}

/* বাইরে ক্লিক করলে Popup বন্ধ হবে */
window.addEventListener("click", function (e) {

    const login = document.getElementById("loginModal");
    const signup = document.getElementById("signupModal");

    if (e.target === login) {
        closeAuth();
    }

    if (e.target === signup) {
        closeAuth();
    }

});

/* ESC চাপলে Popup বন্ধ হবে */
document.addEventListener("keydown", function (e) {

    if (e.key === "Escape") {
        closeAuth();
    }

});

/* Placeholder (পরের ধাপে Supabase যুক্ত করব) */

// ==============================
// LOGIN USER
// ==============================

async function loginUser() {

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    if (!email || !password) {
        alert("Please enter your email and password.");
        return;
    }

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        alert(error.message);
        return;
    }

    alert("✅ Login Successful!");

// Login Status Save
localStorage.setItem("userLoggedIn", "true");

localStorage.setItem(
    "userName",
    data.user.user_metadata.first_name || "Player"
);

// প্রথমে Modal বন্ধ
closeAuth();

// তারপর Header Update
await updateHeaderAuth();

console.log("Logged In User:", data.user);
}
// ==============================
// LOGIN USER
// ==============================

function openForgotPassword(e){

    e.preventDefault();

    document.getElementById("loginModal").style.display="none";

    document.getElementById("forgotModal").style.display="flex";

}

function sendResetLink(){

    alert("Supabase Password Reset will be connected in Step 5.");

}
function togglePassword(inputId, icon){

    const input = document.getElementById(inputId);

    if(input.type === "password"){

        input.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");

    }else{

        input.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");

    }

}
// ==============================
// SIGN UP USER
// ==============================

async function signupUser() {
     console.log("Signup Clicked");

const checkbox = document.getElementById("agreeTerms");

console.log(checkbox);

console.log(checkbox.checked);
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const allowedDomains = [
    "@gmail.com",
    "@yahoo.com",
    "@outlook.com",
    "@hotmail.com"
];

const isValidDomain = allowedDomains.some(domain =>
    email.toLowerCase().endsWith(domain)
);

if (!isValidDomain) {
    alert("Please use a valid Gmail, Yahoo, Outlook or Hotmail email.");
    return;
}
    
    const password = document.getElementById("signupPassword").value;
    // Password must be at least 8 characters,
// contain one uppercase letter,
// one lowercase letter,
// one number,
// and one special character.

const passwordPattern =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#^()_\-+=])[A-Za-z\d@$!%*?&.#^()_\-+=]{8,}$/;

if (!passwordPattern.test(password)) {

    alert(
        "Password must be at least 8 characters and include:\n\n" +
        "• One uppercase letter\n" +
        "• One lowercase letter\n" +
        "• One number\n" +
        "• One special character"
    );

    return;
}
    const confirmPassword = document.getElementById("signupConfirm").value;
    const referralCode = document.getElementById("referralCode").value.trim();
    const agreeTerms = document.getElementById("agreeTerms").checked;

    // Validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        alert("Please fill in all required fields.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    console.log("agreeTerms =", agreeTerms);

if (!agreeTerms) {
    alert("Please accept the Terms & Conditions.");
    console.log(document.getElementById("agreeTerms"));
    console.log(document.getElementById("agreeTerms").checked);
    return;
}

    // Create Account
    const { data, error } = await supabaseClient.auth.signUp({

        email: email,

        password: password,

        options: {

            data: {
                first_name: firstName,
                last_name: lastName,
                referral_code: referralCode
            }

        }

    });

    if (error) {

        alert(error.message);

        return;

    }

    alert("🎉 Account created successfully!");

    closeAuth();

}
// ==============================
// PAGE LOAD
// ==============================
document.addEventListener("DOMContentLoaded", function () {

    updateHeaderAuth();

});
