document.addEventListener('DOMContentLoaded', function() {
    
    console.log('✅ footer.js LOADED!');
    
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    
    let isSidebarOpen = false;
    
    // OPEN sidebar
    window.footerOpenSidebar = function() {
        if (!sidebar || !sidebarOverlay) return;
        sidebarOverlay.classList.add('active');
        sidebar.classList.add('active');
        document.body.style.overflow = 'hidden';
        isSidebarOpen = true;
        console.log('✅ OPEN');
    };
    
    // CLOSE sidebar
    window.footerCloseSidebar = function() {
        if (!sidebar || !sidebarOverlay) return;
        sidebar.classList.remove('active');
        setTimeout(function() {
            sidebarOverlay.classList.remove('active');
        }, 200);
        document.body.style.overflow = '';
        isSidebarOpen = false;
        console.log('✅ CLOSED');
    };
    
    // TOGGLE (Menu button)
    window.footerToggleSidebar = function() {
        if (isSidebarOpen) {
            footerCloseSidebar();
        } else {
            footerOpenSidebar();
        }
    };
    
    // TOGGLE MENUSUB
    window.footerToggleMenuSub = function(menuSubId, arrowId) {
        event.stopPropagation();
        
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
    
    // Other navigation
    window.footerGoToLogin = function() { event.stopPropagation(); alert('Login'); };
    window.footerGoToSignup = function() { event.stopPropagation(); alert('Sign Up'); };
    window.footerGoToBonus = function() { event.stopPropagation(); alert('Bonus'); };
    window.footerGoToRefer = function() { event.stopPropagation(); alert('Refer'); };
    window.footerGoToSupport = function() { event.stopPropagation(); alert('Support'); };
    window.footerToggleLogin = function() { alert('Toggle Login'); };
    
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
    
    // Initialize
    footerCloseSidebar();
    
});
