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
       MENU BUTTON
    ========================= */

    const menuBtn =
        document.getElementById(
            'menu-toggle'
        );

    if (menuBtn) {

        menuBtn.addEventListener(
            'click',
            () => {

                console.log(
                    'Menu Clicked'
                );

            }
        );

    }

});
