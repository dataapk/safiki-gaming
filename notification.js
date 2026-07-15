/*=========================================================
    notification.js
    Part : 1 (Foundation)

    Developer : ChatGPT

    =============================================

    এই অংশে যা যা থাকবে

    ✔ Notification Data

    ✔ Global Variable

    ✔ Popup Open / Close

    ✔ Toggle Function

    ✔ Outside Click Close

    ✔ ESC Close

    ✔ Total Page Count

=========================================================*/

"use strict";

/*=========================================================

    [HTML Element Collection]

    কাজঃ

    HTML থেকে Notification সম্পর্কিত সকল Element

    JavaScript-এ নিয়ে আসা।

=========================================================*/

const notifPopup =
document.getElementById("notif-popup");


const notifList =
document.getElementById("notif-list");


const notifPagination =
document.querySelector(".notif-pagination");


const notifButton =
document.querySelector(
'.actions-box[onclick="toggleNotifMenu(event)"]'
);



/*=========================================================

    [Notification Database]

    কাজঃ

    আপাতত Demo Notification রাখা হয়েছে।

    পরে Database/API থেকে Load করা যাবে।

=========================================================*/

let notifications=[

{

id:1,

date:"15 Jul",

message:"Welcome to our website.",

read:false

},

{

id:2,

date:"14 Jul",

message:"Your bonus has been added.",

read:false

},

{

id:3,

date:"13 Jul",

message:"Daily reward available.",

read:true

},

{

id:4,

date:"12 Jul",

message:"Recharge successful.",

read:false

},

{

id:5,

date:"11 Jul",

message:"Cashback received.",

read:true

},

{

id:6,

date:"10 Jul",

message:"Profile updated.",

read:false

},

{

id:7,

date:"09 Jul",

message:"Security settings updated.",

read:true

},

{

id:8,

date:"08 Jul",

message:"Weekly reward claimed.",

read:false

}

];



/*=========================================================

    [Pagination Variable]

=========================================================*/

const ITEMS_PER_PAGE=3;

let currentPage=1;



/*=========================================================

    [Popup Open Function]

    কাজঃ

    Notification Popup Show করবে।

=========================================================*/

function openNotifPopup(){

if(!notifPopup)return;

notifPopup.classList.add("show");

}



/*=========================================================

    [Popup Close Function]

    কাজঃ

    Notification Popup Hide করবে।

=========================================================*/

function closeNotifPopup(){

if(!notifPopup)return;

notifPopup.classList.remove("show");

}



/*=========================================================

    [Popup Toggle Function]

    কাজঃ

    Bell Button Click করলে

    Open / Close হবে।

=========================================================*/

function toggleNotifMenu(event){

event.stopPropagation();

if(notifPopup.classList.contains("show")){

closeNotifPopup();

}else{

openNotifPopup();

}

}



/*=========================================================

    [Outside Click]

    কাজঃ

    Popup-এর বাইরে Click করলে

    Popup বন্ধ হবে।

=========================================================*/

document.addEventListener(

"click",

function(e){

if(

!e.target.closest("#notif-popup")

&&

!e.target.closest(".actions-box")

){

closeNotifPopup();

}

}

);



/*=========================================================

    [ESC Key]

    কাজঃ

    Keyboard-এর ESC চাপলে

    Popup বন্ধ হবে।

=========================================================*/

document.addEventListener(

"keydown",

function(e){

if(e.key==="Escape"){

closeNotifPopup();

}

}

);



/*=========================================================

    [Total Page Function]

    কাজঃ

    মোট কয়টি Page হবে

    তা Return করবে।

=========================================================*/

function getTotalPages(){

return Math.ceil(

notifications.length/

ITEMS_PER_PAGE

);

}
/*part 2 Part 2 → Section A=========================================================
/*=========================================================

    notification.js

    Part : 2
    Section : A

    নাম:
    Notification Card System

    --------------------------------------------------------

    এই Section-এর কাজ

    ✔ Notification Card তৈরি করা।

    ✔ Notification-এর Date দেখানো।

    ✔ Notification Message দেখানো।

    ✔ Read / Unread Class যোগ করা।

    ✔ Notification না থাকলে Empty Message দেখানো।

=========================================================*/





/*=========================================================

    Function Name:

    createNotificationCard()

    --------------------------------------------------------

    কাজ:

    Notification Array থেকে একটি Object নিয়ে

    একটি সম্পূর্ণ Notification Card তৈরি করবে।

    Return করবে HTML Element।

=========================================================*/

function createNotificationCard(item){

    const card=document.createElement("div");

    card.className="notif-item";



    /*--------------------------------------

        Read Notification হলে

        CSS Class যোগ হবে।

    --------------------------------------*/

    if(item.read){

        card.classList.add("read");

    }



    /*--------------------------------------

        Notification HTML

    --------------------------------------*/

    card.innerHTML=`

        <div class="notif-date">

            ${item.date}

        </div>

        <div class="notif-content">

            ${item.message}

        </div>

    `;



    return card;

}





/*=========================================================

    Function Name:

    showEmptyNotification()

    --------------------------------------------------------

    কাজ:

    Notification না থাকলে

    Empty Message দেখাবে।

=========================================================*/

function showEmptyNotification(){

    if(!notifList)return;



    notifList.innerHTML=`

        <div class="notif-empty">

            <h4>

                No Notifications

            </h4>

            <p>

                There are currently no notifications.

            </p>

        </div>

    `;

}





/*=========================================================

    Function Name:

    createDateLabel()

    --------------------------------------------------------

    কাজ:

    ভবিষ্যতে যদি Date Format পরিবর্তন করতে হয়,

    তাহলে এই Function ব্যবহার হবে।

=========================================================*/

function createDateLabel(date){

    return date;

}





/*=========================================================

    Function Name:

    createMessage()

    --------------------------------------------------------

    কাজ:

    Notification Message Return করবে।

=========================================================*/

function createMessage(message){

    return message;

}

/*=========================================================

    notification.js

    Part : 2
    Section : B

    নাম:
    Notification Render Engine

    --------------------------------------------------------

    এই Section-এর কাজ

    ✔ Notification List Render করা।

    ✔ Current Page অনুযায়ী Data বের করা।

    ✔ পুরাতন Notification Remove করা।

    ✔ নতুন Notification Card তৈরি করা।

    ✔ Notification না থাকলে Empty Message দেখানো।

    ✔ শেষে Pagination Render করা।

=========================================================*/





/*=========================================================

    Function Name:

    renderNotifications()

    --------------------------------------------------------

    কাজ:

    এই Function Notification System-এর Main Engine।

    যখনই Notification Update হবে,

    Page Change হবে,

    Notification Add/Delete হবে,

    তখন এই Function Call হবে।

=========================================================*/

function renderNotifications(){

    /*--------------------------------------
        Safety Check
    --------------------------------------*/

    if(!notifList){

        return;

    }



    /*--------------------------------------
        পুরাতন Notification Remove
    --------------------------------------*/

    notifList.innerHTML="";



    /*--------------------------------------
        Notification Empty হলে
    --------------------------------------*/

    if(notifications.length===0){

        showEmptyNotification();

        return;

    }



    /*--------------------------------------
        Current Page Start Index
    --------------------------------------*/

    const startIndex=(currentPage-1)*ITEMS_PER_PAGE;



    /*--------------------------------------
        Current Page End Index
    --------------------------------------*/

    const endIndex=startIndex+ITEMS_PER_PAGE;



    /*--------------------------------------
        Current Page Data
    --------------------------------------*/

    const currentNotifications=

        notifications.slice(

            startIndex,

            endIndex

        );



    /*--------------------------------------
        Card তৈরি
    --------------------------------------*/

    currentNotifications.forEach(function(item){

        item.date=createDateLabel(item.date);

        item.message=createMessage(item.message);

        const card=createNotificationCard(item);

        notifList.appendChild(card);

    });



    /*--------------------------------------
        Pagination Render
    --------------------------------------*/

    renderPagination();

}





/*=========================================================

    Function Name:

    refreshNotification()

    --------------------------------------------------------

    কাজ:

    Notification List পুনরায় Render করবে।

=========================================================*/

function refreshNotification(){

    renderNotifications();

}





/*=========================================================

    Function Name:

    reloadNotification()

    --------------------------------------------------------

    কাজ:

    ভবিষ্যতে Database/API থেকে নতুন Data

    Reload করার জন্য রাখা হয়েছে।

=========================================================*/

function reloadNotification(){

    renderNotifications();

}
/*=========================================================

    notification.js

    Part : 2
    Section : C

    নাম:
    Pagination Render System

    --------------------------------------------------------

    এই Section-এর কাজ

    ✔ Pagination Button তৈরি করা।

    ✔ Previous Button তৈরি করা।

    ✔ Next Button তৈরি করা।

    ✔ Active Page Highlight করা।

    ✔ মোট Page অনুযায়ী Button Generate করা।

=========================================================*/





/*=========================================================

    Function Name:

    renderPagination()

    --------------------------------------------------------

    কাজ:

    Notification-এর মোট Page অনুযায়ী

    Pagination Button তৈরি করবে।

=========================================================*/

function renderPagination(){

    if(!notifPagination){

        return;

    }



    notifPagination.innerHTML="";



    const totalPages=getTotalPages();



    /*--------------------------------------
        Previous Button
    --------------------------------------*/

    const prevBtn=document.createElement("button");

    prevBtn.className="page-btn";

    prevBtn.innerHTML=`

        <i class="fas fa-chevron-left"></i>

    `;



    prevBtn.disabled=(currentPage===1);



    prevBtn.addEventListener(

        "click",

        previousPage

    );



    notifPagination.appendChild(prevBtn);



    /*--------------------------------------
        Page Number Button
    --------------------------------------*/

    for(

        let i=1;

        i<=totalPages;

        i++

    ){

        const pageBtn=

        document.createElement("button");



        pageBtn.textContent=i;



        if(i===currentPage){

            pageBtn.classList.add("active");

        }



        pageBtn.addEventListener(

            "click",

            function(){

                changePage(i);

            }

        );



        notifPagination.appendChild(

            pageBtn

        );

    }



    /*--------------------------------------
        Next Button
    --------------------------------------*/

    const nextBtn=document.createElement("button");

    nextBtn.className="page-btn";



    nextBtn.innerHTML=`

        <i class="fas fa-chevron-right"></i>

    `;



    nextBtn.disabled=

    (

        currentPage===totalPages

    );



    nextBtn.addEventListener(

        "click",

        nextPage

    );



    notifPagination.appendChild(

        nextBtn

    );

}

/*=========================================================

    notification.js

    Part : 2
    Section : D

    নাম:
    Pagination Action System

    --------------------------------------------------------

    এই Section-এর কাজ

    ✔ Page Change করা।

    ✔ Previous Page-এ যাওয়া।

    ✔ Next Page-এ যাওয়া।

    ✔ First Page-এ যাওয়া।

    ✔ Last Page-এ যাওয়া।

    ✔ Active Page Update করা।

=========================================================*/





/*=========================================================

    Function Name:

    changePage()

    --------------------------------------------------------

    কাজ:

    নির্দিষ্ট Page Number-এ যাবে।

=========================================================*/

function changePage(page){

    const totalPages = getTotalPages();

    if(page < 1 || page > totalPages){

        return;

    }

    currentPage = page;

    renderNotifications();

}





/*=========================================================

    Function Name:

    previousPage()

    --------------------------------------------------------

    কাজ:

    Previous Page-এ নিয়ে যাবে।

=========================================================*/

function previousPage(){

    if(currentPage <= 1){

        return;

    }

    currentPage--;

    renderNotifications();

}





/*=========================================================

    Function Name:

    nextPage()

    --------------------------------------------------------

    কাজ:

    Next Page-এ নিয়ে যাবে।

=========================================================*/

function nextPage(){

    const totalPages = getTotalPages();

    if(currentPage >= totalPages){

        return;

    }

    currentPage++;

    renderNotifications();

}





/*=========================================================

    Function Name:

    goToFirstPage()

    --------------------------------------------------------

    কাজ:

    প্রথম Page-এ নিয়ে যাবে।

=========================================================*/

function goToFirstPage(){

    currentPage = 1;

    renderNotifications();

}





/*=========================================================

    Function Name:

    goToLastPage()

    --------------------------------------------------------

    কাজ:

    শেষ Page-এ নিয়ে যাবে।

=========================================================*/

function goToLastPage(){

    currentPage = getTotalPages();

    renderNotifications();

}





/*=========================================================

    Function Name:

    updateActivePage()

    --------------------------------------------------------

    কাজ:

    Pagination Button-এর Active Class Update করবে।

    Note:

    বর্তমানে renderPagination() প্রতিবার নতুন Button
    তৈরি করে, তাই এই Function ভবিষ্যতের জন্য রাখা হয়েছে।

=========================================================*/

function updateActivePage(){

    const buttons = notifPagination.querySelectorAll("button");

    buttons.forEach(function(button){

        button.classList.remove("active");

        const page = parseInt(button.textContent);

        if(!isNaN(page) && page === currentPage){

            button.classList.add("active");

        }

    });

}
/*=========================================================

    notification.js

    Part : 3
    Section : A

    নাম:
    Notification Data Management

    --------------------------------------------------------

    এই Section-এর কাজ

    ✔ নতুন Notification যোগ করা।

    ✔ একটি Notification Delete করা।

    ✔ সব Notification Delete করা।

    ✔ Page Refresh করা।

=========================================================*/





/*=========================================================

    Function Name:

    addNotification()

    --------------------------------------------------------

    কাজ:

    নতুন Notification List-এর শুরুতে যোগ করবে।

    Parameter:

    date    = Notification Date

    message = Notification Message

=========================================================*/

function addNotification(date,message){

    const newNotification={

        id:Date.now(),

        date:date,

        message:message,

        read:false

    };



    notifications.unshift(newNotification);



    currentPage=1;



    renderNotifications();

}





/*=========================================================

    Function Name:

    removeNotification()

    --------------------------------------------------------

    কাজ:

    নির্দিষ্ট ID অনুযায়ী

    একটি Notification Delete করবে।

=========================================================*/

function removeNotification(id){

    notifications=

    notifications.filter(function(item){

        return item.id!==id;

    });



    const totalPages=getTotalPages();



    if(currentPage>totalPages){

        currentPage=

        totalPages||1;

    }



    renderNotifications();

}





/*=========================================================

    Function Name:

    clearNotifications()

    --------------------------------------------------------

    কাজ:

    সব Notification Delete করবে।

=========================================================*/

function clearNotifications(){

    notifications=[];



    currentPage=1;



    renderNotifications();

}





/*=========================================================

    Function Name:

    notificationExists()

    --------------------------------------------------------

    কাজ:

    নির্দিষ্ট ID-এর Notification আছে কিনা

    তা Return করবে।

=========================================================*/

function notificationExists(id){

    return notifications.some(function(item){

        return item.id===id;

    });

}





/*=========================================================

    Function Name:

    getNotificationById()

    --------------------------------------------------------

    কাজ:

    ID অনুযায়ী Notification Return করবে।

=========================================================*/

function getNotificationById(id){

    return notifications.find(function(item){

        return item.id===id;

    });

}
/*=========================================================

    notification.js

    Part : 3
    Section : B

    নাম:
    Notification Read & Badge System

    --------------------------------------------------------

    এই Section-এর কাজ

    ✔ একটি Notification Read করা।

    ✔ সব Notification Read করা।

    ✔ Unread Count বের করা।

    ✔ Bell Badge Update করা।

=========================================================*/


/*=========================================================

    [Badge Element]

    কাজ:

    Bell Icon-এর Badge সংগ্রহ করা।

=========================================================*/

const notifBadge =
document.getElementById("notif-badge");



/*=========================================================

    Function Name:

    getUnreadCount()

    --------------------------------------------------------

    কাজ:

    মোট কয়টি Unread Notification আছে

    তা Return করবে।

=========================================================*/

function getUnreadCount(){

    return notifications.filter(function(item){

        return item.read===false;

    }).length;

}



/*=========================================================

    Function Name:

    updateNotificationBadge()

    --------------------------------------------------------

    কাজ:

    Bell Icon-এর Badge Update করবে।

=========================================================*/

function updateNotificationBadge(){

    if(!notifBadge){

        return;

    }

    const unread=getUnreadCount();

    if(unread<=0){

        notifBadge.style.display="none";

        return;

    }

    notifBadge.style.display="flex";

    notifBadge.textContent=unread;

}



/*=========================================================

    Function Name:

    markAsRead()

    --------------------------------------------------------

    কাজ:

    নির্দিষ্ট Notification Read করবে।

=========================================================*/

function markAsRead(id){

    const item=getNotificationById(id);

    if(!item){

        return;

    }

    item.read=true;

    updateNotificationBadge();

    renderNotifications();

}



/*=========================================================

    Function Name:

    markAllAsRead()

    --------------------------------------------------------

    কাজ:

    সব Notification Read করবে।

=========================================================*/

function markAllAsRead(){

    notifications.forEach(function(item){

        item.read=true;

    });

    updateNotificationBadge();

    renderNotifications();

}
/*=========================================================

    notification.js

    Part : 3
    Section : C

    নাম:
    Notification Initialization & LocalStorage System

    --------------------------------------------------------

    এই Section-এর কাজ

    ✔ Notification LocalStorage-এ Save করা।

    ✔ LocalStorage থেকে Notification Load করা।

    ✔ Application Initialize করা।

    ✔ প্রথমবার Notification Render করা।

    ✔ Badge Update করা।

=========================================================*/





/*=========================================================

    Function Name:

    saveNotifications()

    --------------------------------------------------------

    কাজ:

    বর্তমান Notification List

    Browser LocalStorage-এ Save করবে।

=========================================================*/

function saveNotifications(){

    try{

        localStorage.setItem(

            "notifications",

            JSON.stringify(notifications)

        );

    }catch(error){

        console.error(

            "Notification Save Failed",

            error

        );

    }

}





/*=========================================================

    Function Name:

    loadNotifications()

    --------------------------------------------------------

    কাজ:

    Browser LocalStorage থেকে

    Notification Load করবে।

=========================================================*/

function loadNotifications(){

    try{

        const data=

        localStorage.getItem(

            "notifications"

        );

        if(!data){

            return;

        }

        const parsed=

        JSON.parse(data);

        if(Array.isArray(parsed)){

            notifications=parsed;

        }

    }catch(error){

        console.error(

            "Notification Load Failed",

            error

        );

    }

}





/*=========================================================

    Function Name:

    initializeNotification()

    --------------------------------------------------------

    কাজ:

    Notification System চালু করবে।

=========================================================*/

function initializeNotification(){

    loadNotifications();

    renderNotifications();

    updateNotificationBadge();

}





/*=========================================================

    Function Name:

    autoSaveNotification()

    --------------------------------------------------------

    কাজ:

    Notification পরিবর্তন হলে

    Save করবে।

=========================================================*/

function autoSaveNotification(){

    saveNotifications();

}





/*=========================================================

    Function Name:

    resetNotification()

    --------------------------------------------------------

    কাজ:

    Notification System Reset করবে।

=========================================================*/

function resetNotification(){

    currentPage=1;

    renderNotifications();

    updateNotificationBadge();

}





/*=========================================================

    DOM Ready

    কাজ:

    HTML সম্পূর্ণ Load হওয়ার পরে

    Notification System চালু হবে।

=========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    function(){

        initializeNotification();

    }

);
