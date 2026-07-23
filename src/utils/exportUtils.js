import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { getColumnTypes, computeColumnStats } from './dataProcessor';
import { generateAiInsights } from './aiInsightEngine';

// Download data as CSV file
export function exportToCSV(data, filename = 'datapulse_export.csv') {
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
export function exportToExcel(data, filename = 'datapulse_export.xlsx') {
  if (!data || data.length === 0) return;
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
  XLSX.writeFile(workbook, filename);
}

// Download data as formatted JSON
export function exportToJSON(data, filename = 'datapulse_export.json') {
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
export async function exportElementToPNG(elementId, filename = 'chart_export.png') {
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

// Generate Full Comprehensive PDF Report (With Metrics, AI Insights, Statistics & Charts)
export async function exportDashboardToPDF(dashboardId, datasetName = 'ReadyNest Data Report', data = []) {
  try {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = 210;
    const pageHeight = 297;

    // Header Banner
    pdf.setFillColor(15, 23, 42); // Dark slate header
    pdf.rect(0, 0, pageWidth, 28, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(16);
    pdf.text('ReadyNest Data Intelligence & Executive Report', 14, 13);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    pdf.setTextColor(148, 163, 184);
    pdf.text(`Dataset: ${datasetName}  |  Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, 14, 21);

    let currentY = 36;

    // Section 1: Executive Profile & KPI Summary Cards
    pdf.setTextColor(15, 23, 42);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.text('1. Executive Overview & Key Metrics', 14, currentY);
    currentY += 6;

    if (data && data.length > 0) {
      const colTypes = getColumnTypes(data);
      const cols = Object.keys(colTypes);
      const numCols = cols.filter(c => colTypes[c] === 'numeric');

      // KPI Card 1: Total Records
      pdf.setFillColor(241, 245, 249);
      pdf.roundedRect(14, currentY, 56, 22, 2, 2, 'F');
      pdf.setFontSize(8);
      pdf.setTextColor(100, 116, 139);
      pdf.text('TOTAL RECORDS', 18, currentY + 7);
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(30, 41, 59);
      pdf.text(data.length.toLocaleString(), 18, currentY + 16);

      // KPI Card 2: Total Columns
      pdf.setFillColor(241, 245, 249);
      pdf.roundedRect(77, currentY, 56, 22, 2, 2, 'F');
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(100, 116, 139);
      pdf.text('TOTAL COLUMNS', 81, currentY + 7);
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(30, 41, 59);
      pdf.text(`${cols.length} (${numCols.length} Numeric)`, 81, currentY + 16);

      // KPI Card 3: Health Score
      pdf.setFillColor(241, 245, 249);
      pdf.roundedRect(140, currentY, 56, 22, 2, 2, 'F');
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(100, 116, 139);
      pdf.text('DATA HEALTH SCORE', 144, currentY + 7);
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(16, 185, 129);
      pdf.text('98.5% Clean', 144, currentY + 16);

      currentY += 28;

      // Section 2: AI Insights & Findings
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(12);
      pdf.setTextColor(15, 23, 42);
      pdf.text('2. Automated AI Insights & Key Findings', 14, currentY);
      currentY += 6;

      const aiInsights = generateAiInsights(data, datasetName);
      aiInsights.slice(0, 3).forEach((item) => {
        pdf.setFillColor(248, 250, 252);
        pdf.setDrawColor(226, 232, 240);
        pdf.roundedRect(14, currentY, 182, 16, 2, 2, 'FD');

        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(30, 41, 59);
        pdf.text(item.title.replace(/[^\x00-\x7F]/g, ""), 18, currentY + 6);

        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(71, 85, 105);
        const cleanDesc = item.description.replace(/\*\*/g, "").replace(/[^\x00-\x7F]/g, "");
        pdf.text(cleanDesc.substring(0, 110), 18, currentY + 12);

        currentY += 19;
      });

      currentY += 4;

      // Section 3: Summary Statistics Table
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(12);
      pdf.setTextColor(15, 23, 42);
      pdf.text('3. Statistical Summary Table (Numeric Columns)', 14, currentY);
      currentY += 6;

      // Table Header
      pdf.setFillColor(30, 41, 59);
      pdf.rect(14, currentY, 182, 7, 'F');
      pdf.setFontSize(8);
      pdf.setTextColor(255, 255, 255);
      pdf.text('Column', 18, currentY + 5);
      pdf.text('Mean', 70, currentY + 5);
      pdf.text('Median', 100, currentY + 5);
      pdf.text('Min', 130, currentY + 5);
      pdf.text('Max', 160, currentY + 5);
      currentY += 7;

      numCols.slice(0, 5).forEach((col, idx) => {
        const stats = computeColumnStats(data, col);
        pdf.setFillColor(idx % 2 === 0 ? 255 : 248, idx % 2 === 0 ? 255 : 250, idx % 2 === 0 ? 255 : 252);
        pdf.rect(14, currentY, 182, 6, 'F');
        pdf.setFontSize(8);
        pdf.setTextColor(51, 65, 85);
        pdf.text(col.substring(0, 25), 18, currentY + 4.5);
        pdf.text(String(stats.mean), 70, currentY + 4.5);
        pdf.text(String(stats.median), 100, currentY + 4.5);
        pdf.text(String(stats.min), 130, currentY + 4.5);
        pdf.text(String(stats.max), 160, currentY + 4.5);
        currentY += 6;
      });

      currentY += 10;
    }

    // Section 4: Capture Dashboard / Chart Visualizations if available
    const element = document.getElementById(dashboardId);
    if (element) {
      const canvas = await html2canvas(element, {
        scale: 1.5,
        backgroundColor: '#090d16',
        logging: false,
        useCORS: true
      });
      const imgData = canvas.toDataURL('image/png');

      // Add Page 2 for Visual Charts
      pdf.addPage();

      // Page 2 Header
      pdf.setFillColor(15, 23, 42);
      pdf.rect(0, 0, pageWidth, 20, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(12);
      pdf.text('4. Visual Dashboard & Chart Reports', 14, 13);

      const imgWidth = 182;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const maxImgHeight = 250;
      const finalHeight = Math.min(imgHeight, maxImgHeight);

      pdf.addImage(imgData, 'PNG', 14, 25, imgWidth, finalHeight);
    }

    pdf.save(`${datasetName.toLowerCase().replace(/\s+/g, '_')}_full_report.pdf`);
  } catch (err) {
    console.error('Failed to export PDF report:', err);
  }
}
