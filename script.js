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
   PRIVACY & TERMS MODAL
========================= */

document.addEventListener('DOMContentLoaded', function () {

    // Privacy Policy Button
    const privacyBtn = document.getElementById("privacy-btn");
    const privacyModal = document.getElementById("privacy-modal");

    if (privacyBtn && privacyModal) {
        privacyBtn.onclick = function(e){
            e.preventDefault();
            privacyModal.style.display = "block";
        };
    }

    // Terms of Use Button
    const termsBtn = document.getElementById("terms-btn");
    const termsModal = document.getElementById("terms-modal");

    if (termsBtn && termsModal) {
        termsBtn.onclick = function(e){
            e.preventDefault();
            termsModal.style.display = "block";
        };
    }

});
</body>
</html>
