// displayUserData function  shows user information and transaction data on the UI.
// This data includes name, email, contact, xp and current progress.
export function displayUserData(user, transactions) {
    if (!user) { // Check if user data is available
        document.getElementById("user-name").textContent = "User data not available";
        return;
    }

    // Display user information
    document.getElementById("user-name").textContent = user.login || "Unknown";
    console.log(user.attrs)
    document.getElementById("user-email").textContent = user.email || "Unknown";
    document.getElementById("user-contact").textContent = user.attrs.phone || "Unknown";

    // Calculate and Display user XP and current progress
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

// displatStats filters and displays various statistical values e.g pass, fail, and pass ratio
export function displayStats(transactions, progress, results) {
    const statsDiv = document.getElementById("stats-details");
    const passCount = progress.filter(p => p.grade === 1).length; //only count where grade is 1, which means pass
    const failCount = progress.filter(p => p.grade === 0).length; //only count where grade is 0, which means fail
    const passRatio = (passCount / (passCount + failCount)) * 100 || 0; // calculate pass ratio or default to 0 if no entries

    statsDiv.innerHTML = `
        <div class="stat-item">
            <p><strong>Total XP Entries:</strong> ${transactions.length}</p>
            <p><strong>Total Projects Attempted:</strong> ${progress.length}</p>
            <p><strong>Pass Rate:</strong> ${passRatio.toFixed(1)}%</p>
            <p><strong>PASS:</strong> ${passCount} | <strong>FAIL:</strong> ${failCount}</p>
        </div>`;
}

// displayPendingProjects function displays a list of projects that have not been completed yet.
export function displayPendingProjects(items) {
    const ul = document.getElementById("pending-projects");
    ul.innerHTML = "";
    items.forEach(item => {
        const li = document.createElement("li");
        const name = item.path.split("/").pop().replace(/-/g, " ");
        const date = new Date(item.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
        li.innerHTML = `<span class="project-name">${name}</span><span class="start-date">Started: ${date}</span>`;
        ul.appendChild(li);
    });
}
