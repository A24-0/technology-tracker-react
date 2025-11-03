import './ProgressHeader.css';

function ProgressHeader({ technologies }) {
  // статистика
  const totalCount = technologies.length;
  const completedCount = technologies.filter(tech => tech.status === 'completed').length;
  const progressPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // цвет прогресс-бара в зависимости от процента
  const getProgressColor = () => {
    if (progressPercentage === 0) return '#f44336';
    if (progressPercentage < 50) return '#ff9800';
    if (progressPercentage < 100) return '#2196f3';
    return '#4caf50';
  };

  return (
    <div className="progress-header">
      <div className="progress-stats">
        <div className="stat-item">
          <span className="stat-label">Всего технологий:</span>
          <span className="stat-value">{totalCount}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Изучено:</span>
          <span className="stat-value completed">{completedCount}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Прогресс:</span>
          <span className="stat-value">{progressPercentage}%</span>
        </div>
      </div>
      <div className="progress-bar-container">
        <div 
          className="progress-bar-fill" 
          style={{ 
            width: `${progressPercentage}%`,
            backgroundColor: getProgressColor()
          }}
        >
          <span className="progress-bar-text">{progressPercentage}%</span>
        </div>
      </div>
    </div>
  );
}

export default ProgressHeader;