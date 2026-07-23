document.addEventListener('DOMContentLoaded', function() {
    
    console.log('✅ footer.js LOADED!');
    
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const menuBtn = document.getElementById('menuBtn');
    
    let isSidebarOpen = false;
    let isLoggedIn = false;
    
    // Sidebar Functions
    window.footerOpenSidebar = function() {
        if (!sidebar || !sidebarOverlay) return;
        sidebarOverlay.classList.add('active');
        sidebar.classList.add('active');
        document.body.style.overflow = 'hidden';
        isSidebarOpen = true;
        footerSetActive(menuBtn);
    };
    
    window.footerCloseSidebar = function() {
        if (!sidebar || !sidebarOverlay) return;
        sidebar.classList.remove('active');
        setTimeout(function() {
            sidebarOverlay.classList.remove('active');
        }, 200);
        document.body.style.overflow = '';
        isSidebarOpen = false;
    };
    
    window.footerToggleSidebar = function() {
        if (isSidebarOpen) {
            footerCloseSidebar();
        } else {
            footerOpenSidebar();
        }
    };
    
    // MenuSub Toggle
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
    
    // Active Footer Item
    window.footerSetActive = function(element) {
        if (!element) return;
        document.querySelectorAll('.footer-item').forEach(function(item) {
            item.classList.remove('active');
        });
        element.classList.add('active');
    };
    
    // Login Toggle
    window.footerToggleLogin = function() {
        isLoggedIn = !isLoggedIn;
        console.log('Login:', isLoggedIn);
    };
    
    // Navigation
    window.footerGoToLogin = function() { alert('Login Page'); };
    window.footerGoToSignup = function() { alert('Sign Up Page'); };
    window.footerGoToBonus = function() { alert('Bonus Page'); };
    window.footerGoToRefer = function() { alert('Refer a Friend'); };
    window.footerGoToSupport = function() { alert('Support'); };
    window.footerOpenSearch = function() { alert('Search'); };
    window.footerOpenBetHistory = function() { alert('Bet History'); };
    window.footerGoHome = function() { alert('Home'); };
    
    // Event Listeners
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', function(e) {
            if (e.target === sidebarOverlay) footerCloseSidebar();
        });
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isSidebarOpen) footerCloseSidebar();
    });
    
    // Footer items
    const footerItems = document.querySelectorAll('.footer-item');
    if (footerItems[0]) footerItems[0].addEventListener('click', footerToggleSidebar);
    if (footerItems[1]) footerItems[1].addEventListener('click', function() { footerSetActive(this); footerOpenSearch(); });
    if (footerItems[2]) footerItems[2].addEventListener('click', function() { footerSetActive(this); footerOpenBetHistory(); });
    if (footerItems[3]) footerItems[3].addEventListener('click', function() { footerSetActive(this); footerGoHome(); });
    
    footerCloseSidebar();
    console.log('✅ Footer ready!');
    
});
