import React, { useState } from 'react';
import { Sparkles, Search, Lightbulb, TrendingUp, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';
import { generateAiInsights, parseNaturalLanguageQuery } from '../utils/aiInsightEngine';

export default function AiInsightsView({ data, datasetName }) {
  const [nlQuery, setNlQuery] = useState('');
  const [nlResult, setNlResult] = useState(null);

  const insights = generateAiInsights(data, datasetName);

  const handleNlSearch = (e) => {
    e.preventDefault();
    if (!nlQuery.trim()) return;
    const res = parseNaturalLanguageQuery(nlQuery, data);
    setNlResult(res);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div>
        <h2 className="title-gradient" style={{ fontSize: '1.6rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Sparkles size={24} color="#c084fc" /> Automated AI Insights & Anomaly Generator
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.2rem' }}>
          Algorithmic data mining for statistical patterns, distribution anomalies, and natural language Q&A.
        </p>
      </div>

      {/* Natural Language Search Bar */}
      <div className="glass-panel" style={{ padding: '1.25rem' }}>
        <form onSubmit={handleNlSearch} style={{ display: 'flex', gap: '0.75rem' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
            <input
              type="text"
              className="input-glass"
              style={{ paddingLeft: '2.5rem' }}
              placeholder='Ask AI analyst (e.g. "Show top 5 highest values", "What is average profit?")...'
              value={nlQuery}
              onChange={e => setNlQuery(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            <Sparkles size={16} /> Ask AI
          </button>
        </form>

        {nlResult && (
          <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: 'var(--radius-sm)', color: 'white', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, marginBottom: '0.4rem', color: '#c084fc' }}>
              <Lightbulb size={16} /> AI Answer:
            </div>
            <p>{nlResult.answer}</p>
            {nlResult.resultData && (
              <div style={{ marginTop: '0.75rem' }} className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      {Object.keys(nlResult.resultData[0] || {}).map(k => <th key={k}>{k}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {nlResult.resultData.map((row, idx) => (
                      <tr key={idx}>
                        {Object.keys(row).map(k => <td key={k}>{String(row[k])}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* AI Generated Insight Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.25rem' }}>
        {insights.map(item => (
          <div
            key={item.id}
            className="glass-panel glass-panel-interactive"
            style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className={`badge ${item.type === 'warning' ? 'badge-amber' : item.type === 'insight' ? 'badge-emerald' : 'badge-blue'}`}>
                {item.badge}
              </span>
              <Sparkles size={16} color="var(--text-dim)" />
            </div>

            <h3 style={{ fontSize: '1.1rem', color: 'white' }}>{item.title}</h3>

            <p 
              style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}
              dangerouslySetInnerHTML={{ __html: item.description.replace(/\*\*(.*?)\*\*/g, '<strong style="color: white">$1</strong>') }}
            />

            <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.775rem', color: '#60a5fa' }}>
              <ArrowRight size={14} /> <span>{item.recommendation}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
