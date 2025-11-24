import { useState } from 'react';
import './BulkStatusEditor.css';

function BulkStatusEditor({ technologies, onBulkUpdate }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [newStatus, setNewStatus] = useState('not-started');
  const [filter, setFilter] = useState('all');

  // Фильтрация технологий
  const filteredTechnologies = technologies.filter(tech => {
    if (filter === 'all') return true;
    return tech.status === filter;
  });

  // Переключение выбора технологии
  const toggleSelection = (techId) => {
    setSelectedIds(prev => 
      prev.includes(techId)
        ? prev.filter(id => id !== techId)
        : [...prev, techId]
    );
  };

  // Выбор всех отфильтрованных
  const selectAll = () => {
    if (selectedIds.length === filteredTechnologies.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredTechnologies.map(tech => tech.id));
    }
  };

  // Применение массового изменения статуса
  const handleBulkUpdate = () => {
    if (selectedIds.length > 0 && onBulkUpdate) {
      onBulkUpdate(selectedIds, newStatus);
      setSelectedIds([]);
    }
  };

  // Получение статуса иконки
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return '✅';
      case 'in-progress': return '🔄';
      default: return '⏳';
    }
  };

  // Получение текста статуса
  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Завершено';
      case 'in-progress': return 'В процессе';
      default: return 'Не начато';
    }
  };

  return (
    <div className="bulk-status-editor">
      <h2>Массовое редактирование статусов</h2>

      {/* Фильтр и выбор */}
      <div className="bulk-controls">
        <div className="filter-group">
          <label htmlFor="status-filter">Фильтр по статусу:</label>
          <select
            id="status-filter"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setSelectedIds([]);
            }}
          >
            <option value="all">Все</option>
            <option value="not-started">Не начато</option>
            <option value="in-progress">В процессе</option>
            <option value="completed">Завершено</option>
          </select>
        </div>

        <div className="selection-info">
          <span>
            Выбрано: <strong>{selectedIds.length}</strong> из {filteredTechnologies.length}
          </span>
          <button
            onClick={selectAll}
            className="btn-select-all"
            disabled={filteredTechnologies.length === 0}
          >
            {selectedIds.length === filteredTechnologies.length ? 'Снять все' : 'Выбрать все'}
          </button>
        </div>
      </div>

      {/* Массовое изменение */}
      {selectedIds.length > 0 && (
        <div className="bulk-action-panel">
          <div className="action-controls">
            <label htmlFor="new-status">
              Изменить статус на:
            </label>
            <select
              id="new-status"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <option value="not-started">Не начато</option>
              <option value="in-progress">В процессе</option>
              <option value="completed">Завершено</option>
            </select>
            <button
              onClick={handleBulkUpdate}
              className="btn-apply"
            >
              Применить к {selectedIds.length} технологиям
            </button>
          </div>
        </div>
      )}

      {/* Список технологий */}
      <div className="technologies-list">
        {filteredTechnologies.length === 0 ? (
          <p className="empty-message">Нет технологий для отображения</p>
        ) : (
          filteredTechnologies.map(tech => (
            <div
              key={tech.id}
              className={`technology-row ${selectedIds.includes(tech.id) ? 'selected' : ''}`}
            >
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(tech.id)}
                  onChange={() => toggleSelection(tech.id)}
                  aria-label={`Выбрать ${tech.title}`}
                />
                <span className="checkmark"></span>
              </label>
              
              <div className="tech-info">
                <h4>{tech.title}</h4>
                <p>{tech.description}</p>
              </div>

              <div className={`current-status status-${tech.status}`}>
                <span className="status-icon">{getStatusIcon(tech.status)}</span>
                <span className="status-text">{getStatusText(tech.status)}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default BulkStatusEditor;

