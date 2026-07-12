/* 1. DOM Elements Selection */
const allMenus = document.querySelectorAll('.dropdown-menu');

/* 2. Main Logic: Header Dropdown Handler */
function headerDropdownMenu(id) {
    const menu = document.getElementById(id);
    
    // অন্য সব মেনু বন্ধ করা
    allMenus.forEach(m => {
        if (m.id !== id) {
            m.style.display = 'none';
        }
    });

    // বর্তমান মেনুটি টগল করা
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
}

/* 3. Currency Selection: ইমেজ আপডেট করা */
function selectCurrency(name, imgPath, balance) {
    document.getElementById('selected-currency-img').src = imgPath;
    // চাইলে এখানে ব্যালেন্সও আপডেট করতে পারো
    headerDropdownMenu('currency-menu');
}

/* 4. Wallet Actions: ট্যাব ওপেন করা */
function openWalletTab(action) {
    console.log("Wallet Action: " + action);
    // এখানে তোমার ডিপোজিট/উইথড্র মোডাল বা পেজ নেভিগেশন লজিক হবে
    headerDropdownMenu('wallet-menu');
}

/* 5. Close on Outside Click (যে কোনো খালি জায়গায় ক্লিক করলে মেনু বন্ধ হবে) */
window.onclick = function(event) {
    // যদি ক্লিকের উৎস ড্রপডাউনের ভেতরে না হয়, তবে সব বন্ধ করে দাও
    if (!event.target.closest('.dropdown-wrapper') && 
        !event.target.closest('.wallet-trigger') && 
        !event.target.closest('.icon') &&
        !event.target.closest('.profile-icon')) {
        
        allMenus.forEach(m => m.style.display = 'none');
    }
}
function toggleFavorite(element, event) {
    event.stopPropagation(); // যাতে পুরো অপশনে ক্লিক না পড়ে
    element.classList.toggle('fas'); // FontAwesome solid
    element.classList.toggle('far'); // FontAwesome regular
    element.classList.toggle('active'); // হলুদ করার জন্য ক্লাস
}
