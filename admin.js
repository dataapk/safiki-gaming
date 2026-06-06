// ==========================
// SAFIKI ADMIN PANEL ENGINE
// ==========================

document.addEventListener("DOMContentLoaded", function () {

    initSidebar();

});
// ==========================
// SIDEBAR NAVIGATION
// ==========================

function initSidebar() {

    // সব sidebar menu items এবং admin sections নির্বাচন করা
    const menuItems = document.querySelectorAll(".sidebar-menu li");
    const sections = document.querySelectorAll(".admin-section");

    // প্রতিটি menu item-এর জন্য click event যোগ করা
    menuItems.forEach(item => {

        item.addEventListener("click", () => {
            const target = item.getAttribute("data-target");

            // সমস্ত menu item থেকে active class remove করা
            menuItems.forEach(m => m.classList.remove("active"));
            item.classList.add("active");

            // সমস্ত section hide করা
            sections.forEach(section => section.style.display = "none");

            // target section show করা
            const activeSection = document.getElementById(target);
            if(activeSection){
                activeSection.style.display = "block";
                activeSection.scrollIntoView({ behavior: "smooth" });
            }
        });

    });

}

// ==========================
// SIDEBAR NAVIGATION END
// ==========================


// ==========================
// QUICK ACCESS NAVIGATION
// ==========================

function initQuickAccess() {

    const cards =
        document.querySelectorAll(
            ".stats-grid .stat-card"
        );

    const sections =
        document.querySelectorAll(
            ".admin-section"
        );

    cards.forEach(card => {

        card.addEventListener("click", () => {

            const target =
                card.getAttribute(
                    "data-target"
                );

            sections.forEach(section => {

                section.style.display =
                    "none";

            });

            const activeSection =
                document.getElementById(
                    target
                );

            if(activeSection){

                activeSection.style.display =
                    "block";

                activeSection.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });

}

// ==========================
// QUICK ACCESS NAVIGATION END
// ==========================

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
// SIDEBAR NAVIGATION END
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

function toggleUserProfile() {

    const panel =
        document.getElementById(
            "userDetailsPanel"
        );

    if(panel.style.display === "block") {

        panel.style.display = "none";

    } else {

        panel.style.display = "block";

    }

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
// ==========================
// Player win/lose control
// ==========================
async function savePlayerRtp() {
    // Get the unique user ID from the data attribute
    const dbId = document.getElementById('player-config').getAttribute('data-dbid');
    
    // Get the selected game name from the dropdown
    const gameType = document.getElementById('game-select').value;
    
    // Get the RTP percentage input value
    const rtpInput = document.getElementById('rtp-value').value;

    // Validate if the user ID exists
    if (!dbId) {
        alert("User ID not found!");
        return;
    }
    
    // Validate if the RTP input is between 1 and 100
    if (rtpInput < 1 || rtpInput > 100) {
        alert("Please enter a value between 1 and 100.");
        return;
    }

    // Convert percentage to decimal format for backend calculation
    const rtpValue = parseFloat(rtpInput) / 100;

    try {
        // Send the updated data to the API endpoint
        const response = await fetch('/api/admin/update-rtp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                db_id: dbId,
                game: gameType,
                rtp: rtpValue
            })
        });

        const result = await response.json();
        
        // Handle the server response
        if (result.success) {
            alert(`RTP for ${gameType} set to ${rtpInput}% successfully!`);
        } else {
            alert("Update failed: " + result.message);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Server connection error!");
    }
}
// ==========================
// Player win/lose control END
// ==========================
// ==========================
// GLOBAL RTP SETTING
// ==========================

// Function to save global RTP for a specific game
async function saveGlobalRtp() {
    const gameType = document.getElementById('game-select').value;
    const rtpValue = document.getElementById('global-rtp-value').value;

    // ভ্যালিডেশন চেক: ১ থেকে ১০০ এর মধ্যে হতে হবে
    if (rtpValue < 1 || rtpValue > 100) {
        alert("Please enter a value between 1 and 100");
        return;
    }

    // Logic to send data to the backend
    try {
        const response = await fetch('/api/admin/update-global-rtp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                game: gameType, 
                rtp: rtpValue 
            })
        });

        // ব্যাকএন্ড থেকে রেসপন্স চেক করা
        const result = await response.json();
        
        if (response.ok) {
            alert("Global RTP updated successfully for " + gameType);
        } else {
            alert("Error: " + result.message);
        }

        // সবার শেষে কনসোল লগ
        console.log("Saving Global RTP:", { game: gameType, rtp: rtpValue });

    } catch (error) {
        console.error("Error connecting to server:", error);
        alert("Failed to update global RTP. Please check your connection.");
    }
}
// ==========================
// GLOBAL RTP SETTING END
// ==========================
console.log("SAFIKI ADMIN PANEL LOADED");








