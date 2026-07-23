# 🚀 ReadyNest - Data Analytics & Business Intelligence Studio

[![Vite](https://img.shields.io/badge/Vite-8.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Render](https://img.shields.io/badge/Render-Deployed-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com/)
[![AlaSQL](https://img.shields.io/badge/AlaSQL-In--Memory_SQL-CC092F?style=for-the-badge)](https://github.com/alasql/alasql)

**ReadyNest** is a powerful, client-side Data Intelligence & Analytics Studio built with React 19 and Vite. It provides an end-to-end data platform right in your browser—enabling seamless data ingestion, interactive data cleaning, visual charting, in-memory SQL queries, statistical analysis, pivot tables, AI-driven insights, and multi-format data exports without requiring backend infrastructure.

---

## ✨ Features & Capabilities

### 1. 📊 Executive Dashboard View
- **Instant Data KPIs**: Automatically computes total rows, columns, data health scores, and key numeric summaries upon loading any dataset.
- **Automated Trend Cards**: Displays dynamic visualizations, key distribution metrics, and dataset health indicators at a glance.
- **Preset Data Switcher**: Quickly switch between pre-loaded industry sample datasets (E-Commerce Sales, Real Estate Analytics, Healthcare Analytics, Customer Churn Data).

---

### 2. 📥 Data Ingestion & Import Studio
- **Multi-Format File Upload**: Drag-and-drop or browse local CSV (`.csv`) and Excel files (`.xlsx`, `.xls`).
- **Smart Parsing**: Powered by `PapaParse` and `xlsx` for high-performance, client-side file parsing.
- **Automatic Schema Detection**: Instantly detects column names, data types (string, number, boolean, date), missing value counts, and row totals.
- **Built-in Sample Datasets**: Explore real-world datasets out-of-the-box for instant testing and demonstration.

---

### 3. 🧹 Data Wrangler & Cleaning Workbench
- **Interactive Data Grid**: Search, sort, filter, and review raw and processed data rows.
- **Deduplication Engine**: One-click removal of duplicate rows across all or selected fields.
- **Missing Values Management**:
  - Impute missing numeric values using **Mean**, **Median**, **Mode**, or a custom constant.
  - Drop rows containing null/empty values.
- **Text & Format Standardization**:
  - Trim leading and trailing whitespace.
  - Convert text casing to `UPPERCASE`, `lowercase`, or `Title Case`.
- **Type Casting & Column Management**:
  - Convert column types dynamically (String ↔ Number ↔ Date ↔ Boolean).
  - Rename or delete columns seamlessly.
- **Reset & Rollback**: Revert dataset modifications back to its original state anytime.

---

### 4. 📈 Interactive Chart Studio
- **Rich Visualizations (Recharts)**: Create custom **Bar Charts**, **Line Charts**, **Area Charts**, **Pie Charts**, **Scatter Plots**, **Radar Charts**, and **Composed/Combination Charts**.
- **Flexible Axis & Metrics**: Select X-Axis dimensions, Y-Axis metrics, and aggregate functions (**Sum**, **Average**, **Count**, **Min**, **Max**).
- **Styling & Customization**: Customizable color palettes, grid toggles, legend placements, and tooltip preferences.
- **Chart Image Export**: Download generated charts as high-resolution images for reports and presentations.

---

### 5. 💻 In-Browser SQL Query Engine (AlaSQL)
- **Full In-Memory SQL Execution**: Run standard ANSI SQL queries (`SELECT`, `WHERE`, `GROUP BY`, `HAVING`, `ORDER BY`, `LIMIT`, `JOIN`) directly on your active dataset using `AlaSQL`.
- **Pre-Built SQL Snippets**: Quick query templates for standard analytics patterns (aggregation, top N analysis, filtering).
- **Execution Performance**: Displays real-time query execution time in milliseconds.
- **Export SQL Query Results**: Export the result set of any custom SQL query to CSV or Excel.

---

### 6. 📐 Statistical Analytics & EDA Studio
- **Comprehensive Descriptive Statistics**: Computes **Mean**, **Median**, **Mode**, **Standard Deviation**, **Variance**, **Min**, **Max**, **Range**, **Skewness**, **Kurtosis**, and **Interquartile Range (IQR)** for numeric columns.
- **Correlation Matrix Generator**: Calculates Pearson correlation coefficients between numeric variables with heatmap visualization.
- **Outlier Detection**: Uses IQR (Interquartile Range) methods to identify potential numeric outliers and data anomalies.

---

### 7. 🧩 Dynamic Pivot Table Studio
- **Multidimensional Matrix Builder**: Create multi-level pivot tables by defining Row dimensions, Column dimensions, and Value metrics.
- **Aggregation Functions**: Aggregate cell values using **Sum**, **Mean**, **Count**, **Min**, or **Max**.
- **Conditional Color Heatmap**: Color-code pivot matrix cells dynamically based on relative values.

---

### 8. 🤖 AI Insights & Automated Data Storytelling Engine
- **Automated Anomaly & Trend Detection**: Analyzes dataset patterns to highlight top performing categories, data skewness, and outliers.
- **Executive Summary Generator**: Produces natural language summaries and key takeaways automatically.
- **Data Quality & Actionable Recommendations**: Gives instant recommendations to clean or optimize your dataset for decision-making.

---

### 9. 📤 Multi-Format Export Module
Export processed datasets or query results in multiple standard formats:
- 📄 **CSV (`.csv`)**: Clean comma-separated values file.
- 📊 **Excel (`.xlsx`)**: Formatted Microsoft Excel workbook.
- 📋 **JSON (`.json`)**: Structured JSON data array.
- 📑 **PDF Report (`.pdf`)**: Styled summary report generated via `jspdf` & `html2canvas`.
- 📋 **Copy to Clipboard**: Quick copy to paste directly into spreadsheets or documents.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology / Library |
| :--- | :--- |
| **Framework & Build Tool** | React 19, Vite 8 |
| **Styling** | Custom Vanilla CSS (Modern Dark/Light Themes, Glassmorphism, Micro-animations) |
| **SQL Engine** | [AlaSQL](https://github.com/alasql/alasql) |
| **Charting Engine** | [Recharts](https://recharts.org/) |
| **File Parser** | [PapaParse](https://www.papaparse.com/) (CSV), [XLSX](https://github.com/SheetJS/sheetjs) (Excel) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Export Utilities** | [jsPDF](https://github.com/parallax/jsPDF), [html2canvas](https://html2canvas.hertzen.com/) |
| **Hosting & Deployment** | [Render](https://render.com/) (Static Site / Blueprint) |

---

## 💻 Getting Started Locally

### Prerequisites
Make sure you have **Node.js** (v18 or higher) and **npm** installed on your system.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/jassaladitya0/week6_readynest.git
   cd week6_readynest
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🌐 Deploying on Render

This repository includes a pre-configured `render.yaml` Blueprint file for automatic deployment on **Render**:

1. Log in to [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** → Select **Static Site** (or **Blueprint**).
3. Connect your GitHub repository `jassaladitya0/week6_readynest`.
4. Deploy using the default build command (`npm run build`) and publish directory (`dist`).

---

## 📂 Project Structure

```
week6_readynest/
├── public/                # Static public assets & icons
├── src/
│   ├── assets/            # Project images and graphics
│   ├── components/        # React studio & view components
│   │   ├── AiInsightsView.jsx      # AI Insights & Automated Storytelling
│   │   ├── ChartStudioView.jsx     # Recharts Visual Chart Builder
│   │   ├── DashboardView.jsx       # Executive KPI Overview
│   │   ├── DataIngestView.jsx      # File Upload & Data Import
│   │   ├── DataWranglerView.jsx    # Data Cleaning & Transformation Workbench
│   │   ├── ExportModal.jsx         # Multi-format Data Exporter
│   │   ├── Navbar.jsx              # Header Navigation & Dataset Switcher
│   │   ├── PivotStudioView.jsx     # Pivot Table Builder
│   │   ├── Sidebar.jsx             # Left Navigation Bar
│   │   ├── SqlStudioView.jsx       # In-Browser AlaSQL Query Studio
│   │   └── StatStudioView.jsx      # Exploratory Statistical Analytics
│   ├── utils/             # Helper engines & processors
│   │   ├── aiInsightEngine.js      # Natural Language Insights Generator
│   │   ├── dataProcessor.js        # Cleaning & Transformation Utilities
│   │   ├── exportUtils.js          # CSV/JSON/Excel/PDF Exporters
│   │   ├── sampleData.js           # Industry Preset Datasets
│   │   └── sqlEngine.js            # AlaSQL Query Execution Wrapper
│   ├── App.jsx            # Main Application Shell
│   ├── App.css             # Main Component Styles
│   ├── index.css           # Design Tokens & Core CSS
│   └── main.jsx           # App Entry Point
├── package.json           # Dependencies & NPM Scripts
├── render.yaml            # Render Deployment Blueprint
└── vite.config.js         # Vite Configuration
```

---

## 📜 License

This project is open-source and available under the **MIT License**.
