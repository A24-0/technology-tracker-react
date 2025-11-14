import { useState } from 'react';
import './QuickActions.css';
import Modal from './Modal';

function QuickActions({ onMarkAllCompleted, onResetAll, onRandomSelect, technologies }) {
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportData, setExportData] = useState('');

  const handleExport = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      technologies: technologies
    };
    const dataStr = JSON.stringify(data, null, 2);
    setExportData(dataStr);
    setShowExportModal(true);
    
    // Создаем ссылку для скачивания файла
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `tech-tracker-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(exportData).then(() => {
      alert('Данные скопированы в буфер обмена!');
    });
  };

  return (
    <div className="quick-actions">
      <h2>Быстрые действия</h2>
      <div className="quick-actions-buttons">
        <button 
          className="quick-action-btn quick-action-btn--complete"
          onClick={onMarkAllCompleted}
        >
          <span className="btn-icon">✅</span>
          <span className="btn-text">Отметить все как выполненные</span>
        </button>
        
        <button 
          className="quick-action-btn quick-action-btn--reset"
          onClick={onResetAll}
        >
          <span className="btn-icon">🔄</span>
          <span className="btn-text">Сбросить все статусы</span>
        </button>
        
        <button 
          className="quick-action-btn quick-action-btn--random"
          onClick={onRandomSelect}
        >
          <span className="btn-icon">🎲</span>
          <span className="btn-text">Случайный выбор следующей технологии</span>
        </button>

        <button 
          className="quick-action-btn quick-action-btn--export"
          onClick={handleExport}
        >
          <span className="btn-icon">📤</span>
          <span className="btn-text">Экспорт данных</span>
        </button>
      </div>

      <Modal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Экспорт данных"
      >
        <div className="export-modal-content">
          <p>Данные успешно подготовлены для экспорта!</p>
          <p>Файл был автоматически скачан. Вы также можете скопировать данные в буфер обмена.</p>
          <div className="export-actions">
            <button onClick={copyToClipboard} className="btn btn-primary">
              📋 Копировать в буфер обмена
            </button>
            <button onClick={() => setShowExportModal(false)} className="btn btn-secondary">
              Закрыть
            </button>
          </div>
          <details className="export-data-preview">
            <summary>Просмотр данных (JSON)</summary>
            <pre>{exportData}</pre>
          </details>
        </div>
      </Modal>
    </div>
  );
}

export default QuickActions;

