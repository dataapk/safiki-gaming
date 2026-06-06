// ==========================
// SAFIKI ADMIN PANEL CORE
// ==========================

document.addEventListener("DOMContentLoaded", function () {

    console.log("ADMIN PANEL STARTED");

    initSidebar();
    initQuickAccess();

});
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
