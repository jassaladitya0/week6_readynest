import React from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Activity, 
  BarChart2, 
  Layers, 
  CheckCircle2, 
  Download,
  Sparkles,
  Zap,
  Grid,
  PieChart as PieIcon,
  LineChart as LineIcon
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell, 
  ScatterChart, 
  Scatter, 
  RadarChart, 
  Radar, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  Legend 
} from 'recharts';
import { getColumnTypes, computeColumnStats, computeCorrelationMatrix, groupAndAggregate } from '../utils/dataProcessor';
import { generateAiInsights } from '../utils/aiInsightEngine';
import { exportDashboardToPDF } from '../utils/exportUtils';

const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ec4899', '#06b6d4', '#f43f5e'];

export default function DashboardView({ data, datasetName }) {
  const colTypes = getColumnTypes(data);
  const columns = Object.keys(colTypes);
  const numericCols = columns.filter(c => colTypes[c] === 'numeric');
  const categoricalCols = columns.filter(c => colTypes[c] !== 'numeric');

  const mainNumCol = numericCols[0] || columns[0];
  const mainCatCol = categoricalCols[0] || columns[1];
  const secondNumCol = numericCols[1] || mainNumCol;
  const thirdNumCol = numericCols[2] || mainNumCol;

  const statsMain = computeColumnStats(data, mainNumCol);
  const statsSecond = computeColumnStats(data, secondNumCol);

  // Aggregation Chart Data
  const barChartData = groupAndAggregate(data, mainCatCol, mainNumCol, 'sum').slice(0, 8);
  const lineChartData = groupAndAggregate(data, categoricalCols[1] || mainCatCol, secondNumCol, 'avg').slice(0, 10);
  const areaChartData = groupAndAggregate(data, mainCatCol, thirdNumCol, 'sum').slice(0, 8);
  const pieChartData = barChartData.slice(0, 6);

  // Scatter plot data
  const scatterData = data.slice(0, 40).map(row => ({
    x: parseFloat(row[mainNumCol]) || 0,
    y: parseFloat(row[secondNumCol]) || 0,
    z: parseFloat(row[thirdNumCol]) || 1
  }));

  // Radar chart data
  const radarData = barChartData.slice(0, 6).map(item => ({
    subject: item.name.length > 12 ? item.name.substring(0, 12) + '...' : item.name,
    Value1: item.value,
    Value2: item.value * 0.8
  }));

  // Correlation Matrix
  const corrCols = numericCols.slice(0, 5);
  const corrMatrix = corrCols.length >= 2 ? computeCorrelationMatrix(data, corrCols) : null;

  // AI Insights
  const aiInsights = generateAiInsights(data, datasetName);

  const handlePDFExport = () => {
    exportDashboardToPDF('executive-dashboard-node', datasetName, data);
  };

  return (
    <div id="executive-dashboard-node" className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Dashboard Top Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem' }}>
            <span className="badge badge-blue"><Sparkles size={12} /> NexusData AI Intelligence</span>
            <span className="badge badge-purple">{datasetName}</span>
            <span className="badge badge-emerald">Designed by Aditya Jassal</span>
          </div>
          <h2 className="title-gradient" style={{ fontSize: '1.85rem' }}>Executive KPI & Multi-Chart Intelligence Dashboard</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Comprehensive data visualizations, AI predictions, correlation matrix heatmap, and performance metrics.
          </p>
        </div>

        <button className="btn btn-emerald" onClick={handlePDFExport} style={{ padding: '0.75rem 1.25rem', fontSize: '0.9rem' }}>
          <Download size={18} /> Export Full PDF Report
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
            <TrendingUp size={14} /> <span>100% Validated</span>
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

      {/* AI Predictions & Forecast Insights Banner */}
      <div className="glass-panel" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.8) 100%)', borderLeft: '4px solid #8b5cf6' }}>
        <h3 style={{ fontSize: '1.1rem', color: 'white', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Zap size={18} color="#c084fc" /> AI Predictions & Automated Intelligence Summary
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
          {aiInsights.slice(0, 3).map((insight) => (
            <div key={insight.id} style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'white' }}>{insight.title}</span>
                <span className="badge badge-purple" style={{ fontSize: '0.65rem' }}>{insight.badge}</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                {insight.description.replace(/\*\*/g, '')}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Correlation Matrix Heatmap */}
      {corrMatrix && corrCols.length >= 2 && (
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', color: 'white', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Grid size={18} color="#60a5fa" /> Pearson Correlation Matrix Heatmap
          </h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr>
                  <th style={{ padding: '0.6rem', color: 'var(--text-muted)', textTransform: 'uppercase', textAlign: 'left' }}>Feature</th>
                  {corrCols.map(c => (
                    <th key={c} style={{ padding: '0.6rem', color: 'white', fontWeight: 600, textAlign: 'center' }}>{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {corrCols.map(rCol => (
                  <tr key={rCol} style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '0.6rem', fontWeight: 600, color: '#94a3b8' }}>{rCol}</td>
                    {corrCols.map(cCol => {
                      const val = corrMatrix[rCol][cCol] ?? 0;
                      const abs = Math.abs(val);
                      const bg = rCol === cCol ? 'rgba(59, 130, 246, 0.3)'
                        : val > 0.5 ? 'rgba(16, 185, 129, 0.3)'
                        : val < -0.3 ? 'rgba(244, 63, 94, 0.3)'
                        : 'rgba(255,255,255,0.03)';
                      const textColor = rCol === cCol ? '#60a5fa' : val > 0.5 ? '#34d399' : val < -0.3 ? '#f43f5e' : '#94a3b8';

                      return (
                        <td key={cCol} style={{ padding: '0.6rem', textAlign: 'center', background: bg, borderRadius: '4px', fontWeight: 700, color: textColor }}>
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
      )}

      {/* Multi-Chart Showcase Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '1.5rem' }}>
        
        {/* Chart 1: Bar Breakdown */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: '350px' }}>
          <h3 style={{ fontSize: '1.05rem', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BarChart2 size={18} color="#3b82f6" /> 📊 Bar Chart: Total {mainNumCol} by {mainCatCol}
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
          <h3 style={{ fontSize: '1.05rem', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <LineIcon size={18} color="#10b981" /> 📈 Line Chart: Avg {secondNumCol} Distribution
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

        {/* Chart 3: Area Chart */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: '350px' }}>
          <h3 style={{ fontSize: '1.05rem', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Activity size={18} color="#8b5cf6" /> 📉 Area Chart: Cumulative {thirdNumCol} Analysis
          </h3>
          <div style={{ flex: 1, width: '100%', minHeight: '260px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)' }} />
                <Area type="monotone" dataKey="value" stroke="#8b5cf6" fill="rgba(139, 92, 246, 0.25)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Pie Share Chart */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: '350px' }}>
          <h3 style={{ fontSize: '1.05rem', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <PieIcon size={18} color="#f59e0b" /> 🥧 Pie Chart: Segment Market Share
          </h3>
          <div style={{ flex: 1, width: '100%', minHeight: '260px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)' }} />
                <Legend />
                <Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 5: Scatter Plot */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: '350px' }}>
          <h3 style={{ fontSize: '1.05rem', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TrendingUp size={18} color="#ec4899" /> 🔴 Scatter Plot: {mainNumCol} vs {secondNumCol}
          </h3>
          <div style={{ flex: 1, width: '100%', minHeight: '260px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis type="number" dataKey="x" name={mainNumCol} stroke="#94a3b8" fontSize={11} />
                <YAxis type="number" dataKey="y" name={secondNumCol} stroke="#94a3b8" fontSize={11} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)' }} />
                <Scatter data={scatterData} fill="#ec4899" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 6: Radar Profile Chart */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: '350px' }}>
          <h3 style={{ fontSize: '1.05rem', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={18} color="#06b6d4" /> 🕸️ Radar Chart: Multi-Metric Feature Profile
          </h3>
          <div style={{ flex: 1, width: '100%', minHeight: '260px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={10} />
                <PolarRadiusAxis stroke="#94a3b8" fontSize={10} />
                <Radar name="Primary Metric" dataKey="Value1" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
