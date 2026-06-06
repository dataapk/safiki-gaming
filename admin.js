// ==========================
// SAFIKI ADMIN PANEL ENGINE
// ==========================

document.addEventListener("DOMContentLoaded", function () {

    initSidebar();

});
function initSidebar() {

    const menuItems =
        document.querySelectorAll(".sidebar-menu li");

    const sections =
        document.querySelectorAll(".admin-section");

    menuItems.forEach(item => {

        item.addEventListener("click", () => {

            const target =
                item.getAttribute("data-target");

            menuItems.forEach(m =>
                m.classList.remove("active")
            );

            item.classList.add("active");

            sections.forEach(section => {
                section.style.display = "none";
            });

            const activeSection =
                document.getElementById(target);

            if(activeSection){

                activeSection.style.display = "block";

                activeSection.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });

}
// ==========================
// SIDEBAR NAVIGATION
// ==========================

function initSidebar() {

    const menuItems = document.querySelectorAll(".sidebar-menu li");

    const sections = document.querySelectorAll(".admin-section");

    menuItems.forEach(item => {

        item.addEventListener("click", () => {

            menuItems.forEach(m =>
                m.classList.remove("active")
            );

            item.classList.add("active");

            const target = item.getAttribute("data-target");

            sections.forEach(section => {

                section.style.display = "none";

            });

            const activeSection =
                document.getElementById(target);

            if(activeSection){

                activeSection.style.display = "block";

                activeSection.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });

}
// ==========================
// SIDEBAR NAVIGATION
// ==========================

    // ==========================
    // DEFAULT LOAD (DASHBOARD)
    // ==========================

    hideAllSections();

    const dashboard =
        document.getElementById("dashboardSection");

    if (dashboard) {

        dashboard.style.display = "block";
        dashboard.classList.add("active");

    } else {
        console.warn("Dashboard section missing");
    }
}

// ==========================
// RTP SYSTEM START
// ==========================

function toggleRtpPanel() {

    const panel =
        document.getElementById("rtpPanel");

    if (!panel) return;

    panel.style.display =
        panel.style.display === "block" ? "none" : "block";
}

function saveRtp() {

    const rtp =
        document.getElementById("rtpInput")?.value;

    if (!rtp) {
        alert("RTP value missing");
        return;
    }

    document.getElementById("currentRtp").innerText = rtp + "%";
    document.getElementById("houseEdge").innerText = (100 - rtp) + "%";

    alert("RTP Updated");
}

// ==========================
// PLAYER RTP API
// ==========================

async function savePlayerRtp() {

    const dbId =
        document.getElementById('player-config')?.getAttribute('data-dbid');

    const gameType =
        document.getElementById('game-select')?.value;

    const rtpInput =
        document.getElementById('rtp-value')?.value;

    if (!dbId) {
        alert("User not found");
        return;
    }

    if (rtpInput < 1 || rtpInput > 100) {
        alert("Invalid RTP value");
        return;
    }

    try {

        const res = await fetch('/api/admin/update-rtp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                db_id: dbId,
                game: gameType,
                rtp: parseFloat(rtpInput) / 100
            })
        });

        const result = await res.json();

        if (result.success) {
            alert("RTP Updated Successfully");
        } else {
            alert("Failed: " + result.message);
        }

    } catch (err) {
        console.error(err);
        alert("Server error");
    }
}

// ==========================
// GLOBAL RTP API
// ==========================

async function saveGlobalRtp() {

    const gameType =
        document.getElementById('game-select')?.value;

    const rtpValue =
        document.getElementById('global-rtp-value')?.value;

    if (rtpValue < 1 || rtpValue > 100) {
        alert("Invalid value");
        return;
    }

    try {

        const res = await fetch('/api/admin/update-global-rtp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                game: gameType,
                rtp: rtpValue
            })
        });

        const result = await res.json();

        if (result.success) {
            alert("Global RTP Updated Successfully");
        } else {
            alert("Error: " + result.message);
        }

    } catch (err) {
        console.error(err);
        alert("Server connection error");
    }
}

// ==========================
// RTP SYSTEM END
// ==========================
