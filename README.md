# Modern Weather App 🌦️

A beautiful, feature-rich weather application built with React, Vite, and Tailwind CSS.

## Features ✨

- **Real-time Weather**: Current temperature, wind speed, humidity, and pressure.
- **10-Day Forecast**: Extended forecast data using Open-Meteo API.
- **Air Quality Index (AQI)**: Real-time AQI monitoring with health recommendations (US EPA Scale).
- **Dynamic Backgrounds**: Background images change based on the current weather condition.
- **Interactive Map**: Explore weather conditions on a map interface.
- **Search**: Find weather for any city worldwide or use your current location.
- **Responsive Design**: Fully optimized for desktop and mobile devices.

## Tech Stack 🛠️

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Maps**: Leaflet, React Leaflet
- **HTTP Client**: Axios
- **Dates**: Date-fns

## Getting Started 🚀

Follow this step-by-step guide to set up the project on a new device.

### 1. Prerequisites 📋

Before you begin, ensure you have the following installed on your computer:

#### Node.js (Runtime Environment)
- **Windows/Mac/Linux**: Download and install the "LTS" version from [nodejs.org](https://nodejs.org/).
- **Verify installation**: Open your terminal (Command Prompt, PowerShell, or Terminal) and run:
  ```bash
  node -v
  npm -v
  ```
  You should see version numbers like `v18.x.x` and `9.x.x`.

#### Git (Version Control)
- **Windows**: Download from [git-scm.com](https://git-scm.com/download/win).
- **Mac**: Usually pre-installed, or download from [git-scm.com](https://git-scm.com/download/mac).
- **Verify installation**: Run:
  ```bash
  git --version
  ```

### 2. Installation & Setup 🛠️

#### Step 1: Clone the Repository
Open your terminal and run the following command to download the project code:
```bash
git clone <repository-url>
```
*Replace `<repository-url>` with the actual URL of this repository.*

#### Step 2: Navigate to Project Folder
Move into the project directory:
```bash
cd Weather-App
```

#### Step 3: Install Dependencies
Download all the necessary libraries required for the project:
```bash
npm install
```
*This may take a few minutes depending on your internet connection.*

### 3. Running the App ▶️

#### Start Development Server
To run the app locally on your machine:
```bash
npm run dev
```

After running the command, you will see output similar to:
```
  VITE v5.x.x  ready in 300 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

#### Open in Browser
1. Copy the URL shown in the terminal (usually `http://localhost:5173/`).
2. Paste it into your web browser (Chrome, Edge, Firefox, Safari).
3. You should now see the Weather App running! 🎉

### 4. Troubleshooting 🔧

- **"command not found"**: Ensure Node.js is installed and added to your system PATH. Restart your terminal after installation.
- **"EADDRINUSE"**: If port 5173 is busy, Vite will automatically try the next available port (e.g., 5174). Check the terminal output for the correct URL.
- **Geolocation issues**: Ensure you allow location access in your browser when prompted.

## Scripts 📜

- `npm run dev`: Start the development server.
- `npm run build`: Build the app for production.
- `npm run preview`: Preview the production build locally.
- `npm run lint`: Run ESLint.

## APIs Used 🌐

- **OpenWeatherMap**: For current weather and AQI data.
- **Open-Meteo**: For 10-day forecast data.
- **Unsplash**: For dynamic weather background images.

## Author 👤

**Ubbe Lothbrok**
- GitHub: [@ubbelothbrok](https://github.com/ubbelothbrok)

## License 📄

© 2026 Ubbe Lothbrok. All Rights Reserved.
This project is licensed under the MIT License - see the LICENSE file for details.
Unauthorized copying of this file, via any medium is strictly prohibited.
