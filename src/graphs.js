// drawLineGraph function draws a line graph based on the provided data(XP over time) using SVG
export function drawLineGraph(data) {
    const svg = document.getElementById("line-graph");
    // Clear previous content
    svg.innerHTML = "";
  
    if (!data || data.length === 0) {
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", "50%");
      text.setAttribute("y", "50%");
      text.setAttribute("text-anchor", "middle");
      text.textContent = "No XP data available";
      svg.appendChild(text);
      return;
    }

     // Determine dimensions - INCREASED WIDTH from 800 to 1000
    const width = svg.clientWidth || 700;
    const height = svg.clientHeight || 300;
    const padding = 50;
    // Added more left padding for y-axis labels
    const leftPadding = 90;
  
}