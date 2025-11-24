import { Link } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import ProgressDashboard from '../components/ProgressDashboard';
import Statistics from '../components/Statistics';
import QuickActions from '../components/QuickActions';
import WindowSizeTracker from '../components/WindowSizeTracker';
import UserProfile from '../components/UserProfile';
import ContactForm from '../components/ContactForm';

function Home({
  technologies,
  progress,
  onMarkAllCompleted,
  onResetAll,
  onRandomSelect
}) {
  return (
    <div className="page home-page">
      <section className="page-hero">
        <div>
          <p className="badge">Учебное SPA</p>
          <h1>Трекер технологий</h1>
          <p>
            Управляйте изучением технологий, отслеживайте прогресс и открывайте
            подробности без перезагрузки страницы благодаря React Router 6.
          </p>

          <div className="hero-actions">
            <Link to="/technologies" className="btn btn-primary">
              Перейти к списку
            </Link>
            <Link to="/statistics" className="btn btn-secondary">
              Посмотреть статистику
            </Link>
          </div>
        </div>
        <div className="hero-progress">
          <h3>Общий прогресс</h3>
          <ProgressBar progress={progress} label={`${progress}%`} height={24} />
          <p className="progress-caption">
            {progress >= 100
              ? 'Все темы закрыты — можно праздновать! 🎉'
              : 'Продолжайте учиться каждый день'}
          </p>
        </div>
      </section>

      <section className="dashboard-section">
        <div className="dashboard-panel">
          <Statistics technologies={technologies} />
        </div>
        <div className="dashboard-panel">
          <ProgressDashboard technologies={technologies} />
        </div>
      </section>

      <section className="home-grid">
        <div className="home-grid-item">
          <QuickActions
            onMarkAllCompleted={onMarkAllCompleted}
            onResetAll={onResetAll}
            onRandomSelect={onRandomSelect}
            technologies={technologies}
          />
        </div>
        <div className="home-grid-item">
          <WindowSizeTracker />
          <UserProfile />
        </div>
        <div className="home-grid-item">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}

export default Home;


