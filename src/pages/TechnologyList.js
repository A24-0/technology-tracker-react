import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import TechnologyCard from '../components/TechnologyCard';
import FilterTabs from '../components/FilterTabs';

function TechnologyList({ technologies, onStatusChange, onNotesChange }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTechnologies = useMemo(() => {
    let filtered = technologies;

    if (activeFilter !== 'all') {
      filtered = filtered.filter(tech => tech.status === activeFilter);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        tech =>
          tech.title.toLowerCase().includes(query) ||
          tech.description.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [technologies, activeFilter, searchQuery]);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="badge">Маршрут /technologies</p>
          <h1>Все технологии</h1>
          <p>
            Клик по карточке меняет статус, а ссылка ведёт на подробную
            страницу.
          </p>
        </div>
        <Link to="/add-technology" className="btn btn-primary">
          + Добавить технологию
        </Link>
      </div>

      <FilterTabs
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        technologies={technologies}
      />

      <div className="search-box">
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Поиск по названию или описанию..."
        />
        <span className="search-results">
          Найдено: {filteredTechnologies.length}
        </span>
      </div>

      <div className="technology-list">
        {filteredTechnologies.map(technology => (
          <div key={technology.id} className="technology-list-item">
            <TechnologyCard
              id={technology.id}
              title={technology.title}
              description={technology.description}
              status={technology.status}
              notes={technology.notes}
              onStatusChange={onStatusChange}
              onNotesChange={onNotesChange}
            />
            <Link
              to={`/technology/${technology.id}`}
              className="btn-link details-link"
            >
              Подробнее →
            </Link>
          </div>
        ))}
      </div>

      {filteredTechnologies.length === 0 && (
        <div className="empty-state">
          <p>Технологий не найдено.</p>
          <Link to="/add-technology" className="btn btn-primary">
            Добавить новую
          </Link>
        </div>
      )}
    </div>
  );
}

export default TechnologyList;


