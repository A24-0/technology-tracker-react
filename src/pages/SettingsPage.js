import UserSettings from '../components/UserSettings';

function SettingsPage({ onResetAll, onMarkAllCompleted }) {
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="badge">Защищённый маршрут</p>
          <h1>Настройки приложения</h1>
          <p>Управляйте пользовательскими предпочтениями и прогрессом.</p>
        </div>
      </div>

      <div className="settings-grid">
        <div className="settings-panel">
          <UserSettings />
        </div>
        <div className="settings-panel">
          <h3>Действия с прогрессом</h3>
          <p>Используйте кнопки ниже для изменения статусов технологий.</p>
          <div className="settings-actions">
            <button className="btn btn-primary" onClick={onMarkAllCompleted}>
              Отметить все как завершённые
            </button>
            <button className="btn btn-secondary" onClick={onResetAll}>
              Сбросить прогресс
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;



