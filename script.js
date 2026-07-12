/* 1. DOM Elements Selection */
const allMenus = document.querySelectorAll('.dropdown-menu');

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
function showTab(tabId) {
    // ১. সব ট্যাবের কন্টেন্ট আগে হাইড করে দাও
    const contents = document.querySelectorAll('.crypto-grid');
    contents.forEach(content => {
        content.style.display = 'none';
    });
    
    // ২. সব বাটন থেকে 'active' ক্লাস সরিয়ে নাও
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(button => {
        button.classList.remove('active');
    });

    // ৩. যে বাটনে ক্লিক করা হয়েছে, শুধু সেটার কন্টেন্ট দেখাও এবং বাটনে 'active' ক্লাস যোগ করো
    const targetTab = document.getElementById(tabId);
    if (targetTab) {
        targetTab.style.display = 'grid';
    }
    
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
}
