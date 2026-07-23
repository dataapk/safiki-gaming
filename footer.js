// ============================================
// FOOTER & SIDEBAR JS — FIXED VERSION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    console.log('✅ footer.js LOADED!');
    
    // Elements
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const sidebarClose = document.getElementById('sidebarClose');
    const beforeLogin = document.getElementById('beforeLogin');
    const afterLogin = document.getElementById('afterLogin');
    
    let isLoggedIn = false;
    let isSidebarOpen = false;
    
    // ===== SIDEBAR FUNCTIONS =====
    
    function openSidebar() {
        if (sidebar) sidebar.classList.add('active');
        if (sidebarOverlay) sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        isSidebarOpen = true;
        
        // Footer hide when sidebar open
        const footer = document.querySelector('.bottom-footer');
        if (footer) footer.style.display = 'none';
        
        console.log('Sidebar OPENED');
    }
    
    function closeSidebar() {
        if (sidebar) sidebar.classList.remove('active');
        if (sidebarOverlay) sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
        isSidebarOpen = false;
        
        // Footer show when sidebar close
        const footer = document.querySelector('.bottom-footer');
        if (footer) footer.style.display = 'block';
        
        console.log('Sidebar CLOSED');
    }
    
    function toggleSidebar() {
        if (isSidebarOpen) {
            closeSidebar();
        } else {
            openSidebar();
        }
    }
    
    // ===== ACTIVE FOOTER ITEM =====
    
    function setActiveFooterItem(clickedItem) {
        // Remove active from all
        document.querySelectorAll('.footer-item').forEach(function(item) {
            item.classList.remove('active');
        });
        
        // Add active to clicked
        if (clickedItem) {
            clickedItem.classList.add('active');
        }
    }
    
    // ===== DROPDOWN =====
    
    window.toggleDropdown = function(dropdownId) {
        const dropdown = document.getElementById(dropdownId);
        const arrowId = dropdownId.replace('Dropdown', 'Arrow');
        const arrow = document.getElementById(arrowId);
        
        // Close other dropdowns
        document.querySelectorAll('.dropdown-menu').forEach(function(menu) {
            if (menu.id !== dropdownId && !menu.classList.contains('hidden')) {
                menu.classList.add('hidden');
                const otherArrowId = menu.id.replace('Dropdown', 'Arrow');
                const otherArrow = document.getElementById(otherArrowId);
                if (otherArrow) otherArrow.classList.remove('rotate');
            }
        });
        
        // Toggle current
        if (dropdown) {
            dropdown.classList.toggle('hidden');
            console.log('Dropdown toggled:', dropdownId);
        }
        if (arrow) {
            arrow.classList.toggle('rotate');
        }
    };
    
    // ===== LOGIN TOGGLE =====
    
    window.toggleLoginState = function() {
        isLoggedIn = !isLoggedIn;
        console.log('Login state:', isLoggedIn);
        
        if (isLoggedIn) {
            if (beforeLogin) beforeLogin.classList.add('hidden');
            if (afterLogin) afterLogin.classList.remove('hidden');
        } else {
            if (beforeLogin) beforeLogin.classList.remove('hidden');
            if (afterLogin) afterLogin.classList.add('hidden');
        }
    };
    
    // ===== NAVIGATION =====
    
    window.goToLogin = function() {
        alert('Login Page');
    };
    
    window.goToProfile = function() {
        alert('Profile Page');
    };
    
    window.goToBonus = function() {
        alert('Bonus Page');
    };
    
    window.openSearch = function() {
        alert('Search');
    };
    
    window.openBetHistory = function() {
        alert('Bet History');
    };
    
    window.goHome = function() {
        alert('Home');
    };
    
    // ===== EVENT LISTENERS =====
    
    // Sidebar Close
    if (sidebarClose) {
        sidebarClose.addEventListener('click', closeSidebar);
    }
    
    // Overlay Click
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeSidebar);
    }
    
    // Footer Items — with active state
    const footerItems = document.querySelectorAll('.footer-item');
    
    // Menu (index 0)
    if (footerItems[0]) {
        footerItems[0].addEventListener('click', function() {
            setActiveFooterItem(this);
            toggleSidebar();
        });
    }
    
    // Search (index 1)
    if (footerItems[1]) {
        footerItems[1].addEventListener('click', function() {
            setActiveFooterItem(this);
            openSearch();
        });
    }
    
    // Bet History (index 2)
    if (footerItems[2]) {
        footerItems[2].addEventListener('click', function() {
            setActiveFooterItem(this);
            openBetHistory();
        });
    }
    
    // Home (index 3)
    if (footerItems[3]) {
        footerItems[3].addEventListener('click', function() {
            setActiveFooterItem(this);
            goHome();
        });
    }
    
    // Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isSidebarOpen) {
            closeSidebar();
        }
    });
    
    // ===== SWIPE TO CLOSE =====
    let touchStartX = 0;
    
    if (sidebar) {
        sidebar.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        sidebar.addEventListener('touchend', function(e) {
            const touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 50) {
                closeSidebar();
            }
        });
    }
    
    console.log('✅ All event listeners attached!');
    
});
