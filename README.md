# GraphQL User Profile Dashboard

A modern, responsive web application that displays user profile information, statistics, and interactive charts using GraphQL API integration.

## Features

- **User Authentication** - Secure login with JWT token management
- **Profile Dashboard** - Comprehensive user information display
- **Interactive Charts** - Visual data representation with:
  - XP progression over time (Line Graph)
  - Project success rates by category (Bar Chart)
  - Skills distribution (Pie Chart)
- **Statistics Overview** - Pass/fail rates, total XP, and project metrics
- **Responsive Design** - Mobile-friendly interface with sticky navigation
- **Real-time Data** - GraphQL integration for up-to-date information

## Project Structure

```
├── index.html              # Main HTML file
├── style.css              # Global styles and responsive design
├── src/
│   ├── init.js            # Application initialization
│   ├── auth.js            # Authentication logic
│   ├── api.js             # GraphQL API integration
│   ├── config.js          # Configuration constants
│   ├── ui.js              # UI update functions
│   ├── navigation.js      # Side panel navigation
│   ├── data-processor.js  # Data processing for charts
│   └── graphs.js          # SVG chart rendering
└── README.md              # Project documentation
```

## Technologies Used

- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **API**: GraphQL
- **Charts**: Custom SVG implementations
- **Authentication**: JWT tokens
- **Styling**: CSS Grid, Flexbox, CSS Variables

## Running the Project Locally

Start a local development server:

```bash
node -e "const http = require('http'); const fs = require('fs'); const path = require('path'); const server = http.createServer((req, res) => { let filePath = '.' + req.url; if (filePath === './') filePath = './index.html'; const extname = path.extname(filePath); let contentType = 'text/html'; switch (extname) { case '.js': contentType = 'text/javascript'; break; case '.css': contentType = 'text/css'; break; case '.json': contentType = 'application/json'; break; case '.png': contentType = 'image/png'; break; case '.jpg': contentType = 'image/jpg'; break; } fs.readFile(filePath, (error, content) => { if (error) { if (error.code === 'ENOENT') { res.writeHead(404); res.end('File not found'); } else { res.writeHead(500); res.end('Server error'); } } else { res.writeHead(200, { 'Content-Type': contentType }); res.end(content, 'utf-8'); } }); }); server.listen(3000, () => console.log('Server running at http://localhost:3000'));"
```

Then open your browser and navigate to `http://localhost:3000`

## Usage

1. **Login** - Enter your username/email and password
2. **Profile** - View personal information and contact details
3. **Stats** - Check XP totals, project statistics, and pending projects
4. **Charts** - Analyze your progress through interactive visualizations

## GraphQL Integration

The application connects to the Zone01 GraphQL endpoint to fetch:
- User profile data and attributes
- XP transactions and progression
- Project progress and grades
- Skills data for visualization
- Pending project information

## Key Features

### Authentication
- Secure JWT-based login system
- Automatic token validation
- Session persistence with localStorage

### Data Visualization
- **Line Graph**: XP earned over time with hover tooltips
- **Bar Chart**: Project success rates by category
- **Pie Chart**: Skills distribution with interactive legends

### Responsive Design
- Mobile-first approach
- Sticky navigation elements
- Flexible grid layouts
- Optimized for various screen sizes


### License
This project is licensed under the MIT License.
