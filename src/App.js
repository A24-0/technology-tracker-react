import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import Statistics from './components/Statistics';
import QuickActions from './components/QuickActions';
import FilterTabs from './components/FilterTabs';

const initialTechnologies = [
  { id: 1, title: 'React Components', description: 'Изучение базовых компонентов', status: 'not-started' },
  { id: 2, title: 'JSX Syntax', description: 'Освоение синтаксиса JSX', status: 'not-started' },
  { id: 3, title: 'State Management', description: 'Работа с состоянием компонентов', status: 'not-started' },
  { id: 4, title: 'Hooks', description: 'Использование хуков React', status: 'not-started' },
  { id: 5, title: 'Event Handling', description: 'Обработка событий в React', status: 'not-started' }
];

function App() {
  const [technologies, setTechnologies] = useState(initialTechnologies);
  const [activeFilter, setActiveFilter] = useState('all');

  // Функция для изменения статуса технологии
  const handleStatusChange = (id) => {
    setTechnologies(prevTechnologies => 
      prevTechnologies.map(tech => {
        if (tech.id === id) {
          // Циклическое переключение: not-started -> in-progress -> completed -> not-started
          const statusOrder = ['not-started', 'in-progress', 'completed'];
          const currentIndex = statusOrder.indexOf(tech.status);
          const nextIndex = (currentIndex + 1) % statusOrder.length;
          return { ...tech, status: statusOrder[nextIndex] };
        }
        return tech;
      })
    );
  };

  // Функция для отметки всех как выполненных
  const markAllCompleted = () => {
    setTechnologies(prevTechnologies =>
      prevTechnologies.map(tech => ({ ...tech, status: 'completed' }))
    );
  };

  // Функция для сброса всех статусов
  const resetAllStatuses = () => {
    setTechnologies(prevTechnologies =>
      prevTechnologies.map(tech => ({ ...tech, status: 'not-started' }))
    );
  };

  // Функция для случайного выбора следующей технологии
  const randomSelectNext = () => {
    const notStarted = technologies.filter(tech => tech.status === 'not-started');
    if (notStarted.length > 0) {
      const randomTech = notStarted[Math.floor(Math.random() * notStarted.length)];
      handleStatusChange(randomTech.id);
    }
  };

  // Фильтрация технологий по статусу
  const getFilteredTechnologies = () => {
    if (activeFilter === 'all') return technologies;
    return technologies.filter(tech => tech.status === activeFilter);
  };

  const filteredTechnologies = getFilteredTechnologies();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Technology Tracker</h1>
      </header>
      <ProgressHeader technologies={technologies} />
      <Statistics technologies={technologies} />
      <QuickActions 
        onMarkAllCompleted={markAllCompleted}
        onResetAll={resetAllStatuses}
        onRandomSelect={randomSelectNext}
      />
      <FilterTabs 
        activeFilter={activeFilter} 
        onFilterChange={setActiveFilter}
        technologies={technologies}
      />
      <div className="technologies-container">
        {filteredTechnologies.map(technology => (
          <TechnologyCard 
            key={technology.id} 
            id={technology.id}
            title={technology.title} 
            description={technology.description} 
            status={technology.status}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
