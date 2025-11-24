import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = event => {
    event.preventDefault();

    if (username === 'admin' && password === 'password') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);
      onLogin(username);
      navigate('/settings');
    } else {
      alert('Неверные данные для входа');
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Войти</h1>
          <p>Простая форма демонстрирует программную навигацию.</p>
        </div>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Имя пользователя</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;


