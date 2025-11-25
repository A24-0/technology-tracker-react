import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Stack,
  IconButton,
  Button,
  Tooltip,
  Divider
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  PlayArrow as PlayArrowIcon,
  CheckCircle as CheckCircleIcon,
  Replay as ReplayIcon
} from '@mui/icons-material';

const statusMap = {
  'not-started': {
    label: 'Не начато',
    color: 'default',
    next: 'in-progress',
    actionLabel: 'Начать',
    icon: PlayArrowIcon
  },
  'in-progress': {
    label: 'В процессе',
    color: 'warning',
    next: 'completed',
    actionLabel: 'Завершить',
    icon: CheckCircleIcon
  },
  completed: {
    label: 'Завершено',
    color: 'success',
    next: 'not-started',
    actionLabel: 'Сбросить',
    icon: ReplayIcon
  }
};

function MuiTechnologyCard({ technology, onEdit, onDelete, onStatusChange }) {
  const status = statusMap[technology.status] || statusMap['not-started'];
  const StatusIcon = status.icon;

  const handleStatusClick = () => {
    if (onStatusChange) {
      onStatusChange(technology.id, status.next);
    }
  };

  return (
    <Card>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Typography variant="h6">{technology.title}</Typography>
          <Chip label={status.label} color={status.color} size="small" />
        </Stack>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
          {technology.description || 'Описание отсутствует'}
        </Typography>

        <Stack direction="row" spacing={1} flexWrap="wrap">
          {technology.category && (
            <Chip label={technology.category} variant="outlined" size="small" />
          )}
          {technology.deadline && (
            <Chip label={`Дедлайн: ${technology.deadline}`} size="small" color="secondary" />
          )}
        </Stack>
      </CardContent>

      <Divider />

      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Button
          variant="contained"
          size="small"
          startIcon={<StatusIcon />}
          onClick={handleStatusClick}
        >
          {status.actionLabel}
        </Button>

        <Stack direction="row" spacing={1}>
          <Tooltip title="Редактировать">
            <IconButton size="small" onClick={() => onEdit?.(technology)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Удалить">
            <IconButton
              size="small"
              color="error"
              onClick={() => onDelete?.(technology.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </CardActions>
    </Card>
  );
}

export default MuiTechnologyCard;

