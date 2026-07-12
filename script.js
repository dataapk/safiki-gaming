/* =========================================================
   ১. মূল ডোম লোড (মেইন ফাউন্ডেশন)
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {

   /* =====================================================
       ২. হেডার সেকশন লজিক
       ===================================================== */
   // ড্রপডাউন টগল করা
function toggleDropdown(id) {
    const menu = document.getElementById(id);
    // অন্য সব মেনু বন্ধ করে বর্তমানটি খোলা
    document.querySelectorAll('.dropdown-menu').forEach(m => {
        if(m.id !== id) m.style.display = 'none';
    });
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
}

// কারেন্সি সিলেক্ট করা এবং উপরে আপডেট করা
function selectCurrency(name, imgPath) {
    document.getElementById('selected-currency-img').src = imgPath;
    // ব্যালেন্স আপডেট লজিক এখানে আসবে...
    toggleDropdown('currency-menu');
}

// বাইরে ক্লিক করলে মেনু বন্ধ করা
window.onclick = function(event) {
    if (!event.target.matches('.currency-trigger, .wallet-trigger, .icon, .profile-img')) {
        document.querySelectorAll('.dropdown-menu').forEach(m => m.style.display = 'none');
    }
}
