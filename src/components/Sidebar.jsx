import React from 'react';
import { 
  Database, 
  TableProperties, 
  BarChart2, 
  Terminal, 
  Calculator, 
  Grid, 
  Sparkles, 
  LayoutDashboard,
  Code2
} from 'lucide-react';

export const VIEWS = [
  { id: 'ingest', name: 'Data Ingestion', icon: Database, badge: 'Import' },
  { id: 'dashboard', name: 'Executive Dashboard', icon: LayoutDashboard, badge: 'KPI' },
  { id: 'wrangler', name: 'Data Wrangler', icon: TableProperties, badge: 'Clean' },
  { id: 'chartStudio', name: 'Visual Chart Studio', icon: BarChart2, badge: '12+ Charts' },
  { id: 'sqlStudio', name: 'SQL Query Studio', icon: Terminal, badge: 'SQL' },
  { id: 'statStudio', name: 'Stats & Correlation', icon: Calculator, badge: 'Math' },
  { id: 'pivotStudio', name: 'Pivot Table Engine', icon: Grid, badge: 'Pivot' },
  { id: 'aiInsights', name: 'Automated AI Insights', icon: Sparkles, badge: 'AI' },
];

export default function Sidebar({ activeView, setActiveView }) {
  return (
    <aside className="sidebar-container">
      <div style={{ padding: '0.5rem 0.5rem 1rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-dim)', letterSpacing: '0.08em' }}>
        Analysis Workspace
      </div>
      {VIEWS.map(view => {
        const Icon = view.icon;
        const isActive = activeView === view.id;
        return (
          <button
            key={view.id}
            className={`nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setActiveView(view.id)}
          >
            <Icon size={18} color={isActive ? '#60a5fa' : '#94a3b8'} />
            <span style={{ flex: 1, textAlign: 'left' }}>{view.name}</span>
            {view.badge && (
              <span className={`badge ${isActive ? 'badge-blue' : 'badge-purple'}`} style={{ fontSize: '0.65rem', padding: '0.15rem 0.45rem' }}>
                {view.badge}
              </span>
            )}
          </button>
        );
      })}

      <div style={{ marginTop: 'auto', padding: '1rem', background: 'rgba(30, 41, 59, 0.5)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
          <Code2 size={16} color="#60a5fa" />
          <span style={{ fontSize: '0.825rem', fontWeight: 700, color: 'white' }}>NexusData AI</span>
        </div>
        <p style={{ fontSize: '0.75rem', color: '#94a3b8', lineHeight: '1.4' }}>
          Designed & Developed by <strong style={{ color: '#34d399' }}>Aditya Jassal</strong>
        </p>
      </div>
    </aside>
  );
}
