// ============================================
// FOOTER & SIDEBAR JS — FINAL (NO DOUBLE CLICK)
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    console.log('✅ footer.js LOADED!');
    
    // ===== DOM ELEMENTS =====
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    
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
        
        console.log('✅ Sidebar CLOSED');
    };
    
    // ===== SIDEBAR TOGGLE =====
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
        
        if (!menuSub) return;
        
        // Close others
        document.querySelectorAll('.menusub-list').forEach(function(menu) {
            if (menu.id !== menuSubId && !menu.classList.contains('menusub-hidden')) {
                menu.classList.add('menusub-hidden');
                const otherArrowId = menu.id.replace('MenuSub', 'Arrow');
                const otherArrow = document.getElementById(otherArrowId);
                if (otherArrow) otherArrow.classList.remove('rotate');
            }
        });
        
        // Toggle current
        if (menuSub.classList.contains('menusub-hidden')) {
            menuSub.classList.remove('menusub-hidden');
            if (arrow) arrow.classList.add('rotate');
        } else {
            menuSub.classList.add('menusub-hidden');
            if (arrow) arrow.classList.remove('rotate');
        }
    };
    
    // ===== SET ACTIVE =====
    window.footerSetActive = function(element) {
        if (!element) return;
        
        document.querySelectorAll('.footer-item').forEach(function(item) {
            item.classList.remove('active');
        });
        
        element.classList.add('active');
    };
    
    // ===== LOGIN TOGGLE =====
    window.footerToggleLogin = function() {
        isLoggedIn = !isLoggedIn;
        alert(isLoggedIn ? 'Logged In' : 'Logged Out');
    };
    
    // ===== NAVIGATION =====
    window.footerGoToLogin = function() { alert('Login'); };
    window.footerGoToSignup = function() { alert('Sign Up'); };
    window.footerGoToBonus = function() { alert('Bonus'); };
    window.footerGoToRefer = function() { alert('Refer'); };
    window.footerGoToSupport = function() { alert('Support'); };
    window.footerOpenSearch = function() { alert('Search'); };
    window.footerOpenBetHistory = function() { alert('Bet History'); };
    window.footerGoHome = function() { alert('Home'); };
    
    // ===== EVENT LISTENERS (Only for overlay and escape) =====
    
    // Overlay click
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', function(e) {
            if (e.target === sidebarOverlay) footerCloseSidebar();
        });
    }
    
    // Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isSidebarOpen) footerCloseSidebar();
    });
    
    // ===== INITIALIZE =====
    footerCloseSidebar();
    
    console.log('✅ Ready!');
    
});
