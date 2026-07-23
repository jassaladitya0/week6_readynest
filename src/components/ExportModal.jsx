import React from 'react';
import { X, FileText, Table, Code, FileSpreadsheet } from 'lucide-react';
import { exportToCSV, exportToExcel, exportToJSON, exportDashboardToPDF } from '../utils/exportUtils';

export default function ExportModal({ isOpen, onClose, data, datasetName }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100
    }}>
      <div className="glass-panel" style={{ width: '450px', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.2rem', color: 'white' }}>Export Data & Analysis Reports</h3>
          <button className="btn btn-ghost btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Choose your desired export format for dataset <strong>"{datasetName}"</strong> ({data.length} records):
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <button 
            className="btn btn-secondary" 
            style={{ justifyContent: 'flex-start', padding: '0.8rem 1rem' }}
            onClick={() => { exportToCSV(data, `${datasetName.toLowerCase().replace(/\s+/g, '_')}.csv`); onClose(); }}
          >
            <Table size={18} color="#60a5fa" /> Export as Clean CSV (.csv)
          </button>

          <button 
            className="btn btn-secondary" 
            style={{ justifyContent: 'flex-start', padding: '0.8rem 1rem' }}
            onClick={() => { exportToExcel(data, `${datasetName.toLowerCase().replace(/\s+/g, '_')}.xlsx`); onClose(); }}
          >
            <FileSpreadsheet size={18} color="#34d399" /> Export as Excel Workbook (.xlsx)
          </button>

          <button 
            className="btn btn-secondary" 
            style={{ justifyContent: 'flex-start', padding: '0.8rem 1rem' }}
            onClick={() => { exportToJSON(data, `${datasetName.toLowerCase().replace(/\s+/g, '_')}.json`); onClose(); }}
          >
            <Code size={18} color="#c084fc" /> Export as JSON File (.json)
          </button>

          <button 
            className="btn btn-emerald" 
            style={{ justifyContent: 'flex-start', padding: '0.8rem 1rem' }}
            onClick={() => { exportDashboardToPDF('executive-dashboard-node', `${datasetName}_Report`); onClose(); }}
          >
            <FileText size={18} color="white" /> Generate Executive PDF Report (.pdf)
          </button>
        </div>
      </div>
    </div>
  );
}
