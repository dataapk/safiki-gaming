// ============================================
// FOOTER & SIDEBAR JS — FINAL
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    console.log('✅ footer.js LOADED!');
    
    // ===== DOM ELEMENTS =====
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const menuBtn = document.getElementById('menuBtn');
    const searchBtn = document.getElementById('searchBtn');
    const historyBtn = document.getElementById('historyBtn');
    const homeBtn = document.getElementById('homeBtn');
    
    // ===== STATE =====
    let isSidebarOpen = false;
    let isLoggedIn = false;
    
    // ===== SIDEBAR OPEN =====
    window.footerOpenSidebar = function() {
        if (!sidebar || !sidebarOverlay) return;
        
        sidebar.classList.add('active');
        sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        isSidebarOpen = true;
        
        // Set Menu button active
        if (menuBtn) {
            document.querySelectorAll('.footer-item').forEach(function(item) {
                item.classList.remove('active');
            });
            menuBtn.classList.add('active');
        }
        
        console.log('✅ Sidebar OPENED');
    };
    
    // ===== SIDEBAR CLOSE =====
    window.footerCloseSidebar = function() {
        if (!sidebar || !sidebarOverlay) return;
        
        sidebar.classList.remove('active');
        
        setTimeout(function() {
            sidebarOverlay.classList.remove('active');
        }, 200);
        
        document.body.style.overflow = '';
        isSidebarOpen = false;
        
        // Remove active from menu
        if (menuBtn) menuBtn.classList.remove('active');
        
        console.log('✅ Sidebar CLOSED');
    };
    
    // ===== SIDEBAR TOGGLE (Menu Button) =====
    window.footerToggleSidebar = function() {
        if (isSidebarOpen) {
            footerCloseSidebar();
        } else {
            footerOpenSidebar();
        }
    };
    
    // ===== MENUSUB TOGGLE =====
    window.footerToggleMenuSub = function(menuSubId, arrowId) {
        const menuSub = document.getElementById(menuSubId);
        const arrow = document.getElementById(arrowId);
        
        if (!menuSub) {
            console.log('❌ MenuSub not found:', menuSubId);
            return;
        }
        
        // Close all other menusubs
        document.querySelectorAll('.menusub-list').forEach(function(menu) {
            if (menu.id !== menuSubId && !menu.classList.contains('menusub-hidden')) {
                menu.classList.add('menusub-hidden');
                
                const otherArrowId = menu.id.replace('MenuSub', 'Arrow');
                const otherArrow = document.getElementById(otherArrowId);
                if (otherArrow) otherArrow.classList.remove('rotate');
            }
        });
        
        // Toggle current
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
    
    // ===== SET ACTIVE FOOTER ITEM =====
    window.footerSetActive = function(element) {
        if (!element) return;
        
        document.querySelectorAll('.footer-item').forEach(function(item) {
            item.classList.remove('active');
        });
        
        element.classList.add('active');
        
        console.log('✅ Active:', element.querySelector('span')?.textContent || 'Menu');
    };
    
    // ===== LOGIN TOGGLE (Demo) =====
    window.footerToggleLogin = function() {
        isLoggedIn = !isLoggedIn;
        console.log('✅ Login state:', isLoggedIn ? 'LOGGED IN' : 'LOGGED OUT');
        alert(isLoggedIn ? 'Logged In' : 'Logged Out');
    };
    
    // ===== NAVIGATION FUNCTIONS =====
    
    window.footerGoToLogin = function() {
        console.log('👉 Login Page');
        alert('Login Page');
    };
    
    window.footerGoToSignup = function() {
        console.log('👉 Sign Up Page');
        alert('Sign Up Page');
    };
    
    window.footerGoToBonus = function() {
        console.log('👉 Bonus Page');
        alert('Bonus Page');
    };
    
    window.footerGoToRefer = function() {
        console.log('👉 Refer a Friend');
        alert('Refer a Friend');
    };
    
    window.footerGoToSupport = function() {
        console.log('👉 Support');
        alert('Support');
    };
    
    window.footerOpenSearch = function() {
        console.log('👉 Search');
        alert('Search');
    };
    
    window.footerOpenBetHistory = function() {
        console.log('👉 Bet History');
        alert('Bet History');
    };
    
    window.footerGoHome = function() {
        console.log('👉 Home');
        alert('Home');
    };
    
    // ===== EVENT LISTENERS =====
    
    // Overlay click to close
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', function(e) {
            if (e.target === sidebarOverlay) {
                footerCloseSidebar();
            }
        });
    }
    
    // Escape key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isSidebarOpen) {
            footerCloseSidebar();
        }
    });
    
    // Footer item clicks
    if (menuBtn) {
        menuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            footerToggleSidebar();
        });
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            footerSetActive(this);
            footerOpenSearch();
        });
    }
    
    if (historyBtn) {
        historyBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            footerSetActive(this);
            footerOpenBetHistory();
        });
    }
    
    if (homeBtn) {
        homeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            footerSetActive(this);
            footerGoHome();
        });
    }
    
    // ===== INITIALIZE =====
    footerCloseSidebar();
    
    console.log('✅ Footer system ready!');
    
});
