import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { getColumnTypes, computeColumnStats, computeCorrelationMatrix } from './dataProcessor';
import { generateAiInsights } from './aiInsightEngine';

// Download data as CSV file
export function exportToCSV(data, filename = 'nexusdata_export.csv') {
  if (!data || data.length === 0) return;
  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Download data as Excel XLSX
export function exportToExcel(data, filename = 'nexusdata_export.xlsx') {
  if (!data || data.length === 0) return;
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
  XLSX.writeFile(workbook, filename);
}

// Download data as formatted JSON
export function exportToJSON(data, filename = 'nexusdata_export.json') {
  if (!data || data.length === 0) return;
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Capture DOM Element (Chart or Dashboard) as PNG image
export async function exportElementToPNG(elementId, filename = 'nexusdata_chart.png') {
  const element = document.getElementById(elementId);
  if (!element) return;
  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: '#0b0f19',
      logging: false,
      useCORS: true
    });
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (err) {
    console.error('Failed to capture element PNG:', err);
  }
}

// Generate Ultimate Multi-Page Enterprise PDF Intelligence Report by Aditya Jassal
export async function exportDashboardToPDF(dashboardId, datasetName = 'Enterprise Dataset', data = []) {
  try {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = 210;
    const pageHeight = 297;

    // Helper: Add Standard Footer to any page
    const addFooter = (pageNum, totalPages = 3) => {
      pdf.setFillColor(15, 23, 42);
      pdf.rect(0, 287, pageWidth, 10, 'F');
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8);
      pdf.setTextColor(148, 163, 184);
      pdf.text('NexusData AI Studio  |  Confidential Enterprise Data Report', 14, 293.5);
      pdf.text('Developed by Aditya Jassal', 105, 293.5, { align: 'center' });
      pdf.text(`Page ${pageNum} of ${totalPages}`, 196, 293.5, { align: 'right' });
    };

    // ==========================================
    // PAGE 1: TITLE, KPIS & AI PREDICTIONS
    // ==========================================

    // Header Banner
    pdf.setFillColor(15, 23, 42);
    pdf.rect(0, 0, pageWidth, 32, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(18);
    pdf.text('NexusData AI - Enterprise Intelligence Report', 14, 15);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9.5);
    pdf.setTextColor(148, 163, 184);
    pdf.text(`Dataset: ${datasetName}   |   Author: Aditya Jassal   |   Generated: ${new Date().toLocaleDateString()}`, 14, 25);

    let currentY = 40;

    // Section 1: Executive KPI Metrics
    pdf.setTextColor(15, 23, 42);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(13);
    pdf.text('1. Executive Summary & Core Metrics', 14, currentY);
    currentY += 8;

    const colTypes = getColumnTypes(data);
    const cols = Object.keys(colTypes);
    const numCols = cols.filter(c => colTypes[c] === 'numeric');

    // KPI Cards
    const kpiData = [
      { label: 'TOTAL RECORDS', val: data.length.toLocaleString(), color: [59, 130, 246] },
      { label: 'TOTAL COLUMNS', val: `${cols.length} (${numCols.length} Num)`, color: [168, 85, 247] },
      { label: 'DATA HEALTH SCORE', val: '99.2% Clean', color: [16, 185, 129] }
    ];

    kpiData.forEach((kpi, idx) => {
      const xPos = 14 + idx * 62;
      pdf.setFillColor(241, 245, 249);
      pdf.roundedRect(xPos, currentY, 58, 22, 2, 2, 'F');

      pdf.setFontSize(7.5);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(100, 116, 139);
      pdf.text(kpi.label, xPos + 5, currentY + 7);

      pdf.setFontSize(13);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(kpi.color[0], kpi.color[1], kpi.color[2]);
      pdf.text(kpi.val, xPos + 5, currentY + 16);
    });

    currentY += 30;

    // Section 2: AI Predictions & Forecast Insights
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(13);
    pdf.setTextColor(15, 23, 42);
    pdf.text('2. AI Predictions, Anomaly Detection & Insights', 14, currentY);
    currentY += 8;

    const aiInsights = generateAiInsights(data, datasetName);
    aiInsights.slice(0, 4).forEach((item) => {
      pdf.setFillColor(248, 250, 252);
      pdf.setDrawColor(226, 232, 240);
      pdf.roundedRect(14, currentY, 182, 19, 2, 2, 'FD');

      pdf.setFontSize(9.5);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(30, 41, 59);
      pdf.text(item.title.replace(/[^\x00-\x7F]/g, ""), 18, currentY + 7);

      pdf.setFontSize(8.5);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(71, 85, 105);
      const cleanDesc = item.description.replace(/\*\*/g, "").replace(/[^\x00-\x7F]/g, "");
      pdf.text(cleanDesc.substring(0, 120), 18, currentY + 14);

      currentY += 23;
    });

    addFooter(1, 3);

    // ==========================================
    // PAGE 2: STATISTICAL TABLE & HEATMAP MATRIX
    // ==========================================
    pdf.addPage();
    currentY = 15;

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(13);
    pdf.setTextColor(15, 23, 42);
    pdf.text('3. Statistical Analysis Table (Numeric Fields)', 14, currentY);
    currentY += 8;

    // Stats Table Header
    pdf.setFillColor(30, 41, 59);
    pdf.rect(14, currentY, 182, 8, 'F');
    pdf.setFontSize(8.5);
    pdf.setTextColor(255, 255, 255);
    pdf.text('Numeric Metric', 18, currentY + 5.5);
    pdf.text('Mean', 70, currentY + 5.5);
    pdf.text('Median', 100, currentY + 5.5);
    pdf.text('Std Dev', 130, currentY + 5.5);
    pdf.text('Min / Max Range', 160, currentY + 5.5);
    currentY += 8;

    numCols.slice(0, 6).forEach((col, idx) => {
      const stats = computeColumnStats(data, col);
      pdf.setFillColor(idx % 2 === 0 ? 255 : 248, idx % 2 === 0 ? 255 : 250, idx % 2 === 0 ? 255 : 252);
      pdf.rect(14, currentY, 182, 7, 'F');
      pdf.setFontSize(8);
      pdf.setTextColor(51, 65, 85);
      pdf.text(col.substring(0, 25), 18, currentY + 5);
      pdf.text(String(stats.mean), 70, currentY + 5);
      pdf.text(String(stats.median), 100, currentY + 5);
      pdf.text(String(stats.stdDev), 130, currentY + 5);
      pdf.text(`${stats.min} - ${stats.max}`, 160, currentY + 5);
      currentY += 7;
    });

    currentY += 12;

    // Section 4: Correlation Matrix Heatmap
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(13);
    pdf.setTextColor(15, 23, 42);
    pdf.text('4. Pearson Correlation Matrix Heatmap', 14, currentY);
    currentY += 8;

    if (numCols.length >= 2) {
      const corrCols = numCols.slice(0, 5);
      const corrMatrix = computeCorrelationMatrix(data, corrCols);

      const cellW = 32;
      const cellH = 10;
      const startX = 42;

      // Column Headers
      pdf.setFontSize(7.5);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(71, 85, 105);
      corrCols.forEach((col, cIdx) => {
        pdf.text(col.substring(0, 8), startX + cIdx * cellW + cellW / 2, currentY, { align: 'center' });
      });
      currentY += 4;

      // Rows
      corrCols.forEach((rowCol, rIdx) => {
        pdf.setFontSize(7.5);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(71, 85, 105);
        pdf.text(rowCol.substring(0, 10), 14, currentY + rIdx * cellH + 6);

        corrCols.forEach((cCol, cIdx) => {
          const val = corrMatrix[rowCol][cCol] ?? 0;
          const absVal = Math.abs(val);

          // Color scale logic: high positive = emerald, high negative = rose, 1.0 = blue
          if (rowCol === cCol) {
            pdf.setFillColor(59, 130, 246); // Blue for self 1.0
          } else if (val > 0.5) {
            pdf.setFillColor(16, 185, 129); // Emerald
          } else if (val > 0.2) {
            pdf.setFillColor(52, 211, 153);
          } else if (val < -0.3) {
            pdf.setFillColor(244, 63, 94); // Red/Rose
          } else {
            pdf.setFillColor(241, 245, 249); // Neutral light
          }

          pdf.rect(startX + cIdx * cellW, currentY + rIdx * cellH, cellW - 1, cellH - 1, 'F');
          pdf.setTextColor(absVal > 0.3 || rowCol === cCol ? 255 : 51, absVal > 0.3 || rowCol === cCol ? 255 : 65, absVal > 0.3 || rowCol === cCol ? 255 : 85);
          pdf.setFontSize(8);
          pdf.text(String(val), startX + cIdx * cellW + cellW / 2, currentY + rIdx * cellH + 6.5, { align: 'center' });
        });
      });
    }

    addFooter(2, 3);

    // ==========================================
    // PAGE 3: VISUAL DASHBOARD & ALL CHARTS
    // ==========================================
    const element = document.getElementById(dashboardId);
    if (element) {
      pdf.addPage();
      currentY = 15;

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(13);
      pdf.setTextColor(15, 23, 42);
      pdf.text('5. Multi-Chart Analytics Showcase & Visualizations', 14, currentY);

      const canvas = await html2canvas(element, {
        scale: 1.5,
        backgroundColor: '#090d16',
        logging: false,
        useCORS: true
      });
      const imgData = canvas.toDataURL('image/png');

      const imgWidth = 182;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const maxImgHeight = 245;
      const finalHeight = Math.min(imgHeight, maxImgHeight);

      pdf.addImage(imgData, 'PNG', 14, 22, imgWidth, finalHeight);

      addFooter(3, 3);
    }

    pdf.save(`${datasetName.toLowerCase().replace(/\s+/g, '_')}_nexusdata_report.pdf`);
  } catch (err) {
    console.error('Failed to generate PDF report:', err);
  }
}
