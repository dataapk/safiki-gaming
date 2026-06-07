// ==========================
// SAFIKI ADMIN PANEL ENGINE
// ==========================

document.addEventListener("DOMContentLoaded", function () {

    // INIT SIDEBAR
    initSidebar();

    // =========================
    // GAME LOAD BUTTON LOGIC
    // =========================

    const btn = document.getElementById("loadGameBtn");

    if (btn) {

        btn.addEventListener("click", function () {

            const game = document.getElementById("gameSelector").value;

            if (!game) {
                alert("Select a game first");
                return;
            }

            const statsSection = document.getElementById("gameStatsSection");

            if (statsSection) {
                statsSection.style.display = "block";
            }

            console.log("Game selected:", game);

        });

    }

});


// ==========================
// SIDEBAR SYSTEM
// ==========================

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

            if (activeSection) {

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
// RTP FUNCTION START 
// ==========================
function toggleRtpPanel(){

    const panel =
        document.getElementById("rtpPanel");

    panel.style.display =
        panel.style.display === "block"
        ? "none"
        : "block";

}

function saveRtp(){

    let rtp =
        document.getElementById("rtpInput").value;

    document.getElementById("currentRtp")
        .innerText = rtp + "%";

    document.getElementById("houseEdge")
        .innerText = (100 - rtp) + "%";

    alert("RTP Updated");

}
// ==========================
// RTP FUNCTION END
// ==========================
// ==========================
//PLAYER CONTROL START
// ==========================
function togglePlayerPanel(){

    const panel =
        document.getElementById("playerPanel");

    panel.style.display =
        panel.style.display === "block"
        ? "none"
        : "block";

}

function savePlayerSettings(){

    alert("Player Settings Saved");

}
// ==========================
//PLAYER CONTROL END
// ==========================

// ==========================
// ADMIN ACTIONS ENGINE
// ==========================

function addBalance(){

    openAdminModal(
        "Add Balance",

        `
        <input
            type="text"
            id="balanceUserId"
            placeholder="User ID">

        <input
            type="number"
            id="balanceAmount"
            placeholder="Amount">

        <button onclick="confirmAddBalance()">
            Add Balance
        </button>
        `
    );

}

function confirmAddBalance(){

    let userId =
        document.getElementById("balanceUserId").value;

    let amount =
        document.getElementById("balanceAmount").value;

    alert(
        "Balance Added\nUser: " +
        userId +
        "\nAmount: " +
        amount
    );

    closeAdminModal();

}

function deductBalance(){

    openAdminModal(
        "Deduct Balance",

        `
        <input
            type="text"
            id="deductUserId"
            placeholder="User ID">

        <input
            type="number"
            id="deductAmount"
            placeholder="Amount">

        <button onclick="confirmDeductBalance()">
            Deduct Balance
        </button>
        `
    );

}

function confirmDeductBalance(){

    let userId =
        document.getElementById("deductUserId").value;

    let amount =
        document.getElementById("deductAmount").value;

    alert(
        "Balance Deducted\nUser: " +
        userId +
        "\nAmount: " +
        amount
    );

    closeAdminModal();

}

function suspendUser(){

    openAdminModal(
        "Suspend User",

        `
        <input
            type="text"
            id="suspendUserId"
            placeholder="User ID">

        <select id="suspendDuration">
            <option>24 Hours</option>
            <option>7 Days</option>
            <option>30 Days</option>
            <option>Permanent</option>
        </select>

        <button onclick="confirmSuspendUser()">
            Suspend User
        </button>
        `
    );

}

function confirmSuspendUser(){

    let userId =
        document.getElementById("suspendUserId").value;

    let duration =
        document.getElementById("suspendDuration").value;

    alert(
        "User Suspended\nUser: " +
        userId +
        "\nDuration: " +
        duration
    );

    closeAdminModal();

}

function deleteUser(){

    openAdminModal(
        "Delete User",

        `
        <input
            type="text"
            id="deleteUserId"
            placeholder="User ID">

        <button onclick="confirmDeleteUser()">
            Permanently Delete
        </button>
        `
    );

}

function confirmDeleteUser(){

    let userId =
        document.getElementById("deleteUserId").value;

    let confirmDelete =
        confirm(
            "Delete User ID: " + userId + " ?"
        );

    if(confirmDelete){

        alert(
            "User Deleted: " + userId
        );

        closeAdminModal();

    }

}
// ==========================
//Notification: START
// ==========================
function sendNotification(){

    let title =
        document.getElementById("notifTitle").value;

    let msg =
        document.getElementById("notifMessage").value;

    if(!title || !msg){

        alert("Fill Notification Data");

        return;

    }

    alert("Notification Sent");

}
// ==========================
//Notification: END
// ==========================
function openModal(action, userId = null){

    const modal =
        document.getElementById("adminModal");

    const title =
        document.getElementById("modalTitle");

    const body =
        document.getElementById("modalBody");

    modal.style.display = "block";

    title.innerHTML = action;
    body.innerHTML = "User ID : " + userId;

}

function toggleActionPanel(panelId, btn = null) {

    const target = document.getElementById(panelId);

    const isOpen = target && target.style.display === "block";

    // IMPORTANT: only close SUB PANELS, not profilePanel
    const panels = document.querySelectorAll(".sub-panel");

    const buttons = document.querySelectorAll(".profile-toggle-btn");

    // close if already open
    if (isOpen) {
        target.style.display = "none";
        if (btn) btn.classList.remove("active");
        return;
    }

    // hide only sub panels
    panels.forEach(panel => {
        panel.style.display = "none";
    });

    // remove active state
    buttons.forEach(b => {
        b.classList.remove("active");
    });

    // open selected
    if (target) {
        target.style.display = "block";
    }

    // active button
    if (btn) {
        btn.classList.add("active");
    }
}
function toggleActionButtons() {

    const panel =
        document.getElementById("actionButtons");

    if(panel.style.display === "block") {

        panel.style.display = "none";

    } else {

        panel.style.display = "block";

    }

}
/* ================================
   USER DATA SECTIONEND
==================================*/

/* ================================
   GAMES SECTION JS FILE START
==================================*/

let activeGameId = null;

/* ================================
   VIEW SWITCH SYSTEM
==================================*/

function switchToTableView() {

    document.getElementById("gamesTableView").style.display = "block";
    document.getElementById("gamesCardView").style.display = "none";

}

function switchToCardView() {

    document.getElementById("gamesTableView").style.display = "none";
    document.getElementById("gamesCardView").style.display = "block";

}

/* ================================
   OPEN GAME SETTINGS PANEL
==================================*/

let activeGameId = null;

function openGameSettings(gameId) {

    const panel = document.getElementById("gameSettingsPanel");

    // 🔁 যদি একই game আবার click করে → CLOSE
    if (activeGameId === gameId && panel.style.display === "block") {
        panel.style.display = "none";
        activeGameId = null;
        return;
    }

    // 🟢 otherwise OPEN
    activeGameId = gameId;

    panel.style.display = "block";

    // demo load
    document.getElementById("gs_id").innerText = gameId;
    document.getElementById("gs_name").innerText = getGameName(gameId);
}

/* ================================
   GAME NAME MAP (DEMO)
==================================*/

function getGameName(id) {

    const games = {
        "G1001": "Jhandi Munda",
        "G1002": "Teen Patti",
        "G1003": "Wheel"
    };

    return games[id] || "Unknown Game";
}

/* ================================
   RTP LIVE UPDATE
==================================*/

const rtpSlider = document.getElementById("gs_rtp");

if (rtpSlider) {

    rtpSlider.addEventListener("input", function () {

        document.getElementById("gs_rtp_value").innerText =
            this.value + "%";

    });

}

/* ================================
   STATUS TOGGLE SYSTEM
==================================*/

function toggleGameStatus() {

    const btn = document.getElementById("gs_status_btn");

    if (btn.innerText === "ACTIVE") {

        btn.innerText = "INACTIVE";
        btn.style.background = "red";

    } else {

        btn.innerText = "ACTIVE";
        btn.style.background = "green";
    }
}

/* ================================
   API KEY GENERATOR
==================================*/

function generateApiKey() {

    const key =
        "API-" + Math.random().toString(36).substr(2, 10).toUpperCase();

    document.getElementById("gs_apiKey").value = key;

}

/* ================================
   SAVE SETTINGS (BACKEND READY)
==================================*/

function saveGameSettings() {

    const data = {

        gameId: activeGameId,

        rtp: document.getElementById("gs_rtp").value,

        status: document.getElementById("gs_status_btn").innerText,

        minBet: document.getElementById("gs_minBet").value,

        maxBet: document.getElementById("gs_maxBet").value,

        apiKey: document.getElementById("gs_apiKey").value,

        serverKey: document.getElementById("gs_serverKey").value

    };

    console.log("Saving Game Settings:", data);

    alert("Game settings saved (frontend demo)");

    // 👉 এখানে পরে NodeJS / Supabase API call বসবে

}

/* ================================
   ADD GAME (PLACEHOLDER)
==================================*/

function openAddGame() {

    alert("Add Game Panel will open (future modal or section)");

}

/* ================================
   GAMES SECTION JS FILE END
==================================*/
console.log("SAFIKI ADMIN PANEL LOADED");
