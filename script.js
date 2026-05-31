// ======================================================
// SAFIKI PLATFORM
// Frontend Application Script
// Version 1.0
// Future Ready For Supabase Integration
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("SAFIKI Platform Loaded");

    // Core Modules
    initAuth();
    initUserProfile();
    initBalance();

    // UI Modules
    initSidebar();
    initAnnouncement();
    initBottomNav();

    // Game Modules
    initGameCategories();
    initMainGames();
    initRecentWinners();
    initRecentGameHistory();

    // Wallet Modules
    initWallet();
    initTransactionHistory();

    // Rewards Modules
    initCashback();
    initRakeback();
    initReferralSystem();

    // Community Modules
    initLeaderboard();
    initVipClub();
    initPromotions();

    // System Modules
    initNotifications();
    initSupport();
    initStatistics();

});

// ======================================================
// AUTH MODULE
// ======================================================

function initAuth() {

    const loginBtn =
        document.getElementById("loginBtn");

    const registerBtn =
        document.getElementById("registerBtn");

    if(loginBtn){

        loginBtn.addEventListener("click", () => {

            window.location.href =
            "login.html";

        });

    }

    if(registerBtn){

        registerBtn.addEventListener("click", () => {

            window.location.href =
            "register.html";

        });

    }

}

// ======================================================
// USER PROFILE
// ======================================================

function initUserProfile(){

    console.log(
        "User Profile Module Ready"
    );

    // Future Supabase Hook
    // Load User Data
    // Update Profile Card
    // Update User Status

}

// ======================================================
// BALANCE MODULE
// ======================================================

function initBalance(){

    const balance =
        document.getElementById(
            "userBalance"
        );

    if(balance){

        balance.textContent =
        "৳0.00";

    }

}

// ======================================================
// SIDEBAR MODULE
// ======================================================

function initSidebar(){

    console.log(
        "Sidebar Ready"
    );

    // Future:
    // Open / Close Sidebar
    // Mobile Sidebar Toggle

}

// ======================================================
// ANNOUNCEMENT MODULE
// ======================================================

function initAnnouncement(){

    const messages = [

        "Welcome To SAFIKI",
        "New Rewards Available",
        "Invite Friends And Earn",
        "VIP Benefits Active"

    ];

    let index = 0;

    const section =
        document.getElementById(
            "announcement-section"
        );

    if(!section) return;

    setInterval(() => {

        section.innerHTML =
        `<p>${messages[index]}</p>`;

        index++;

        if(index >= messages.length){

            index = 0;

        }

    },5000);

}

// ======================================================
// BOTTOM NAVIGATION
// ======================================================

function initBottomNav(){

    console.log(
        "Bottom Navigation Ready"
    );

}

// ======================================================
// GAME CATEGORY
// ======================================================

function initGameCategories(){

    console.log(
        "Game Categories Ready"
    );

}

// ======================================================
// MAIN GAMES
// ======================================================

function initMainGames(){

    const playButtons =
        document.querySelectorAll(
            ".play-btn"
        );

    playButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                alert(
                    "Game Opening Soon"
                );

            }
        );

    });

}

// ======================================================
// WINNERS FEED
// ======================================================

function initRecentWinners(){

    console.log(
        "Winner Feed Ready"
    );

    // Future Supabase
    // Real-Time Winners Feed

}

// ======================================================
// GAME HISTORY
// ======================================================

function initRecentGameHistory(){

    console.log(
        "Game History Ready"
    );

}

// ======================================================
// WALLET MODULE
// ======================================================

function initWallet(){

    const depositBtn =
        document.querySelector(
            ".deposit-btn"
        );

    const withdrawBtn =
        document.querySelector(
            ".withdraw-btn"
        );

    if(depositBtn){

        depositBtn.addEventListener(
            "click",
            () => {

                alert(
                    "Deposit Page"
                );

            }
        );

    }

    if(withdrawBtn){

        withdrawBtn.addEventListener(
            "click",
            () => {

                alert(
                    "Withdraw Page"
                );

            }
        );

    }

}

// ======================================================
// TRANSACTION HISTORY
// ======================================================

function initTransactionHistory(){

    console.log(
        "Transaction History Ready"
    );

}

// ======================================================
// CASHBACK
// ======================================================

function initCashback(){

    const btn =
        document.querySelector(
            ".claim-weekly-btn"
        );

    if(btn){

        btn.addEventListener(
            "click",
            () => {

                alert(
                    "Cashback Claim"
                );

            }
        );

    }

}

// ======================================================
// RAKEBACK
// ======================================================

function initRakeback(){

    const btn =
        document.querySelector(
            ".claim-rakeback-btn"
        );

    if(btn){

        btn.addEventListener(
            "click",
            () => {

                alert(
                    "Rakeback Claim"
                );

            }
        );

    }

}

// ======================================================
// REFERRAL SYSTEM
// ======================================================

function initReferralSystem(){

    console.log(
        "Referral System Ready"
    );

}

// ======================================================
// LEADERBOARD
// ======================================================

function initLeaderboard(){

    console.log(
        "Leaderboard Ready"
    );

}

// ======================================================
// VIP CLUB
// ======================================================

function initVipClub(){

    console.log(
        "VIP Club Ready"
    );

}

// ======================================================
// PROMOTIONS
// ======================================================

function initPromotions(){

    console.log(
        "Promotions Ready"
    );

}

// ======================================================
// NOTIFICATIONS
// ======================================================

function initNotifications(){

    console.log(
        "Notifications Ready"
    );

}

// ======================================================
// SUPPORT
// ======================================================

function initSupport(){

    const btn =
        document.querySelector(
            ".support-btn"
        );

    if(btn){

        btn.addEventListener(
            "click",
            () => {

                alert(
                    "Support Coming Soon"
                );

            }
        );

    }

}

// ======================================================
// STATISTICS
// ======================================================

function initStatistics(){

    console.log(
        "Statistics Ready"
    );

    // Future:
    // Online Users
    // Deposits
    // Withdrawals
    // Jackpot Winners

}
