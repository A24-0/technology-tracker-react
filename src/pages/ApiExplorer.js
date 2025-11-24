import RoadmapImporter from '../components/RoadmapImporter';
import TechnologySearch from '../components/TechnologySearch';
import useTechnologiesApi from '../hooks/useTechnologiesApi';

function ApiExplorer() {
  const { technologies, loading, error, refetch, addTechnology } =
    useTechnologiesApi();

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="badge">API интеграция</p>
          <h1>Исследователь технологий</h1>
          <p>
            Демонстрация загрузки данных из удалённого API, импорта дорожных
            карт и поиска с задержкой.
          </p>
        </div>
        <button className="btn btn-secondary" onClick={refetch}>
          Обновить
        </button>
      </div>

      <RoadmapImporter onImport={addTechnology} />

      <section className="dashboard-panel">
        <h3>Технологии с API</h3>
        {loading && <p>Загрузка технологий...</p>}
        {error && <p className="technology-resources__error">Ошибка: {error}</p>}
        {!loading && !error && (
          <div className="technology-list">
            {technologies.map((tech) => (
              <article key={tech.id} className="technology-list-item">
                <div className="technology-info">
                  <p className="badge">{tech.category}</p>
                  <h3>{tech.title}</h3>
                  <p>{tech.description}</p>
                  <p>Уровень: {tech.difficulty}</p>
                  <div className="technology-meta">
                    {tech.resources.map((resource) => (
                      <a
                        key={resource.url}
                        href={resource.url}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-link"
                      >
                        {resource.label}
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <TechnologySearch />
    </div>
  );
}

export default ApiExplorer;


