import { useState } from 'react';
import './RoadmapImporter.css';

function RoadmapImporter({
  onImport,
  exampleUrl = '/data/frontend-roadmap.json'
}) {
  const [importing, setImporting] = useState(false);
  const [message, setMessage] = useState('');

  const handleImport = async (url) => {
    try {
      setImporting(true);
      setMessage('');

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      const roadmapData = await response.json();
      const list = roadmapData.technologies || [];

      for (const tech of list) {
        // Ждём завершения добавления, чтобы отловить потенциальные ошибки
        await onImport(tech);
      }

      setMessage(`Импортировано ${list.length} технологий`);
    } catch (err) {
      setMessage(`Ошибка импорта: ${err.message}`);
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="roadmap-importer">
      <h3>Импорт дорожной карты</h3>
      <p>Загрузите готовый список технологий из внешнего API или файла JSON.</p>
      <div className="roadmap-importer__actions">
        <button
          className="btn btn-primary"
          onClick={() => handleImport(exampleUrl)}
          disabled={importing}
        >
          {importing ? 'Импорт...' : 'Импортировать пример'}
        </button>
      </div>
      {message && <p className="roadmap-importer__message">{message}</p>}
    </div>
  );
}

export default RoadmapImporter;


