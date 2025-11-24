import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="page">
      <h1>404 — страница не найдена</h1>
      <p>Похоже, вы попали не туда. Вернитесь на главную и продолжайте учиться.</p>
      <Link to="/" className="btn btn-primary">
        На главную
      </Link>
    </div>
  );
}

export default NotFound;


