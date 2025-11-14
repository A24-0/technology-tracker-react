import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import useTechnologies from './hooks/useTechnologies';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import ProgressBar from './components/ProgressBar';
import ProgressDashboard from './components/ProgressDashboard';
import Statistics from './components/Statistics';
import QuickActions from './components/QuickActions';
import FilterTabs from './components/FilterTabs';
import WindowSizeTracker from './components/WindowSizeTracker';
import UserProfile from './components/UserProfile';
import UserSettings from './components/UserSettings';
import ContactForm from './components/ContactForm';

function App() {
  // Используем кастомный хук для управления технологиями
  const { 
    technologies, 
    updateStatus, 
    updateNotes, 
    progress,
    markAllCompleted,
    resetAllStatuses,
    randomSelectNext
  } = useTechnologies();

  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Функция для изменения статуса технологии (циклическое переключение)
  const handleStatusChange = (id) => {
    const tech = technologies.find(t => t.id === id);
    if (tech) {
      const statusOrder = ['not-started', 'in-progress', 'completed'];
      const currentIndex = statusOrder.indexOf(tech.status);
      const nextIndex = (currentIndex + 1) % statusOrder.length;
      updateStatus(id, statusOrder[nextIndex]);
    }
  };

  // Фильтрация технологий по статусу и поисковому запросу
  const getFilteredTechnologies = () => {
    let filtered = technologies;

    // Фильтрация по статусу
    if (activeFilter !== 'all') {
      filtered = filtered.filter(tech => tech.status === activeFilter);
    }

    // Фильтрация по поисковому запросу
    if (searchQuery.trim()) {
      filtered = filtered.filter(tech =>
        tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tech.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredTechnologies = getFilteredTechnologies();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Technology Tracker</h1>
      </header>
      
      {/* Компоненты из теоретической части */}
      <WindowSizeTracker />
      <UserProfile />
      <UserSettings />
      <ContactForm />

      {/* Прогресс-бар с использованием переиспользуемого компонента */}
      <div style={{ maxWidth: '600px', margin: '20px auto', padding: '0 20px' }}>
        <ProgressBar 
          progress={progress}
          label="Общий прогресс"
          color="#4CAF50"
          animated={true}
          height={25}
        />
      </div>

      <ProgressHeader technologies={technologies} />
      <ProgressDashboard technologies={technologies} />
      <Statistics technologies={technologies} />
      <QuickActions 
        onMarkAllCompleted={markAllCompleted}
        onResetAll={resetAllStatuses}
        onRandomSelect={randomSelectNext}
        technologies={technologies}
      />
      <FilterTabs 
        activeFilter={activeFilter} 
        onFilterChange={setActiveFilter}
        technologies={technologies}
      />
      
      {/* Поиск по технологиям */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Поиск технологий..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span className="search-results">Найдено: {filteredTechnologies.length}</span>
      </div>

      <div className="technologies-container">
        {filteredTechnologies.map(technology => (
          <TechnologyCard 
            key={technology.id} 
            id={technology.id}
            title={technology.title} 
            description={technology.description} 
            status={technology.status}
            notes={technology.notes}
            onStatusChange={handleStatusChange}
            onNotesChange={updateNotes}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
