document.addEventListener('DOMContentLoaded', () => {
    // সাইডবার টগল করার কোড
    const menuIcon = document.querySelector('.menu-icon');
    const sidebar = document.querySelector('.sidebar');

    if (menuIcon && sidebar) {
        menuIcon.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }

    // লগইন ও রেজিস্টার বাটনের অ্যাকশন
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            // এখানে লগইন মডেল খোলার বা লগইন পেজে রিডাইরেক্ট করার লজিক হবে
            console.log('Login / Register clicked');
            alert('লগইন পেজে যাওয়া হচ্ছে...');
        });
    }

    // গেম ক্যাটাগরি নির্বাচনের কোড
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            categoryItems.forEach(c => c.classList.remove('selected'));
            item.classList.add('selected');
            const gameName = item.querySelector('span').textContent;
            console.log(`${gameName} category selected`);
        });
    });

    // গেমপ্লে বাটনের কোড
    const glowButtons = document.querySelectorAll('.glow-btn');
    glowButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const action = e.target.textContent;
            console.log(`Action performed: ${action}`);
            alert(`আপনি ${action} এ ক্লিক করেছেন!`);
        });
    });

    // ফুটার নেভিগেশন ট্যাবগুলোর কোড
    const footerLinks = document.querySelectorAll('.bottom-menu nav a');
    footerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            footerLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            const targetPage = link.textContent;
            console.log(`Navigating to: ${targetPage}`);
            // এখানে সংশ্লিষ্ট পেজে রূপান্তর করার লজিক হবে
        });
    });
});
