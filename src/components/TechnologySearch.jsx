import { useEffect, useRef, useState } from 'react';
import './TechnologySearch.css';

const SEARCH_URL = 'https://dummyjson.com/products/search?q=';

function TechnologySearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debounceRef = useRef(null);
  const abortRef = useRef(null);

  const runSearch = async (query) => {
    if (abortRef.current) {
      abortRef.current.abort();
    }

    if (!query.trim()) {
      setResults([]);
      setError(null);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `${SEARCH_URL}${encodeURIComponent(query)}`,
        { signal: controller.signal }
      );

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();
      setResults(data.products || []);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      runSearch(value);
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      if (abortRef.current) {
        abortRef.current.abort();
      }
    };
  }, []);

  return (
    <div className="technology-search">
      <h3>Поиск технологий по API</h3>
      <div className="technology-search__input">
        <input
          type="text"
          placeholder="Введите название технологии..."
          value={searchTerm}
          onChange={handleChange}
        />
        {loading && <span className="technology-search__spinner">⌛</span>}
      </div>

      {error && <p className="technology-search__error">Ошибка: {error}</p>}

      <div className="technology-search__results">
        {results.length > 0 ? (
          <div className="technology-search__grid">
            {results.map((result) => (
              <article key={result.id} className="technology-search__card">
                <img src={result.thumbnail} alt={result.title} />
                <div>
                  <h4>{result.title}</h4>
                  <p>{result.description}</p>
                  <p className="technology-search__meta">
                    Категория: {result.category}
                  </p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          searchTerm.trim() &&
          !loading && <p>По запросу ничего не найдено.</p>
        )}
      </div>
    </div>
  );
}

export default TechnologySearch;


