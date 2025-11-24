import { useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

function TechnologyDetail({ technologies, onUpdateStatus, onUpdateNotes }) {
  const { techId } = useParams();
  const navigate = useNavigate();

  const technology = useMemo(
    () => technologies.find(tech => tech.id === Number(techId)),
    [technologies, techId]
  );

  const setExactStatus = newStatus => {
    if (!technology || technology.status === newStatus) {
      return;
    }
    onUpdateStatus(technology.id, newStatus);
  };

  if (!technology) {
    return (
      <div className="page">
        <h1>Технология не найдена</h1>
        <p>Технология с ID {techId} отсутствует в списке.</p>
        <Link to="/technologies" className="btn">
          ← Назад к списку
        </Link>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <Link to="/technologies" className="back-link">
            ← Назад к списку
          </Link>
          <h1>{technology.title}</h1>
          <p>{technology.description}</p>
        </div>
        <button className="btn" onClick={() => navigate(-1)}>
          Назад
        </button>
      </div>

      <div className="technology-detail">
        <div className="detail-section">
          <h3>Описание</h3>
          <p>{technology.description}</p>
        </div>

        <div className="detail-section">
          <h3>Статус изучения</h3>
          <div className="status-buttons">
            {['not-started', 'in-progress', 'completed'].map(key => (
              <button
                key={key}
                className={technology.status === key ? 'active' : ''}
                onClick={() => setExactStatus(key)}
              >
                {key === 'not-started' && 'Не начато'}
                {key === 'in-progress' && 'В процессе'}
                {key === 'completed' && 'Завершено'}
              </button>
            ))}
          </div>
        </div>

        <div className="detail-section">
          <h3>Мои заметки</h3>
          <textarea
            rows="6"
            value={technology.notes || ''}
            onChange={e => onUpdateNotes(technology.id, e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default TechnologyDetail;


