import { useEffect, useState } from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack
} from '@mui/material';

const statusOptions = [
  { value: 'not-started', label: 'Не начато' },
  { value: 'in-progress', label: 'В процессе' },
  { value: 'completed', label: 'Завершено' }
];

const categoryOptions = [
  'frontend',
  'backend',
  'ui-library',
  'devops',
  'testing',
  'other'
];

const initialState = {
  title: '',
  description: '',
  category: 'other',
  status: 'not-started',
  deadline: ''
};

function MuiTechnologyModal({ open, onClose, technology, onSave }) {
  const [formState, setFormState] = useState(initialState);

  useEffect(() => {
    if (technology) {
      setFormState({
        title: technology.title || '',
        description: technology.description || '',
        category: technology.category || 'other',
        status: technology.status || 'not-started',
        deadline: technology.deadline || ''
      });
    } else {
      setFormState(initialState);
    }
  }, [technology]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave?.(formState);
    onClose?.();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogTitle>{technology ? 'Редактировать технологию' : 'Добавить технологию'}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} mt={1}>
            <TextField
              name="title"
              label="Название"
              value={formState.title}
              onChange={handleChange}
              required
              fullWidth
            />

            <TextField
              name="description"
              label="Описание"
              value={formState.description}
              onChange={handleChange}
              fullWidth
              multiline
              minRows={3}
            />

            <TextField
              name="category"
              label="Категория"
              value={formState.category}
              onChange={handleChange}
              select
              fullWidth
            >
              {categoryOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              name="status"
              label="Статус"
              value={formState.status}
              onChange={handleChange}
              select
              fullWidth
            >
              {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              name="deadline"
              label="Дедлайн"
              type="date"
              value={formState.deadline}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Отмена</Button>
          <Button type="submit" variant="contained">
            Сохранить
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

export default MuiTechnologyModal;

