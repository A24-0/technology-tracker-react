import Statistics from '../components/Statistics';

function StatisticsPage({ technologies, progress }) {
  const totals = technologies.reduce(
    (acc, tech) => {
      acc[tech.status] += 1;
      return acc;
    },
    { 'not-started': 0, 'in-progress': 0, completed: 0 }
  );

  const chartData = [
    { label: 'Не начато', value: totals['not-started'], color: '#f87171' },
    { label: 'В процессе', value: totals['in-progress'], color: '#fbbf24' },
    { label: 'Завершено', value: totals.completed, color: '#34d399' }
  ];

  const maxValue = Math.max(...chartData.map(item => item.value), 1);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="badge">Статистика</p>
          <h1>Данные об обучении</h1>
          <p>Пример страницы с визуализацией прогресса на основе localStorage.</p>
        </div>
      </div>

      <div className="dashboard-panel">
        <Statistics technologies={technologies} />
      </div>

      <div className="chart-card">
        <h3>График прогресса</h3>
        <div className="chart-bars">
          {chartData.map(item => (
            <div key={item.label} className="chart-bar">
              <div className="chart-bar-label">
                <span className="dot" style={{ backgroundColor: item.color }} />
                {item.label}
              </div>
              <div className="chart-bar-track">
                <div
                  className="chart-bar-fill"
                  style={{
                    width: `${(item.value / maxValue) * 100}%`,
                    backgroundColor: item.color
                  }}
                />
              </div>
              <span className="chart-bar-value">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="progress-summary">
        <h3>Итоговый прогресс</h3>
        <p>Вы освоили {progress}% плана. Продолжайте!</p>
      </div>
    </div>
  );
}

export default StatisticsPage;



