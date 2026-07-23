import React from 'react';
import { 
  BarChart3, 
  Upload, 
  Download, 
  Database, 
  Sparkles, 
  Maximize2, 
  CheckCircle2, 
  Layers
} from 'lucide-react';
import { SAMPLE_DATASETS } from '../utils/sampleData';

export default function Navbar({ 
  currentDataset, 
  onSelectDataset, 
  onOpenFileUploadModal, 
  onOpenExportModal,
  onToggleFullscreen,
  activeView,
  rowCount
}) {
  return (
    <header className="header-bar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <a href="#" className="brand-logo">
          <div className="logo-icon-box">
            <BarChart3 size={22} color="white" />
          </div>
          <div>
            <span style={{ fontSize: '1.2rem' }}>DataPulse</span>
            <span className="title-accent-gradient" style={{ fontSize: '1.2rem', marginLeft: '0.3rem' }}>AI Studio</span>
          </div>
        </a>

        {/* Dataset Selector Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(30, 41, 59, 0.6)', padding: '0.4rem 0.8rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <Database size={16} color="#60a5fa" />
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Active Data:</span>
          <select 
            className="select-glass" 
            style={{ width: 'auto', padding: '0.2rem 0.5rem', fontSize: '0.825rem', border: 'none', background: 'transparent' }}
            value={currentDataset?.id || ''}
            onChange={(e) => {
              const selected = SAMPLE_DATASETS.find(d => d.id === e.target.value);
              if (selected) onSelectDataset(selected);
            }}
          >
            {SAMPLE_DATASETS.map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
          <span className="badge badge-blue">
            <CheckCircle2 size={12} /> {rowCount} Rows
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button className="btn btn-secondary" onClick={onOpenFileUploadModal}>
          <Upload size={16} /> Import Dataset
        </button>

        <button className="btn btn-emerald" onClick={onOpenExportModal}>
          <Download size={16} /> Export Report
        </button>

        <button className="btn btn-ghost btn-icon" onClick={onToggleFullscreen} title="Toggle Fullscreen">
          <Maximize2 size={18} />
        </button>
      </div>
    </header>
  );
}
