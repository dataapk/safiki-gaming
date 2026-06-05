<script>
function addBalance() {
    alert("Add Balance Triggered");
}

function deductBalance() {
    alert("Deduct Balance Triggered");
}

function suspendUser() {
    alert("User Suspended");
}

function deleteUser() {
    alert("User Deleted");
}

/* ================= RTP PANEL ================= */

function toggleRtpPanel() {
    let panel = document.getElementById("rtpPanel");
    panel.style.display = panel.style.display === "none" ? "block" : "none";
}

document.addEventListener("input", function(e) {
    if (e.target && e.target.id === "rtpInput") {
        let rtp = parseFloat(e.target.value) || 0;
        document.getElementById("currentRtp").innerText = rtp + "%";
        document.getElementById("houseEdge").innerText = (100 - rtp) + "%";
    }
});

function saveRtp() {
    let rtp = parseFloat(document.getElementById("rtpInput").value);
    let houseEdge = 100 - rtp;

    console.log("RTP Saved:", rtp);
    console.log("House Edge:", houseEdge);

    alert("RTP Updated Successfully!");
}

/* ================= NOTIFICATION ================= */

function sendNotification() {
    let title = document.getElementById("notifTitle").value;
    let message = document.getElementById("notifMessage").value;

    if (!title || !message) {
        alert("Please fill all fields");
        return;
    }

    console.log("Notification:", { title, message });

    alert("Notification Sent!");

    document.getElementById("notifTitle").value = "";
    document.getElementById("notifMessage").value = "";
}
</script>
