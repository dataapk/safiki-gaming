// পেজ লোড হওয়ার সাথে সাথে যেন পপআপগুলো বন্ধ থাকে
window.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('notif-popup').style.display = 'none';
    document.getElementById('profile-popup').style.display = 'none';
});

// নোটিফিকেশন টগল ফাংশন
function toggleNotifMenu(event) {
    event.stopPropagation();
    const menu = document.getElementById('notif-popup');
    const profile = document.getElementById('profile-popup');
    
    // প্রোফাইল মেনু বন্ধ করো
    if(profile) profile.style.display = 'none';
    
    // নোটিফিকেশন মেনু টগল করো
    if (menu.style.display === 'flex') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'flex';
    }
}

// প্রোফাইল টগল ফাংশন
function toggleProfileMenu(event) {
    event.stopPropagation();
    const menu = document.getElementById('profile-popup');
    const notif = document.getElementById('notif-popup');
    
    // নোটিফিকেশন মেনু বন্ধ করো
    if(notif) notif.style.display = 'none';
    
    // প্রোফাইল মেনু টগল করো
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
}

// পেজের যেকোনো জায়গায় ক্লিক করলে মেনু বন্ধ হয়ে যাবে
document.addEventListener('click', function() {
    document.getElementById('notif-popup').style.display = 'none';
    document.getElementById('profile-popup').style.display = 'none';
});
