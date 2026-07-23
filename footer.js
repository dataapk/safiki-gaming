// ============================================
// FOOTER & SIDEBAR JS — FIXED VERSION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    console.log('✅ footer.js LOADED!');
    
    // ===== DOM ELEMENTS =====
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const menuBtn = document.getElementById('menuBtn');
    
    let isSidebarOpen = false;
    let isLoggedIn = false;
    
    // ===== SIDEBAR FUNCTIONS =====
    
    // OPEN sidebar only
    function openSidebarOnly() {
        if (!sidebar || !sidebarOverlay) return;
        sidebarOverlay.classList.add('active');
        sidebar.classList.add('active');
        document.body.style.overflow = 'hidden';
        isSidebarOpen = true;
        console.log('✅ Sidebar OPENED');
    }
    
    // CLOSE sidebar only
    function closeSidebarOnly() {
        if (!sidebar || !sidebarOverlay) return;
        sidebar.classList.remove('active');
        setTimeout(function() {
            sidebarOverlay.classList.remove('active');
        }, 200);
        document.body.style.overflow = '';
        isSidebarOpen = false;
        console.log('✅ Sidebar CLOSED');
    }
    
    // TOGGLE sidebar (Menu button click)
    window.footerToggleSidebar = function() {
        if (isSidebarOpen) {
            closeSidebarOnly();
        } else {
            openSidebarOnly();
        }
    };
    
    // CLOSE sidebar (Close button, Overlay click)
    window.footerCloseSidebar = function() {
        closeSidebarOnly();
    };
    
    // ===== MENUSUB FUNCTIONS =====
    
    window.footerToggleMenuSub = function(menuSubId, arrowId) {
        const menuSub = document.getElementById(menuSubId);
        const arrow = document.getElementById(arrowId);
        
        if (!menuSub) {
            console.log('❌ MenuSub not found:', menuSubId);
            return;
        }
        
        // Stop event bubbling
        event.stopPropagation();
        
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
    
    // ===== ACTIVE FOOTER ITEM =====
    
    window.footerSetActive = function(element) {
        if (!element) return;
        
        document.querySelectorAll('.footer-item').forEach(function(item) {
            item.classList.remove('active');
        });
        
        element.classList.add('active');
        console.log('✅ Active:', element.querySelector('span')?.textContent);
    };
    
    // ===== LOGIN TOGGLE =====
    
    window.footerToggleLogin = function() {
        isLoggedIn = !isLoggedIn;
        console.log('✅ Login:', isLoggedIn);
    };
    
    // ===== NAVIGATION =====
    
    window.footerGoToLogin = function() { 
        event.stopPropagation();
        alert('Login Page'); 
    };
    
    window.footerGoToSignup = function() { 
        event.stopPropagation();
        alert('Sign Up Page'); 
    };
    
    window.footerGoToBonus = function() { 
        event.stopPropagation();
        alert('Bonus Page'); 
    };
    
    window.footerGoToRefer = function() { 
        event.stopPropagation();
        alert('Refer a Friend'); 
    };
    
    window.footerGoToSupport = function() { 
        event.stopPropagation();
        alert('Support'); 
    };
    
    window.footerOpenSearch = function() { 
        footerSetActive(document.getElementById('searchBtn'));
        alert('Search'); 
    };
    
    window.footerOpenBetHistory = function() { 
        footerSetActive(document.getElementById('historyBtn'));
        alert('Bet History'); 
    };
    
    window.footerGoHome = function() { 
        footerSetActive(document.getElementById('homeBtn'));
        alert('Home'); 
    };
    
    // ===== EVENT LISTENERS (NO DOUBLE ATTACH) =====
    
    // Overlay click to close
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', function(e) {
            if (e.target === sidebarOverlay) closeSidebarOnly();
        });
    }
    
    // Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isSidebarOpen) closeSidebarOnly();
    });
    
    // ===== REMOVE DEFAULT ACTIVE FROM MENU =====
    if (menuBtn) {
        menuBtn.classList.remove('active');
    }
    
    // ===== INITIALIZE =====
    closeSidebarOnly();
    
    console.log('✅ Footer ready!');
    
});
