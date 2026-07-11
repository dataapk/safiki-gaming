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

    // কারেন্সি সিলেক্ট লজিক (নতুন যোগ হলো)
    currencyItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault(); // লিঙ্ক ডিফল্ট কাজ বন্ধ করা
            
            // ১. বাটনের ভেতরের কন্টেন্ট আপডেট করা
            // ধরে নিচ্ছি বাটনের ভেতরে img এবং span বা text আছে
            const selectedImg = this.querySelector('img').src;
            const selectedText = this.innerText; // কারেন্সির নাম
            
            // বাটনের ইমেজ এবং টেক্সট আপডেট
            currencyBtn.querySelector('img').src = selectedImg;
            // currencyBtn.querySelector('span').innerText = selectedText; // যদি টেক্সট থাকে
            
            // ২. ড্রপডাউন বন্ধ করা
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
