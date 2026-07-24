// ============================================
// FOOTER SIDEBAR
// ============================================

// ===== DOM ELEMENTS =====
const footerSidebar = document.getElementById("footerSidebar");
const footerSidebarOverlay = document.getElementById("footerSidebarOverlay");

// ===== STATE =====
let isFooterSidebarOpen = false;

// ===== SIDEBAR OPEN =====
window.footerOpenSidebar = function () {

    if (!footerSidebar || !footerSidebarOverlay) return;

    footerSidebar.classList.add("active");
    footerSidebarOverlay.classList.add("active");

    document.body.style.overflow = "hidden";
    isFooterSidebarOpen = true;

    console.log("✅ Footer Sidebar OPENED");

};

// ===== SIDEBAR CLOSE =====
window.footerCloseSidebar = function () {

    if (!footerSidebar || !footerSidebarOverlay) return;

    footerSidebar.classList.remove("active");

    setTimeout(function () {
        footerSidebarOverlay.classList.remove("active");
    }, 200);

    document.body.style.overflow = "";
    isFooterSidebarOpen = false;

    console.log("✅ Footer Sidebar CLOSED");

};

// ===== SIDEBAR TOGGLE =====
window.footerToggleSidebar = function () {

    if (isFooterSidebarOpen) {
        footerCloseSidebar();
    } else {
        footerOpenSidebar();
    }

};
   // ===== FOOTER MENU SUB TOGGLE =====
window.footerToggleMenuSub = function(menuSubId, arrowId) {

    const menuSub = document.getElementById(menuSubId);
    const arrow = document.getElementById(arrowId);

    if (!menuSub) return;

    // Close other sub menus
    document.querySelectorAll('.footer-menusub-list').forEach(function(menu){

        if(menu.id !== menuSubId){

            menu.classList.add('footer-menusub-hidden');

            const otherArrow =
                document.getElementById(
                    menu.id.replace("MenuSub","Arrow")
                );

            if(otherArrow){
                otherArrow.classList.remove("rotate");
            }

        }

    });

    // Toggle Current
    if(menuSub.classList.contains("footer-menusub-hidden")){

        menuSub.classList.remove("footer-menusub-hidden");

        if(arrow){
            arrow.classList.add("rotate");
        }

    }else{

        menuSub.classList.add("footer-menusub-hidden");

        if(arrow){
            arrow.classList.remove("rotate");
        }

    }

};


// ===== FOOTER ACTIVE =====
window.footerSetActive = function(element){

    document.querySelectorAll(".footer-item").forEach(function(item){
        item.classList.remove("active");
    });

    element.classList.add("active");

};


// ===== NAVIGATION =====
window.footerGoToLogin      = () => alert("Login");
window.footerGoToSignup     = () => alert("Sign Up");
window.footerGoToBonus      = () => alert("Bonus");
window.footerGoToRefer      = () => alert("Refer");
window.footerGoToSupport    = () => alert("Support");
window.footerOpenSearch     = () => alert("Search");
window.footerOpenBetHistory = () => alert("Bet History");
window.footerGoHome         = () => alert("Home");


// ===== OVERLAY CLICK =====
if (footerSidebarOverlay) {

    footerSidebarOverlay.addEventListener("click", function(e){

        if(e.target === footerSidebarOverlay){
            footerCloseSidebar();
        }

    });

}


// ===== ESC KEY =====
document.addEventListener("keydown", function(e){

    if(e.key === "Escape" && isFooterSidebarOpen){
        footerCloseSidebar();
    }

});


// ===== INITIALIZE =====
footerCloseSidebar();

console.log("✅ footer.js Ready!");
