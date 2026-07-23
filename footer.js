// ============================================
// SPORTS BETTING - FOOTER & SIDEBAR JS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    console.log('✅ footer.js LOADED SUCCESSFULLY!');
    
    // ===== DOM Elements =====
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const sidebarClose = document.getElementById('sidebarClose');
    const beforeLogin = document.getElementById('beforeLogin');
    const afterLogin = document.getElementById('afterLogin');
    
    // ===== State =====
    let isLoggedIn = false;
    
    // ===== SIDEBAR FUNCTIONS =====
    
    function openSidebar() {
        if (sidebar) {
            sidebar.classList.add('active');
            console.log('Sidebar opened');
        }
        if (sidebarOverlay) {
            sidebarOverlay.classList.add('active');
        }
        document.body.style.overflow = 'hidden';
    }
    
    function closeSidebar() {
        if (sidebar) {
            sidebar.classList.remove('active');
            console.log('Sidebar closed');
        }
        if (sidebarOverlay) {
            sidebarOverlay.classList.remove('active');
        }
        document.body.style.overflow = '';
    }
    
    // ===== DROPDOWN FUNCTIONS =====
    
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
    
    // ===== LOGIN STATE FUNCTIONS =====
    
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
    
    // ===== NAVIGATION FUNCTIONS =====
    
    window.goToLogin = function() {
        console.log('Go to Login');
        alert('Redirect to Login Page');
    };
    
    window.goToProfile = function() {
        console.log('Go to Profile');
        alert('Redirect to Profile Page');
    };
    
    window.goToBonus = function() {
        console.log('Go to Bonus');
        alert('Redirect to Bonus Page');
    };
    
    window.openSearch = function() {
        console.log('Open Search');
        alert('Search feature coming soon!');
    };
    
    window.openBetHistory = function() {
        console.log('Open Bet History');
        alert('Bet History feature coming soon!');
    };
    
    window.goHome = function() {
        console.log('Go Home');
        alert('Home feature coming soon!');
    };
    
    // ===== EVENT LISTENERS =====
    
    // Close button
    if (sidebarClose) {
        sidebarClose.addEventListener('click', closeSidebar);
    }
    
    // Overlay click
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeSidebar);
    }
    
    // Footer menu button
    const menuBtn = document.querySelector('.footer-item:nth
