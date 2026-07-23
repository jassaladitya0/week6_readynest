import React, { useState } from 'react';
import { TableProperties, Filter, RefreshCw, Trash2, Zap, AlertCircle, Check } from 'lucide-react';
import { getColumnTypes, handleMissingValues, detectOutliersIQR } from '../utils/dataProcessor';

export default function DataWranglerView({ data, onUpdateData, onResetData }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  
  // Cleaning tool states
  const [selectedCol, setSelectedCol] = useState(Object.keys(data[0] || {})[0] || '');
  const [missingStrategy, setMissingStrategy] = useState('mean');
  const [outlierInfo, setOutlierInfo] = useState(null);

  const colTypes = getColumnTypes(data);
  const columns = Object.keys(colTypes);

  // Filtered dataset
  const filteredData = data.filter(row => {
    if (!searchTerm) return true;
    return Object.values(row).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Clean missing values action
  const handleApplyMissingValueFix = () => {
    if (!selectedCol) return;
    const cleaned = handleMissingValues(data, selectedCol, missingStrategy);
    onUpdateData(cleaned);
  };

  // Detect outliers action
  const handleCheckOutliers = () => {
    if (!selectedCol || colTypes[selectedCol] !== 'numeric') {
      alert('Please select a numeric column to analyze outliers.');
      return;
    }
    const result = detectOutliersIQR(data, selectedCol);
    setOutlierInfo(result);
  };

  // Trim outliers action
  const handleTrimOutliers = () => {
    if (!outlierInfo) return;
    onUpdateData(outlierInfo.cleanData);
    setOutlierInfo(null);
  };

  // Remove exact duplicates action
  const handleRemoveDuplicates = () => {
    const seen = new Set();
    const clean = data.filter(row => {
      const serialized = JSON.stringify(row);
      if (seen.has(serialized)) return false;
      seen.add(serialized);
      return true;
    });
    onUpdateData(clean);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 className="title-gradient" style={{ fontSize: '1.6rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <TableProperties size={24} color="#60a5fa" /> Data Cleaning & Wrangling Wizard
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.2rem' }}>
            Transform, impute missing values, filter IQR outliers, and prepare clean dataset.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-secondary" onClick={handleRemoveDuplicates}>
            <Trash2 size={16} /> Drop Duplicates
          </button>
          <button className="btn btn-ghost" onClick={onResetData} style={{ color: '#f43f5e' }}>
            <RefreshCw size={16} /> Reset Dataset
          </button>
        </div>
      </div>

      {/* Cleaning Toolkit Panel */}
      <div className="glass-panel" style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {/* Missing Value Imputer Box */}
        <div style={{ borderRight: '1px solid rgba(255,255,255,0.06)', paddingRight: '1rem' }}>
          <h4 style={{ fontSize: '0.95rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#60a5fa' }}>
            <Zap size={16} /> Missing Value Imputer
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.2rem', display: 'block' }}>Target Column:</label>
              <select className="select-glass" value={selectedCol} onChange={e => setSelectedCol(e.target.value)}>
                {columns.map(c => <option key={c} value={c}>{c} ({colTypes[c]})</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.2rem', display: 'block' }}>Strategy:</label>
              <select className="select-glass" value={missingStrategy} onChange={e => setMissingStrategy(e.target.value)}>
                <option value="mean">Impute with Mean (Average)</option>
                <option value="median">Impute with Median</option>
                <option value="zero">Fill with 0</option>
                <option value="drop">Drop Rows with Missing Values</option>
              </select>
            </div>
            <button className="btn btn-primary btn-sm" onClick={handleApplyMissingValueFix} style={{ marginTop: '0.25rem' }}>
              Apply Imputation
            </button>
          </div>
        </div>

        {/* Outlier Detection Box */}
        <div>
          <h4 style={{ fontSize: '0.95rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#c084fc' }}>
            <AlertCircle size={16} /> IQR Outlier Inspector
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Detect extreme numerical values outside 1.5x Interquartile Range (IQR).
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn btn-secondary btn-sm" onClick={handleCheckOutliers} style={{ flex: 1 }}>
                Inspect Column Outliers
              </button>
              {outlierInfo && outlierInfo.outliers.length > 0 && (
                <button className="btn btn-emerald btn-sm" onClick={handleTrimOutliers}>
                  Trim {outlierInfo.outliers.length} Outliers
                </button>
              )}
            </div>
            {outlierInfo && (
              <div style={{ padding: '0.6rem', background: 'rgba(30,41,59,0.8)', borderRadius: '8px', fontSize: '0.75rem', color: 'white' }}>
                Found <strong>{outlierInfo.outliers.length}</strong> outliers in column <strong>{selectedCol}</strong> (Bounds: {outlierInfo.lowerBound} to {outlierInfo.upperBound}).
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Data Table */}
      <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Controls Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flex: 1, minWidth: '250px' }}>
            <Filter size={16} color="var(--text-muted)" />
            <input 
              type="text" 
              className="input-glass" 
              placeholder="Search values in dataset..." 
              value={searchTerm} 
              onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
            <span>Rows per page:</span>
            <select 
              className="select-glass" 
              style={{ width: 'auto', padding: '0.25rem 0.5rem' }} 
              value={pageSize} 
              onChange={e => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
            >
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={30}>30</option>
              <option value={50}>50</option>
            </select>
            <span>Showing {filteredData.length} records</span>
          </div>
        </div>

        {/* Table View */}
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                {columns.map(col => (
                  <th key={col}>
                    {col} <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>({colTypes[col]})</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, rIdx) => (
                <tr key={rIdx}>
                  <td style={{ color: 'var(--text-dim)' }}>{(currentPage - 1) * pageSize + rIdx + 1}</td>
                  {columns.map(col => (
                    <td key={col} style={{ fontFamily: colTypes[col] === 'numeric' ? 'var(--font-mono)' : 'inherit' }}>
                      {String(row[col] ?? '')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.5rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Page {currentPage} of {totalPages}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              className="btn btn-secondary btn-sm" 
              disabled={currentPage === 1} 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            >
              Previous
            </button>
            <button 
              className="btn btn-secondary btn-sm" 
              disabled={currentPage === totalPages} 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
