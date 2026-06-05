
/* ============================= */
/* GLOBAL STATE */
/* ============================= */

let currentAction = null;
let selectedUserId = null;

/* ============================= */
/* MODAL CONTROL ENGINE */
/* ============================= */

function openModal(action, userId = null) {

    currentAction = action;
    selectedUserId = userId;

    const modal = document.getElementById("actionModal");
    const title = document.getElementById("modalTitle");
    const body = document.getElementById("modalBody");

    modal.style.display = "block";

    /* ============================= */
    /* ADD BALANCE */
    /* ============================= */

    if (action === "addBalance") {

        title.innerText = "Add Balance";

        body.innerHTML = `
            <label>Amount</label>
            <input type="number" id="amount" placeholder="Enter amount">

            <label>Type</label>
            <select id="balanceType">
                <option value="main">Main Balance</option>
                <option value="bonus">Bonus Balance</option>
                <option value="gift">Gift / Reward</option>
            </select>
        `;
    }

    /* ============================= */
    /* DEDUCT BALANCE */
    */

    if (action === "deductBalance") {

        title.innerText = "Deduct Balance";

        body.innerHTML = `
            <label>Amount</label>
            <input type="number" id="amount" placeholder="Enter amount">
        `;
    }

    /* ============================= */
    /* RTP SETTINGS */
    */

    if (action === "rtpSettings") {

        title.innerText = "RTP Control Panel";

        body.innerHTML = `
            <label>Global RTP (%)</label>
            <input type="number" id="rtp" value="95">

            <p>House Edge will auto adjust.</p>
        `;
    }

    /* ============================= */
    /* PLAYER CONTROL ENGINE */
    */

    if (action === "playerControl") {

        title.innerText = "Player Win/Loss Control";

        body.innerHTML = `
            <label>Loss Threshold (%)</label>
            <input type="number" id="lossThreshold" value="60">

            <label>Profit Threshold (%)</label>
            <input type="number" id="profitThreshold" value="70">

            <label>Recovery Boost (%)</label>
            <input type="number" id="recoveryBoost" value="10">

            <label>Profit Penalty (%)</label>
            <input type="number" id="profitPenalty" value="10">
        `;
    }

    /* ============================= */
    /* SUSPEND USER */
    */

    if (action === "suspendUser") {

        title.innerText = "Suspend User";

        body.innerHTML = `
            <p>Are you sure you want to suspend User ID: <b>${userId}</b>?</p>
        `;
    }

    /* ============================= */
    /* DELETE USER */
    */

    if (action === "deleteUser") {

        title.innerText = "Delete User";

        body.innerHTML = `
            <p style="color:red;">This action is permanent!</p>
            <p>User ID: <b>${userId}</b></p>
        `;
    }
}

/* ============================= */
/* CLOSE MODAL */
/* ============================= */

function closeModal() {
    document.getElementById("actionModal").style.display = "none";
    currentAction = null;
    selectedUserId = null;
}

/* ============================= */
/* SUBMIT ENGINE (SIMULATION NOW → BACKEND READY) */
/* ============================= */

function submitAction() {

    /* ----------------------------- */
    /* ADD BALANCE */
    /* ----------------------------- */

    if (currentAction === "addBalance") {

        const amount = document.getElementById("amount").value;
        const type = document.getElementById("balanceType").value;

        console.log("ADD BALANCE:", {
            userId: selectedUserId,
            amount,
            type
        });

        alert(`Added $${amount} to ${type}`);
    }

    /* ----------------------------- */
    /* DEDUCT BALANCE */
    /* ----------------------------- */

    if (currentAction === "deductBalance") {

        const amount = document.getElementById("amount").value;

        console.log("DEDUCT BALANCE:", {
            userId: selectedUserId,
            amount
        });

        alert(`Deducted $${amount}`);
    }

    /* ----------------------------- */
    /* RTP SAVE */
    /* ----------------------------- */

    if (currentAction === "rtpSettings") {

        const rtp = document.getElementById("rtp").value;

        console.log("RTP UPDATED:", rtp);

        alert(`RTP updated to ${rtp}%`);
    }

    /* ----------------------------- */
    /* PLAYER CONTROL SAVE */
    /* ----------------------------- */

    if (currentAction === "playerControl") {

        const loss = document.getElementById("lossThreshold").value;
        const profit = document.getElementById("profitThreshold").value;
        const recovery = document.getElementById("recoveryBoost").value;
        const penalty = document.getElementById("profitPenalty").value;

        console.log("PLAYER CONTROL:", {
            userId: selectedUserId,
            lossThreshold: loss,
            profitThreshold: profit,
            recoveryBoost: recovery,
            profitPenalty: penalty
        });

        alert("Player control settings updated");
    }

    /* ----------------------------- */
    /* SUSPEND USER */
    */

    if (currentAction === "suspendUser") {

        console.log("SUSPEND USER:", selectedUserId);

        alert(`User ${selectedUserId} suspended`);
    }

    /* ----------------------------- */
    /* DELETE USER */
    */

    if (currentAction === "deleteUser") {

        console.log("DELETE USER:", selectedUserId);

        alert(`User ${selectedUserId} deleted`);
    }

    closeModal();
}

/* ============================= */
/* CLICK OUTSIDE CLOSE MODAL */
/* ============================= */

window.onclick = function(event) {

    const modal = document.getElementById("actionModal");

    if (event.target === modal) {
        closeModal();
    }
};
