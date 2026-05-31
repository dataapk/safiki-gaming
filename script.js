document.addEventListener('DOMContentLoaded', () => {
    // ১. মেনু আইকন এবং সাইডবার টগল
    const menuIcon = document.querySelector('.menu-icon');
    const sidebar = document.querySelector('.sidebar');

    if (menuIcon && sidebar) {
        menuIcon.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });

        // সাইডবারের বাইরে ক্লিক করলে বন্ধ হবে
        document.addEventListener('click', (event) => {
            if (!sidebar.contains(event.target) && !menuIcon.contains(event.target)) {
                sidebar.classList.remove('active');
            }
        });
    }

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
