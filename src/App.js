import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ThemeProvider,
  CssBaseline,
  Box,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon
} from '@mui/icons-material';
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
import ApiExplorer from './pages/ApiExplorer';
import FormsPage from './pages/FormsPage';
import DataManagementPage from './pages/DataManagementPage';
import TechnologyManager from './components/TechnologyManager';
import DeadlineForm from './components/DeadlineForm';
import BulkStatusEditor from './components/BulkStatusEditor';
import MuiPracticePage from './pages/MuiPracticePage';
import { theme as lightTheme, darkTheme } from './styles/theme';

function App() {
  const {
    technologies,
    updateStatus,
    updateNotes,
    updateDeadline,
    bulkUpdateStatus,
    addTechnology,
    progress,
    markAllCompleted,
    resetAllStatuses,
    randomSelectNext
  } = useTechnologies();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [mode, setMode] = useState('light');

  const activeTheme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);

  const handleStatusChange = (id) => {
    const tech = technologies.find((t) => t.id === id);
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
    const storedMode = localStorage.getItem('appTheme');
    if (storedMode === 'light' || storedMode === 'dark') {
      setMode(storedMode);
    }
  }, []);

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUsername(user);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', user);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername('');
  };

  const toggleTheme = () => {
    setMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('appTheme', next);
      return next;
    });
  };

  const basename = process.env.PUBLIC_URL || '';

  return (
    <ThemeProvider theme={activeTheme}>
      <CssBaseline />
      <Router basename={basename}>
        <div className="app-shell">
          <Navigation isLoggedIn={isLoggedIn} username={username} onLogout={handleLogout} />

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
                element={<StatisticsPage technologies={technologies} progress={progress} />}
              />

              <Route path="/api-explorer" element={<ApiExplorer />} />

              <Route path="/forms" element={<FormsPage />} />

              <Route path="/data-management" element={<DataManagementPage />} />

              <Route
                path="/technology-manager"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <TechnologyManager />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/deadlines"
                element={
                  <DeadlineForm technologies={technologies} onUpdateDeadline={updateDeadline} />
                }
              />

              <Route
                path="/bulk-edit"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <BulkStatusEditor technologies={technologies} onBulkUpdate={bulkUpdateStatus} />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/settings"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <SettingsPage onMarkAllCompleted={markAllCompleted} onResetAll={resetAllStatuses} />
                  </ProtectedRoute>
                }
              />

              <Route path="/mui-practice" element={<MuiPracticePage mode={mode} onToggleTheme={toggleTheme} />} />

              <Route path="/login" element={<Login onLogin={handleLogin} />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <Box sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 1500 }}>
            <Tooltip
              title={mode === 'light' ? 'Включить тёмную тему' : 'Включить светлую тему'}
              placement="left"
            >
              <IconButton color="primary" size="large" onClick={toggleTheme}>
                {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
              </IconButton>
            </Tooltip>
          </Box>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
