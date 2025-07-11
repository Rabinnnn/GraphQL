// displayUserData function  shows user information and transaction data on the UI.
// This data includes name, email, contact, xp and current progress.
export function displayUserData(user, transactions) {
    if (!user) {
        document.getElementById("user-name").textContent = "User data not available";
        return;
    }

    document.getElementById("user-name").textContent = user.login || "Unknown";
    console.log(user.attrs)
    document.getElementById("user-email").textContent = user.email || "Unknown";
    document.getElementById("user-contact").textContent = user.attrs.phone || "Unknown";

    const totalXP = transactions.reduce((sum, t) => sum + t.amount, 0);
    let tot = totalXP >= 1000000 ? (totalXP / 1000000).toFixed(2) : 
             totalXP >= 1000 ? (totalXP / 1000).toFixed(2) : totalXP.toFixed(2);
    document.getElementById("total-xp").textContent = `${tot.toLocaleString()}MB`;

    if (transactions.length > 0) {
        const sortedTx = [...transactions].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        document.getElementById("current-progress").textContent = sortedTx[0].path.split("/").pop() || "Unknown";
    } else {
        document.getElementById("current-progress").textContent = "No progress data";
    }
}


