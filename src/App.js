import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import useTechnologies from './hooks/useTechnologies';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import TechnologyList from './pages/TechnologyList';
import TechnologyDetail from './pages/TechnologyDetail';
import AddTechnology from './pages/AddTechnology';
import StatisticsPage from './pages/StatisticsPage';
import SettingsPage from './pages/SettingsPage';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

function App() {
  const { 
    technologies, 
    updateStatus, 
    updateNotes, 
    addTechnology,
    progress,
    markAllCompleted,
    resetAllStatuses,
    randomSelectNext
  } = useTechnologies();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleStatusChange = (id) => {
    const tech = technologies.find(t => t.id === id);
    if (tech) {
      const statusOrder = ['not-started', 'in-progress', 'completed'];
      const currentIndex = statusOrder.indexOf(tech.status);
      const nextIndex = (currentIndex + 1) % statusOrder.length;
      updateStatus(id, statusOrder[nextIndex]);
    }
  };

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedUsername = localStorage.getItem('username') || '';
    setIsLoggedIn(loggedIn);
    setUsername(storedUsername);
  }, []);

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUsername(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername('');
  };

  return (
    <Router>
      <div className="app-shell">
        <Navigation
          isLoggedIn={isLoggedIn}
          username={username}
          onLogout={handleLogout}
        />

        <main className="app-main">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  technologies={technologies}
                  progress={progress}
                  onMarkAllCompleted={markAllCompleted}
                  onResetAll={resetAllStatuses}
                  onRandomSelect={randomSelectNext}
                />
              }
            />

            <Route
              path="/technologies"
              element={
                <TechnologyList
                  technologies={technologies}
                  onStatusChange={handleStatusChange}
                  onNotesChange={updateNotes}
                />
              }
            />

            <Route
              path="/technology/:techId"
              element={
                <TechnologyDetail
                  technologies={technologies}
                  onUpdateStatus={updateStatus}
                  onUpdateNotes={updateNotes}
                />
              }
            />

            <Route
              path="/add-technology"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <AddTechnology onAddTechnology={addTechnology} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/statistics"
              element={
                <StatisticsPage
                  technologies={technologies}
                  progress={progress}
                />
              }
            />

            <Route
              path="/settings"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <SettingsPage
                    onMarkAllCompleted={markAllCompleted}
                    onResetAll={resetAllStatuses}
                  />
                </ProtectedRoute>
              }
            />

            <Route path="/login" element={<Login onLogin={handleLogin} />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
