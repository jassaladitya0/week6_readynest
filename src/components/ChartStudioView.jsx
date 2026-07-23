import React, { useState } from 'react';
import { 
  BarChart2, 
  LineChart as LineChartIcon, 
  PieChart as PieChartIcon, 
  Activity, 
  Layers, 
  Download, 
  Palette, 
  Settings 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
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
  Legend,
  ComposedChart
} from 'recharts';
import { getColumnTypes, groupAndAggregate } from '../utils/dataProcessor';
import { exportElementToPNG } from '../utils/exportUtils';

const COLOR_PALETTES = {
  cyberpunk: ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#06b6d4'],
  emerald: ['#10b981', '#34d399', '#059669', '#6ee7b7', '#047857', '#a7f3d0'],
  sunset: ['#f43f5e', '#fb923c', '#f59e0b', '#e11d48', '#d97706', '#be123c'],
  violet: ['#8b5cf6', '#a78bfa', '#c084fc', '#7c3aed', '#6d28d9', '#e879f9']
};

export default function ChartStudioView({ data }) {
  const colTypes = getColumnTypes(data);
  const columns = Object.keys(colTypes);
  const numericCols = columns.filter(c => colTypes[c] === 'numeric');
  const categoricalCols = columns.filter(c => colTypes[c] !== 'numeric');

  // Chart configuration state
  const [chartType, setChartType] = useState('bar');
  const [xAxisCol, setXAxisCol] = useState(categoricalCols[0] || columns[0] || '');
  const [yAxisCol, setYAxisCol] = useState(numericCols[0] || columns[1] || '');
  const [aggMethod, setAggMethod] = useState('sum');
  const [paletteKey, setPaletteKey] = useState('cyberpunk');
  const [showGrid, setShowGrid] = useState(true);

  const chartData = groupAndAggregate(data, xAxisCol, yAxisCol, aggMethod);
  const palette = COLOR_PALETTES[paletteKey];

  const handleDownloadPNG = () => {
    exportElementToPNG('chart-container-node', `${chartType}_chart_${xAxisCol}_vs_${yAxisCol}.png`);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-recharts-tooltip">
          <p className="label">{`${xAxisCol}: ${label}`}</p>
          <p style={{ color: payload[0].color || '#60a5fa', fontWeight: 600 }}>
            {`${yAxisCol} (${aggMethod.toUpperCase()}): ${payload[0].value.toLocaleString()}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 className="title-gradient" style={{ fontSize: '1.6rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <BarChart2 size={24} color="#38bdf8" /> Visual Chart Studio & Renderer
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.2rem' }}>
            Build high-impact 2D & 3D analytical charts with dynamic metrics, grouping, and color palettes.
          </p>
        </div>

        <button className="btn btn-primary" onClick={handleDownloadPNG}>
          <Download size={16} /> Export Chart PNG
        </button>
      </div>

      {/* Main Layout: Config Controls (Left) & Canvas (Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '1.5rem' }}>
        {/* Controls Sidebar */}
        <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <h3 style={{ fontSize: '1rem', borderBottom: '1px solid var(--bg-card-border)', paddingBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Settings size={16} color="#60a5fa" /> Chart Controls
          </h3>

          {/* Chart Type Selector */}
          <div>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>
              Chart Type:
            </label>
            <select className="select-glass" value={chartType} onChange={e => setChartType(e.target.value)}>
              <option value="bar">Bar Chart</option>
              <option value="line">Line Trend Chart</option>
              <option value="area">Smooth Area Chart</option>
              <option value="pie">Pie Chart</option>
              <option value="donut">Donut Chart</option>
              <option value="scatter">Scatter Plot</option>
              <option value="radar">Radar Spider Chart</option>
              <option value="composed">Composed Bar + Line</option>
            </select>
          </div>

          {/* X Axis Column */}
          <div>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>
              X-Axis / Category Dimension:
            </label>
            <select className="select-glass" value={xAxisCol} onChange={e => setXAxisCol(e.target.value)}>
              {columns.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Y Axis Column */}
          <div>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>
              Y-Axis Metric Column:
            </label>
            <select className="select-glass" value={yAxisCol} onChange={e => setYAxisCol(e.target.value)}>
              {columns.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Aggregation Function */}
          <div>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>
              Aggregation Function:
            </label>
            <select className="select-glass" value={aggMethod} onChange={e => setAggMethod(e.target.value)}>
              <option value="sum">Sum (Total)</option>
              <option value="avg">Average (Mean)</option>
              <option value="count">Count Records</option>
              <option value="min">Minimum Value</option>
              <option value="max">Maximum Value</option>
            </select>
          </div>

          {/* Color Palette Selector */}
          <div>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>
              Color Theme Palette:
            </label>
            <select className="select-glass" value={paletteKey} onChange={e => setPaletteKey(e.target.value)}>
              <option value="cyberpunk">Cyberpunk Neon</option>
              <option value="emerald">Emerald Mint</option>
              <option value="sunset">Sunset Gradient</option>
              <option value="violet">Royal Violet</option>
            </select>
          </div>

          {/* Grid Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Show Background Grid</span>
            <input 
              type="checkbox" 
              checked={showGrid} 
              onChange={e => setShowGrid(e.target.checked)}
              style={{ cursor: 'pointer' }}
            />
          </div>
        </div>

        {/* Chart Canvas Area */}
        <div id="chart-container-node" className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: '480px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', color: 'white' }}>
                {aggMethod.toUpperCase()} of {yAxisCol} by {xAxisCol}
              </h3>
              <span className="badge badge-purple" style={{ marginTop: '0.2rem' }}>
                {chartType.toUpperCase()} MODE
              </span>
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
              Data Points: {chartData.length}
            </div>
          </div>

          {/* Recharts Canvas */}
          <div style={{ flex: 1, width: '100%', minHeight: '380px' }}>
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'bar' ? (
                <BarChart data={chartData}>
                  {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />}
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={palette[index % palette.length]} />
                    ))}
                  </Bar>
                </BarChart>
              ) : chartType === 'line' ? (
                <LineChart data={chartData}>
                  {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />}
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="value" stroke={palette[0]} strokeWidth={3} dot={{ r: 5, fill: palette[0] }} />
                </LineChart>
              ) : chartType === 'area' ? (
                <AreaChart data={chartData}>
                  {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />}
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="value" stroke={palette[0]} fill={palette[0]} fillOpacity={0.3} strokeWidth={2} />
                </AreaChart>
              ) : chartType === 'pie' || chartType === 'donut' ? (
                <PieChart>
                  <Tooltip content={<CustomTooltip />} />
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={chartType === 'donut' ? 70 : 0}
                    outerRadius={120}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={palette[index % palette.length]} />
                    ))}
                  </Pie>
                </PieChart>
              ) : chartType === 'radar' ? (
                <RadarChart cx="50%" cy="50%" outerRadius={120} data={chartData}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                  <PolarRadiusAxis stroke="#94a3b8" />
                  <Radar name={yAxisCol} dataKey="value" stroke={palette[0]} fill={palette[0]} fillOpacity={0.5} />
                  <Tooltip content={<CustomTooltip />} />
                </RadarChart>
              ) : chartType === 'composed' ? (
                <ComposedChart data={chartData}>
                  {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />}
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" fill={palette[0]} radius={[6, 6, 0, 0]} />
                  <Line type="monotone" dataKey="value" stroke={palette[2]} strokeWidth={3} />
                </ComposedChart>
              ) : (
                <BarChart data={chartData}>
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" fill={palette[0]} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
