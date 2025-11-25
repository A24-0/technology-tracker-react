import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

function Navigation({ isLoggedIn, username, onLogout }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = path => (location.pathname === path ? 'active' : '');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="main-navigation">
      <div className="nav-brand">
        <Link to="/" onClick={closeMenu}>
          <h2>🚀 Трекер технологий</h2>
        </Link>
      </div>

      <button 
        className="menu-toggle"
        onClick={toggleMenu}
        aria-label="Переключить меню"
        aria-expanded={isMenuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
        <li>
          <Link to="/" className={isActive('/')} onClick={closeMenu}>
            Главная
          </Link>
        </li>
        <li>
          <Link to="/technologies" className={isActive('/technologies')} onClick={closeMenu}>
            Все технологии
          </Link>
        </li>
        <li>
          <Link to="/statistics" className={isActive('/statistics')} onClick={closeMenu}>
            Статистика
          </Link>
        </li>
        <li>
          <Link to="/api-explorer" className={isActive('/api-explorer')} onClick={closeMenu}>
            API
          </Link>
        </li>
        <li>
          <Link to="/add-technology" className={isActive('/add-technology')} onClick={closeMenu}>
            Добавить
          </Link>
        </li>
        <li>
          <Link to="/forms" className={isActive('/forms')} onClick={closeMenu}>
            Формы
          </Link>
        </li>
        <li>
          <Link to="/data-management" className={isActive('/data-management')} onClick={closeMenu}>
            Импорт/Экспорт
          </Link>
        </li>
        <li>
          <Link to="/mui-practice" className={isActive('/mui-practice')} onClick={closeMenu}>
            UI-кит
          </Link>
        </li>
        {isLoggedIn && (
          <>
            <li>
              <Link to="/technology-manager" className={isActive('/technology-manager')} onClick={closeMenu}>
                Управление
              </Link>
            </li>
            <li>
              <Link to="/deadlines" className={isActive('/deadlines')} onClick={closeMenu}>
                Дедлайны
              </Link>
            </li>
            <li>
              <Link to="/bulk-edit" className={isActive('/bulk-edit')} onClick={closeMenu}>
                Массовое редактирование
              </Link>
            </li>
            <li>
              <Link to="/settings" className={isActive('/settings')} onClick={closeMenu}>
                Настройки
              </Link>
            </li>
          </>
        )}
        {!isLoggedIn && (
          <li>
            <Link to="/settings" className={isActive('/settings')} onClick={closeMenu}>
              Настройки
            </Link>
          </li>
        )}
        <li className="nav-auth">
          {isLoggedIn ? (
            <>
              <span className="nav-username">Привет, {username}!</span>
              <button className="logout-btn" onClick={onLogout}>
                Выйти
              </button>
            </>
          ) : (
            <Link to="/login" className={isActive('/login')} onClick={closeMenu}>
              Войти
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;



