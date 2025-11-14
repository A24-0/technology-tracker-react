import ProgressBar from './ProgressBar';
import './ProgressDashboard.css';

function ProgressDashboard({ technologies = [] }) {
  // Рассчитываем прогресс по категориям
  const frontendTechs = technologies.filter(tech => tech.category === 'frontend');
  const backendTechs = technologies.filter(tech => tech.category === 'backend');
  const databaseTechs = technologies.filter(tech => tech.category === 'database');

  const calculateCategoryProgress = (techs) => {
    if (techs.length === 0) return 0;
    const completed = techs.filter(tech => tech.status === 'completed').length;
    return Math.round((completed / techs.length) * 100);
  };

  const overallProgress = technologies.length > 0
    ? Math.round((technologies.filter(tech => tech.status === 'completed').length / technologies.length) * 100)
    : 0;

  const frontendProgress = calculateCategoryProgress(frontendTechs);
  const backendProgress = calculateCategoryProgress(backendTechs);
  const databaseProgress = calculateCategoryProgress(databaseTechs);

  return (
    <div className="progress-dashboard">
      <h2>Мой прогресс в изучении</h2>
      
      {/* Основной прогресс-бар */}
      <ProgressBar 
        progress={overallProgress}
        label="Общий прогресс"
        color="#2196F3"
        height={25}
        animated={true}
      />

      {/* Прогресс-бар для фронтенда */}
      {frontendTechs.length > 0 && (
        <ProgressBar 
          progress={frontendProgress}
          label="Фронтенд разработка"
          color="#4CAF50"
          showPercentage={true}
          animated={true}
        />
      )}

      {/* Прогресс-бар для бэкенда */}
      {backendTechs.length > 0 && (
        <ProgressBar 
          progress={backendProgress}
          label="Бэкенд разработка"
          color="#FF9800"
          showPercentage={true}
          animated={true}
        />
      )}

      {/* Прогресс-бар для баз данных */}
      {databaseTechs.length > 0 && (
        <ProgressBar 
          progress={databaseProgress}
          label="Базы данных"
          color="#F44336"
          height={15}
          showPercentage={false}
          animated={true}
        />
      )}
    </div>
  );
}

export default ProgressDashboard;

