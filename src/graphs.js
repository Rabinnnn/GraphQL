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

    // Create points for the line graph
    const points = data.map((d, i) => {
      const x =
        leftPadding +
        (i / (data.length - 1 || 1)) * (width - padding - leftPadding);
      const y = height - padding - (d.xp / maxXP) * (height - 2 * padding);
      return { x, y, data: d };
    });
  
    // Create the path string
    let pathD = `M ${points[0].x} ${points[0].y} `;
    for (let i = 1; i < points.length; i++) {
      pathD += `L ${points[i].x} ${points[i].y} `;
    }
  
    // Create SVG path element
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", pathD);
    path.setAttribute("stroke", "#007bff");
    path.setAttribute("stroke-width", "3");
    path.setAttribute("fill", "none");
    svg.appendChild(path);

      // Add axis ticks and labels
    // X-axis (dates)
    points.forEach((pt, i) => {
      if (i % Math.ceil(points.length / 5) === 0 || i === points.length - 1) {
        // Tick mark
        const tick = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );
        tick.setAttribute("x1", pt.x);
        tick.setAttribute("y1", height - padding);
        tick.setAttribute("x2", pt.x);
        tick.setAttribute("y2", height - padding + 5);
        tick.setAttribute("stroke", "black");
        svg.appendChild(tick);
  
        // Label
        const label = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "text"
        );
        label.setAttribute("x", pt.x);
        label.setAttribute("y", height - padding + 20);
        label.setAttribute("text-anchor", "middle");
        label.setAttribute("font-size", "12");
        label.textContent = pt.data.date;
        svg.appendChild(label);
      }
    });

    // Y-axis (XP values)
    for (let i = 0; i <= 5; i++) {
      const yPos = height - padding - (i / 5) * (height - 2 * padding);
      const xpValue = Math.round((i / 5) * maxXP);
  
      // Tick mark
      const tick = document.createElementNS("http://www.w3.org/2000/svg", "line");
      tick.setAttribute("x1", leftPadding - 5);
      tick.setAttribute("y1", yPos);
      tick.setAttribute("x2", leftPadding);
      tick.setAttribute("y2", yPos);
      tick.setAttribute("stroke", "black");
      svg.appendChild(tick);
  
      // Label 
      const label = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      label.setAttribute("x", leftPadding - 10); 
      label.setAttribute("y", yPos + 5);
      label.setAttribute("text-anchor", "end");
      label.setAttribute("font-size", "12");
      label.textContent = Math.round(xpValue / 1024);
      svg.appendChild(label);
  
      // Grid line (optional)
      const gridLine = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      gridLine.setAttribute("x1", leftPadding);
      gridLine.setAttribute("y1", yPos);
      gridLine.setAttribute("x2", width - padding);
      gridLine.setAttribute("y2", yPos);
      gridLine.setAttribute("stroke", "#e0e0e0");
      gridLine.setAttribute("stroke-dasharray", "5,5");
      svg.appendChild(gridLine);
    }

    // Add data points with tooltips
    points.forEach((pt) => {
      const circle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      circle.setAttribute("cx", pt.x);
      circle.setAttribute("cy", pt.y);
      circle.setAttribute("r", 5);
      circle.setAttribute("fill", "#007bff");
  
      // Add title for tooltip
      const title = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "title"
      );
      title.textContent = `${pt.data.date}: ${pt.data.xp} XP`;
      circle.appendChild(title);
  
      svg.appendChild(circle);
    });

  
}