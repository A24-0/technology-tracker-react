import { useEffect, useState } from 'react';
import './TechnologyResources.css';

const SEARCH_URL = 'https://dummyjson.com/products/search?q=';

function TechnologyResources({ query }) {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;
    const controller = new AbortController();

    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        setResources([]);

        const response = await fetch(
          `${SEARCH_URL}${encodeURIComponent(query)}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        const items = (data.products || []).slice(0, 3).map((item) => ({
          id: item.id,
          title: item.title,
          url: `https://dummyjson.com/products/${item.id}`,
          category: item.category
        }));
        setResources(items);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    load();
    return () => controller.abort();
  }, [query]);

  return (
    <div className="technology-resources">
      <h3>Связанные ресурсы</h3>
      {loading && <p>Загрузка материалов...</p>}
      {error && <p className="technology-resources__error">Ошибка: {error}</p>}
      {!loading && resources.length === 0 && !error && (
        <p>Подходящих ресурсов не найдено.</p>
      )}
      <ul>
        {resources.map((resource) => (
          <li key={resource.id}>
            <a href={resource.url} target="_blank" rel="noreferrer">
              {resource.title}
            </a>
            <span>{resource.category}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TechnologyResources;


