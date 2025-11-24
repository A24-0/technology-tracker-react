import useLocalStorage from './useLocalStorage';

// Начальные данные для технологий
const initialTechnologies = [
  { 
    id: 1, 
    title: 'React Components', 
    description: 'Изучение базовых компонентов', 
    status: 'not-started',
    notes: '',
    category: 'frontend'
  },
  { 
    id: 2, 
    title: 'JSX Syntax', 
    description: 'Освоение синтаксиса JSX', 
    status: 'not-started',
    notes: '',
    category: 'frontend'
  },
  { 
    id: 3, 
    title: 'State Management', 
    description: 'Работа с состоянием компонентов', 
    status: 'not-started',
    notes: '',
    category: 'frontend'
  },
  { 
    id: 4, 
    title: 'Hooks', 
    description: 'Использование хуков React', 
    status: 'not-started',
    notes: '',
    category: 'frontend'
  },
  { 
    id: 5, 
    title: 'Event Handling', 
    description: 'Обработка событий в React', 
    status: 'not-started',
    notes: '',
    category: 'frontend'
  },
  { 
    id: 6, 
    title: 'Node.js Basics', 
    description: 'Основы серверного JavaScript', 
    status: 'not-started',
    notes: '',
    category: 'backend'
  },
  { 
    id: 7, 
    title: 'Express.js', 
    description: 'Создание REST API', 
    status: 'not-started',
    notes: '',
    category: 'backend'
  },
  { 
    id: 8, 
    title: 'Database Design', 
    description: 'Проектирование баз данных', 
    status: 'not-started',
    notes: '',
    category: 'database'
  }
];

function useTechnologies() {
  const [technologies, setTechnologies] = useLocalStorage('techTrackerData', initialTechnologies);

  // Нормализуем данные при загрузке (добавляем недостающие поля)
  const normalizedTechnologies = technologies.map(tech => ({
    ...tech,
    notes: tech.notes || '',
    category: tech.category || 'frontend'
  }));

  // Функция для обновления статуса технологии
  const updateStatus = (techId, newStatus) => {
    setTechnologies(prev => 
      prev.map(tech => 
        tech.id === techId ? { ...tech, status: newStatus } : tech
      )
    );
  };

  // Функция для обновления заметок
  const updateNotes = (techId, newNotes) => {
    setTechnologies(prev => 
      prev.map(tech => 
        tech.id === techId ? { ...tech, notes: newNotes } : tech
      )
    );
  };

  // Функция для обновления дедлайна
  const updateDeadline = (techId, deadline) => {
    setTechnologies(prev => 
      prev.map(tech => 
        tech.id === techId ? { ...tech, deadline } : tech
      )
    );
  };

  // Функция для массового обновления статусов
  const bulkUpdateStatus = (techIds, newStatus) => {
    setTechnologies(prev => 
      prev.map(tech => 
        techIds.includes(tech.id) ? { ...tech, status: newStatus } : tech
      )
    );
  };

  // Функция для редактирования технологии
  const editTechnology = (techId, techData) => {
    setTechnologies(prev => 
      prev.map(tech => 
        tech.id === techId ? { ...tech, ...techData } : tech
      )
    );
  };

  // Функция для расчета общего прогресса
  const calculateProgress = () => {
    if (normalizedTechnologies.length === 0) return 0;
    const completed = normalizedTechnologies.filter(tech => tech.status === 'completed').length;
    return Math.round((completed / normalizedTechnologies.length) * 100);
  };

  // Функция для отметки всех как выполненных
  const markAllCompleted = () => {
    setTechnologies(prev =>
      prev.map(tech => ({ ...tech, status: 'completed' }))
    );
  };

  // Функция для сброса всех статусов
  const resetAllStatuses = () => {
    setTechnologies(prev =>
      prev.map(tech => ({ ...tech, status: 'not-started' }))
    );
  };

  // Функция для случайного выбора следующей технологии
  const randomSelectNext = () => {
    const notStarted = normalizedTechnologies.filter(tech => tech.status === 'not-started');
    if (notStarted.length > 0) {
      const randomTech = notStarted[Math.floor(Math.random() * notStarted.length)];
      updateStatus(randomTech.id, 'in-progress');
    }
  };

  const addTechnology = (payload) => {
    setTechnologies(prev => {
      const nextId = prev.length > 0 ? Math.max(...prev.map(tech => tech.id)) + 1 : 1;
      const defaults = {
        status: 'not-started',
        notes: '',
        category: 'frontend'
      };

      return [
        ...prev,
        {
          ...defaults,
          ...payload,
          id: nextId
        }
      ];
    });
  };

  return {
    technologies: normalizedTechnologies,
    setTechnologies,
    updateStatus,
    updateNotes,
    updateDeadline,
    bulkUpdateStatus,
    editTechnology,
    addTechnology,
    progress: calculateProgress(),
    markAllCompleted,
    resetAllStatuses,
    randomSelectNext
  };
}

export default useTechnologies;

