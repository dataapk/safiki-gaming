/* 1. DOM Elements Selection */
const allMenus = document.querySelectorAll('.dropdown-menu');

/* --- API & Global Variables --- */
let currentPrices = {
    "ada": 200, "btc": 100, "eth": 0, "usdt": 1, "doge": 0, "trx": 0 // ডিফল্ট ভ্যালু
};
let timeLeft = 30; // এখানে এটি ডিফাইন করে দাও

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
function headerDropdownMenu(id, event) {
    if (event) event.stopPropagation(); // এটি দিলে আর বাইরের ক্লিক ইভেন্ট ফায়ার হবে না
    
    const menu = document.getElementById(id);
    const allMenus = document.querySelectorAll('.dropdown-menu');
    
    allMenus.forEach(m => {
        if (m.id !== id) {
            m.style.display = 'none';
        }
    });

    if (menu) {
        menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
    }
}

/* 3. Currency Selection: ইমেজ আপডেট করা */
function selectCurrency(name, img, balance) {
    // ১. উপরের হেডার ইমেজ আপডেট
    const headerImg = document.getElementById('selected-currency-img');
    if (headerImg) {
        headerImg.src = img;
        headerImg.alt = name;
    }

    // ২. উপরের হেডার ব্যালেন্স আপডেট
    const headerBalance = document.getElementById('selected-balance');
    if (headerBalance) {
        headerBalance.innerText = balance;
    }

    // ৩. ড্রপডাউন মেনু ক্লোজ করা
    headerDropdownMenu('currency-menu');
}

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
    // এখানে তুমি তোমার ব্যালেন্স ডাটাবেস বা API থেকে নিতে পারো
    // বর্তমানে একটি উদাহরণ হিসেবে ব্যালেন্স দিচ্ছি
    const userBalance = 0.00174269; 
    
    const amountInput = document.getElementById('from-amount');
    
    // ব্যালেন্স ইনপুট বক্সে বসানো
    amountInput.value = userBalance;
    
    // অটোমেটিক চেক ও ক্যালকুলেশন চালানো
    checkMinimumLimit(); 
    if (typeof calculateExchange === 'function') {
        calculateExchange();
    }
    
    console.log("Max balance set to:", userBalance);
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
    
    // ব্যালেন্স চেক করার জন্য (তোমার আইডি 'user-balance' ধরে নিচ্ছি)
    const userBalance = parseFloat(document.getElementById('user-balance')?.innerText || 0);
    const amountInput = parseFloat(document.getElementById('from-amount').value) || 0;
    
    let decimals = 4;
    if (fromCurrency === 'btc' || fromCurrency === 'eth') {
        decimals = 6;
    }

    const message = `Min: ${minAmount.toFixed(decimals)} ${currencyName} ($10)`;
    const minAmountElement = document.getElementById('min-amount');
    const errorBox = document.getElementById('error-message'); // এইচটিএমএল-এ এই আইডিটি থাকতে হবে
    
    if (minAmountElement) {
        minAmountElement.innerText = message;
        
        // ১. মিনিমাম লিমিট কালার লজিক
        if (amountInput > 0 && amountInput < minAmount) {
            minAmountElement.style.color = "red"; 
        } else {
            minAmountElement.style.color = "#ffffff"; 
        }
    }

    // ২. ব্যালেন্স ভ্যালিডেশন লজিক (লাল হাইলাইট)
    if (errorBox) {
        if (amountInput > userBalance) {
            document.getElementById('from-amount').style.borderColor = "red";
            errorBox.style.display = "block";
            errorBox.innerText = "Amount is higher than balance";
        } else if (amountInput > 0 && amountInput < minAmount) {
            document.getElementById('from-amount').style.borderColor = "red";
            errorBox.style.display = "block";
            errorBox.innerText = "Amount is below minimum";
        } else {
            document.getElementById('from-amount').style.borderColor = "#2d344d";
            errorBox.style.display = "none";
        }
    }
}
// CLOSE 
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

// পেজ লোড হওয়ার সময়
window.onload = function() {
    timeLeft = 30; // এখানে মানটি নিশ্চিত করো
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
function updateIcons() {
    // সিলেক্ট করা কারেন্সি থেকে ইমেজ সোর্স বের করা
    const selectElement = document.getElementById("from-currency");
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const iconSrc = selectedOption.getAttribute("data-img");

    // ১. আইকনগুলো আপডেট করা
    document.getElementById("from-icon").src = iconSrc;
    document.getElementById("input-icon").src = iconSrc;
    
    // ইনফো বক্সের ইমেজগুলো আপডেট করা
    document.getElementById("balance-icon").src = iconSrc;
    document.getElementById("min-icon").src = iconSrc;
    document.getElementById("max-icon").src = iconSrc;

    // ২. কারেন্সি পরিবর্তন হলে এখানে ব্যালেন্স বা লিমিট আপডেট ফাংশন কল করবে
    updateStatLimits(); 
}
    // FROM কারেন্সির জন্য
    const fromSelect = document.getElementById('from-currency');
    const fromIcon = document.getElementById('from-icon');
    const fromOption = fromSelect.options[fromSelect.selectedIndex];
    if (fromOption) {
        fromIcon.src = fromOption.getAttribute('data-img');
    }

    // TO কারেন্সির জন্য
    const toSelect = document.getElementById('to-currency');
    const toIcon = document.getElementById('to-icon');
    const toOption = toSelect.options[toSelect.selectedIndex];
    if (toOption) {
        toIcon.src = toOption.getAttribute('data-img');
    }
    
    console.log("Icons updated successfully");
}
