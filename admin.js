// ==========================
// SAFIKI SPA NAVIGATION ENGINE
// ==========================

document.addEventListener("DOMContentLoaded", function () {

    initNavigation();

    console.log("SPA ADMIN READY");
});

// ==========================
// MAIN NAVIGATION (SIDEBAR + QUICK ACCESS)
// ==========================

function initNavigation() {

    const navItems =
        document.querySelectorAll(
            ".sidebar-menu li, .stats-grid .stat-card"
        );

    const sections =
        document.querySelectorAll(".admin-section");

    function switchSection(targetId) {

        if (!targetId) return;

        // hide all sections
        sections.forEach(sec => {
            sec.style.display = "none";
            sec.classList.remove("active");
        });

        // show target section
        const target = document.getElementById(targetId);

        if (target) {

            target.style.display = "block";
            target.classList.add("active");

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        } else {

            console.warn("Section not found:", targetId);

        }
    }

    function setActiveUI(clickedItem) {

        document.querySelectorAll(
            ".sidebar-menu li, .stats-grid .stat-card"
        ).forEach(el => el.classList.remove("active"));

        clickedItem.classList.add("active");
    }

    navItems.forEach(item => {

        item.addEventListener("click", function () {

            const target =
                this.getAttribute("data-target");

            if (!target) return;

            switchSection(target);
            setActiveUI(this);

        });

    });

    // ==========================
    // DEFAULT SECTION (DASHBOARD)
    // ==========================
    const dashboard =
        document.getElementById("dashboardSection");

    if (dashboard) {

        dashboard.style.display = "block";
        dashboard.classList.add("active");
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
        panel.style.display === "block"
            ? "none"
            : "block";
}

function saveRtp() {

    let rtp =
        document.getElementById("rtpInput")?.value;

    if (!rtp) return;

    document.getElementById("currentRtp").innerText = rtp + "%";
    document.getElementById("houseEdge").innerText = (100 - rtp) + "%";

    alert("RTP Updated");
}

// ==========================
// PLAYER RTP (API)
// ==========================

async function savePlayerRtp() {

    const dbId =
        document.getElementById('player-config')?.getAttribute('data-dbid');

    const gameType =
        document.getElementById('game-select')?.value;

    const rtpInput =
        document.getElementById('rtp-value')?.value;

    if (!dbId) return alert("User not found");

    if (rtpInput < 1 || rtpInput > 100)
        return alert("Invalid RTP");

    const rtpValue = parseFloat(rtpInput) / 100;

    try {

        const res = await fetch('/api/admin/update-rtp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                db_id: dbId,
                game: gameType,
                rtp: rtpValue
            })
        });

        const result = await res.json();

        alert(result.success
            ? "RTP Updated"
            : "Failed: " + result.message
        );

    } catch (err) {
        console.error(err);
        alert("Server error");
    }
}

// ==========================
// GLOBAL RTP
// ==========================

async function saveGlobalRtp() {

    const gameType =
        document.getElementById('game-select')?.value;

    const rtpValue =
        document.getElementById('global-rtp-value')?.value;

    if (rtpValue < 1 || rtpValue > 100)
        return alert("Invalid value");

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

        alert(result.success
            ? "Global RTP Updated"
            : "Error"
        );

    } catch (err) {
        console.error(err);
        alert("Server error");
    }
}

// ==========================
// RTP SYSTEM END
// ==========================
