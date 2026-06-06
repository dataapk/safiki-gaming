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

function toggleActionPanel(panelId) {

    const panels =
        document.querySelectorAll(
            ".action-panel"
        );

    panels.forEach(panel => {

        panel.style.display = "none";

    });

    const target =
        document.getElementById(panelId);

    if(target){

        target.style.display = "block";

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
console.log("SAFIKI ADMIN PANEL LOADED");
