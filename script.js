
// ======================================================
// 🚀 START : HEADER
// ======================================================
// ১. ড্রপডাউন ওপেন/ক্লোজ করার ফাংশন
function toggleCurrencyMenu() {
    document.getElementById("currencyDropdown").classList.toggle("show");
}

// ২. ড্রপডাউনের বাইরে ক্লিক করলে সেটি বন্ধ করার ফাংশন
window.onclick = function(event) {
    // যদি ক্লিকের টার্গেট 'currency-trigger' বা এর ভেতরের কিছু না হয়
    if (!event.target.closest('.currency-trigger')) {
        var dropdown = document.getElementById("currencyDropdown");
        if (dropdown.classList.contains('show')) {
            dropdown.classList.remove('show');
        }
    }
}





// ======================================================
// 🚀 END : HEADER
// ======================================================
// ======================================================
// 📋 START : MENU DRAWER
// ======================================================

// =========================
// DOM
// =========================

const menuBtn =
document.getElementById("menuBtn");

const menuDrawer =
document.getElementById("menuDrawer");

const menuCloseBtn =
document.getElementById("menuCloseBtn");

const footerButtons =
document.querySelectorAll(".bottom-nav .nav-item");

// =========================
// OPEN
// =========================

function openMenuDrawer(){

    if(!menuDrawer) return;

    menuDrawer.classList.add("open");

}

// =========================
// CLOSE
// =========================

function closeMenuDrawer(){

    if(!menuDrawer) return;

    menuDrawer.classList.remove("open");

}

// =========================
// TOGGLE
// =========================

function toggleMenuDrawer(){

    if(!menuDrawer) return;

    menuDrawer.classList.toggle("open");

}

// =========================
// MENU BUTTON
// =========================

if(menuBtn){

    menuBtn.addEventListener(

        "click",

        function(e){

            e.stopPropagation();

            toggleMenuDrawer();

        }

    );

}

// =========================
// CLOSE BUTTON
// =========================

if(menuCloseBtn){

    menuCloseBtn.addEventListener(

        "click",

        function(){

            closeMenuDrawer();

        }

    );

}

// =========================
// CLICK OUTSIDE
// =========================

document.addEventListener(

    "click",

    function(e){

        if(!menuDrawer) return;

        if(!menuDrawer.contains(e.target) &&

            !menuBtn.contains(e.target)){

            closeMenuDrawer();

        }

    }

);

// =========================
// FOOTER BUTTONS
// Home
// Wheel
// Search
// =========================

footerButtons.forEach(

    button=>{

        button.addEventListener(

            "click",

            function(){

                if(this!==menuBtn){

                    closeMenuDrawer();

                }

            }

        );

    }

);

// ======================================================
// 📋 END : MENU DRAWER
// ======================================================




// ======================================================
// 📋 START : MENU DRAWER
// ======================================================





// ======================================================
// 📋 END : MENU DRAWER
// ======================================================





// ======================================================
// 👤 START : PROFILE DRAWER
// ======================================================





// ======================================================
// 👤 END : PROFILE DRAWER
// ======================================================





// ======================================================
// 🔔 START : NOTIFICATION
// ======================================================





// ======================================================
// 🔔 END : NOTIFICATION
// ======================================================





// ======================================================
// 🎮 START : GAME CARD
// ======================================================





// ======================================================
// 🎮 END : GAME CARD
// ======================================================
