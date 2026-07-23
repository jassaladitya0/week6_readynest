import React, { useState } from 'react';
import { Grid, Layers, Download } from 'lucide-react';
import { getColumnTypes, generatePivotTable } from '../utils/dataProcessor';
import { exportToCSV } from '../utils/exportUtils';

export default function PivotStudioView({ data }) {
  const colTypes = getColumnTypes(data);
  const columns = Object.keys(colTypes);
  const numericCols = columns.filter(c => colTypes[c] === 'numeric');
  const categoricalCols = columns.filter(c => colTypes[c] !== 'numeric');

  const [rowCol, setRowCol] = useState(categoricalCols[0] || columns[0] || '');
  const [colCol, setColCol] = useState(categoricalCols[1] || columns[1] || '');
  const [valCol, setValCol] = useState(numericCols[0] || columns[2] || '');
  const [aggFunc, setAggFunc] = useState('sum');

  const pivot = generatePivotTable(data, rowCol, colCol, valCol, aggFunc);

  const handleExportPivotCSV = () => {
    const csvRows = [];
    // Header
    csvRows.push([`${rowCol} \\ ${colCol}`, ...pivot.cols, 'Total']);

    pivot.rows.forEach(r => {
      let rTotal = 0;
      const rowValues = pivot.cols.map(c => {
        const val = pivot.matrix[r]?.[c] || 0;
        rTotal += val;
        return val;
      });
      csvRows.push([r, ...rowValues, Number(rTotal.toFixed(2))]);
    });

    const csvContent = csvRows.map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `pivot_${rowCol}_vs_${colCol}.csv`;
    link.click();
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 className="title-gradient" style={{ fontSize: '1.6rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Grid size={24} color="#60a5fa" /> Pivot Table Multi-Dimensional Engine
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.2rem' }}>
            Cross-tabulate multi-variable metrics with custom aggregations and heatmaps.
          </p>
        </div>

        <button className="btn btn-primary" onClick={handleExportPivotCSV}>
          <Download size={16} /> Export Pivot CSV
        </button>
      </div>

      {/* Control Panel */}
      <div className="glass-panel" style={{ padding: '1.25rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <div>
          <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>
            Row Dimension:
          </label>
          <select className="select-glass" value={rowCol} onChange={e => setRowCol(e.target.value)}>
            {columns.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>
            Column Dimension:
          </label>
          <select className="select-glass" value={colCol} onChange={e => setColCol(e.target.value)}>
            {columns.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>
            Value Metric:
          </label>
          <select className="select-glass" value={valCol} onChange={e => setValCol(e.target.value)}>
            {columns.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>
            Aggregation Function:
          </label>
          <select className="select-glass" value={aggFunc} onChange={e => setAggFunc(e.target.value)}>
            <option value="sum">Sum (Total)</option>
            <option value="avg">Average (Mean)</option>
            <option value="count">Count Records</option>
            <option value="min">Minimum</option>
            <option value="max">Maximum</option>
          </select>
        </div>
      </div>

      {/* Pivot Grid */}
      <div className="glass-panel" style={{ padding: '1.25rem' }}>
        <h3 style={{ fontSize: '1.05rem', color: 'white', marginBottom: '1rem' }}>
          Pivot Matrix: {aggFunc.toUpperCase()} of {valCol} ({rowCol} × {colCol})
        </h3>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ background: 'rgba(59,130,246,0.2)', color: 'white' }}>{rowCol} \ {colCol}</th>
                {pivot.cols.map(c => <th key={c}>{c}</th>)}
                <th style={{ background: 'rgba(16,185,129,0.2)', color: 'white' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {pivot.rows.map(r => {
                let rowTotal = 0;
                return (
                  <tr key={r}>
                    <td style={{ fontWeight: 700, color: 'white' }}>{r}</td>
                    {pivot.cols.map(c => {
                      const val = pivot.matrix[r]?.[c] || 0;
                      rowTotal += val;
                      return (
                        <td key={c} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                          {val.toLocaleString()}
                        </td>
                      );
                    })}
                    <td style={{ fontWeight: 800, color: '#34d399', fontFamily: 'var(--font-mono)' }}>
                      {Number(rowTotal.toFixed(2)).toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
