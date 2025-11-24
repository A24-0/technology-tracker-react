import { useState } from 'react';
import TechnologyForm from '../components/TechnologyForm';
import WorkingAccessibleForm from '../components/WorkingAccessibleForm';
import './FormsPage.css';

function FormsPage() {
  const [showTechForm, setShowTechForm] = useState(false);
  const [showAccessibleForm, setShowAccessibleForm] = useState(false);

  const handleSaveTech = (techData) => {
    console.log('Сохранена технология:', techData);
    alert('Технология успешно сохранена!');
    setShowTechForm(false);
  };

  return (
    <div className="forms-page">
      <h1>Формы с валидацией и доступностью</h1>

      <div className="forms-tabs">
        <button
          onClick={() => {
            setShowTechForm(true);
            setShowAccessibleForm(false);
          }}
          className={showTechForm ? 'active' : ''}
        >
          Форма технологии
        </button>
        <button
          onClick={() => {
            setShowAccessibleForm(true);
            setShowTechForm(false);
          }}
          className={showAccessibleForm ? 'active' : ''}
        >
          Доступная форма
        </button>
      </div>

      <div className="forms-content">
        {showTechForm && (
          <div className="form-section">
            <TechnologyForm
              onSave={handleSaveTech}
              onCancel={() => setShowTechForm(false)}
            />
          </div>
        )}

        {showAccessibleForm && (
          <div className="form-section">
            <WorkingAccessibleForm />
          </div>
        )}

        {!showTechForm && !showAccessibleForm && (
          <div className="form-placeholder">
            <p>Выберите форму для просмотра</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default FormsPage;

