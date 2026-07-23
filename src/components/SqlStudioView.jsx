import React, { useState } from 'react';
import { Terminal, Play, Code, Clock, Download, CheckCircle2, AlertTriangle } from 'lucide-react';
import { executeSqlQuery, QUICK_SQL_TEMPLATES } from '../utils/sqlEngine';
import { exportToCSV } from '../utils/exportUtils';

export default function SqlStudioView({ data }) {
  const [query, setQuery] = useState(QUICK_SQL_TEMPLATES[1].query);
  const [queryResult, setQueryResult] = useState(null);

  const handleRunQuery = () => {
    if (!query.trim()) return;
    const res = executeSqlQuery(data, query);
    setQueryResult(res);
  };

  const handleDownloadResult = () => {
    if (queryResult?.data) {
      exportToCSV(queryResult.data, 'sql_query_result.csv');
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 className="title-gradient" style={{ fontSize: '1.6rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Terminal size={24} color="#a78bfa" /> In-Browser SQL Query Engine
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.2rem' }}>
            Execute ANSI SQL queries (`dataset` table name) with group aggregations, window functions, and instant results.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-primary" onClick={handleRunQuery}>
            <Play size={16} /> Run SQL Query
          </button>
          {queryResult?.success && (
            <button className="btn btn-secondary" onClick={handleDownloadResult}>
              <Download size={16} /> Export CSV
            </button>
          )}
        </div>
      </div>

      {/* SQL Quick Templates */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Quick Snippets:</span>
        {QUICK_SQL_TEMPLATES.map((tmpl, idx) => (
          <button
            key={idx}
            className="btn btn-secondary btn-sm"
            onClick={() => setQuery(tmpl.query)}
            style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem' }}
          >
            <Code size={12} color="#60a5fa" /> {tmpl.name}
          </button>
        ))}
      </div>

      {/* Editor Panel */}
      <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            SQL Query Input:
          </label>
          <span className="badge badge-purple">Table Name: dataset</span>
        </div>

        <textarea
          value={query}
          onChange={e => setQuery(e.target.value)}
          rows={5}
          style={{
            width: '100%',
            background: '#070a12',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 'var(--radius-sm)',
            color: '#a78bfa',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.9rem',
            padding: '1rem',
            outline: 'none',
            resize: 'vertical'
          }}
          placeholder="SELECT * FROM dataset WHERE..."
        />
      </div>

      {/* Query Result Grid */}
      <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.05rem', color: 'white' }}>Execution Output Grid</h3>

          {queryResult && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {queryResult.success ? (
                <>
                  <span className="badge badge-emerald">
                    <CheckCircle2 size={12} /> Success
                  </span>
                  <span className="badge badge-blue">
                    <Clock size={12} /> {queryResult.executionTimeMs} ms
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Rows: {queryResult.rowCount}
                  </span>
                </>
              ) : (
                <span className="badge badge-amber" style={{ color: '#f43f5e', background: 'rgba(244, 63, 94, 0.15)' }}>
                  <AlertTriangle size={12} /> Query Error
                </span>
              )}
            </div>
          )}
        </div>

        {queryResult?.success ? (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  {queryResult.columns.map(col => (
                    <th key={col}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {queryResult.data.slice(0, 50).map((row, rIdx) => (
                  <tr key={rIdx}>
                    <td style={{ color: 'var(--text-dim)' }}>{rIdx + 1}</td>
                    {queryResult.columns.map(col => (
                      <td key={col} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.825rem' }}>
                        {String(row[col] ?? '')}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : queryResult?.error ? (
          <div style={{ padding: '1rem', background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.3)', borderRadius: 'var(--radius-sm)', color: '#f43f5e', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
            Error: {queryResult.error}
          </div>
        ) : (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.875rem' }}>
            Click "Run SQL Query" to execute the SQL command above.
          </div>
        )}
      </div>
    </div>
  );
}
