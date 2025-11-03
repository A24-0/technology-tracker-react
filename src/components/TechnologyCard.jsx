import './TechnologyCard.css';

function TechnologyCard({ title, description, status }) {
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

  return (
    <div className={`technology-card technology-card--${status}`}>
      <div className="technology-info">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="status-indicator">
          <span className="status-icon">{getStatusIcon()}</span>
          <span className="status-text">{getStatusText()}</span>
        </div>
      </div>
    </div>
  );
}

export default TechnologyCard;