// ============================================
// SPORTS BETTING - FOOTER & SIDEBAR JS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== DOM Elements =====
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const sidebarClose = document.getElementById('sidebarClose');
    const beforeLogin = document.getElementById('beforeLogin');
    const afterLogin = document.getElementById('afterLogin');
    
    // ===== State =====
    let isLoggedIn = false; // Demo state
    
    // ===== SIDEBAR FUNCTIONS =====
    
    // Open Sidebar
    function openSidebar() {
        sidebar.classList.add('active');
        sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    }
    
    // Close Sidebar
    function closeSidebar() {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Toggle Sidebar (for Menu button)
    function toggleSidebar() {
        if (sidebar.classList.contains('active')) {
            closeSidebar();
        } else {
            openSidebar();
        }
    }
    
    // ===== DROPDOWN FUNCTIONS =====
    
    // Toggle Dropdown
    window.toggleDropdown = function(dropdownId) {
        const dropdown = document.getElementById(dropdownId);
        const arrowId = dropdownId.replace('Dropdown', 'Arrow');
        const arrow = document.getElementById(arrowId);
        
        // Close other dropdowns first
        document.querySelectorAll('.dropdown-menu').forEach(function(menu) {
            if (menu.id !== dropdownId && !menu.classList.contains('hidden')) {
                menu.classList.add('hidden');
                const otherArrowId = menu.id.replace('Dropdown', 'Arrow');
                const otherArrow = document.getElementById(otherArrowId);
                if (otherArrow) otherArrow.classList.remove('rotate');
            }
        });
        
        // Toggle current dropdown
        dropdown.classList.toggle('hidden');
        arrow.classList.toggle('rotate');
    };
    
    // ===== LOGIN STATE FUNCTIONS =====
    
    // Toggle Login State (Demo)
    window.toggleLoginState = function() {
        isLoggedIn = !isLoggedIn;
        updateLoginState();
    };
    
    // Update UI based on login state
    function updateLoginState() {
        if (isLoggedIn) {
            beforeLogin.classList.add('hidden');
            afterLogin.classList.remove('hidden');
        } else {
            beforeLogin.classList.remove('hidden');
            afterLogin.classList.add('hidden');
        }
    };
    
    // ===== NAVIGATION FUNCTIONS =====
    
    // Go to Login Page
    window.goToLogin = function() {
        console.log('Redirect to Login Page');
        // window.location.href = '/login';
        alert('Redirect to Login Page');
    };
    
    // Go to Profile Page
    window.goToProfile = function() {
        console.log('Redirect to Profile Page');
        // window.location.href = '/profile';
        alert('Redirect to Profile Page');
    };
    
    // Go to Bonus Page
    window.goToBonus = function() {
        console.log('Redirect to Bonus Page');
        // window.location.href = '/bonuses';
        alert('Redirect to Bonus Page');
    };
    
    // Open Search
    window.openSearch = function() {
        console.log('Open Search');
        // Implement search overlay
        alert('Search feature coming soon!');
    };
    
    // Open Bet History
    window.openBetHistory = function() {
        console.log('Open Bet History');
        // window.location.href = '/bet-history';
        alert('Bet History feature coming soon!');
    };
    
    // Go Home
    window.goHome = function() {
        console.log('Go Home');
        // window.location.href = '/';
        alert('Home feature coming soon!');
    };
    
    // ===== FOOTER ACTIVE STATE =====
    
    // Set active footer item
    function setActiveFooterItem(index) {
        const footerItems = document.querySelectorAll('.footer-item');
        footerItems.forEach(function(item, i) {
            if (i === index) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
    
    // ===== EVENT LISTENERS =====
    
    // Sidebar Close Button
    if (sidebarClose) {
        sidebarClose.addEventListener('click', closeSidebar);
    }
    
    // Overlay Click
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeSidebar);
    }
    
    // Footer Menu Button (index 0)
    const menuButton = document.querySelector('.footer-item:nth-child(1)');
    if (menuButton) {
        menuButton.addEventListener('click', function() {
            setActiveFooterItem(0);
            toggleSidebar();
        });
    }
    
    // Footer Search Button (index 1)
    const searchButton = document.querySelector('.footer-item:nth-child(2)');
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            setActiveFooterItem(1);
            openSearch();
        });
    }
    
    // Footer Bet History Button (index 2)
    const historyButton = document.querySelector('.footer-item:nth-child(3)');
    if (historyButton) {
        historyButton.addEventListener('click', function() {
            setActiveFooterItem(2);
            openBetHistory();
        });
    }
    
    // Footer Home Button (index 3)
    const homeButton = document.querySelector('.footer-item:nth-child(4)');
    if (homeButton) {
        homeButton.addEventListener('click', function() {
            setActiveFooterItem(3);
            goHome();
        });
    }
    
    // Close sidebar on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeSidebar();
        }
    });
    
    // ===== SWIPE TO CLOSE SIDEBAR (Mobile) =====
    let touchStartX = 0;
    let touchEndX = 0;
    
    sidebar.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    sidebar.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        // Swipe left to close
        if (touchStartX - touchEndX > 50) {
            closeSidebar();
        }
    }
    
    // ===== INITIALIZE =====
    updateLoginState();
    
    console.log('Footer JS Loaded Successfully!');
    
});
