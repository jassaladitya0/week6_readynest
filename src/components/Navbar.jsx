import React from 'react';
import { 
  BarChart3, 
  Upload, 
  Download, 
  Database, 
  CheckCircle2, 
  Maximize2,
  Sparkles
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <a href="#" className="brand-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div className="logo-icon-box" style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', padding: '0.4rem', borderRadius: '8px' }}>
            <BarChart3 size={22} color="white" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white', letterSpacing: '-0.02em' }}>NexusData</span>
              <span className="title-accent-gradient" style={{ fontSize: '1.25rem', fontWeight: 800 }}>AI</span>
            </div>
            <div style={{ fontSize: '0.65rem', color: '#94a3b8', marginTop: '-0.2rem', fontWeight: 500 }}>
              Created by <strong style={{ color: '#60a5fa' }}>Aditya Jassal</strong>
            </div>
          </div>
        </a>

        {/* Dataset Selector Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(30, 41, 59, 0.6)', padding: '0.4rem 0.8rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <Database size={16} color="#60a5fa" />
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Active Dataset:</span>
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
            <CheckCircle2 size={12} /> {rowCount} Records
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button className="btn btn-secondary" onClick={onOpenFileUploadModal}>
          <Upload size={16} /> Import Data
        </button>

        <button className="btn btn-emerald" onClick={onOpenExportModal}>
          <Download size={16} /> Export PDF Report
        </button>

        <button className="btn btn-ghost btn-icon" onClick={onToggleFullscreen} title="Toggle Fullscreen">
          <Maximize2 size={18} />
        </button>
      </div>
    </header>
  );
}
