import './QuickActions.css';

function QuickActions({ onMarkAllCompleted, onResetAll, onRandomSelect }) {
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
      </div>
    </div>
  );
}

export default QuickActions;

