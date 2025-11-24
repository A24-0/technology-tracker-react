import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const defaultForm = {
  title: '',
  description: '',
  category: 'frontend',
  notes: '',
  status: 'not-started'
};

function AddTechnology({ onAddTechnology }) {
  const [formState, setFormState] = useState(defaultForm);
  const navigate = useNavigate();

  const handleChange = event => {
    const { name, value } = event.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (!formState.title.trim() || !formState.description.trim()) {
      return;
    }
    onAddTechnology({
      title: formState.title.trim(),
      description: formState.description.trim(),
      category: formState.category,
      status: formState.status,
      notes: formState.notes.trim()
    });
    setFormState(defaultForm);
    navigate('/technologies');
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="badge">Защищённый маршрут</p>
          <h1>Добавить новую технологию</h1>
          <p>
            Форма сохранит данные в localStorage. После отправки вы попадёте к
            списку технологий.
          </p>
        </div>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Название</label>
          <input
            id="title"
            name="title"
            type="text"
            value={formState.title}
            onChange={handleChange}
            required
            placeholder="Например, React Router"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Описание</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={formState.description}
            onChange={handleChange}
            required
            placeholder="Кратко опишите, чему хотите научиться"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category">Категория</label>
            <select
              id="category"
              name="category"
              value={formState.category}
              onChange={handleChange}
            >
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="database">Базы данных</option>
              <option value="devops">DevOps</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="status">Статус</label>
            <select
              id="status"
              name="status"
              value={formState.status}
              onChange={handleChange}
            >
              <option value="not-started">Не начато</option>
              <option value="in-progress">В процессе</option>
              <option value="completed">Завершено</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="notes">Заметки</label>
          <textarea
            id="notes"
            name="notes"
            rows="3"
            value={formState.notes}
            onChange={handleChange}
            placeholder="Необязательное поле"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Сохранить
        </button>
      </form>
    </div>
  );
}

export default AddTechnology;


