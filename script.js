document.addEventListener('DOMContentLoaded', () => {

    /* =========================
       MENU DROPDOWN
    ========================= */

    const menuBtn =
        document.getElementById('menu-toggle');

    const dropdownMenu =
        document.getElementById('dropdown-menu');

    if (menuBtn && dropdownMenu) {

        menuBtn.addEventListener('click', (e) => {

            e.stopPropagation();

            dropdownMenu.classList.toggle('active');

        });

        document.addEventListener('click', () => {

            dropdownMenu.classList.remove('active');

        });

    }

    /* =========================
       CATEGORY SELECTION
    ========================= */

    const categories = document.querySelectorAll('.category-item');

    categories.forEach(item => {

        item.addEventListener('click', () => {

            categories.forEach(cat => {
                cat.style.opacity = '1';
            });

            item.style.opacity = '0.7';

            console.log(
                'Selected Category: ' +
                item.innerText
            );

        });

    });


    /* =========================
       GAME BUTTONS
    ========================= */

    const gameButtons =
        document.querySelectorAll('.glow-btn');

    gameButtons.forEach(btn => {

        btn.addEventListener('click', () => {

            const gameName =
                btn.innerText;

            console.log(
                'Opening Game: ' +
                gameName
            );

        });

    });


    /* =========================
       FOOTER NAVIGATION
    ========================= */

    const navLinks =
        document.querySelectorAll(
            '.bottom-nav nav a'
        );

    navLinks.forEach(link => {

        link.addEventListener('click', function () {

            navLinks.forEach(item => {

                item.style.color =
                    '#ffffff';

            });

            this.style.color =
                '#8A2BE2';

        });

    });


    /* =========================
       LOGIN BUTTON
    ========================= */

    const loginBtn =
        document.querySelector(
            '.login-btn'
        );

    if (loginBtn) {

        loginBtn.addEventListener(
            'click',
            () => {

                window.location.href =
                    'auth.html';

            }
        );

    }
 
/* =========================
PROMOTION AUTO SLIDER
========================= */

const promotionSlider =
document.querySelector(
'.promotion-slider'
);

const promotionSlides =
document.querySelectorAll(
'.promotion-slide'
);

const dots =
document.querySelectorAll(
'.dot'
);

if (
promotionSlider &&
promotionSlides.length
) {

let currentIndex = 0;

function updateDots(index) {

    dots.forEach(dot => {

        dot.classList.remove(
            'active'
        );

    });

    if (dots[index]) {

        dots[index].classList.add(
            'active'
        );

    }

}

updateDots(0);

setInterval(() => {

    currentIndex++;

    if (
        currentIndex >=
        promotionSlides.length
    ) {

        currentIndex = 0;

    }

    const slideWidth =
        promotionSlides[0]
        .offsetWidth + 10;

    promotionSlider.scrollTo({

        left:
            currentIndex *
            slideWidth,

        behavior:
            'smooth'

    });

    updateDots(
        currentIndex
    );

}, 3000);

}

});
/* =========================
   ABOUT US SECTION START
========================= */
document.addEventListener('DOMContentLoaded', function () {
    const modalMap = {
        "terms-btn": "terms-modal",
        "privacy-btn": "privacy-modal",
        "fair-btn": "fair-modal",
        "responsible-btn": "responsible-modal"
    };

    for (let btnId in modalMap) {
        const btn = document.getElementById(btnId);
        const modal = document.getElementById(modalMap[btnId]);
        if(btn && modal){
            btn.onclick = function(e){
                e.preventDefault();
                modal.style.display = "block";
            };
        }
    }

    // Close buttons
    document.querySelectorAll(".close").forEach(btn => {
        btn.onclick = function(){
            const modal = document.getElementById(this.getAttribute("data-modal"));
            if(modal) modal.style.display = "none";
        };
    });

    // Click outside modal
    window.onclick = function(event){
        if(event.target.classList.contains("modal")){
            event.target.style.display = "none";
        }
    };
});
/* =========================
    ABOUT US SECTION END
========================= */
