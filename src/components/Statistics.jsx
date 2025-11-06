import './Statistics.css';

function Statistics({ technologies }) {
  const totalCount = technologies.length;
  const notStartedCount = technologies.filter(tech => tech.status === 'not-started').length;
  const inProgressCount = technologies.filter(tech => tech.status === 'in-progress').length;
  const completedCount = technologies.filter(tech => tech.status === 'completed').length;
  const progressPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="statistics">
      <h2>Статистика</h2>
      <div className="statistics-grid">
        <div className="stat-card stat-card--total">
          <div className="stat-card-icon">📊</div>
          <div className="stat-card-content">
            <div className="stat-card-label">Всего технологий</div>
            <div className="stat-card-value">{totalCount}</div>
          </div>
        </div>
        
        <div className="stat-card stat-card--not-started">
          <div className="stat-card-icon">❌</div>
          <div className="stat-card-content">
            <div className="stat-card-label">Не начато</div>
            <div className="stat-card-value">{notStartedCount}</div>
          </div>
        </div>
        
        <div className="stat-card stat-card--in-progress">
          <div className="stat-card-icon">⏳</div>
          <div className="stat-card-content">
            <div className="stat-card-label">В процессе</div>
            <div className="stat-card-value">{inProgressCount}</div>
          </div>
        </div>
        
        <div className="stat-card stat-card--completed">
          <div className="stat-card-icon">✅</div>
          <div className="stat-card-content">
            <div className="stat-card-label">Завершено</div>
            <div className="stat-card-value">{completedCount}</div>
          </div>
        </div>
        
        <div className="stat-card stat-card--progress">
          <div className="stat-card-icon">🎯</div>
          <div className="stat-card-content">
            <div className="stat-card-label">Прогресс</div>
            <div className="stat-card-value">{progressPercentage}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;

