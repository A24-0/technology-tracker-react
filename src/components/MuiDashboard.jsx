import { useMemo } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';

function MuiDashboard({ technologies }) {
  const stats = useMemo(() => {
    const total = technologies.length;
    const completed = technologies.filter(t => t.status === 'completed').length;
    const inProgress = technologies.filter(t => t.status === 'in-progress').length;
    const notStarted = technologies.filter(t => t.status === 'not-started').length;
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      total,
      completed,
      inProgress,
      notStarted,
      progress
    };
  }, [technologies]);

  const recentTechnologies = useMemo(
    () =>
      [...technologies]
        .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
        .slice(0, 5),
    [technologies]
  );

  const activeTechnologies = useMemo(
    () => technologies.filter(t => t.status === 'in-progress'),
    [technologies]
  );

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Общая статистика
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Всего технологий
              </Typography>
              <Typography variant="h4">{stats.total}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Завершено
              </Typography>
              <Typography variant="h4" color="success.main">
                {stats.completed}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                В процессе
              </Typography>
              <Typography variant="h4" color="warning.main">
                {stats.inProgress}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Не начато
              </Typography>
              <Typography variant="h4">{stats.notStarted}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h6">Общий прогресс</Typography>
                  <Typography color="text.secondary">
                    {stats.completed} из {stats.total} технологий завершено
                  </Typography>
                </Box>
                <TrendingUpIcon color="primary" fontSize="large" />
              </Box>
              <Box display="flex" alignItems="center" gap={2} mt={3}>
                <LinearProgress
                  variant="determinate"
                  value={stats.progress}
                  sx={{ flexGrow: 1, height: 10, borderRadius: 5 }}
                />
                <Typography variant="h5" color="primary">
                  {stats.progress}%
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Активные технологии
              </Typography>
              <List>
                {activeTechnologies.length === 0 && (
                  <ListItem>
                    <ListItemText primary="Нет активных технологий" secondary="Добавьте новую задачу" />
                  </ListItem>
                )}
                {activeTechnologies.map((tech, index) => (
                  <Box key={tech.id}>
                    <ListItem>
                      <ListItemIcon>
                        <ScheduleIcon color="warning" />
                      </ListItemIcon>
                      <ListItemText primary={tech.title} secondary={tech.category} />
                      <Chip label="В процессе" size="small" color="warning" />
                    </ListItem>
                    {index < activeTechnologies.length - 1 && <Divider component="li" />}
                  </Box>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Недавние технологии
              </Typography>
              <List>
                {recentTechnologies.length === 0 && (
                  <ListItem>
                    <ListItemText primary="Пока ничего нет" secondary="Создайте первую технологию" />
                  </ListItem>
                )}

                {recentTechnologies.map((tech, index) => (
                  <Box key={tech.id}>
                    <ListItem>
                      <ListItemIcon>
                        {tech.status === 'completed' ? (
                          <CheckCircleIcon color="success" />
                        ) : tech.status === 'in-progress' ? (
                          <ScheduleIcon color="warning" />
                        ) : (
                          <RadioButtonUncheckedIcon color="disabled" />
                        )}
                      </ListItemIcon>
                      <ListItemText primary={tech.title} secondary={tech.category} />
                      <Chip
                        label={
                          tech.status === 'completed'
                            ? 'Завершено'
                            : tech.status === 'in-progress'
                            ? 'В процессе'
                            : 'Не начато'
                        }
                        size="small"
                        variant="outlined"
                      />
                    </ListItem>
                    {index < recentTechnologies.length - 1 && <Divider component="li" />}
                  </Box>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

MuiDashboard.defaultProps = {
  technologies: []
};

export default MuiDashboard;

