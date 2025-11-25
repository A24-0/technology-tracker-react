import { useState } from 'react';
import {
  Box,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Grid,
  Stack,
  Switch
} from '@mui/material';
import {
  Add as AddIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon
} from '@mui/icons-material';
import MuiDashboard from '../components/MuiDashboard';
import MuiTechnologyCard from '../components/MuiTechnologyCard';
import MuiTechnologyModal from '../components/MuiTechnologyModal';
import NotificationSnackbar from '../components/NotificationSnackbar';

const initialTechnologies = [
  {
    id: 1,
    title: 'React Components',
    description: 'Изучение функциональных и классовых компонентов',
    category: 'frontend',
    status: 'in-progress',
    deadline: '2024-12-15',
    createdAt: new Date('2024-11-10').toISOString()
  },
  {
    id: 2,
    title: 'Material-UI',
    description: 'Освоение Material Design для React',
    category: 'ui-library',
    status: 'not-started',
    deadline: '2024-12-30',
    createdAt: new Date('2024-11-05').toISOString()
  },
  {
    id: 3,
    title: 'React Hooks',
    description: 'Практика с useState, useEffect и кастомными хуками',
    category: 'frontend',
    status: 'completed',
    deadline: '2024-11-01',
    createdAt: new Date('2024-10-28').toISOString()
  }
];

function MuiPracticePage({ mode, onToggleTheme }) {
  const [technologies, setTechnologies] = useState(initialTechnologies);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTech, setEditingTech] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleAddButtonClick = () => {
    setEditingTech(null);
    setIsModalOpen(true);
  };

  const handleEdit = (technology) => {
    setEditingTech(technology);
    setIsModalOpen(true);
  };

  const handleDelete = (techId) => {
    setTechnologies((prev) => prev.filter((tech) => tech.id !== techId));
    showSnackbar('Технология удалена', 'info');
  };

  const handleStatusChange = (techId, newStatus) => {
    setTechnologies((prev) =>
      prev.map((tech) =>
        tech.id === techId
          ? {
              ...tech,
              status: newStatus
            }
          : tech
      )
    );
    showSnackbar('Статус обновлен');
  };

  const handleSaveTechnology = (data) => {
    if (editingTech) {
      setTechnologies((prev) =>
        prev.map((tech) =>
          tech.id === editingTech.id
            ? { ...tech, ...data }
            : tech
        )
      );
      showSnackbar('Технология обновлена');
    } else {
      const newTechnology = {
        id: Date.now(),
        ...data,
        createdAt: new Date().toISOString()
      };
      setTechnologies((prev) => [...prev, newTechnology]);
      showSnackbar('Технология добавлена');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTech(null);
  };

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      <AppBar position="static" color="primary" enableColorOnDark>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            🚀 Трекер изучения технологий (MUI)
          </Typography>

          <Stack direction="row" alignItems="center" spacing={1} mr={2}>
            <Brightness7Icon />
            <Switch checked={mode === 'dark'} onChange={onToggleTheme} color="default" />
            <Brightness4Icon />
          </Stack>

          <Button color="inherit" startIcon={<AddIcon />} onClick={handleAddButtonClick}>
            Добавить
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <MuiDashboard technologies={technologies} />

        <Box mt={5}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h5">Мои технологии ({technologies.length})</Typography>
            <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddButtonClick}>
              Добавить технологию
            </Button>
          </Stack>

          <Grid container spacing={3}>
            {technologies.map((technology) => (
              <Grid item xs={12} sm={6} md={4} key={technology.id}>
                <MuiTechnologyCard
                  technology={technology}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onStatusChange={handleStatusChange}
                />
              </Grid>
            ))}
          </Grid>

          {technologies.length === 0 && (
            <Box textAlign="center" py={8} color="text.secondary">
              <Typography variant="h6" gutterBottom>
                Технологий пока нет
              </Typography>
              <Typography variant="body1" gutterBottom>
                Добавьте первую технологию для отслеживания прогресса
              </Typography>
              <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddButtonClick}>
                Добавить технологию
              </Button>
            </Box>
          )}
        </Box>
      </Container>

      <MuiTechnologyModal
        open={isModalOpen}
        onClose={handleCloseModal}
        technology={editingTech}
        onSave={handleSaveTechnology}
      />

      <NotificationSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleSnackbarClose}
      />
    </Box>
  );
}

export default MuiPracticePage;

