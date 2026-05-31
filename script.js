// সুপাবেস এবং ইন্টারঅ্যাক্টিভিটি হ্যান্ডলিং
document.addEventListener('DOMContentLoaded', () => {
    console.log("SAFIKI Gaming Engine Initialized");
    
    // মেনু টগল ফাংশন
    document.querySelector('.menu-icon').addEventListener('click', () => {
        const sidebar = document.querySelector('.sidebar');
        sidebar.style.display = (sidebar.style.display === 'block') ? 'none' : 'block';
    });

    // ডাটা ফেচিং ফাংশন (Supabase integration ready)
    async function fetchGameData() {
        console.log("Fetching data from Supabase...");
    }
    fetchGameData();
});
