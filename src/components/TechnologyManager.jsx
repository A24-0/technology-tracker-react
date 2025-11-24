import { useState } from 'react';
import TechnologyForm from './TechnologyForm';
import './TechnologyManager.css';

function TechnologyManager() {
  const [technologies, setTechnologies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTech, setEditingTech] = useState(null);

  // Обработчик сохранения технологии
  const handleSaveTechnology = (techData) => {
    if (editingTech) {
      // Редактирование существующей технологии
      setTechnologies(prev => 
        prev.map(tech => 
          tech.id === editingTech.id 
            ? { ...tech, ...techData, updatedAt: new Date().toISOString() }
            : tech
        )
      );
    } else {
      // Добавление новой технологии
      const newTechnology = {
        id: Date.now(), // В реальном приложении ID генерируется на сервере
        ...techData,
        status: 'not-started',
        createdAt: new Date().toISOString(),
        notes: '',
        progress: 0
      };
      setTechnologies(prev => [...prev, newTechnology]);
    }
    
    // Закрываем форму после сохранения
    setShowForm(false);
    setEditingTech(null);
  };

  // Обработчик редактирования
  const handleEdit = (technology) => {
    setEditingTech(technology);
    setShowForm(true);
  };

  // Обработчик отмены
  const handleCancel = () => {
    setShowForm(false);
    setEditingTech(null);
  };

  return (
    <div className="technology-manager">
      <div className="manager-header">
        <h2>Управление технологиями</h2>
        <button 
          onClick={() => setShowForm(true)}
          className="btn-primary"
        >
          + Добавить технологию
        </button>
      </div>

      {/* Список технологий */}
      <div className="technologies-list">
        {technologies.length === 0 ? (
          <p className="empty-message">Технологий пока нет. Добавьте первую!</p>
        ) : (
          technologies.map(tech => (
            <div key={tech.id} className="technology-item">
              <div className="tech-content">
                <h3>{tech.title}</h3>
                <p>{tech.description}</p>
                <div className="tech-meta">
                  <span className="tech-category">{tech.category}</span>
                  <span className={`tech-status tech-status-${tech.status}`}>
                    {tech.status === 'completed' ? '✅ Завершено' :
                     tech.status === 'in-progress' ? '🔄 В процессе' : '⏳ Не начато'}
                  </span>
                </div>
              </div>
              <div className="tech-actions">
                <button onClick={() => handleEdit(tech)} className="btn-edit">
                  Редактировать
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Форма добавления/редактирования */}
      {showForm && (
        <div className="form-modal">
          <div className="modal-content">
            <TechnologyForm
              onSave={handleSaveTechnology}
              onCancel={handleCancel}
              initialData={editingTech || {}}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default TechnologyManager;

