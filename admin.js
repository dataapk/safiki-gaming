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
   USER DATA SECTION END
==================================*/

/* ================================
   GAMES SECTION JS FILE START
==================================*/

window.activeGameId = null;

/* ================================
   OPEN GAME SETTINGS PANEL
==================================*/

function openGameSettings(gameId) {

    const panel =
        document.getElementById("gameSettingsPanel");

    if (!panel) return;

    if (window.activeGameId === gameId) {

        const isVisible =
            window.getComputedStyle(panel).display !== "none";

        if (isVisible) {

            panel.style.display = "none";
            window.activeGameId = null;

            return;

        }

    }

    window.activeGameId = gameId;

    panel.style.display = "block";

    document.getElementById("gs_id").innerText =
        gameId;

    document.getElementById("gs_name").innerText =
        getGameName(gameId);

}

/* ================================
   GAME NAME MAP
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
   SETTINGS ACCORDION
==================================*/

function toggleSection(sectionId) {

    const allSections =
        document.querySelectorAll(".settings-content");

    const current =
        document.getElementById(sectionId);

    if (!current) return;

    const isOpen =
        current.style.display === "block";

    allSections.forEach(section => {

        section.style.display = "none";

    });

    if (!isOpen) {

        current.style.display = "block";

    }

}

/* ================================
   RTP LIVE UPDATE
==================================*/

document.addEventListener("DOMContentLoaded", () => {

    const rtpSlider =
        document.getElementById("gs_rtp");

    if (!rtpSlider) return;

    rtpSlider.addEventListener("input", function () {

        const output =
            document.getElementById("gs_rtp_value");

        if (output) {

            output.innerText =
                this.value + "%";

        }

    });

});

/* ================================
   GAME STATUS TOGGLE
==================================*/

function toggleGameStatus() {

    const btn =
        document.getElementById("gameStatusBtn");

    if (!btn) return;

    if (btn.classList.contains("status-active")) {

        btn.classList.remove("status-active");

        btn.classList.add("status-inactive");

        btn.innerHTML =
            "🔴 INACTIVE";

    }

    else {

        btn.classList.remove("status-inactive");

        btn.classList.add("status-active");

        btn.innerHTML =
            "🟢 ACTIVE";

    }

}

/* ================================
   TEST BACKEND CONNECTION
==================================*/

function testConnection() {

    const status =
        document.getElementById("connectionStatus");

    const sync =
        document.getElementById("lastSyncTime");

    if (!status || !sync) return;

    status.innerHTML =
        "🟡 Checking...";

    setTimeout(() => {

        status.innerHTML =
            "🟢 Connected";

        sync.innerHTML =
            new Date().toLocaleString();

    }, 1000);

}

/* ================================
   API KEY GENERATOR
==================================*/

function generateApiKey() {

    const key =
        "API-" +
        Math.random()
            .toString(36)
            .substring(2, 12)
            .toUpperCase();

    const field =
        document.getElementById("gs_apiKey");

    if (field) {

        field.value = key;

    }

}

/* ================================
   SAVE GAME SETTINGS
==================================*/

function saveGameSettings() {

    const data = {

        gameId:
            window.activeGameId,

        status:
            document.getElementById("gameStatusBtn")
                ?.innerText || "",

        rtp:
            document.getElementById("gs_rtp")
                ?.value || "",

        minBet:
            document.getElementById("gs_minBet")
                ?.value || "",

        maxBet:
            document.getElementById("gs_maxBet")
                ?.value || "",

        apiKey:
            document.getElementById("gs_apiKey")
                ?.value || "",

        serverKey:
            document.getElementById("gs_serverKey")
                ?.value || ""

    };

    console.log(
        "Game Settings Saved:",
        data
    );

    alert(
        "✅ Game Settings Saved"
    );

}

/* ================================
   ADD GAME (PLACEHOLDER)
==================================*/

function openAddGame() {

    alert(
        "Add Game System Coming Next"
    );

}

/* ================================
   GAMES SECTION JS FILE END
==================================*/

/* ===================================
   FINANCE SECTION JS START
=================================== */

/* ================================
   OPEN / CLOSE MAIN FINANCE PANELS
==================================*/

function toggleFinanceSection(sectionId){

    const depositPanel =
        document.getElementById(
            "depositFinancePanel"
        );

    const withdrawPanel =
        document.getElementById(
            "withdrawFinancePanel"
        );

    const targetPanel =
        document.getElementById(
            sectionId
        );

    if(!targetPanel) return;

    if(targetPanel.style.display === "block"){

        targetPanel.style.display = "none";

        return;

    }

    depositPanel.style.display = "none";
    withdrawPanel.style.display = "none";

    targetPanel.style.display = "block";

}

/* ================================
   DEPOSIT SUB MENUS
==================================*/

function toggleDepositMenu(panelId){

    const panels = [

        "walletManagementPanel",
        "depositSettingsPanel",
        "pendingDepositsPanel",
        "depositHistoryPanel",
        "depositReportsPanel"

    ];

    panels.forEach(id => {

        if(id !== panelId){

            const panel =
                document.getElementById(id);

            if(panel){

                panel.style.display = "none";

            }

        }

    });

    const panel =
        document.getElementById(panelId);

    if(!panel) return;

    if(panel.style.display === "block"){

        panel.style.display = "none";

    }else{

        panel.style.display = "block";

    }

}

/* ================================
   WITHDRAW SUB MENUS
==================================*/

function toggleWithdrawMenu(panelId){

    const panels = [

        "withdrawSettingsPanel",
        "pendingWithdrawPanel",
        "withdrawHistoryPanel",
        "approvalRulesPanel",
        "withdrawReportsPanel"

    ];

    panels.forEach(id => {

        if(id !== panelId){

            const panel =
                document.getElementById(id);

            if(panel){

                panel.style.display = "none";

            }

        }

    });

    const panel =
        document.getElementById(panelId);

    if(!panel) return;

    if(panel.style.display === "block"){

        panel.style.display = "none";

    }else{

        panel.style.display = "block";

    }

}

/* ================================
   FINANCE CONFIG
==================================*/

let financeConfig = {

    autoDeposit: true,
    manualDeposit: false,

    autoWithdraw: true,
    manualWithdraw: false

};

/* ================================
   AUTO DEPOSIT
==================================*/

function toggleAutoDeposit(){

    financeConfig.autoDeposit =
        !financeConfig.autoDeposit;

}

/* ================================
   MANUAL DEPOSIT
==================================*/

function toggleManualDeposit(){

    financeConfig.manualDeposit =
        !financeConfig.manualDeposit;

}

/* ================================
   AUTO WITHDRAW
==================================*/

function toggleAutoWithdraw(){

    financeConfig.autoWithdraw =
        !financeConfig.autoWithdraw;

}

/* ================================
   MANUAL WITHDRAW
==================================*/

function toggleManualWithdraw(){

    financeConfig.manualWithdraw =
        !financeConfig.manualWithdraw;

}

/* ================================
   SAVE FINANCE SETTINGS
==================================*/

function saveFinanceSettings(){

    const financeData = {

        autoDeposit:
            financeConfig.autoDeposit,

        manualDeposit:
            financeConfig.manualDeposit,

        autoWithdraw:
            financeConfig.autoWithdraw,

        manualWithdraw:
            financeConfig.manualWithdraw

    };

    console.log(
        "Finance Settings Saved:",
        financeData
    );

    alert(
        "✅ Finance Settings Saved"
    );

}

/* ===================================
   FINANCE SECTION JS END
=================================== */
console.log("SAFIKI ADMIN PANEL LOADED");
