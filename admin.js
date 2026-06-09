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
   GAMES SECTION  END
==================================*/

/* =====================================
   FINANCE SECTION START
===================================== */

const financeConfig = {
    autoDeposit: true,
    manualDeposit: false,
    autoWithdraw: false,
    manualWithdraw: true
};

/* =====================================
   MAIN FINANCE SECTION TOGGLE
===================================== */

function toggleFinanceSection(panelId){

    const panels = [
        "depositFinancePanel",
        "withdrawFinancePanel"
    ];

    panels.forEach(function(id){

        const panel =
            document.getElementById(id);

        if(!panel){
            return;
        }

        if(id === panelId){

            if(
                panel.style.display === "none" ||
                panel.style.display === ""
            ){
                panel.style.display = "block";
            }else{
                panel.style.display = "none";
            }

        }else{

            panel.style.display = "none";

        }

    });

}
/* =====================================
ADD COIN & PAYMENT GATEWAY
INSERT NEW CODE BELOW THIS LINE
===================================== */

  /* =====================================
   ADD COIN FORM TOGGLE
===================================== */

function toggleAddCoinForm(){

    const form =
        document.getElementById("addCoinForm");

    if(!form){
        return;
    }

    if(
        form.style.display === "none" ||
        form.style.display === ""
    ){

        form.style.display = "block";

    }else{

        form.style.display = "none";

    }

}


/* =====================================
   ADD PAYMENT GATEWAY FORM TOGGLE
===================================== */

function toggleAddGatewayForm(){

    const form =
        document.getElementById("addGatewayForm");

    if(!form){
        return;
    }

    if(
        form.style.display === "none" ||
        form.style.display === ""
    ){

        form.style.display = "block";

    }else{

        form.style.display = "none";

    }

}

/* =====================================
   DEPOSIT MENU TOGGLE
===================================== */

function toggleDepositMenu(panelId){

    const panels = [
        "paymentGatewayPanel",
        "depositSettingsPanel",
        "pendingDepositsPanel",
        "depositHistoryPanel",
        "depositReportsPanel",
        "depositLogsPanel"
    ];

    panels.forEach(function(id){

        const panel =
            document.getElementById(id);

        if(!panel){
            return;
        }

        if(id === panelId){

            if(
                panel.style.display === "none" ||
                panel.style.display === ""
            ){
                panel.style.display = "block";
            }else{
                panel.style.display = "none";
            }

        }else{

            panel.style.display = "none";

        }

    });

}

/* =====================================
   WITHDRAW MENU TOGGLE
===================================== */

function toggleWithdrawMenu(panelId){

    const panels = [
    "withdrawRequestPanel",
    "approvedWithdrawPanel",
    "rejectedWithdrawPanel",
    "withdrawHistoryPanel",
    "withdrawReportsPanel",
    "approvalRulesPanel"
];

    panels.forEach(function(id){

        const panel =
            document.getElementById(id);

        if(!panel){
            return;
        }

        if(id === panelId){

            if(
                panel.style.display === "none" ||
                panel.style.display === ""
            ){
                panel.style.display = "block";
            }else{
                panel.style.display = "none";
            }

        }else{

            panel.style.display = "none";

        }

    });

}

/* =====================================
   AUTO DEPOSIT
===================================== */

function toggleAutoDeposit(){

    financeConfig.autoDeposit =
        !financeConfig.autoDeposit;

    alert(
        "Auto Deposit: " +
        (
            financeConfig.autoDeposit
                ? "ON"
                : "OFF"
        )
    );

}

/* =====================================
   MANUAL DEPOSIT
===================================== */

function toggleManualDeposit(){

    financeConfig.manualDeposit =
        !financeConfig.manualDeposit;

    alert(
        "Manual Deposit: " +
        (
            financeConfig.manualDeposit
                ? "ON"
                : "OFF"
        )
    );

}

/* =====================================
   AUTO WITHDRAW
===================================== */

function toggleAutoWithdraw(){

    financeConfig.autoWithdraw =
        !financeConfig.autoWithdraw;

    alert(
        "Auto Withdraw: " +
        (
            financeConfig.autoWithdraw
                ? "ON"
                : "OFF"
        )
    );

}

/* =====================================
   MANUAL WITHDRAW
===================================== */

function toggleManualWithdraw(){

    financeConfig.manualWithdraw =
        !financeConfig.manualWithdraw;

    alert(
        "Manual Withdraw: " +
        (
            financeConfig.manualWithdraw
                ? "ON"
                : "OFF"
        )
    );

}

/* =====================================
   SAVE FINANCE SETTINGS
===================================== */

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

/* =====================================
   FINANCE SECTION JS END
===================================== */
// WALLET ADD FEATURE
function toggleEditWallet(formId){

    const form = document.getElementById(formId);

    if(form.style.display === "none"){

        form.style.display = "block";

    }else{

        form.style.display = "none";

    }

}

/* =============================
WITHDRAW DATA STORE
============================= */

window.withdrawRequests = window.withdrawRequests || [
{
id: "W001",
userId: 1052,
username: "player123",
amount: 250,
coin: "USDT",
status: "pending"
}
];

/* =============================
FIND REQUEST
============================= */

function getRequest(id) {
return window.withdrawRequests.find(
r => r.id === id
);
}

/* =============================
APPROVE WITHDRAW
============================= */
function approveWithdraw(id) {

    let req = getRequest(id);

    if (!req) {
        alert("Withdraw Request Not Found");
        return;
    }

    req.status = "approved";

    alert("Withdraw Request Approved");

    renderPanels();
}

/* =============================
REJECT WITHDRAW
============================= */

function rejectWithdraw(id) {

    let req = getRequest(id);

    if (!req) return;

    req.status = "rejected";

    alert("Rejected: " + id);

    renderPanels();
}
/* =============================
SEND MONEY
============================= */

function sendMoney(id) {

    let req = getRequest(id);

    if (!req) {
        alert("Withdraw Request Not Found");
        return;
    }

    if (req.status !== "approved") {
        alert("Not approved yet!");
        return;
    }

    req.status = "completed";

    alert("Your payment has been sent successfully.");

    renderPanels();
}

/* =============================
RENDER ALL PANELS
============================= */

function renderPanels() {

renderRequestPanel();
renderApprovedPanel();
renderRejectedPanel();
renderHistoryPanel();

renderAffiliateOverview();
renderReferralPlayers();
renderAffiliatePayoutRequests();
renderAffiliatePayoutHistory();

}

// =====================
// WITHDRAW REQUEST START
// =====================


function renderRequestPanel() {


const tbody =
    document.querySelector(
        "#withdrawRequestPanel tbody"
    );

if (!tbody) return;

tbody.innerHTML = "";

window.withdrawRequests.forEach(req => {

    let statusText = "";
    let actionButtons = "";

    // STATUS CONTROL
    if (req.status === "pending") {

        statusText = "🟡 Pending";

        actionButtons = `
            <button onclick="approveWithdraw('${req.id}')">
                Approve
            </button>

            <button onclick="rejectWithdraw('${req.id}')">
                Reject
            </button>
        `;
    }

    else if (req.status === "approved") {

        statusText = "🟢 Approved";

        actionButtons = `
            <span>Approved</span>
        `;
    }

    else if (req.status === "rejected") {

        statusText = "🔴 Rejected";

        actionButtons = `
            <span>Rejected</span>
        `;
    }

    tbody.innerHTML += `
        <tr>

            <td>${req.id}</td>
            <td>${req.userId}</td>
            <td>${req.username}</td>
            <td>${req.amount}</td>
            <td>${req.coin}</td>

            <td>${statusText}</td>

            <td>${actionButtons}</td>

        </tr>
    `;
});

}

// =====================
// APPROVED PANEL
// =====================

// =====================
// APPROVED PANEL
// =====================
function renderApprovedPanel() {

const tbody =
    document.querySelector(
        "#approvedWithdrawPanel tbody"
    );

if (!tbody) return;

tbody.innerHTML = "";

window.withdrawRequests.forEach(req => {

    if (
        req.status === "approved" ||
        req.status === "completed"
    ) {

        let paymentStatus = "";
        let actionButton = "";

        if (req.status === "approved") {

            paymentStatus =
                "🟡 Waiting for Payment";

            actionButton =
                `<button onclick="sendMoney('${req.id}')">
                    Send Money
                </button>`;
        }

        if (req.status === "completed") {

            paymentStatus =
                "🟢 Payment Completed";

            actionButton =
                `<button disabled>
                    Completed
                </button>`;
        }

        tbody.innerHTML += `
            <tr>

                <td>${req.userId}</td>

                <td>${req.coin}</td>

                <td>${req.amount}</td>

                <td>${paymentStatus}</td>

                <td>${actionButton}</td>

            </tr>
        `;
    }

});

}

// =====================
// REJECTED PANEL
// =====================

function renderRejectedPanel() {

const tbody =
    document.querySelector(
        "#rejectedWithdrawPanel tbody"
    );

if (!tbody) return;

tbody.innerHTML = "";

window.withdrawRequests.forEach(req => {

    if (req.status === "rejected") {

        tbody.innerHTML += `
            <tr>

                <td>${req.userId}</td>

                <td>${req.coin}</td>

                <td>${req.amount}</td>

                <td>
                    🔴 Rejected
                </td>

            </tr>
        `;

    }

});

}

// =====================
// HISTORY PANEL
// =====================
function renderHistoryPanel() {

const list =
    document.getElementById("withdrawHistoryList");

if (!list) return;

list.innerHTML = "";

let total = 0;
let today = 0;

const todayDate =
    new Date().toISOString().split("T")[0];

window.withdrawHistory.forEach(item => {

    total += Number(item.amount);

    if (item.date.includes(todayDate)) {
        today += Number(item.amount);
    }

    list.innerHTML += `
        <p>
            ${item.date} - ${item.amount} BDT (${item.status})
        </p>
    `;
});

document.getElementById("totalWithdraw").innerText = total;
document.getElementById("todayWithdraw").innerText = today;


}

/* =============================
OPTIONAL NOTIFICATION
(DISABLED FOR NOW)
============================= */

function sendNotification(
userId,
message
) {


console.log(
    "Notification:",
    userId,
    message
);


}
// =====================
// AFFILIATE CENTER START
// =====================

window.affiliateStats = {

    totalReferrals: 125,
    activeReferrals: 84,
    commissionPaid: 45000,
    pendingCommission: 8500

};
// =====================
// RENDER AFFILIATE OVERVIEW
// =====================

function renderAffiliateOverview() {

    document.getElementById("totalReferrals").textContent =
        affiliateStats.totalReferrals;

    document.getElementById("activeReferrals").textContent =
        affiliateStats.activeReferrals;

    document.getElementById("commissionPaid").textContent =
        affiliateStats.commissionPaid + " BDT";

    document.getElementById("pendingCommission").textContent =
        affiliateStats.pendingCommission + " BDT";
}
// =====================
// REFERRAL PLAYERS
// =====================

function renderReferralPlayers() {

```
const tbody =
    document.getElementById("referralPlayersTableBody");

if (!tbody) return;

tbody.innerHTML = "";

referralPlayers.forEach(player => {

    tbody.innerHTML += `

    <tr>

        <td>${player.referralId}</td>
        <td>${player.playerId}</td>
        <td>${player.username}</td>
        <td>${player.deposit}</td>
        <td>${player.totalBet}</td>
        <td>${player.commission}</td>
        <td>${player.status}</td>

    </tr>

    `;

});

}
// =====================
// PAYOUT REQUESTS
// =====================

function renderAffiliatePayoutRequests() {

```
const tbody =
    document.getElementById("affiliatePayoutRequestTableBody");

if (!tbody) return;

tbody.innerHTML = "";

affiliatePayoutRequests.forEach(req => {

    tbody.innerHTML += `

    <tr>

        <td>${req.requestId}</td>
        <td>${req.affiliateId}</td>
        <td>${req.username}</td>
        <td>${req.amount}</td>
        <td>${req.status}</td>

        <td>

            <button onclick="approveAffiliatePayout('${req.requestId}')">
                Approve
            </button>

            <button onclick="rejectAffiliatePayout('${req.requestId}')">
                Reject
            </button>

        </td>

    </tr>

    `;

});


}
// =====================
// PAYOUT HISTORY
// =====================

function renderAffiliatePayoutHistory() {

```
const tbody =
    document.getElementById("affiliatePayoutHistoryTableBody");

if (!tbody) return;

tbody.innerHTML = "";

affiliatePayoutHistory.forEach(item => {

    tbody.innerHTML += `

    <tr>

        <td>${item.transactionId}</td>
        <td>${item.affiliateId}</td>
        <td>${item.amount}</td>
        <td>${item.date}</td>
        <td>${item.status}</td>

    </tr>

    `;

});


}
// =====================
// SHOW AFFILIATE PANEL
// =====================

function showAffiliatePanel(panelId) {

```
document.getElementById("referralPlayersPanel").style.display = "none";
document.getElementById("commissionControlPanel").style.display = "none";
document.getElementById("affiliatePayoutRequestPanel").style.display = "none";
document.getElementById("affiliatePayoutHistoryPanel").style.display = "none";

document.getElementById(panelId).style.display = "block";


}










console.log(
"SAFIKI WITHDRAW SYSTEM LOADED"
);
