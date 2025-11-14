import './TechnologyNotes.css';

function TechnologyNotes({ notes, onNotesChange, techId }) {
  const handleChange = (e) => {
    onNotesChange(techId, e.target.value);
  };

  const handleClick = (e) => {
    // Предотвращаем всплытие события, чтобы не менять статус при клике на заметки
    e.stopPropagation();
  };

  return (
    <div className="notes-section" onClick={handleClick}>
      <h4>Мои заметки:</h4>
      <textarea
        value={notes}
        onChange={handleChange}
        onClick={handleClick}
        placeholder="Записывайте сюда важные моменты..."
        rows="3"
      />
      <div className="notes-hint">
        {notes.length > 0 ? `Заметка сохранена (${notes.length} символов)` : 'Добавьте заметку'}
      </div>
    </div>
  );
}

export default TechnologyNotes;

