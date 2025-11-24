import { useState, useEffect } from 'react';
import './DeadlineForm.css';

function DeadlineForm({ technologies, onUpdateDeadline }) {
  const [selectedTech, setSelectedTech] = useState('');
  const [deadline, setDeadline] = useState('');
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  // Валидация формы
  useEffect(() => {
    const newErrors = {};

    if (!selectedTech) {
      newErrors.selectedTech = 'Выберите технологию';
    }

    if (deadline) {
      const deadlineDate = new Date(deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (deadlineDate < today) {
        newErrors.deadline = 'Дедлайн не может быть в прошлом';
      }
    }

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0 && selectedTech && deadline);
  }, [selectedTech, deadline]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isFormValid && onUpdateDeadline) {
      onUpdateDeadline(parseInt(selectedTech), deadline);
      setSelectedTech('');
      setDeadline('');
      setErrors({});
    }
  };

  const handleClearDeadline = (techId) => {
    if (onUpdateDeadline) {
      onUpdateDeadline(techId, '');
    }
  };

  return (
    <div className="deadline-form">
      <h2>Установка сроков изучения</h2>
      
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="selectedTech" className="required">
            Выберите технологию
          </label>
          <select
            id="selectedTech"
            value={selectedTech}
            onChange={(e) => setSelectedTech(e.target.value)}
            className={errors.selectedTech ? 'error' : ''}
            aria-describedby={errors.selectedTech ? 'tech-error' : undefined}
            required
          >
            <option value="">-- Выберите технологию --</option>
            {technologies.map(tech => (
              <option key={tech.id} value={tech.id}>
                {tech.title}
              </option>
            ))}
          </select>
          {errors.selectedTech && (
            <span id="tech-error" className="error-message" role="alert">
              {errors.selectedTech}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="deadline" className="required">
            Планируемая дата освоения
          </label>
          <input
            id="deadline"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className={errors.deadline ? 'error' : ''}
            aria-describedby={errors.deadline ? 'deadline-error' : undefined}
            required
          />
          {errors.deadline && (
            <span id="deadline-error" className="error-message" role="alert">
              {errors.deadline}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={!isFormValid}
          className="btn-primary"
        >
          Установить дедлайн
        </button>
      </form>

      {/* Список технологий с дедлайнами */}
      <div className="deadlines-list">
        <h3>Установленные дедлайны</h3>
        {technologies.filter(tech => tech.deadline).length === 0 ? (
          <p className="empty-message">Дедлайны не установлены</p>
        ) : (
          <div className="deadlines-grid">
            {technologies
              .filter(tech => tech.deadline)
              .map(tech => {
                const deadlineDate = new Date(tech.deadline);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const daysLeft = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
                const isOverdue = deadlineDate < today;

                return (
                  <div key={tech.id} className={`deadline-item ${isOverdue ? 'overdue' : ''}`}>
                    <div className="deadline-info">
                      <h4>{tech.title}</h4>
                      <p className="deadline-date">
                        {deadlineDate.toLocaleDateString('ru-RU', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                      <p className={`days-left ${isOverdue ? 'overdue' : daysLeft <= 7 ? 'warning' : ''}`}>
                        {isOverdue 
                          ? `Просрочено на ${Math.abs(daysLeft)} дн.`
                          : daysLeft === 0
                          ? 'Сегодня'
                          : `Осталось ${daysLeft} дн.`}
                      </p>
                    </div>
                    <button
                      onClick={() => handleClearDeadline(tech.id)}
                      className="btn-remove"
                      aria-label="Удалить дедлайн"
                    >
                      ×
                    </button>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}

export default DeadlineForm;

