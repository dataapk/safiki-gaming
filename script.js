document.addEventListener('DOMContentLoaded', () => {
    // মেনু আইকন এবং সাইডবার এলিমেন্ট নির্বাচন
    const menuIcon = document.querySelector('.menu-icon');
    const sidebar = document.querySelector('.sidebar');

    // মেনু আইকনে ক্লিক ইভেন্ট
    if (menuIcon && sidebar) {
        menuIcon.addEventListener('click', (event) => {
            // ইভেন্ট বাবলিং বন্ধ করা যাতে সাথে সাথে বাইরে ক্লিক হিসেবে না ধরে
            event.stopPropagation(); 
            
            // সাইডবার অ্যাক্টিভ করা
            sidebar.classList.add('active');
            console.log("Menu opened");
        });

        // ডকুমেন্টের যেকোনো জায়গায় ক্লিক করলে মেনু বন্ধ হবে
        document.addEventListener('click', (event) => {
            // যদি ক্লিকটি সাইডবারের ভেতরে না হয় এবং মেনু আইকনে না হয়, তবে মেনু বন্ধ হবে
            if (!sidebar.contains(event.target) && !menuIcon.contains(event.target)) {
                sidebar.classList.remove('active');
            }
        });
    }
});

    // ২. ক্যাটাগরি সিলেকশন (ক্লিক করলে ফিডব্যাক)
    const categories = document.querySelectorAll('.category-item');
    categories.forEach(item => {
        item.addEventListener('click', () => {
            // সকল ক্যাটাগরি থেকে 'active' ক্লাস রিমুভ করে সিলেক্ট করা আইটেমে যোগ করা
            categories.forEach(cat => cat.style.opacity = '1');
            item.style.opacity = '0.7'; 
            console.log('Selected Category: ' + item.querySelector('span').innerText);
        });
    });

    // ৩. মেইন গেমপ্লে বাটনস হ্যান্ডলিং
    const gameButtons = document.querySelectorAll('.glow-btn');
    gameButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const gameType = btn.innerText;
            alert('Opening: ' + gameType);
        });
    });

    // ৪. বটম মেনু নেভিগেশন (এক্টিভ স্টাইল)
    const navLinks = document.querySelectorAll('.bottom-menu nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.style.color = '#ffffff');
            this.style.color = '#FF0000'; // ক্লিক করা লিঙ্কটি লাল হবে
        });
    });

    // ৫. লগইন বাটন অ্যাকশন
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            window.location.href = 'login.html'; // লগইন পেইজে রিডাইরেক্ট হবে
        });
    }
});
