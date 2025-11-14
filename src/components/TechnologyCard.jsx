import './TechnologyCard.css';
import TechnologyNotes from './TechnologyNotes';

function TechnologyCard({ id, title, description, status, notes, onStatusChange, onNotesChange }) {
  const getStatusIcon = () => {
    if (status === 'completed') return '✅';
    if (status === 'in-progress') return '⏳';
    if (status === 'not-started') return '❌';
    return '';
  };

  const getStatusText = () => {
    if (status === 'completed') return 'Завершено';
    if (status === 'in-progress') return 'В процессе';
    if (status === 'not-started') return 'Не начато';
    return status;
  };

  const handleClick = (e) => {
    // Не меняем статус при клике на заметки
    if (e.target.closest('.notes-section')) {
      return;
    }
    if (onStatusChange) {
      onStatusChange(id);
    }
  };

  return (
    <div 
      className={`technology-card technology-card--${status}`}
      onClick={handleClick}
    >
      <div className="technology-info">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="status-indicator">
          <span className="status-icon">{getStatusIcon()}</span>
          <span className="status-text">{getStatusText()}</span>
        </div>
        <TechnologyNotes 
          notes={notes || ''} 
          onNotesChange={onNotesChange} 
          techId={id} 
        />
      </div>
    </div>
  );
}

export default TechnologyCard;