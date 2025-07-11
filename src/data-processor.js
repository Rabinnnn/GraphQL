// processXpOverTimeData function processes an array of transactions to calculate the total XP earned o
//ver time, grouped by month and year
export function processXpOverTimeData(transactions) {
    if (!transactions?.length) return []; // if transactions is empty or undefined, return an empty array
    const sortedTx = [...transactions].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));//sort in ascending order
    const monthlyXP = {};
    let cumulativeXP = 0;

    sortedTx.forEach(tx => {
        const date = new Date(tx.createdAt);
        const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;// extract month and year from the date object
        monthlyXP[monthYear] = (monthlyXP[monthYear] || 0) + tx.amount;
        cumulativeXP += tx.amount;
    });

    return Object.entries(monthlyXP).map(([date, xp]) => ({ date, xp }));
}


// progressGradesData groups projects by category, calculate pass/fail counts, and computes
// pass rates for each category.
export function processGradesData(progress) {
    if (!progress?.length) return []; // uses chaining operator ?. to avoid runtime errors if the object is null or undefined.
    const projectGroups = {};

    progress.forEach(proj => {
        if (proj.path.includes("checkpoint") && proj.path.includes("rust")) {
            const pathParts = proj.path.split("/");
            const category = pathParts.length > 1 ? pathParts[pathParts.length - 1] : "Other";
            projectGroups[category] = projectGroups[category] || { pass: 0, fail: 0, total: 0 };
            projectGroups[category].total++;
            proj.grade === 1 ? projectGroups[category].pass++ : projectGroups[category].fail++;
        }
    });

    return Object.entries(projectGroups)
        .filter(([category]) => !["Other", ""].includes(category))
        .map(([category, data]) => ({
            label: category,
            pass: data.pass,
            fail: data.fail,
            passRate: data.total > 0 ? (data.pass / data.total) * 100 : 0
        }));
}