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
//Admin Actions: START
// ==========================
function addBalance(){

    alert("Add Balance System");

}

function deductBalance(){

    alert("Deduct Balance System");

}

function suspendUser(){

    alert("User Suspended");

}

function deleteUser(){

    let confirmDelete =
        confirm("Delete User?");

    if(confirmDelete){

        alert("User Deleted");

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
console.log("SAFIKI ADMIN PANEL LOADED");








