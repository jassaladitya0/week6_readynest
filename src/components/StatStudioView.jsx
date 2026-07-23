import React, { useState } from 'react';
import { Calculator, TrendingUp, Grid, Activity } from 'lucide-react';
import { getColumnTypes, computeColumnStats, computeCorrelationMatrix, computeLinearRegression } from '../utils/dataProcessor';

export default function StatStudioView({ data }) {
  const colTypes = getColumnTypes(data);
  const columns = Object.keys(colTypes);
  const numericCols = columns.filter(c => colTypes[c] === 'numeric');

  const [regX, setRegX] = useState(numericCols[0] || columns[0] || '');
  const [regY, setRegY] = useState(numericCols[1] || columns[1] || '');

  const corrMatrix = computeCorrelationMatrix(data, numericCols);
  const regResult = computeLinearRegression(data, regX, regY);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div>
        <h2 className="title-gradient" style={{ fontSize: '1.6rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Calculator size={24} color="#34d399" /> Statistical Suite & Correlation Heatmap
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.2rem' }}>
          Deep mathematical summary, Pearson correlation matrix, and linear regression models.
        </p>
      </div>

      {/* Summary Descriptive Statistics Matrix */}
      <div className="glass-panel" style={{ padding: '1.25rem' }}>
        <h3 style={{ fontSize: '1.05rem', color: 'white', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Activity size={18} color="#60a5fa" /> Descriptive Statistics Matrix
        </h3>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Column Metric</th>
                <th>Count</th>
                <th>Mean</th>
                <th>Median</th>
                <th>Std Dev</th>
                <th>Min</th>
                <th>Max</th>
                <th>Q1 (25%)</th>
                <th>Q3 (75%)</th>
                <th>IQR</th>
                <th>Skewness</th>
              </tr>
            </thead>
            <tbody>
              {numericCols.map(col => {
                const s = computeColumnStats(data, col);
                const isSkewed = Math.abs(s.skewness) > 1.0;
                return (
                  <tr key={col}>
                    <td style={{ fontWeight: 700, color: 'white' }}>{col}</td>
                    <td>{s.validCount}</td>
                    <td style={{ fontFamily: 'var(--font-mono)' }}>{s.mean}</td>
                    <td style={{ fontFamily: 'var(--font-mono)' }}>{s.median}</td>
                    <td style={{ fontFamily: 'var(--font-mono)' }}>{s.stdDev}</td>
                    <td style={{ fontFamily: 'var(--font-mono)' }}>{s.min}</td>
                    <td style={{ fontFamily: 'var(--font-mono)' }}>{s.max}</td>
                    <td style={{ fontFamily: 'var(--font-mono)' }}>{s.q1}</td>
                    <td style={{ fontFamily: 'var(--font-mono)' }}>{s.q3}</td>
                    <td style={{ fontFamily: 'var(--font-mono)' }}>{s.iqr}</td>
                    <td>
                      <span className={`badge ${isSkewed ? 'badge-amber' : 'badge-emerald'}`}>
                        {s.skewness}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Correlation Matrix Heatmap */}
      <div className="glass-panel" style={{ padding: '1.25rem' }}>
        <h3 style={{ fontSize: '1.05rem', color: 'white', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Grid size={18} color="#c084fc" /> Pearson Correlation Matrix Heatmap
        </h3>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Column</th>
                {numericCols.map(c => <th key={c}>{c}</th>)}
              </tr>
            </thead>
            <tbody>
              {numericCols.map(rCol => (
                <tr key={rCol}>
                  <td style={{ fontWeight: 700, color: 'white' }}>{rCol}</td>
                  {numericCols.map(cCol => {
                    const val = corrMatrix[rCol]?.[cCol] ?? 0;
                    const intensity = Math.abs(val);
                    const isPos = val > 0;
                    const bg = val === 1 ? 'rgba(255,255,255,0.05)'
                      : isPos ? `rgba(16, 185, 129, ${intensity * 0.4})`
                      : `rgba(244, 63, 94, ${intensity * 0.4})`;

                    return (
                      <td key={cCol} style={{ background: bg, textAlign: 'center', fontFamily: 'var(--font-mono)', fontWeight: 600, color: val === 1 ? 'var(--text-dim)' : 'white' }}>
                        {val}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Linear Regression Model */}
      <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3 style={{ fontSize: '1.05rem', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <TrendingUp size={18} color="#fbbf24" /> Bivariate Linear Regression Estimator
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>X Variable (Independent):</label>
            <select className="select-glass" value={regX} onChange={e => setRegX(e.target.value)}>
              {numericCols.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>Y Variable (Target):</label>
            <select className="select-glass" value={regY} onChange={e => setRegY(e.target.value)}>
              {numericCols.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div style={{ padding: '1rem', background: 'rgba(30, 41, 59, 0.6)', borderRadius: 'var(--radius-md)', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Regression Equation:</span>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#60a5fa', fontFamily: 'var(--font-mono)' }}>
              Y = {regResult.m} * X {regResult.c >= 0 ? `+ ${regResult.c}` : `- ${Math.abs(regResult.c)}`}
            </div>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Slope (m):</span>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white' }}>{regResult.m}</div>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Intercept (c):</span>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white' }}>{regResult.c}</div>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Goodness of Fit (R² Score):</span>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#34d399' }}>{regResult.rSquared}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
