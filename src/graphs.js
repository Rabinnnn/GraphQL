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

     // Set dimensions
    const width = svg.clientWidth || 700;
    const height = svg.clientHeight || 300;
    const padding = 50;
    // Add left padding for y-axis labels
    const leftPadding = 90;

    // Add title
    const title = document.createElementNS("http://www.w3.org/2000/svg", "text");
    title.setAttribute("x", width / 2);
    title.setAttribute("y", 20);
    title.setAttribute("text-anchor", "middle");
    title.setAttribute("font-weight", "bold");
    title.textContent = "XP Earned Over Time (in Kbs)";
    svg.appendChild(title);

    // Calculate max XP for scaling
    const maxXP = Math.max(...data.map((d) => d.xp));
  
    // Create axes
    // X axis
    const xAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
    xAxis.setAttribute("x1", leftPadding);
    xAxis.setAttribute("y1", height - padding);
    xAxis.setAttribute("x2", width - padding);
    xAxis.setAttribute("y2", height - padding);
    xAxis.setAttribute("stroke", "black");
    xAxis.setAttribute("stroke-width", "2");
    svg.appendChild(xAxis);
  
    // Y axis
    const yAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
    yAxis.setAttribute("x1", leftPadding);
    yAxis.setAttribute("y1", padding);
    yAxis.setAttribute("x2", leftPadding);
    yAxis.setAttribute("y2", height - padding);
    yAxis.setAttribute("stroke", "black");
    yAxis.setAttribute("stroke-width", "2");
    svg.appendChild(yAxis);
  
    // X axis label
    const xLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
    xLabel.setAttribute("x", width / 2);
    xLabel.setAttribute("y", height - 10);
    xLabel.setAttribute("text-anchor", "middle");
    xLabel.textContent = "Time (Month/Year)";
    svg.appendChild(xLabel);
  
    // Y axis label 
    const yLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
    yLabel.setAttribute("x", -height / 2);
    yLabel.setAttribute("y", 25); // Set to 25 to push it further left to avoid clashing with scale numbers
    yLabel.setAttribute("text-anchor", "middle");
    yLabel.setAttribute("transform", "rotate(-90)");
    yLabel.textContent = "XP Earned";
    svg.appendChild(yLabel);

  
}