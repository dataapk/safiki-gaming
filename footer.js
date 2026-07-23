// ============================================
// FOOTER & SIDEBAR JS
// Black + Golden Theme
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    console.log('✅ footer.js LOADED SUCCESSFULLY!');
    
    // ===== DOM ELEMENTS =====
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const sidebarClose = document.getElementById('sidebarClose');
    const beforeLogin = document.getElementById('beforeLogin');
    const afterLogin = document.getElementById('afterLogin');
    const menuBtn = document.getElementById('menuBtn');
    
    // ===== STATE =====
    let isSidebarOpen = false;
    let isLoggedIn = false;
    
    // ===== SIDEBAR FUNCTIONS =====
    
    // Open Sidebar
    window.footerOpenSidebar = function() {
        if (!sidebar || !sidebarOverlay) return;
        
        sidebar.classList.add('active');
        sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        isSidebarOpen = true;
        
        // Set Menu button active
        footerSetActive(menuBtn);
        
        console.log('✅ Sidebar OPENED');
    };
    
    // Close Sidebar
    window.footerCloseSidebar = function() {
        if (!sidebar || !sidebarOverlay) return;
        
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
        isSidebarOpen = false;
        
        console.log('✅ Sidebar CLOSED');
    };
    
    // Toggle Sidebar (Menu button click)
    window.footerToggleSidebar = function() {
        if (isSidebarOpen) {
            footerCloseSidebar();
        } else {
            footerOpenSidebar();
        }
    };
    
    // ===== MENUSUB FUNCTIONS =====
    
    // Toggle MenuSub (one at a time)
    window.footerToggleMenuSub = function(menuSubId, arrowId) {
        const menuSub = document.getElementById(menuSubId);
        const arrow = document.getElementById(arrowId);
        
        if (!menuSub) return;
        
        // Close all other menusubs first
        document.querySelectorAll('.menusub-list').forEach(function(menu) {
            if (menu.id !== menuSubId && !menu.classList.contains('menusub-hidden')) {
                menu.classList.add('menusub-hidden');
                
                // Reset arrow
                const otherArrowId = menu.id.replace('MenuSub', 'Arrow');
                const otherArrow = document.getElementById(otherArrowId);
                if (otherArrow) otherArrow.classList.remove('rotate');
            }
        });
        
        // Toggle current menusub
        const isHidden = menuSub.classList.contains('menusub-hidden');
        
        if (isHidden) {
            menuSub.classList.remove('menusub-hidden');
            if (arrow) arrow.classList.add('rotate');
            console.log('✅ MenuSub OPENED:', menuSubId);
        } else {
            menuSub.classList.add('menusub-hidden');
            if (arrow) arrow.classList.remove('rotate');
            console.log('✅ MenuSub CLOSED:', menuSubId);
        }
    };
    
    // ===== ACTIVE FOOTER ITEM =====
    
    // Set active footer item
    window.footerSetActive = function(element) {
        if (!element) return;
        
        // Remove active from all
        document.querySelectorAll('.footer-item').forEach(function(item) {
            item.classList.remove('active');
        });
        
        // Add active to clicked
        element.classList.add('active');
        
        console.log('✅ Active set:', element.querySelector('span')?.textContent || 'Menu');
    };
    
    // ===== LOGIN TOGGLE =====
    
    // Toggle Login State (Demo)
    window.footerToggleLogin = function() {
        isLoggedIn = !isLoggedIn;
        console.log('✅ Login state:', isLoggedIn ? 'LOGGED IN' : 'LOGGED OUT');
        
        if (!beforeLogin || !afterLogin) return;
        
        if (isLoggedIn) {
            beforeLogin.classList.add('menusub-hidden');
            afterLogin.classList.remove('menusub-hidden');
        } else {
            beforeLogin.classList.remove('menusub-hidden');
            afterLogin.classList.add('menusub-hidden');
        }
    };
    
    // ===== NAVIGATION FUNCTIONS =====
    
    // Go to Login Page
    window.footerGoToLogin = function() {
        console.log('👉 Redirect to Login Page');
        // window.location.href = '/login';
        alert('Login Page');
    };
    
    // Go to Profile Page
    window.footerGoToProfile = function() {
        console.log('👉 Redirect to Profile Page');
        // window.location.href = '/profile';
        alert('Profile Page');
    };
    
    // Go to Bonus Page
    window.footerGoToBonus = function() {
        console.log('👉 Redirect to Bonus Page');
        // window.location.href = '/bonuses';
        alert('Bonus Page');
    };
    
    // Open Search
    window.footerOpenSearch = function() {
        console.log('👉 Open Search');
        alert('Search feature coming soon!');
    };
    
    // Open Bet History
    window.footerOpenBetHistory = function() {
        console.log('👉 Open Bet History');
        // window.location.href = '/bet-history';
        alert('Bet History feature coming soon!');
    };
    
    // Go Home
    window.footerGoHome = function() {
        console.log('👉 Go Home');
        // window.location.href = '/';
        alert('Home feature coming soon!');
    };
    
    // ===== OUTSIDE CLICK TO CLOSE =====
    
    // Close sidebar when clicking outside (on overlay)
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', function(e) {
            if (e.target === sidebarOverlay) {
                footerCloseSidebar();
            }
        });
    }
    
    // ===== ESCAPE KEY TO CLOSE =====
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isSidebarOpen) {
            footerCloseSidebar();
        }
    });
    
    // ===== SWIPE TO CLOSE SIDEBAR (Mobile) =====
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    if (sidebar) {
        sidebar.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        sidebar.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }
    
    function handleSwipe() {
        // Swipe left to close (sidebar is on left side)
        if (touchStartX - touchEndX > 50) {
            footerCloseSidebar();
        }
    }
    
    // ===== INITIALIZE =====
    
    // Ensure sidebar is closed on load
    footerCloseSidebar();
    
    console.log('✅ All footer event listeners attached!');
    console.log('✅ Footer system ready!');
    
});
