import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import DataIngestView from './components/DataIngestView';
import DataWranglerView from './components/DataWranglerView';
import ChartStudioView from './components/ChartStudioView';
import SqlStudioView from './components/SqlStudioView';
import StatStudioView from './components/StatStudioView';
import PivotStudioView from './components/PivotStudioView';
import AiInsightsView from './components/AiInsightsView';
import DashboardView from './components/DashboardView';
import ExportModal from './components/ExportModal';
import { SAMPLE_DATASETS } from './utils/sampleData';

export default function App() {
  const [activeView, setActiveView] = useState('ingest');
  const [currentDatasetInfo, setCurrentDatasetInfo] = useState(SAMPLE_DATASETS[0]);
  const [dataset, setDataset] = useState(SAMPLE_DATASETS[0].data);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Switch preset dataset
  const handleSelectPreset = (preset) => {
    setCurrentDatasetInfo(preset);
    setDataset(preset.data);
  };

  // Update working dataset (from cleaning or upload)
  const handleUpdateData = (newData) => {
    setDataset(newData);
  };

  // Custom data loaded from file uploader
  const handleCustomDataLoaded = (newPresetObj) => {
    setCurrentDatasetInfo(newPresetObj);
    setDataset(newPresetObj.data);
    setActiveView('wrangler');
  };

  // Reset dataset back to preset default
  const handleResetData = () => {
    const original = SAMPLE_DATASETS.find(d => d.id === currentDatasetInfo.id);
    if (original) {
      setDataset(original.data);
    }
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Navbar
        currentDataset={currentDatasetInfo}
        onSelectDataset={handleSelectPreset}
        onOpenFileUploadModal={() => setActiveView('ingest')}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        onToggleFullscreen={handleToggleFullscreen}
        activeView={activeView}
        rowCount={dataset.length}
      />

      {/* Main Body */}
      <div className="main-body">
        {/* Navigation Sidebar */}
        <Sidebar activeView={activeView} setActiveView={setActiveView} />

        {/* Dynamic Content Viewport */}
        <main className="content-viewport">
          {activeView === 'dashboard' && (
            <DashboardView data={dataset} datasetName={currentDatasetInfo.name} />
          )}

          {activeView === 'ingest' && (
            <DataIngestView
              data={dataset}
              datasetInfo={currentDatasetInfo}
              onDataLoaded={handleCustomDataLoaded}
              onSelectPreset={handleSelectPreset}
            />
          )}

          {activeView === 'wrangler' && (
            <DataWranglerView
              data={dataset}
              onUpdateData={handleUpdateData}
              onResetData={handleResetData}
            />
          )}

          {activeView === 'chartStudio' && (
            <ChartStudioView data={dataset} />
          )}

          {activeView === 'sqlStudio' && (
            <SqlStudioView data={dataset} />
          )}

          {activeView === 'statStudio' && (
            <StatStudioView data={dataset} />
          )}

          {activeView === 'pivotStudio' && (
            <PivotStudioView data={dataset} />
          )}

          {activeView === 'aiInsights' && (
            <AiInsightsView data={dataset} datasetName={currentDatasetInfo.name} />
          )}
        </main>
      </div>

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        data={dataset}
        datasetName={currentDatasetInfo.name}
      />
    </div>
  );
}
