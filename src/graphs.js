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

    // Add gradients for enhanced styling
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    
    // Line gradient
    const lineGradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    lineGradient.setAttribute("id", "lineGradient");
    lineGradient.setAttribute("x1", "0%");
    lineGradient.setAttribute("y1", "0%");
    lineGradient.setAttribute("x2", "100%");
    lineGradient.setAttribute("y2", "0%");
    
    const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop1.setAttribute("offset", "0%");
    stop1.setAttribute("stop-color", "#22c55e");
    
    const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop2.setAttribute("offset", "100%");
    stop2.setAttribute("stop-color", "#16a34a");
    
    lineGradient.appendChild(stop1);
    lineGradient.appendChild(stop2);
    
    // Area gradient
    const areaGradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    areaGradient.setAttribute("id", "areaGradient");
    areaGradient.setAttribute("x1", "0%");
    areaGradient.setAttribute("y1", "0%");
    areaGradient.setAttribute("x2", "0%");
    areaGradient.setAttribute("y2", "100%");
    
    const areaStop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    areaStop1.setAttribute("offset", "0%");
    areaStop1.setAttribute("stop-color", "#22c55e");
    areaStop1.setAttribute("stop-opacity", "0.4");
    
    const areaStop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    areaStop2.setAttribute("offset", "100%");
    areaStop2.setAttribute("stop-color", "#22c55e");
    areaStop2.setAttribute("stop-opacity", "0.1");
    
    areaGradient.appendChild(areaStop1);
    areaGradient.appendChild(areaStop2);
    
    defs.appendChild(lineGradient);
    defs.appendChild(areaGradient);
    svg.appendChild(defs);

     // Set dimensions
    const width = svg.clientWidth || 700;
    const height = svg.clientHeight || 300;
    const padding = 50;
    const leftPadding = 90;

    // Add title
    const title = document.createElementNS("http://www.w3.org/2000/svg", "text");
    title.setAttribute("x", width / 2);
    title.setAttribute("y", 20);
    title.setAttribute("text-anchor", "middle");
    title.setAttribute("class", "chart-title");
    title.textContent = "XP Earned Over Time (in Kbs)";
    svg.appendChild(title);

    // Calculate max XP for scaling
    const maxXP = Math.max(...data.map((d) => d.xp));
  
    // Create axes with enhanced styling
    const xAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
    xAxis.setAttribute("x1", leftPadding);
    xAxis.setAttribute("y1", height - padding);
    xAxis.setAttribute("x2", width - padding);
    xAxis.setAttribute("y2", height - padding);
    xAxis.setAttribute("class", "axis-line");
    svg.appendChild(xAxis);
  
    const yAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
    yAxis.setAttribute("x1", leftPadding);
    yAxis.setAttribute("y1", padding);
    yAxis.setAttribute("x2", leftPadding);
    yAxis.setAttribute("y2", height - padding);
    yAxis.setAttribute("class", "axis-line");
    svg.appendChild(yAxis);

    // Create points for the line graph
    const points = data.map((d, i) => {
      const x = leftPadding + (i / (data.length - 1 || 1)) * (width - padding - leftPadding);
      const y = height - padding - (d.xp / maxXP) * (height - 2 * padding);
      return { x, y, data: d };
    });

    // Create area fill
    let areaPath = `M ${leftPadding} ${height - padding} `;
    areaPath += `L ${points[0].x} ${points[0].y} `;
    for (let i = 1; i < points.length; i++) {
      areaPath += `L ${points[i].x} ${points[i].y} `;
    }
    areaPath += `L ${points[points.length - 1].x} ${height - padding} Z`;
    
    const area = document.createElementNS("http://www.w3.org/2000/svg", "path");
    area.setAttribute("d", areaPath);
    area.setAttribute("class", "area-fill");
    svg.appendChild(area);
  
    // Create the line path
    let pathD = `M ${points[0].x} ${points[0].y} `;
    for (let i = 1; i < points.length; i++) {
      pathD += `L ${points[i].x} ${points[i].y} `;
    }
  
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", pathD);
    path.setAttribute("class", "line-path");
    svg.appendChild(path);

    // Add grid lines and labels
    for (let i = 0; i <= 5; i++) {
      const yPos = height - padding - (i / 5) * (height - 2 * padding);
      const xpValue = Math.round((i / 5) * maxXP);
  
      const gridLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
      gridLine.setAttribute("x1", leftPadding);
      gridLine.setAttribute("y1", yPos);
      gridLine.setAttribute("x2", width - padding);
      gridLine.setAttribute("y2", yPos);
      gridLine.setAttribute("class", "grid-line");
      svg.appendChild(gridLine);

      const tick = document.createElementNS("http://www.w3.org/2000/svg", "line");
      tick.setAttribute("x1", leftPadding - 5);
      tick.setAttribute("y1", yPos);
      tick.setAttribute("x2", leftPadding);
      tick.setAttribute("y2", yPos);
      tick.setAttribute("class", "tick-line");
      svg.appendChild(tick);
  
      const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
      label.setAttribute("x", leftPadding - 10); 
      label.setAttribute("y", yPos + 5);
      label.setAttribute("text-anchor", "end");
      label.setAttribute("class", "tick-label");
      label.textContent = Math.round(xpValue / 1024);
      svg.appendChild(label);
    }

    // Add enhanced data points
    points.forEach((pt) => {
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", pt.x);
      circle.setAttribute("cy", pt.y);
      circle.setAttribute("r", 5);
      circle.setAttribute("class", "line-point");
  
      const title = document.createElementNS("http://www.w3.org/2000/svg", "title");
      title.textContent = `${pt.data.date}: ${pt.data.xp} XP`;
      circle.appendChild(title);
  
      svg.appendChild(circle);
    });
}

// Enhanced drawBarChart function
export function drawBarChart(data) {
  const svg = document.getElementById("bar-chart");
  svg.innerHTML = "";

  const width = 600;
  const height = svg.clientHeight || 300;
  const margin = { top: 50, right: 40, bottom: 80, left: 60 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("preserveAspectRatio", "xMinYMin meet");

  if (!data || data.length === 0) {
    const noData = document.createElementNS(svg.namespaceURI, "text");
    noData.setAttribute("x", width / 2);
    noData.setAttribute("y", height / 2);
    noData.setAttribute("text-anchor", "middle");
    noData.textContent = "No grade data available";
    svg.appendChild(noData);
    return;
  }

  // Add gradient for bars
  const defs = document.createElementNS(svg.namespaceURI, "defs");
  const barGradient = document.createElementNS(svg.namespaceURI, "linearGradient");
  barGradient.setAttribute("id", "barGradient");
  barGradient.setAttribute("x1", "0%");
  barGradient.setAttribute("y1", "0%");
  barGradient.setAttribute("x2", "0%");
  barGradient.setAttribute("y2", "100%");
  
  const stop1 = document.createElementNS(svg.namespaceURI, "stop");
  stop1.setAttribute("offset", "0%");
  stop1.setAttribute("stop-color", "#22c55e");
  
  const stop2 = document.createElementNS(svg.namespaceURI, "stop");
  stop2.setAttribute("offset", "100%");
  stop2.setAttribute("stop-color", "#16a34a");
  
  barGradient.appendChild(stop1);
  barGradient.appendChild(stop2);
  defs.appendChild(barGradient);
  svg.appendChild(defs);

  const xBand = innerWidth / data.length;
  const barWidth = xBand * 0.7;
  const yScale = (rate) => innerHeight - (rate / 100) * innerHeight;

  const g = document.createElementNS(svg.namespaceURI, "g");
  g.setAttribute("transform", `translate(${margin.left},${margin.top})`);
  svg.appendChild(g);

  const title = document.createElementNS(svg.namespaceURI, "text");
  title.setAttribute("x", width / 2);
  title.setAttribute("y", margin.top / 2);
  title.setAttribute("text-anchor", "middle");
  title.setAttribute("class", "chart-title");
  title.textContent = "Project Success Rates by Category";
  svg.appendChild(title);

  // Enhanced axes
  const xAxisLine = document.createElementNS(svg.namespaceURI, "line");
  xAxisLine.setAttribute("x1", 0);
  xAxisLine.setAttribute("y1", innerHeight);
  xAxisLine.setAttribute("x2", innerWidth);
  xAxisLine.setAttribute("y2", innerHeight);
  xAxisLine.setAttribute("class", "axis-line");
  g.appendChild(xAxisLine);
  
  const yAxisLine = document.createElementNS(svg.namespaceURI, "line");
  yAxisLine.setAttribute("x1", 0);
  yAxisLine.setAttribute("y1", 0);
  yAxisLine.setAttribute("x2", 0);
  yAxisLine.setAttribute("y2", innerHeight);
  yAxisLine.setAttribute("class", "axis-line");
  g.appendChild(yAxisLine);

  // Enhanced grid and ticks
  const ticks = 5;
  for (let i = 0; i <= ticks; i++) {
    const y = (innerHeight / ticks) * i;
    const pct = 100 - (i / ticks) * 100;

    const grid = document.createElementNS(svg.namespaceURI, "line");
    grid.setAttribute("x1", 0);
    grid.setAttribute("y1", y);
    grid.setAttribute("x2", innerWidth);
    grid.setAttribute("y2", y);
    grid.setAttribute("class", "grid-line");
    g.appendChild(grid);

    const tick = document.createElementNS(svg.namespaceURI, "line");
    tick.setAttribute("x1", -5);
    tick.setAttribute("y1", y);
    tick.setAttribute("x2", 0);
    tick.setAttribute("y2", y);
    tick.setAttribute("class", "tick-line");
    g.appendChild(tick);

    const t = document.createElementNS(svg.namespaceURI, "text");
    t.setAttribute("x", -10);
    t.setAttribute("y", y + 4);
    t.setAttribute("text-anchor", "end");
    t.setAttribute("class", "tick-label");
    t.textContent = `${pct}%`;
    g.appendChild(t);
  }

  // Enhanced bars
  data.forEach((d, i) => {
    const x = i * xBand + (xBand - barWidth) / 2;
    const y = yScale(d.passRate);
    const h = innerHeight - y;

    const rect = document.createElementNS(svg.namespaceURI, "rect");
    rect.setAttribute("x", x);
    rect.setAttribute("y", y);
    rect.setAttribute("width", barWidth);
    rect.setAttribute("height", h);
    rect.setAttribute("class", "bar");
    rect.setAttribute("rx", 6);
    rect.setAttribute("ry", 6);

    const tip = document.createElementNS(svg.namespaceURI, "title");
    tip.textContent = `${d.label}: ${d.passRate.toFixed(1)}% (${d.pass}/${d.pass + d.fail})`;
    rect.appendChild(tip);

    g.appendChild(rect);

    const ct = document.createElementNS(svg.namespaceURI, "text");
    ct.setAttribute("x", x + barWidth / 2);
    ct.setAttribute("y", innerHeight + 20);
    ct.setAttribute("text-anchor", data.length > 4 ? "start" : "middle");
    ct.setAttribute("transform", data.length > 4 ? `rotate(45,${x + barWidth / 2},${innerHeight + 20})` : "");
    ct.setAttribute("class", "category-label");
    ct.textContent = d.label;
    g.appendChild(ct);
  });
}

// drawPieChart function creates a pie chart for skills data
export function drawPieChart(data) {
    const svg = document.getElementById("pie-chart");
    svg.innerHTML = "";

    const width = 400;
    const height = 300;
    const radius = Math.min(width, height) / 2 - 40;
    const centerX = width / 2;
    const centerY = height / 2;

    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.setAttribute("preserveAspectRatio", "xMinYMin meet");

    if (!data || data.length === 0) {
        const noData = document.createElementNS(svg.namespaceURI, "text");
        noData.setAttribute("x", centerX);
        noData.setAttribute("y", centerY);
        noData.setAttribute("text-anchor", "middle");
        noData.textContent = "No skills data available";
        svg.appendChild(noData);
        return;
    }

    // Enhanced color palette for pie slices
    const colors = [
        '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6',
        '#06b6d4', '#f97316', '#84cc16', '#ec4899', '#6366f1',
        '#14b8a6', '#f43f5e', '#22c55e', '#a855f7', '#0ea5e9',
        '#dc2626', '#059669', '#d97706', '#7c3aed', '#0891b2'
    ];

    // Add gradients for pie slices
    const defs = document.createElementNS(svg.namespaceURI, "defs");
    data.forEach((d, i) => {
        const gradient = document.createElementNS(svg.namespaceURI, "radialGradient");
        gradient.setAttribute("id", `pieGradient${i}`);
        gradient.setAttribute("cx", "30%");
        gradient.setAttribute("cy", "30%");
        
        const stop1 = document.createElementNS(svg.namespaceURI, "stop");
        stop1.setAttribute("offset", "0%");
        stop1.setAttribute("stop-color", colors[i % colors.length]);
        stop1.setAttribute("stop-opacity", "1");
        
        const stop2 = document.createElementNS(svg.namespaceURI, "stop");
        stop2.setAttribute("offset", "100%");
        stop2.setAttribute("stop-color", colors[i % colors.length]);
        stop2.setAttribute("stop-opacity", "0.7");
        
        gradient.appendChild(stop1);
        gradient.appendChild(stop2);
        defs.appendChild(gradient);
    });
    svg.appendChild(defs);

    // Add title
    const title = document.createElementNS(svg.namespaceURI, "text");
    title.setAttribute("x", centerX);
    title.setAttribute("y", 20);
    title.setAttribute("text-anchor", "middle");
    title.setAttribute("class", "chart-title");
    title.textContent = "Skills Distribution";
    svg.appendChild(title);

    let currentAngle = -Math.PI / 2; // Start from top

    data.forEach((d, i) => {
        const sliceAngle = (d.percentage / 100) * 2 * Math.PI;
        const endAngle = currentAngle + sliceAngle;

        // Calculate path coordinates
        const x1 = centerX + radius * Math.cos(currentAngle);
        const y1 = centerY + radius * Math.sin(currentAngle);
        const x2 = centerX + radius * Math.cos(endAngle);
        const y2 = centerY + radius * Math.sin(endAngle);

        const largeArcFlag = sliceAngle > Math.PI ? 1 : 0;

        const pathData = [
            `M ${centerX} ${centerY}`,
            `L ${x1} ${y1}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            'Z'
        ].join(' ');

        const path = document.createElementNS(svg.namespaceURI, "path");
        path.setAttribute("d", pathData);
        path.setAttribute("fill", `url(#pieGradient${i})`);
        path.setAttribute("stroke", "white");
        path.setAttribute("stroke-width", "2");
        path.setAttribute("class", "pie-slice");
        
        const tooltip = document.createElementNS(svg.namespaceURI, "title");
        tooltip.textContent = `${d.category}: ${d.percentage.toFixed(1)}% (${d.amount} points)`;
        path.appendChild(tooltip);

        svg.appendChild(path);

        // Add labels for larger slices
        if (d.percentage > 5) {
            const labelAngle = currentAngle + sliceAngle / 2;
            const labelRadius = radius * 0.7;
            const labelX = centerX + labelRadius * Math.cos(labelAngle);
            const labelY = centerY + labelRadius * Math.sin(labelAngle);

            const label = document.createElementNS(svg.namespaceURI, "text");
            label.setAttribute("x", labelX);
            label.setAttribute("y", labelY);
            label.setAttribute("text-anchor", "middle");
            label.setAttribute("class", "pie-label");
            label.textContent = `${d.percentage.toFixed(1)}%`;
            svg.appendChild(label);
        }

        currentAngle = endAngle;
    });

    // Add legend
    const legendStartY = height - 60;
    data.slice(0, 5).forEach((d, i) => {
        const legendY = legendStartY + i * 12;
        
        const rect = document.createElementNS(svg.namespaceURI, "rect");
        rect.setAttribute("x", 10);
        rect.setAttribute("y", legendY - 8);
        rect.setAttribute("width", 10);
        rect.setAttribute("height", 10);
        rect.setAttribute("fill", colors[i % colors.length]);
        svg.appendChild(rect);

        const text = document.createElementNS(svg.namespaceURI, "text");
        text.setAttribute("x", 25);
        text.setAttribute("y", legendY);
        text.setAttribute("class", "legend-text");
        text.textContent = d.category;
        svg.appendChild(text);
    });
}

