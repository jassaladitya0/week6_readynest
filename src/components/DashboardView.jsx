import React from 'react';
import { LayoutDashboard, TrendingUp, DollarSign, Users, Activity, BarChart2, Layers, CheckCircle2, Download } from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';
import { getColumnTypes, computeColumnStats, groupAndAggregate } from '../utils/dataProcessor';
import { exportDashboardToPDF } from '../utils/exportUtils';

export default function DashboardView({ data, datasetName }) {
  const colTypes = getColumnTypes(data);
  const columns = Object.keys(colTypes);
  const numericCols = columns.filter(c => colTypes[c] === 'numeric');
  const categoricalCols = columns.filter(c => colTypes[c] !== 'numeric');

  const mainNumCol = numericCols[0] || columns[0];
  const mainCatCol = categoricalCols[0] || columns[1];
  const secondNumCol = numericCols[1] || mainNumCol;

  const statsMain = computeColumnStats(data, mainNumCol);
  const statsSecond = computeColumnStats(data, secondNumCol);

  const barChartData = groupAndAggregate(data, mainCatCol, mainNumCol, 'sum').slice(0, 8);
  const lineChartData = groupAndAggregate(data, categoricalCols[1] || mainCatCol, secondNumCol, 'avg').slice(0, 10);

  const handlePDFExport = () => {
    exportDashboardToPDF('executive-dashboard-node', datasetName, data);
  };

  return (
    <div id="executive-dashboard-node" className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Dashboard Top Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
            <span className="badge badge-emerald"><CheckCircle2 size={12} /> Live Executive Analytics</span>
            <span className="badge badge-purple">{datasetName}</span>
          </div>
          <h2 className="title-gradient" style={{ fontSize: '1.75rem' }}>Executive KPI & Analytics Dashboard</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            High-level performance indicators, regional breakdowns, and executive charts.
          </p>
        </div>

        <button className="btn btn-emerald" onClick={handlePDFExport}>
          <Download size={16} /> Export PDF Report
        </button>
      </div>

      {/* KPI Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
        {/* KPI 1 */}
        <div className="glass-panel kpi-card glass-panel-interactive">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="kpi-title">Total Records</span>
            <Layers size={18} color="#60a5fa" />
          </div>
          <div className="kpi-value">{data.length.toLocaleString()}</div>
          <div className="kpi-trend" style={{ color: '#34d399' }}>
            <TrendingUp size={14} /> <span>100% Ingested</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="glass-panel kpi-card glass-panel-interactive">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="kpi-title">Total {mainNumCol}</span>
            <DollarSign size={18} color="#34d399" />
          </div>
          <div className="kpi-value">{statsMain.sum.toLocaleString()}</div>
          <div className="kpi-trend" style={{ color: '#60a5fa' }}>
            <span>Avg: {statsMain.mean}</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="glass-panel kpi-card glass-panel-interactive">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="kpi-title">Avg {secondNumCol}</span>
            <Activity size={18} color="#c084fc" />
          </div>
          <div className="kpi-value">{statsSecond.mean.toLocaleString()}</div>
          <div className="kpi-trend" style={{ color: '#fbbf24' }}>
            <span>Median: {statsSecond.median}</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="glass-panel kpi-card glass-panel-interactive">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="kpi-title">Unique {mainCatCol}s</span>
            <Users size={18} color="#f43f5e" />
          </div>
          <div className="kpi-value">{barChartData.length}</div>
          <div className="kpi-trend" style={{ color: '#34d399' }}>
            <span>Clean Schema</span>
          </div>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '1.5rem' }}>
        {/* Chart 1: Bar Breakdown */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: '350px' }}>
          <h3 style={{ fontSize: '1.05rem', color: 'white' }}>
            Total {mainNumCol} by {mainCatCol}
          </h3>
          <div style={{ flex: 1, width: '100%', minHeight: '260px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)' }} />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Line Trend */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: '350px' }}>
          <h3 style={{ fontSize: '1.05rem', color: 'white' }}>
            Average {secondNumCol} Distribution
          </h3>
          <div style={{ flex: 1, width: '100%', minHeight: '260px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)' }} />
                <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
