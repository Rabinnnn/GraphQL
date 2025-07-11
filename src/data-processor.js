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