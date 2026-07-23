import React, { useRef } from 'react';
import { UploadCloud, FileText, Database, CheckCircle2, AlertTriangle, ArrowRight, Layers, Sparkles } from 'lucide-react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { SAMPLE_DATASETS } from '../utils/sampleData';
import { getColumnTypes } from '../utils/dataProcessor';

export default function DataIngestView({ data, datasetInfo, onDataLoaded, onSelectPreset, onProceedToAnalysis }) {
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileExt = file.name.split('.').pop().toLowerCase();

    if (fileExt === 'csv' || fileExt === 'tsv') {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
          onDataLoaded({
            id: 'custom_upload_' + Date.now(),
            name: file.name,
            category: 'User Upload',
            description: `Uploaded CSV file with ${results.data.length} rows.`,
            data: results.data
          });
        }
      });
    } else if (fileExt === 'xlsx' || fileExt === 'xls') {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsName = wb.SheetNames[0];
        const ws = wb.Sheets[wsName];
        const parsed = XLSX.utils.sheet_to_json(ws);
        onDataLoaded({
          id: 'custom_excel_' + Date.now(),
          name: file.name,
          category: 'Excel File',
          description: `Uploaded Excel sheet "${wsName}" with ${parsed.length} rows.`,
          data: parsed
        });
      };
      reader.readAsBinaryString(file);
    } else if (fileExt === 'json') {
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const parsed = JSON.parse(evt.target.result);
          const dataArray = Array.isArray(parsed) ? parsed : [parsed];
          onDataLoaded({
            id: 'custom_json_' + Date.now(),
            name: file.name,
            category: 'JSON Object',
            description: `Uploaded JSON array with ${dataArray.length} items.`,
            data: dataArray
          });
        } catch (err) {
          alert('Invalid JSON file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  const colTypes = getColumnTypes(data);
  const totalRows = data.length;
  const colCount = Object.keys(colTypes).length;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Workflow Step Banner */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(30, 41, 59, 0.6)', padding: '0.875rem 1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: 'var(--primary-accent)', fontSize: '0.9rem' }}>
          <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--primary-accent)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>1</span>
          Upload & Select Dataset
        </div>
        <ArrowRight size={16} color="var(--text-dim)" />
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>2</span>
          Launch Full Analysis & Visualizations
        </div>
      </div>

      {/* Hero Ingestion Box */}
      <div className="glass-panel" style={{ padding: '2rem', background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <span className="badge badge-blue">Step 1 of 2</span>
              <span className="badge badge-purple">NexusData AI</span>
              <span className="badge badge-emerald">Created by Aditya Jassal</span>
            </div>
            <h2 className="title-gradient" style={{ fontSize: '1.9rem' }}>Upload Dataset to Start Analysis</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginTop: '0.3rem' }}>
              Select your local CSV, Excel, or JSON data file, or choose from standard sample datasets below.
            </p>
          </div>

          {/* Launch Analysis Button */}
          {totalRows > 0 && (
            <button 
              className="btn btn-emerald" 
              style={{ padding: '0.85rem 1.75rem', fontSize: '1rem', boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)' }}
              onClick={onProceedToAnalysis}
            >
              <Sparkles size={18} /> Launch Analysis Studio ({totalRows} Rows) <ArrowRight size={18} />
            </button>
          )}
        </div>

        {/* Drag Drop Quick Upload Box */}
        <div 
          onClick={() => fileInputRef.current?.click()}
          style={{
            border: '2px dashed rgba(59, 130, 246, 0.4)',
            borderRadius: 'var(--radius-lg)',
            padding: '2.25rem 2rem',
            textAlign: 'center',
            cursor: 'pointer',
            background: 'rgba(59, 130, 246, 0.04)',
            transition: 'all 0.2s ease'
          }}
          className="glass-panel-interactive"
        >
          <UploadCloud size={44} color="#60a5fa" style={{ marginBottom: '0.75rem' }} />
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white' }}>Click or Drag & Drop Your Dataset File Here</div>
          <div style={{ fontSize: '0.825rem', color: 'var(--text-dim)', marginTop: '0.4rem' }}>Supports CSV, TSV, XLSX, XLS, and JSON formats</div>
          <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}>
            Browse Computer Files
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            accept=".csv,.tsv,.xlsx,.xls,.json" 
            style={{ display: 'none' }} 
          />
        </div>
      </div>

      {/* Preset Datasets Section */}
      <div>
        <h3 style={{ fontSize: '1.15rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Database size={18} color="#c084fc" /> Or Select Sample Enterprise Dataset
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {SAMPLE_DATASETS.map(preset => {
            const isSelected = datasetInfo?.id === preset.id;
            return (
              <div
                key={preset.id}
                onClick={() => onSelectPreset(preset)}
                className={`glass-panel glass-panel-interactive`}
                style={{
                  padding: '1.25rem',
                  cursor: 'pointer',
                  borderColor: isSelected ? 'var(--primary-accent)' : 'var(--bg-card-border)',
                  background: isSelected ? 'rgba(59, 130, 246, 0.12)' : 'var(--bg-card)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <span className="badge badge-purple">{preset.category}</span>
                  {isSelected && <CheckCircle2 size={18} color="#34d399" />}
                </div>
                <h4 style={{ fontSize: '1.05rem', marginBottom: '0.4rem', color: 'white' }}>{preset.name}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4', marginBottom: '0.75rem' }}>
                  {preset.description}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                    <span>📊 {preset.data.length} Rows</span>
                    <span>•</span>
                    <span>📑 {Object.keys(preset.data[0] || {}).length} Cols</span>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--primary-accent)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    Select & Analyze <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Schema Profiler & Launch Footer */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Layers size={18} color="#34d399" /> Column Schema Preview
          </h3>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
              Total Rows: <strong style={{ color: 'white' }}>{totalRows}</strong> | Total Columns: <strong style={{ color: 'white' }}>{colCount}</strong>
            </div>
            {totalRows > 0 && (
              <button className="btn btn-emerald" onClick={onProceedToAnalysis}>
                Proceed to Analysis <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Column Name</th>
                <th>Inferred Data Type</th>
                <th>Sample Value</th>
                <th>Null / Missing Count</th>
                <th>Health Status</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(colTypes).map((col, idx) => {
                const sampleVal = data[0]?.[col] ?? 'N/A';
                const nullCount = data.filter(r => r[col] === null || r[col] === undefined || r[col] === '').length;
                const type = colTypes[col];

                return (
                  <tr key={col}>
                    <td style={{ color: 'var(--text-dim)' }}>{idx + 1}</td>
                    <td style={{ fontWeight: 600, color: 'white' }}>{col}</td>
                    <td>
                      <span className={`badge ${type === 'numeric' ? 'badge-blue' : type === 'date' ? 'badge-emerald' : 'badge-purple'}`}>
                        {type}
                      </span>
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#94a3b8' }}>
                      {String(sampleVal).length > 35 ? String(sampleVal).substring(0, 35) + '...' : String(sampleVal)}
                    </td>
                    <td style={{ color: nullCount > 0 ? '#fbbf24' : 'var(--text-muted)' }}>
                      {nullCount} {nullCount > 0 ? `(${((nullCount / totalRows) * 100).toFixed(1)}%)` : ''}
                    </td>
                    <td>
                      {nullCount === 0 ? (
                        <span style={{ color: '#34d399', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <CheckCircle2 size={14} /> Clean
                        </span>
                      ) : (
                        <span style={{ color: '#fbbf24', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <AlertTriangle size={14} /> Needs Cleaning
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
