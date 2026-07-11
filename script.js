/* =========================================================
   ১. মূল ডোম লোড (মেইন ফাউন্ডেশন)
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {

   /* =====================================================
       ২. হেডার সেকশন লজিক
       ===================================================== */
    // ভেরিয়েবলস
    const currencyBtn = document.getElementById('currency-btn'); // ট্রিগার বাটন
    const currencyMenu = document.getElementById('currency-menu'); // ড্রপডাউন মেনু
    const currencyItems = document.querySelectorAll('.dropdown-item'); // সব কারেন্সি লিস্ট

    // কারেন্সি ড্রপডাউন টগল ইভেন্ট
    if(currencyBtn) {
        currencyBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeAllMenus();
            currencyMenu.style.display = (currencyMenu.style.display === 'block') ? 'none' : 'block';
        });
    }

// কারেন্সি সিলেক্ট লজিক
currencyItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        
        // ১. ইমেজ আপডেট (এটা কাজ করছে)
        const selectedImgSrc = this.querySelector('img').src;
        currencyBtn.querySelector('img').src = selectedImgSrc;
        
        // ২. ব্যালেন্স আপডেট লজিক
        const balanceSpan = currencyBtn.querySelector('.balance-text'); 
        const newBalance = this.getAttribute('data-balance'); // HTML থেকে ডাটা আনছে
        
        if (balanceSpan) {
            balanceSpan.innerText = newBalance; // নতুন ব্যালেন্স বসাচ্ছে
            console.log("নতুন ব্যালেন্স সেট হয়েছে: " + newBalance); // কনসোলে চেক করো
        } else {
            console.error("error: .balance-text ক্লাসটি খুঁজে পাওয়া যায়নি!");
        }
        
        currencyMenu.style.display = 'none';
    });
});
    /* =====================================================
       ২. হেডার সেকশন লজিক
       ===================================================== */

    // প্রোফাইল ইভেন্ট
    if(profileIcon) {
        profileIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log("প্রোফাইল মেনু সক্রিয়");
        });
    }

    /* =====================================================
       ৩. অন্যান্য সেকশন (নিচে সিরিয়াল অনুযায়ী যোগ হবে)
       ===================================================== */
    // এখানে পরবর্তীতে ওয়ালেট, ট্রেডিং বা অন্য সেকশনের কোড আসবে...


    /* =====================================================
       ৪. গ্লোবাল ফাংশন ও হেল্পার (সবশেষে)
       ===================================================== */
    document.addEventListener('click', () => {
        closeAllMenus();
    });

    function closeAllMenus() {
        if(currencyMenu) currencyMenu.style.display = 'none';
        // অন্যান্য সেকশনের মেনু রিসেট এখানে যুক্ত করবে
    }
});

// WALLET SECTION START

// ট্যাব পরিবর্তন করার ফাংশন
function openTab(evt, tabName) {
    // ১. সব কন্টেন্ট এরিয়া লুকিয়ে ফেলা
    const contents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < contents.length; i++) {
        contents[i].style.display = "none";
    }

    // ২. সব ট্যাব বাটন থেকে 'active' ক্লাস সরিয়ে ফেলা
    const links = document.getElementsByClassName("tab-link");
    for (let i = 0; i < links.length; i++) {
        links[i].classList.remove("active");
    }

    // ৩. শুধুমাত্র সিলেক্ট করা ট্যাব এবং কন্টেন্ট দেখানো
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.classList.add("active");
}

// ওয়ালেট ড্রপডাউন মেনু টগল করার কোড
document.getElementById('wallet-btn').addEventListener('click', (e) => {
    e.stopPropagation(); // ক্লিক যেন মেনুর ভেতরেই আটকে থাকে
    const menu = document.getElementById('wallet-menu');
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
});


