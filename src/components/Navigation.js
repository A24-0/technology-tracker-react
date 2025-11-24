import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

function Navigation({ isLoggedIn, username, onLogout }) {
  const location = useLocation();

  const isActive = path => (location.pathname === path ? 'active' : '');

  return (
    <nav className="main-navigation">
      <div className="nav-brand">
        <Link to="/">
          <h2>🚀 Трекер технологий</h2>
        </Link>
      </div>

      <ul className="nav-menu">
        <li>
          <Link to="/" className={isActive('/')}>
            Главная
          </Link>
        </li>
        <li>
          <Link to="/technologies" className={isActive('/technologies')}>
            Все технологии
          </Link>
        </li>
        <li>
          <Link to="/statistics" className={isActive('/statistics')}>
            Статистика
          </Link>
        </li>
        <li>
          <Link to="/api-explorer" className={isActive('/api-explorer')}>
            API
          </Link>
        </li>
        <li>
          <Link to="/add-technology" className={isActive('/add-technology')}>
            Добавить
          </Link>
        </li>
        <li>
          <Link to="/settings" className={isActive('/settings')}>
            Настройки
          </Link>
        </li>
        <li className="nav-auth">
          {isLoggedIn ? (
            <>
              <span className="nav-username">Привет, {username}!</span>
              <button className="logout-btn" onClick={onLogout}>
                Выйти
              </button>
            </>
          ) : (
            <Link to="/login" className={isActive('/login')}>
              Войти
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;



