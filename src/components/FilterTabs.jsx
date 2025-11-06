import './FilterTabs.css';

function FilterTabs({ activeFilter, onFilterChange, technologies }) {
  const filters = [
    { key: 'all', label: 'Все', icon: '📋' },
    { key: 'not-started', label: 'Не начато', icon: '❌' },
    { key: 'in-progress', label: 'В процессе', icon: '⏳' },
    { key: 'completed', label: 'Завершено', icon: '✅' }
  ];

  const getCount = (filterKey) => {
    if (filterKey === 'all') return technologies.length;
    return technologies.filter(tech => tech.status === filterKey).length;
  };

  return (
    <div className="filter-tabs">
      <h3>Фильтры</h3>
      <div className="filter-tabs-container">
        {filters.map(filter => (
          <button
            key={filter.key}
            className={`filter-tab ${activeFilter === filter.key ? 'active' : ''}`}
            onClick={() => onFilterChange(filter.key)}
          >
            <span className="filter-icon">{filter.icon}</span>
            <span className="filter-label">{filter.label}</span>
            <span className="filter-count">({getCount(filter.key)})</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterTabs;

